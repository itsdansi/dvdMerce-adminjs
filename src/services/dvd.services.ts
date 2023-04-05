import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export type Dvd = {
  id: number;
  title: string;
  desc?: string | null;
  sku: number;
  length: string;
  size: string;
  price: number;
  status?: boolean;
  userId?: number | null;
  movieId?: number | null;
  deleted?: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type DVDCreateInput = Prisma.DVDCreateInput;

class DvdService {
  static async getAllDvds(filter?: any): Promise<Dvd[]> {
    let dvds = await prisma.dVD.findMany();
    return dvds as Dvd[];
  }

  static async getDvdById(genreId: number): Promise<Dvd | null> {
    const dvd = await prisma.dVD.findUnique({
      where: {id: genreId},
    });

    return dvd as Dvd;
  }

  static async createDvd(payload: Partial<DVDCreateInput>): Promise<Dvd> {
    const {title, desc, user, movie, sku, length, size, price} = payload as any;
    //  const parsedPrice = (price),

    const dvd = await prisma.dVD.create({
      data: {
        title,
        desc,
        sku,
        length,
        size,
        user,
        movie,
        price,
      },
    });

    return dvd;
  }

  static async updateDvdById(
    dvdId: number,
    updateData: Prisma.DVDUpdateInput
  ): Promise<Dvd | null> {
    const updatedDvd = await prisma.dVD.update({
      where: {id: dvdId},
      data: updateData,
    });

    return updatedDvd as Dvd;
  }

  static async deleteDvd(dvdId: number): Promise<Dvd> {
    const dvd = await prisma.dVD.delete({
      where: {id: dvdId},
    });
    return dvd as Dvd;
  }
}

export default DvdService;
