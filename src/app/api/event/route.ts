import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const groups = await prisma.event.findMany({
      where: {
        ownerId: session.user.id,
      },
    });
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const event = await prisma.event.create({
      data: {
        ...body,
        owner: {
          connect: { id: session?.user?.id },
        },
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
