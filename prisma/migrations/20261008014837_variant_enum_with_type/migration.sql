/*
  Warnings:

  - The `publicationStatus` column on the `VariantChannel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `product_variants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `inventoryPolicy` column on the `product_variants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `InventoryReservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReservationStatusType" AS ENUM ('ACTIVE', 'RELEASED', 'CONSUMED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PublicationStatusType" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "InventoryPolicyType" AS ENUM ('AUTO_DECREMENT', 'UNLIMITED', 'ON_DEMAND');

-- CreateEnum
CREATE TYPE "ProductTagType" AS ENUM ('ON_SALE', 'NEW', 'POPULAR', 'LOW_STOCK', 'IN_STORE_ONLY');

-- AlterTable
ALTER TABLE "InventoryReservation" DROP COLUMN "status",
ADD COLUMN     "status" "ReservationStatusType" NOT NULL;

-- AlterTable
ALTER TABLE "VariantChannel" DROP COLUMN "publicationStatus",
ADD COLUMN     "publicationStatus" "PublicationStatusType" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "tags",
ADD COLUMN     "tags" "ProductTagType"[] DEFAULT ARRAY[]::"ProductTagType"[],
DROP COLUMN "inventoryPolicy",
ADD COLUMN     "inventoryPolicy" "InventoryPolicyType" NOT NULL DEFAULT 'AUTO_DECREMENT';

-- DropEnum
DROP TYPE "InventoryPolicy";

-- DropEnum
DROP TYPE "ProductTag";

-- DropEnum
DROP TYPE "PublicationStatus";

-- DropEnum
DROP TYPE "ReservationStatus";
