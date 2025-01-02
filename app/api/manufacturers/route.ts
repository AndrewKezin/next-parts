import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

// получение списка производителей трансмиссий
export async function GET() {
  const manufacturers = await prisma.gearboxManufacturer.findMany();

  return NextResponse.json(manufacturers);
}
