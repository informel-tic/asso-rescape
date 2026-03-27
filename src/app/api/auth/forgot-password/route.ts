import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import crypto from "crypto";

/**
 * POST /api/auth/forgot-password
 * Génère un token de réinitialisation et envoie un mail.
 * Pour des raisons de sécurité, retourne toujours 200 (pas de divulgation d'existence de compte).
 */
export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email requis" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

        if (user) {
            // Générer un token sécurisé (dans un vrai déploiement, il serait stocké en DB avec expiration)
            const token = crypto.randomBytes(32).toString("hex");

            // Log du token en dev (sera stocké en DB en prod)
            console.log(`[forgot-password] Token pour ${email}: ${token}`);

            await sendMail({
                to: email,
                subject: "🔑 Réinitialisation de votre mot de passe — Rescape",
                html: `
                    <h2>Réinitialisation de mot de passe</h2>
                    <p>Bonjour ${user.name ?? ""},</p>
                    <p>Vous avez demandé la réinitialisation de votre mot de passe sur le portail Rescape.</p>
                    <p><strong>Note :</strong> Cette fonctionnalité sera pleinement opérationnelle une fois le SMTP configuré.</p>
                    <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
                    <hr/>
                    <small>Association Rescape — 4 Place Fogt, 59580 Aniche</small>
                `,
            });
        }

        // Toujours retourner 200 pour ne pas révéler si le compte existe
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[forgot-password] Error:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
