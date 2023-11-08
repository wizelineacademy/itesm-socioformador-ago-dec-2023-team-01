/*
  Warnings:

  - You are about to drop the column `name` on the `Conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'New Chat';
