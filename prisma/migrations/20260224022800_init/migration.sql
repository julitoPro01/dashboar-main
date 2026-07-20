/*
  Warnings:

  - You are about to alter the column `shortDescription` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to drop the `product_extra_attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_extra_attributes" DROP CONSTRAINT "product_extra_attributes_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "extraAttributes" JSONB,
ALTER COLUMN "longDescription" SET DATA TYPE TEXT,
ALTER COLUMN "shortDescription" SET DATA TYPE VARCHAR(300);

-- DropTable
DROP TABLE "product_extra_attributes";
