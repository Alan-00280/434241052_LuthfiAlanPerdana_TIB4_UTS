-- CreateEnum
CREATE TYPE "TechSupportSpecialty" AS ENUM ('NETWORK', 'HARDWARE', 'SOFTWARE', 'ACCOUNT_AUTH', 'INFRASTRUCTURE');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'TECHSUPPORT';

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "techSupportId" TEXT;

-- CreateTable
CREATE TABLE "tech_support" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "speciality" "TechSupportSpecialty" NOT NULL DEFAULT 'SOFTWARE',

    CONSTRAINT "tech_support_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_support_userId_key" ON "tech_support"("userId");

-- AddForeignKey
ALTER TABLE "tech_support" ADD CONSTRAINT "tech_support_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_techSupportId_fkey" FOREIGN KEY ("techSupportId") REFERENCES "tech_support"("id") ON DELETE SET NULL ON UPDATE CASCADE;
