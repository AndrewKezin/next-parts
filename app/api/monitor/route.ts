import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const newMonitor = await prisma.monitor.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 3)), // три дня назад
        },
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
