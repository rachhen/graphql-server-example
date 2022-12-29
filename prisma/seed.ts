import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.client.upsert({
    where: { email: "ironman@gmail.com" },
    update: {},
    create: {
      name: "Tony Stark",
      email: "ironman@gmail.com",
      phone: "343-567-4333",
      project: {
        create: {
          name: "eCommerce Website",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
          status: "In Progress",
        },
      },
    },
  });
  await prisma.client.upsert({
    where: { email: "blackwidow@gmail.com" },
    update: {},
    create: {
      name: "Natasha Romanova",
      email: "blackwidow@gmail.com",
      phone: "223-567-3322",
      project: {
        create: {
          name: "Dating App",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
          status: "In Progress",
        },
      },
    },
  });
  await prisma.client.upsert({
    where: { email: "thor@gmail.com" },
    update: {},
    create: {
      name: "Thor Odinson",
      email: "thor@gmail.com",
      phone: "324-331-4333",
      project: {
        create: {
          name: "SEO Project",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
          status: "In Progress",
        },
      },
    },
  });
  await prisma.client.upsert({
    where: { email: "steve@gmail.com" },
    update: {},
    create: {
      name: "Steve Rogers",
      email: "steve@gmail.com",
      phone: "344-562-6787",
      project: {
        create: {
          name: "Design Prototype",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
          status: "Done",
        },
      },
    },
  });
  await prisma.client.upsert({
    where: { email: "bruce@gmail.com" },
    update: {},
    create: {
      name: "Bruce Banner",
      email: "bruce@gmail.com",
      phone: "321-468-8887",
      project: {
        create: {
          name: "Auction Website",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
          status: "In Progress",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
