/*
  Warnings:

  - You are about to drop the column `attributeValueOptionId` on the `product_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `attributeValueOptionId` on the `variant_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the `attribute_option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_option" DROP CONSTRAINT "attribute_option_attributeDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "attribute_option" DROP CONSTRAINT "attribute_option_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attributeValueOptionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_attributeValueOptionId_fkey";

-- DropIndex
DROP INDEX "variant_attribute_values_variantId_idx";

-- AlterTable
ALTER TABLE "product_attribute_values" DROP COLUMN "attributeValueOptionId";

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP COLUMN "attributeValueOptionId",
ADD COLUMN     "systemAttributeValueId" INTEGER,
ADD COLUMN     "valueBoolean" BOOLEAN,
ADD COLUMN     "valueDate" TIMESTAMP(3),
ADD COLUMN     "valueJson" JSONB,
ADD COLUMN     "valueNumber" DOUBLE PRECISION,
ADD COLUMN     "valueText" TEXT;

-- DropTable
DROP TABLE "attribute_option";

-- CreateTable
CREATE TABLE "system_attribute_values" (
    "id" SERIAL NOT NULL,
    "attributeDefinitionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER,

    CONSTRAINT "system_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_attribute_values_attributeDefinitionId_value_key" ON "system_attribute_values"("attributeDefinitionId", "value");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_systemAttrib_idx" ON "variant_attribute_values"("attributeDefinitionId", "systemAttributeValueId");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_valueText_idx" ON "variant_attribute_values"("attributeDefinitionId", "valueText");

-- AddForeignKey
ALTER TABLE "system_attribute_values" ADD CONSTRAINT "system_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_systemAttributeValueId_fkey" FOREIGN KEY ("systemAttributeValueId") REFERENCES "system_attribute_values"("id") ON DELETE SET NULL ON UPDATE CASCADE;
