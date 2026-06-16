import { NextResponse } from "next/server";
import { prisma } from "../../lib/client"
import { issuesSchema } from "../zodValidation/Validation";
import { getServerSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";


export async function POST(request) {
  const token = await getToken({ req:request })
  if (!token?.sub) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const body = await request.json();
    const validation = issuesSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    await prisma.issues.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        userId: token.sub
      },
    });

    return NextResponse.json({ message: "issues created successfully" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `you have an error: ${err}` }, { status: 500 });
  }
}