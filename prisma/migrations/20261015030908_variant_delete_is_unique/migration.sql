/*
  Warnings:

  - You are about to drop the column `isUnique` on the `product_variants` table. All the data in the column will be lost.
  - You are about to alter the column `discount` on the `product_variants` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "isUnique",
ADD COLUMN     "discountEndsAt" TIMESTAMP(3),
ADD COLUMN     "discountStartsAt" TIMESTAMP(3),
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "discount" SET DATA TYPE INTEGER;
