import { auth } from "@/auth";
import { getUsers } from "@/actions/users";
import { redirect } from "next/navigation";
import { UserList } from "@/components/admin/UserList";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
    const session = await auth();
    const allowedRoles = ["SUPER_ADMIN", "DIRECTION", "DIRECTRICE", "TRESORIERE"];

    if (!session?.user || typeof session.user.role !== "string" || !allowedRoles.includes(session.user.role)) {
        redirect("/admin/dashboard");
    }

    const users = await getUsers();
    const typedUsers = users as { id: string; name: string | null; email: string; role: string; organizationName: string | null; createdAt: Date }[];

    return <UserList users={typedUsers} currentUser={session.user as { id: string; role: string }} />;
}
