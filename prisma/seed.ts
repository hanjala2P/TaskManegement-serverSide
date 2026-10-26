import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin12345", 10);

  const admin = await prisma.user.upsert({
    where: { email: "superadmin@gmail.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Seed admin created successfully: ", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });