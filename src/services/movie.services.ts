import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// interface Movie {
//   title: string;
//   plot: string;
//   genre?: number;
//   userId: number;
//   imageUrl: string;
//   releaseDate: Date;
//   status: boolean;
// }

export type Movie = {
  id: number;
  title: string;
  plot?: string | null;
  imageUrl?: string | null;
  releaseDate?: Date | null;
  status?: boolean;
  deleted?: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
  userId?: number | null;
  genreId?: number | null;
};

export type MovieCreateInput = Prisma.MovieCreateInput;

class MovieService {
  static async getAllMovies(filter?: any): Promise<Movie[]> {
    let movies = await prisma.movie.findMany();
    return movies as Movie[];
  }

  static async getMovieById(genreId: number): Promise<Movie | null> {
    const movie = await prisma.movie.findUnique({
      where: {id: genreId},
    });

    return movie as Movie;
  }

  //   static async createMovie(data: Movie): Promise<Movie> {
  //     const movie = await prisma.movie.create({
  //       data,
  //     });
  //     return movie as Movie;
  //   }

  static async createMovie(payload: Partial<MovieCreateInput>): Promise<Movie> {
    const {title, plot, user, genre, imageUrl, releaseDate} = payload as any;

    const movie = await prisma.movie.create({
      data: {
        title,
        plot,
        genre,
        user,
        imageUrl,
        releaseDate,
      },
    });

    return movie;
  }

  static async updateMovieById(
    movieId: number,
    updateData: Prisma.MovieUpdateInput
  ): Promise<Movie | null> {
    const updatedMovie = await prisma.movie.update({
      where: {id: movieId},
      data: updateData,
    });

    return updatedMovie as Movie;
  }

  static async deleteMovie(movieId: number): Promise<Movie> {
    const movie = await prisma.movie.delete({
      where: {id: movieId},
    });
    return movie as Movie;
  }
}

export default MovieService;
