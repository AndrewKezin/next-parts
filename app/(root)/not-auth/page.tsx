import { InfoBlock } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function UnauthorizedPage() {
  const user = await getUserSession();

  if (user) {
    return redirect('/');
  }
  
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
