import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export type Rating = {
  id: number;
  rating: number;
  userId?: number | null;
  movieId?: number | null;
  createdAt: Date;
  // updatedAt: Date
};

export type RatingCreateInput = Prisma.RatingCreateInput;

class RatingService {
  static async getAllRatings(filter?: any): Promise<Rating[]> {
    let ratings = await prisma.rating.findMany();
    return ratings as Rating[];
  }

  static async getRatingById(genreId: number): Promise<Rating | null> {
    const rating = await prisma.rating.findUnique({
      where: {id: genreId},
    });

    return rating as Rating;
  }

  static async createRating(payload: Partial<RatingCreateInput>): Promise<Rating> {
    const {rating, movieId} = payload as any;

    const ratingData = await prisma.rating.create({
      data: {
        rating,
        movieId,
      },
    });

    return ratingData;
  }

  static async updateRatingById(
    ratingId: number,
    updateData: Prisma.RatingUpdateInput
  ): Promise<Rating | null> {
    const updatedRating = await prisma.rating.update({
      where: {id: ratingId},
      data: updateData,
    });

    return updatedRating as Rating;
  }
}

export default RatingService;
