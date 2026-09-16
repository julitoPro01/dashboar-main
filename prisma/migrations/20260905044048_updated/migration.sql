-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_fileId_fkey";

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
