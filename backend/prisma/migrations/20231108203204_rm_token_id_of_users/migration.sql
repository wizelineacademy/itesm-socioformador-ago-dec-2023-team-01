/*
  Warnings:

  - You are about to drop the column `tokenId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_tokenId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenId";
