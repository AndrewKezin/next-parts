import { ProfileForm } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    // проверка авторизации на уровне сервера
    const session = await getUserSession();

    if (!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.id)
        }
    });

    if (!user) {
        return redirect('/not-auth');
    }

    if (user.role === 'ADMIN') {
        return redirect('/admin');
    }
    
    return <ProfileForm data={user} />
}