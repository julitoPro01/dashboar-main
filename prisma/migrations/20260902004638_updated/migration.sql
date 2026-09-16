-- DropForeignKey
ALTER TABLE "variant_attribute_values" DROP CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey";

-- AlterTable
ALTER TABLE "variant_attribute_values" ALTER COLUMN "attributeDefinitionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
