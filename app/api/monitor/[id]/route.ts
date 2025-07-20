import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.monitor.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({ message: 'Уведомление удалено' });
  } catch (err) {
    console.log('[MONITOR] Error', err);
    return NextResponse.json({ message: '[MONITOR] Error', err }, { status: 500 });
  }
}
