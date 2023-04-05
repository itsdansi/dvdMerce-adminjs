/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_userId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "Artist";

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "awards" TEXT,
    "dob" TIMESTAMP(3),
    "dod" TIMESTAMP(3),
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_crews" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "character_name" TEXT,
    "artist_id" INTEGER,
    "user_id" INTEGER,
    "movie_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "movie_crews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_crews" ADD CONSTRAINT "movie_crews_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_crews" ADD CONSTRAINT "movie_crews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_crews" ADD CONSTRAINT "movie_crews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
