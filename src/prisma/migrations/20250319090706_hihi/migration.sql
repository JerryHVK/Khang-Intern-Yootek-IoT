/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(257)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);
