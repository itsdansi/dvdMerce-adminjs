import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  static async updateAdminStatus(
    userId: number,
    updatedStatus: boolean
  ): Promise<boolean> {
    console.log(userId);
    // console.log(updateStatus);

    const updateStatus = await prisma.user.update({
      where: {id: userId},
      data: {isAdmin: updatedStatus},
    });

    console.log(updateStatus);

    return updateStatus as any;
  }
}

export default UserService;
