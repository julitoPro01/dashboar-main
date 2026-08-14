-- DropForeignKey
ALTER TABLE "category_attributes" DROP CONSTRAINT "category_attributes_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product_attribute_values" DROP CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey";

-- AlterTable
ALTER TABLE "product_attribute_values" ADD COLUMN     "customName" TEXT,
ALTER COLUMN "attributeDefinitionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
