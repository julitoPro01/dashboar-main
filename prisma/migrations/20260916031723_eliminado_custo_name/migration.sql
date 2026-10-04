/*
  Warnings:

  - You are about to drop the column `customName` on the `product_attribute_values` table. All the data in the column will be lost.
  - The `longDescription` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `customName` on the `variant_attribute_values` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barcode]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Made the column `attributeDefinitionId` on table `product_attribute_values` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attributeDefinitionId` on table `variant_attribute_values` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey";

-- AlterTable
ALTER TABLE "product_attribute_values" DROP COLUMN "customName",
ALTER COLUMN "attributeDefinitionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "barcode" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "longDescription",
ADD COLUMN     "longDescription" JSONB;

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP COLUMN "customName",
ALTER COLUMN "attributeDefinitionId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "product_attribute_values_attributeDefinitionId_valueText_idx" ON "product_attribute_values"("attributeDefinitionId", "valueText");

-- CreateIndex
CREATE INDEX "product_attribute_values_attributeDefinitionId_valueNumber_idx" ON "product_attribute_values"("attributeDefinitionId", "valueNumber");

-- CreateIndex
CREATE INDEX "product_attribute_values_attributeDefinitionId_valueBoolean_idx" ON "product_attribute_values"("attributeDefinitionId", "valueBoolean");

-- CreateIndex
CREATE INDEX "product_attribute_values_attributeDefinitionId_valueDate_idx" ON "product_attribute_values"("attributeDefinitionId", "valueDate");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_barcode_key" ON "product_variants"("barcode");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_valueNumber_idx" ON "variant_attribute_values"("attributeDefinitionId", "valueNumber");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_valueBoolean_idx" ON "variant_attribute_values"("attributeDefinitionId", "valueBoolean");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_valueDate_idx" ON "variant_attribute_values"("attributeDefinitionId", "valueDate");

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
