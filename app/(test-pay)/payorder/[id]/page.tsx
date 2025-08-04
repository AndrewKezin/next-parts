import { Amount, Metadata } from '@/@types/onlinekassa';
import { TestCard, TestPayDetails } from '@/components/testpayment';
import { Button } from '@/components/ui';
import { getTestpayData } from '@/lib';
import Link from 'next/link';

export default async function TestPayOrderPage({ params: { id } }: { params: { id: string } }) {
  const redirection = () => {
    return (
      <>
        <h2 className="text-center font-bold text-3xl pt-10 mb-10">Заказ не найден</h2>

        <Link href="/">
          <Button className="w-[300px]">На главную</Button>
        </Link>
      </>
    );
  };

  if (!id) {
    return redirection();
  }

  // получить данные о тестовом платеже
  const testpayData = await getTestpayData(id);

  if (!testpayData) {
    return redirection();
  }

  if (!testpayData.metadata) {
    return redirection();
  }
  const metadata: Metadata = JSON.parse(String(testpayData.metadata));

  if (!testpayData.amount) {
    return redirection();
  }
  const amount: Amount = JSON.parse(String(testpayData.amount));

  const isPaid = testpayData.paid;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-[50px] text-orange-500">
        Cтраница оплаты
      </h1>

      {/* Детали заказа */}
      <TestPayDetails orderId={metadata.order_id} amount={amount.value} isPaid={isPaid} />

      {/* Псевдокарта */}
      {!isPaid && metadata.order_id && <TestCard isPaid={isPaid} testpayData={testpayData} />}

      {/* Кнопка перехода на главную */}
      {isPaid && (
        <Link
          href={
            ((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
              process.env.NEXT_PUBLIC_PAYORDER_CALLBACK_URL) as string
          }>
          <Button className="w-[280px] h-[40px] sm:h-[50px] font-bold text-xl mb-3">
            На главную
          </Button>
        </Link>
      )}
    </div>
  );
}
