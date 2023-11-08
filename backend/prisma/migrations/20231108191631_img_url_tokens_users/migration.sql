/*
  Warnings:

  - Added the required column `imageUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageUrl" TEXT NOT NULL;
