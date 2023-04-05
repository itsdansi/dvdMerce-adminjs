import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export type Wishlist = {
  id: number;
  userId?: number | null;
  dvdId?: number | null;
  createdAt: Date;
  updatedAt?: Date;
};

export type WishlistCreateInput = Prisma.WishlistCreateInput;

class WishlistService {
  static async getAllWishlists(userId: number): Promise<Wishlist[]> {
    let wishlists = await prisma.wishlist.findMany({
      where: {
        userId,
      },
    });
    return wishlists as Wishlist[];
  }

  static async getAllWishlistsForAdmin(): Promise<Wishlist[]> {
    let wishlists = await prisma.wishlist.findMany();
    return wishlists as Wishlist[];
  }

  static async getWishlistById(
    wishlistId: number,
    userId: number
  ): Promise<Wishlist | null> {
    const wishlist = await prisma.wishlist.findFirst({
      where: {
        id: wishlistId,
        userId: userId, //userId for show whishlist only if he created it.
      },
    });

    return wishlist as Wishlist;
  }

  static async createWishlist(payload: {
    userId: number;
    dvdId: number;
  }): Promise<Wishlist> {
    const {userId, dvdId} = payload;

    // Check if the DVD is already in the user's wishlist
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        AND: [{userId: {equals: userId}}, {dvdId: {equals: dvdId}}],
      },
    });

    if (existingWishlist) {
      throw new Error("DVD is already in user wishlist");
    }

    // runs when same DVD is not in the same user wishlist
    const newWishlist = await prisma.wishlist.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        dvd: {
          connect: {id: dvdId},
        },
      },
    });

    return newWishlist as Wishlist;
  }

  static async deleteWishlist(wishlistId: number): Promise<Wishlist> {
    const wishlist = await prisma.wishlist.delete({
      where: {id: wishlistId},
    });
    return wishlist as Wishlist;
  }
}

export default WishlistService;
