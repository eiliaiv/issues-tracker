 import {NextResponse} from "next/server";
import {prisma} from "../../lib/client";

export async function GET(){
  try{
    const issues = await prisma.issues.findMany();
    return NextResponse.json(issues, {status: 200});
  }catch(err){
    return NextResponse.json({error: `you have an error: ${err}`}, {status: 500});
  }
}