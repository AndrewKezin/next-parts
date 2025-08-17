import { Container, ProfileForm } from '@/components/shared';
import { getUserProfile } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  // проверка авторизации на уровне сервера
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await getUserProfile(session.id);

  if (!user) {
    return redirect('/not-auth');
  }

  if (user.role === 'ADMIN') {
    return redirect('/dashboard');
  }

  return (
    <Container>
      <ProfileForm data={user} />
    </Container>
  );
}
