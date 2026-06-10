import { NextResponse } from "next/server";
import prisma from "../../lib/client";
import { deleteIssueSchema } from "../zodValidation/Validation";

export async function DELETE(request){
  try{
    const body = await request.json();
    const validation = deleteIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { id } = validation.data;
    const findIss = await prisma.issues.findUnique({
      where: {
        id,
      },
    });

    if(!findIss)
      return NextResponse.json({error: "id doesnt exist"}, {status: 404});

    await prisma.issues.delete({
      where: { id },
    });

    return NextResponse.json({message: "issue deleted"}, {status: 200});
  } catch (err) {
    return NextResponse.json({error: "server error"}, {status: 500});
  }
}