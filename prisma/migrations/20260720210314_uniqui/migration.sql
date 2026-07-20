/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `attribute_definitions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "attribute_option" DROP CONSTRAINT "attribute_option_attributeDefinitionId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "attribute_definitions_name_key" ON "attribute_definitions"("name");

-- AddForeignKey
ALTER TABLE "attribute_option" ADD CONSTRAINT "attribute_option_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
