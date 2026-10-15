-- CreateEnum
CREATE TYPE "DistributionChannel" AS ENUM ('STOREFRONT', 'MARKETPLACE', 'PHYSICAL_STORE', 'WHOLESALE');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "VariantChannel" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "channel" "DistributionChannel" NOT NULL,
    "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VariantChannel_variantId_channel_key" ON "VariantChannel"("variantId", "channel");

-- AddForeignKey
ALTER TABLE "VariantChannel" ADD CONSTRAINT "VariantChannel_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
