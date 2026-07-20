-- DropIndex
DROP INDEX "attribute_definitions_name_key";

-- AlterTable
ALTER TABLE "attribute_definitions" ALTER COLUMN "name" SET DATA TYPE CITEXT;
