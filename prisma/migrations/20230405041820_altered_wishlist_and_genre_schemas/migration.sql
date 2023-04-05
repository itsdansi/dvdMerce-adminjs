/*
  Warnings:

  - You are about to drop the column `movieId` on the `Wishlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_movieId_fkey";

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "movieId",
ADD COLUMN     "dvdId" INTEGER;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_dvdId_fkey" FOREIGN KEY ("dvdId") REFERENCES "DVD"("id") ON DELETE SET NULL ON UPDATE CASCADE;
