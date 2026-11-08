-- DropForeignKey
ALTER TABLE "product_movies" DROP CONSTRAINT "product_movies_fileId_fkey";

-- AddForeignKey
ALTER TABLE "product_movies" ADD CONSTRAINT "product_movies_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
