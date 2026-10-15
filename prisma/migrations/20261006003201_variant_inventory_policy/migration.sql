-- CreateEnum
CREATE TYPE "InventoryPolicy" AS ENUM ('AUTO_DECREMENT', 'UNLIMITED', 'ON_DEMAND');

-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "inventoryPolicy" "InventoryPolicy" NOT NULL DEFAULT 'AUTO_DECREMENT',
ALTER COLUMN "stockQuantity" SET DEFAULT 0;
