import { prisma } from '@/prisma/prisma-client';

/**
 * получить данные из БД о тестовом платеже
 * @param id 
 * @returns 
 */
export const getTestpayData = async (id: string) => {
    const testpayData = await prisma.testPayment.findFirst({
    where: {
      id: id,
    },
  });

  return testpayData;
};
