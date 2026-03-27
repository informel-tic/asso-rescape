"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hasAdminAccess } from "@/lib/roles";

export async function createTimelineEntry(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Non autorisé");

    const role = session.user.role as string;
    if (!hasAdminAccess(role)) {
        throw new Error("Action non autorisée");
    }

    const title = formData.get("title") as string;
    const caption = formData.get("caption") as string | null;
    const icon = formData.get("icon") as string;
    const content = formData.get("content") as string;
    const order = parseInt(formData.get("order") as string, 10);

    if (!title || !icon || !content || isNaN(order)) {
        return { error: "Veuillez remplir tous les champs obligatoires." };
    }

    try {
        await prisma.timelineEntry.create({
            data: {
                title,
                caption: caption || null,
                icon,
                content,
                order,
            },
        });
    } catch {
        return { error: "Erreur lors de la création de la période." };
    }

    revalidatePath("/admin/dashboard/timeline");
    revalidatePath("/notre-histoire"); // Public page with the timeline
    return { success: true };
}
