/*
  Warnings:

  - You are about to drop the column `toProduct` on the `attribute_definitions` table. All the data in the column will be lost.
  - You are about to drop the column `isProductCategory` on the `categories` table. All the data in the column will be lost.
  - The primary key for the `product_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeDefinitionId` on the `product_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `product_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `product_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `lastCategoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `mainCategoryId` on the `products` table. All the data in the column will be lost.
  - The primary key for the `variant_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attributeDefinitionId` on the `variant_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `variant_attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `variant_attribute_values` table. All the data in the column will be lost.
  - Added the required column `level` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeOptionId` to the `product_attribute_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributeOptionId` to the `variant_attribute_values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_lastCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_mainCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey";

-- DropIndex
DROP INDEX "product_attribute_values_attributeDefinitionId_idx";

-- DropIndex
DROP INDEX "product_attribute_values_productId_idx";

-- DropIndex
DROP INDEX "product_attribute_values_value_idx";

-- DropIndex
DROP INDEX "products_lastCategoryId_idx";

-- DropIndex
DROP INDEX "products_mainCategoryId_idx";

-- DropIndex
DROP INDEX "variant_attribute_values_attributeDefinitionId_idx";

-- DropIndex
DROP INDEX "variant_attribute_values_value_idx";

-- AlterTable
ALTER TABLE "attribute_definitions" DROP COLUMN "toProduct";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "isProductCategory",
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "category_attributes" ADD COLUMN     "isVariant" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_pkey",
DROP COLUMN "attributeDefinitionId",
DROP COLUMN "id",
DROP COLUMN "value",
ADD COLUMN     "attributeOptionId" INTEGER NOT NULL,
ADD CONSTRAINT "product_attribute_values_pkey" PRIMARY KEY ("productId", "attributeOptionId");

-- AlterTable
ALTER TABLE "products" DROP COLUMN "lastCategoryId",
DROP COLUMN "mainCategoryId";

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_pkey",
DROP COLUMN "attributeDefinitionId",
DROP COLUMN "id",
DROP COLUMN "value",
ADD COLUMN     "attributeOptionId" INTEGER NOT NULL,
ADD CONSTRAINT "variant_attribute_values_pkey" PRIMARY KEY ("variantId", "attributeOptionId");

-- CreateTable
CREATE TABLE "attribute_option" (
    "id" SERIAL NOT NULL,
    "attributeDefinitionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER,

    CONSTRAINT "attribute_option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attribute_option_attributeDefinitionId_idx" ON "attribute_option"("attributeDefinitionId");

-- CreateIndex
CREATE INDEX "attribute_option_value_idx" ON "attribute_option"("value");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_option_attributeDefinitionId_value_key" ON "attribute_option"("attributeDefinitionId", "value");

-- CreateIndex
CREATE INDEX "categories_path_idx" ON "categories"("path");

-- CreateIndex
CREATE INDEX "categories_level_idx" ON "categories"("level");

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeOptionId_fkey" FOREIGN KEY ("attributeOptionId") REFERENCES "attribute_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_option" ADD CONSTRAINT "attribute_option_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeOptionId_fkey" FOREIGN KEY ("attributeOptionId") REFERENCES "attribute_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
