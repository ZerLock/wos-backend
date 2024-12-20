/*
  Warnings:

  - You are about to drop the column `fmc_token` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_fmc_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fmc_token";
