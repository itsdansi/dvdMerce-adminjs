import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface Genre {
  title: string;
}

class GenreService {
  static async getAllGenres(filter?: any): Promise<Genre[]> {
    let genres = await prisma.genre.findMany();

    // if (filter) {
    //   genres = genres.filter((genre) => genre.status === filter);
    // }
    return genres;
  }
  // getGenreById

  static async getGenreById(genreId: number): Promise<Genre | null> {
    const genre = await prisma.genre.findUnique({
      where: {id: genreId},
    });

    return genre;
  }

  static async createGenre(data: Genre): Promise<Genre> {
    const genre = await prisma.genre.create({
      data,
    });
    return genre;
  }

  static async updateGenreById(
    genreId: number,
    updateData: Prisma.GenreUpdateInput
  ): Promise<Genre | null> {
    const updatedGenre = await prisma.genre.update({
      where: {id: genreId},
      data: updateData,
    });

    return updatedGenre;
  }

  static async deleteGenre(genreId: number): Promise<Genre> {
    const genre = await prisma.genre.delete({
      where: {id: genreId},
    });
    return genre;
  }
}

export default GenreService;
