import { NextResponse } from "next/server";
import { prisma } from "../../lib/client";
import { z } from "zod";

const statusSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});

export async function PUT(request) {
  try {
    const body = await request.json();
    const validation = statusSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    await prisma.issues.update({
      where: { id: validation.data.id },
      data: { status: validation.data.status },
    });

    return NextResponse.json({ message: "status updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
