"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const NewsletterSchema = z.object({
    email: z.string().email("Format d'email invalide"),
});

export async function subscribeNewsletter(formData: FormData) {
    const email = formData.get("email");
    const validatedData = NewsletterSchema.safeParse({ email });

    if (!validatedData.success) {
        return { error: validatedData.error.issues[0].message };
    }

    try {
        await prisma.newsletter.upsert({
            where: { email: validatedData.data.email },
            update: { active: true },
            create: { email: validatedData.data.email },
        });

        revalidatePath("/admin/dashboard/newsletter");
        return { success: true };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return { error: "Une erreur est survenue lors de l'inscription." };
    }
}

export async function unsubscribeNewsletter(email: string) {
    try {
        await prisma.newsletter.update({
            where: { email },
            data: { active: false },
        });
        revalidatePath("/admin/dashboard/newsletter");
        return { success: true };
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        return { error: "Erreur lors de la désinscription." };
    }
}

export async function getAllSubscribers() {
    try {
        return await prisma.newsletter.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        return [];
    }
}
