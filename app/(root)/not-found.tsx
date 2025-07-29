import { InfoBlock } from '@/components/shared';

export default function NotFoundPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10 lg:my-40">
      <InfoBlock
        title="Что-то не так..."
        text="Такой страницы не существует"
        imageUrl="/assets/images/not-found.png"
      />
    </div>
  );
}
