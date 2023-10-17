/*
  Warnings:

  - You are about to drop the column `prompt` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "prompt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_tokenId_key" ON "User"("tokenId");
