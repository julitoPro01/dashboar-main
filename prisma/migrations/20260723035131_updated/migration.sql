/*
  Warnings:

  - The values [OWNED] on the enum `SupplierRelationMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SupplierRelationMode_new" AS ENUM ('OWNER', 'PARTNER', 'CATALOG');
ALTER TABLE "suppliers" ALTER COLUMN "relationMode" TYPE "SupplierRelationMode_new" USING ("relationMode"::text::"SupplierRelationMode_new");
ALTER TYPE "SupplierRelationMode" RENAME TO "SupplierRelationMode_old";
ALTER TYPE "SupplierRelationMode_new" RENAME TO "SupplierRelationMode";
DROP TYPE "public"."SupplierRelationMode_old";
COMMIT;
