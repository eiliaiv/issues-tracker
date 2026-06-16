import { NextResponse } from "next/server";
import { prisma } from "../../lib/client";
import { getToken } from "next-auth/jwt";

export async function GET(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token?.sub) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const issues = await prisma.issues.findMany({
      where: { userId: token.sub }
    });
    return NextResponse.json(issues, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}