/*
  Warnings:

  - You are about to drop the column `valueJson` on the `variant_attribute_values` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "variant_attribute_values" DROP COLUMN "valueJson",
ADD COLUMN     "valueOptionIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
