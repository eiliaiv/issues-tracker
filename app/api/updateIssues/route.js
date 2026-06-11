import { NextResponse } from "next/server";
import {prisma} from "../../lib/client";
import { z } from "zod";
import { issuesSchema } from "../zodValidation/Validation";

const updateIssueSchema = issuesSchema.extend({
  id: z.number(),
});

export async function PUT(request) {
  try {
    const body = await request.json();
    const validation = updateIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    await prisma.issues.update({
      where: { id: validation.data.id },
      data: {
        title: validation.data.title,
        description: validation.data.description,
      },
    });

    return NextResponse.json({ message: "issue updated" }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}