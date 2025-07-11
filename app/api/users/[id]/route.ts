import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { checkAdminRules } from '@/lib/check-admin-rules';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminRules = await checkAdminRules(true);

    if (adminRules.status !== 200) {
      return NextResponse.json({ message: adminRules.message }, { status: adminRules.status });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log('[GET_USERS] Error', err);
    return NextResponse.json({ message: '[GET_USERS] Error' }, { status: 500 });
  }
}
