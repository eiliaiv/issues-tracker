import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/client"
import bcrypt from "bcrypt"
import { loginoutSchema } from "../../zodValidation/Validation";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const validation = loginoutSchema.safeParse(credentials);
        if (!validation.success) {
          return null;
        }

        const { email, password, name } = validation.data;
        let user = await prisma.user.findUnique({
          where: { email }
        });

        if (user) {
          if (!user.password) {
            return null;
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return null;
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image || null
          };
        }

        if (!name) {
          return null;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
          data: {
            email,
            name,
            password: hashPassword
          },
        });

        return {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          image: createdUser.image || null
        };
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }