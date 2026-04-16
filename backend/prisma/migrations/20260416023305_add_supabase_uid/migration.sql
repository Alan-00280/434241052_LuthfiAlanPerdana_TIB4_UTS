/*
  Warnings:

  - A unique constraint covering the columns `[supabaseUid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "supabaseUid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_supabaseUid_key" ON "users"("supabaseUid");
