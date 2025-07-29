import { Container, InfoBlock } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function UnauthorizedPage() {
  const user = await getUserSession();

  if (user) {
    return redirect('/');
  }

  return (
    <Container>
      <div className="w-full flex flex-col items-center justify-center my-10 lg:my-40">
        <InfoBlock
          title="Доступ запрещён"
          text="Данную страницу могут просматривать только авторизованные пользователи"
          imageUrl="/assets/images/lock.png"
        />
      </div>
    </Container>
  );
}
