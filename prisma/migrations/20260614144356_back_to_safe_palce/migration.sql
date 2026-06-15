/*
  Warnings:

  - You are about to drop the column `userId` on the `issues` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_userId_fkey";

-- AlterTable
ALTER TABLE "issues" DROP COLUMN "userId";
