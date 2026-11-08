-- CreateEnum
CREATE TYPE "ProductInactiveReason" AS ENUM ('MANUAL', 'NO_ACTIVE_VARIANTS');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "inactiveReason" "ProductInactiveReason";
