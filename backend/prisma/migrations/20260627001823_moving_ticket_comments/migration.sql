/*
  Warnings:

  - You are about to drop the `ticket_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ticket_comments" DROP CONSTRAINT "ticket_comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_comments" DROP CONSTRAINT "ticket_comments_ticketId_fkey";

-- DropTable
DROP TABLE "ticket_comments";
