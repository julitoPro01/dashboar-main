/*
  Warnings:

  - The values [PENDING_REVIEW,UNDER_REVIEW] on the enum `VerificationStatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "RecordStatusType" ADD VALUE 'DRAFT';

-- AlterEnum
BEGIN;
CREATE TYPE "VerificationStatusType_new" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED', 'ARCHIVED');
ALTER TABLE "verification_statuses" ALTER COLUMN "name" TYPE "VerificationStatusType_new" USING ("name"::text::"VerificationStatusType_new");
ALTER TABLE "status_change_history" ALTER COLUMN "previousStatus" TYPE "VerificationStatusType_new" USING ("previousStatus"::text::"VerificationStatusType_new");
ALTER TABLE "status_change_history" ALTER COLUMN "newStatus" TYPE "VerificationStatusType_new" USING ("newStatus"::text::"VerificationStatusType_new");
ALTER TYPE "VerificationStatusType" RENAME TO "VerificationStatusType_old";
ALTER TYPE "VerificationStatusType_new" RENAME TO "VerificationStatusType";
DROP TYPE "public"."VerificationStatusType_old";
COMMIT;
