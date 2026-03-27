"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { isDirectionRole } from "@/lib/roles";

export async function createAccountingEntry(formData: FormData) {
    const session = await auth();
    if (!session?.user || !isDirectionRole(session.user.role as string)) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id as string;
    if (!userId) throw new Error("Erreur de session : ID utilisateur manquant.");

    const type = formData.get("type") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const dateStr = formData.get("date") as string;

    if (!type || !amount || !category || !description || !dateStr) {
        throw new Error("Champs requis manquants");
    }

    await prisma.accountingEntry.create({
        data: {
            type,
            amount,
            category,
            description,
            date: new Date(dateStr),
            createdById: userId
        }
    });

    revalidatePath("/admin/dashboard/compta");
    return { success: true };
}

export async function deleteAccountingEntry(id: string) {
    const session = await auth();
    if (!session?.user || !isDirectionRole(session.user.role as string)) {
        throw new Error("Unauthorized");
    }

    await prisma.accountingEntry.delete({
        where: { id }
    });

    revalidatePath("/admin/dashboard/compta");
    return { success: true };
}
