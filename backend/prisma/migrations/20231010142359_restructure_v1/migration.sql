/*
  Warnings:

  - You are about to drop the column `numberOfTokens` on the `Tokens` table. All the data in the column will be lost.
  - You are about to drop the column `idAuth0` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `area` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_idAuth0_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "area" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "numberOfTokens",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idAuth0",
DROP COLUMN "profilePicture",
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'wizeliner';

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
