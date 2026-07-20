/*
  Warnings:

  - The primary key for the `variant_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "attribute_option" ADD COLUMN     "isSystemDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplierId" INTEGER;

-- AlterTable
ALTER TABLE "category_attributes" ADD COLUMN     "displayGroup" TEXT;

-- AlterTable
ALTER TABLE "product_attribute_values" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "product_attribute_values_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "variant_attribute_values_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "attribute_option" ADD CONSTRAINT "attribute_option_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
