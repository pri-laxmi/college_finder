import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 250000,
        rating: 4.8,
        placements: "Average package ₹20 LPA",
        overview: "Top engineering institute in India.",
        averagePackage: 2000000,
      },
      {
        name: "BITS Pilani",
        location: "Rajasthan",
        fees: 500000,
        rating: 4.7,
        placements: "Average package ₹18 LPA",
        overview: "Highly reputed private engineering college.",
        averagePackage: 1800000,
      },
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 180000,
        rating: 4.6,
        placements: "Average package ₹15 LPA",
        overview: "Top NIT with excellent placements.",
        averagePackage: 1500000,
      },
      {
        name: "VIT Vellore",
        location: "Tamil Nadu",
        fees: 300000,
        rating: 4.3,
        placements: "Average package ₹10 LPA",
        overview: "Popular private engineering university.",
        averagePackage: 1000000,
      },
      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 350000,
        rating: 4.7,
        placements: "Average package ₹22 LPA",
        overview: "Excellent research-focused institute.",
        averagePackage: 2200000,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });