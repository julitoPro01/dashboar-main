/*
  Warnings:

  - The values [RESERVED] on the enum `InventoryStatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('ACTIVE', 'RELEASED', 'CONSUMED', 'EXPIRED');

-- AlterEnum
BEGIN;
CREATE TYPE "InventoryStatusType_new" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'PENDING_RESTOCK', 'IN_TRANSIT');
ALTER TABLE "inventory_status" ALTER COLUMN "name" TYPE "InventoryStatusType_new" USING ("name"::text::"InventoryStatusType_new");
ALTER TYPE "InventoryStatusType" RENAME TO "InventoryStatusType_old";
ALTER TYPE "InventoryStatusType_new" RENAME TO "InventoryStatusType";
DROP TYPE "public"."InventoryStatusType_old";
COMMIT;

-- CreateTable
CREATE TABLE "InventoryReservation" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryReservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryReservation" ADD CONSTRAINT "InventoryReservation_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
