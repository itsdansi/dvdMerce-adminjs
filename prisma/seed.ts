import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

(async function main() {
  try {
    const fakeUsers = await prisma.user.create({
      data: {
        name: "Subash Kharel",
        email: "abc@gmail.com",
        password: "66666666",
      },
    });

    console.log("Create a use with normal role: ", fakeUsers);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
