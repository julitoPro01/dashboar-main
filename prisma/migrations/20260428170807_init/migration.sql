/*
  Warnings:

  - The primary key for the `product_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeOptionId` on the `product_attribute_values` table. All the data in the column will be lost.
  - The primary key for the `variant_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeOptionId` on the `variant_attribute_values` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,attributeDefinitionId]` on the table `product_attribute_values` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantId,attributeDefinitionId]` on the table `variant_attribute_values` will be added. If there are existing duplicate values, this will fail.
  - Made the column `createdAt` on table `attribute_definitions` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `attributeDefinitionId` to the `product_attribute_values` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `promotions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `supplier_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `suppliers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `attributeDefinitionId` to the `variant_attribute_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeValueOptionId` to the `variant_attribute_values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attributeOptionId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_attributeOptionId_fkey";

-- AlterTable
ALTER TABLE "attribute_definitions" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "currencies" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "daily_sales_summary" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "feature_flags" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "featured_ads" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payment_methods" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_pkey",
DROP COLUMN "attributeOptionId",
ADD COLUMN     "attributeDefinitionId" INTEGER NOT NULL,
ADD COLUMN     "attributeValueOptionId" INTEGER,
ADD COLUMN     "valueBoolean" BOOLEAN,
ADD COLUMN     "valueDate" TIMESTAMP(3),
ADD COLUMN     "valueJson" JSONB,
ADD COLUMN     "valueNumber" DOUBLE PRECISION,
ADD COLUMN     "valueText" TEXT;

-- AlterTable
ALTER TABLE "product_variants" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "shippings" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shopping_carts" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "supplier_products" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "system_config" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_addresses" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_wishlists" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_pkey",
DROP COLUMN "attributeOptionId",
ADD COLUMN     "attributeDefinitionId" INTEGER NOT NULL,
ADD COLUMN     "attributeValueOptionId" INTEGER NOT NULL,
ADD CONSTRAINT "variant_attribute_values_pkey" PRIMARY KEY ("variantId", "attributeValueOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "product_attribute_values_productId_attributeDefinitionId_key" ON "product_attribute_values"("productId", "attributeDefinitionId");

-- CreateIndex
CREATE UNIQUE INDEX "variant_attribute_values_variantId_attributeDefinitionId_key" ON "variant_attribute_values"("variantId", "attributeDefinitionId");

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeValueOptionId_fkey" FOREIGN KEY ("attributeValueOptionId") REFERENCES "attribute_option"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeValueOptionId_fkey" FOREIGN KEY ("attributeValueOptionId") REFERENCES "attribute_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
