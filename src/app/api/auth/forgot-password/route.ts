import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import crypto from "crypto";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/auth/forgot-password
 * Génère un token de réinitialisation, le stocke en DB avec expiration 1h, et envoie un mail.
 * Retourne toujours 200 pour ne pas divulguer l'existence d'un compte.
 * Rate-limit : 5 requêtes / 15 minutes par IP.
 */
export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    if (!rateLimit(`forgot-password:${ip}`, { limit: 5, windowSec: 900 })) {
        return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, { status: 429 });
    }

    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email requis" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

        // Do not generate tokens or send reset emails for ADHERENT users.
        if (user && !(user.role && user.role.toUpperCase() === "ADHERENT")) {
            const token = crypto.randomBytes(32).toString("hex");
            const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

            await prisma.user.update({
                where: { id: user.id },
                data: { resetToken: token, resetTokenExpiry: expiry },
            });

            const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
            const resetUrl = `${baseUrl}/reset-password?token=${token}`;

            await sendMail({
                to: email,
                subject: "🔑 Réinitialisation de votre mot de passe — Rescape",
                html: `
                    <h2>Réinitialisation de mot de passe</h2>
                    <p>Bonjour ${user.name ?? ""},</p>
                    <p>Vous avez demandé la réinitialisation de votre mot de passe sur le portail Rescape.</p>
                    <p><a href="${resetUrl}" style="background:#B04D1A;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin:16px 0;">Réinitialiser mon mot de passe</a></p>
                    <p>Ce lien est valable <strong>1 heure</strong>.</p>
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
