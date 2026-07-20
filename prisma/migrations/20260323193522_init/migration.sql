/*
  Warnings:

  - The values [VARCHAR,INT] on the enum `AttributeDataType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttributeDataType_new" AS ENUM ('TEXT', 'LONG_TEXT', 'NUMBER', 'DECIMAL', 'BOOLEAN', 'DATE', 'SELECT', 'MULTISELECT', 'COLOR', 'URL', 'EMAIL', 'PHONE', 'JSON');
ALTER TABLE "attribute_definitions" ALTER COLUMN "dataType" TYPE "AttributeDataType_new" USING ("dataType"::text::"AttributeDataType_new");
ALTER TYPE "AttributeDataType" RENAME TO "AttributeDataType_old";
ALTER TYPE "AttributeDataType_new" RENAME TO "AttributeDataType";
DROP TYPE "public"."AttributeDataType_old";
COMMIT;
