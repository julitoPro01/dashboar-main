ALTER TABLE "stock_movements"
ADD COLUMN "createdBy" TEXT,
ADD COLUMN "createdById" INTEGER;

ALTER TABLE "stock_movements"
ADD CONSTRAINT "stock_movements_createdById_fkey"
FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
