import { DAYSAGO } from '@/@types/monitor';
import { checkAdminRules } from '@/lib/check-admin-rules';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// получение всех уведомлений
export async function GET(req: NextRequest) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const newMonitor = await prisma.monitor.findMany({
      where: {
        createdAt: DAYSAGO
          ? {
              gte: new Date(new Date().setDate(new Date().getDate() - DAYSAGO)),
            }
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ newMonitor });
  } catch (err) {
    console.log('[MONITOR] Error', err);
    return NextResponse.json({ message: '[MONITOR] Error', err }, { status: 500 });
  }
}

// удаление всех уведомлений
export async function DELETE() {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    await prisma.monitor.deleteMany({});

    return NextResponse.json({ message: 'Уведомления удалены' });
  } catch (err) {
    console.log('[MONITOR] Error', err);
    return NextResponse.json({ message: '[MONITOR] Error', err }, { status: 500 });
  }
}
