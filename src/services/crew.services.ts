import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export type Crew = {
  role: string;
  characterName?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
};

export type MovieCrewCreateInput = Prisma.MovieCrewCreateInput;

class CrewService {
  static async getAllCrews(): Promise<Crew[]> {
    let crew = await prisma.movieCrew.findMany();
    return crew as Crew[];
  }

  static async getCrewsbyMovieId(movieId: number): Promise<Crew[]> {
    let crew = await prisma.movieCrew.findMany({
      where: {
        movieId,
      },
    });
    return crew as Crew[];
  }

  static async getCrewById(crewId: number): Promise<Crew | null> {
    const crew = await prisma.movieCrew.findUnique({
      where: {id: crewId},
    });

    return crew as Crew;
  }

  static async createCrew(payload: Partial<MovieCrewCreateInput>): Promise<Crew> {
    const {role, characterName, artist, movie, user} = payload as any;

    const crew = await prisma.movieCrew.create({
      data: {
        role,
        characterName,
        artist,
        movie,
        user,
      },
    });

    return crew;
  }

  static async updateCrewById(
    crewId: number,
    updateData: Prisma.MovieCrewUpdateInput
  ): Promise<Crew | null> {
    const updatedCrew = await prisma.movieCrew.update({
      where: {id: crewId},
      data: updateData,
    });

    return updatedCrew as Crew;
  }

  static async deleteCrew(crewId: number): Promise<Crew> {
    const crew = await prisma.movieCrew.delete({
      where: {id: crewId},
    });
    return crew as Crew;
  }
}

export default CrewService;
