/*
  Warnings:

  - You are about to drop the column `inventoryStatusId` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `saleStatusId` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryStatusId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `saleStatusId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `inventory_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inventoryStatus` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryStatus` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_inventoryStatusId_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_saleStatusId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_inventoryStatusId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_saleStatusId_fkey";

-- DropIndex
DROP INDEX "product_variants_inventoryStatusId_idx";

-- DropIndex
DROP INDEX "product_variants_saleStatusId_idx";

-- DropIndex
DROP INDEX "products_inventoryStatusId_idx";

-- DropIndex
DROP INDEX "products_saleStatusId_idx";

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "inventoryStatusId",
DROP COLUMN "saleStatusId",
ADD COLUMN     "inventoryStatus" "InventoryStatusType" NOT NULL,
ADD COLUMN     "saleStatus" "SaleStatusType" NOT NULL DEFAULT 'COMING_SOON';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "inventoryStatusId",
DROP COLUMN "saleStatusId",
ADD COLUMN     "inventoryStatus" "InventoryStatusType" NOT NULL,
ADD COLUMN     "saleStatus" "SaleStatusType" NOT NULL DEFAULT 'COMING_SOON';

-- DropTable
DROP TABLE "inventory_status";

-- DropTable
DROP TABLE "sales_status";
