import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export type Artist = {
  firstName: string;
  lastName: string;
  awards?: string | null;
  dob?: Date | string | null;
  dod?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
};

export type ArtistCreateInput = Prisma.ArtistCreateInput;

class ArtistService {
  static async getAllArtists(filter?: any): Promise<Artist[]> {
    let artists = await prisma.artist.findMany();
    return artists as Artist[];
  }

  static async getArtistById(artistId: number): Promise<Artist | null> {
    const artist = await prisma.artist.findUnique({
      where: {id: artistId},
    });

    return artist as Artist;
  }

  static async createArtist(payload: Partial<ArtistCreateInput>): Promise<Artist> {
    const {firstName, lastName, awards, user, dob, dod} = payload as any;

    const artist = await prisma.artist.create({
      data: {
        firstName,
        lastName,
        awards,
        user,
        dob,
        dod,
      },
    });

    return artist;
  }

  static async updateArtistById(
    artistId: number,
    updateData: Prisma.ArtistUpdateInput
  ): Promise<Artist | null> {
    const updatedArtist = await prisma.artist.update({
      where: {id: artistId},
      data: updateData,
    });

    return updatedArtist as Artist;
  }

  static async deleteArtist(artistId: number): Promise<Artist> {
    const artist = await prisma.artist.delete({
      where: {id: artistId},
    });
    return artist as Artist;
  }
}

export default ArtistService;
