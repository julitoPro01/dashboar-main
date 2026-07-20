/*
  Warnings:

  - The `displayGroup` column on the `category_attributes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DisplayGroup" AS ENUM ('GENERAL', 'FEATURES', 'DIMENSIONS', 'TECHNICAL', 'COMPATIBILITY', 'PACKAGE_CONTENT', 'WARRANTY', 'ADDITIONAL');

-- AlterTable
ALTER TABLE "category_attributes" DROP COLUMN "displayGroup",
ADD COLUMN     "displayGroup" "DisplayGroup" NOT NULL DEFAULT 'GENERAL';
