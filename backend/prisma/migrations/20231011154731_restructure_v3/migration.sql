/*
  Warnings:

  - You are about to drop the column `tokenId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tokenId_fkey";

-- DropIndex
DROP INDEX "User_tokenId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenId";

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
