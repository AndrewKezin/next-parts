import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // !!!!!!!!!!!!!! СДЕЛАТЬ ЗАЩИТУ ОТ НЕСАНКЦИОНИРОВАННОГО ДОСТУПА !!!!!!!!!!!!!

    // не по курсу
    const body = await req.json();

    const result = await prisma.testPayment.update({
      where: {
        id: body.id,
      },
      data: {
        paid: true,
        status: 'SUCCESS',
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.log('[TEST_PAYMENT] Error', err);
    return NextResponse.json({ message: '[TEST_PAYMENT] Error' }, { status: 500 });
  }
}
