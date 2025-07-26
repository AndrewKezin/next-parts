import { checkAdminRules } from '@/lib/check-admin-rules';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

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
