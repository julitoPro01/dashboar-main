/*
  Warnings:

  - You are about to drop the column `systemAttributeValueId` on the `variant_attribute_values` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_systemAttributeValueId_fkey";

-- DropIndex
DROP INDEX "variant_attribute_values_attributeDefinitionId_systemAttrib_idx";

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP COLUMN "systemAttributeValueId";
