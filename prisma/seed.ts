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
      },
      {
        name: "BITS Pilani",
        location: "Rajasthan",
        fees: 500000,
        rating: 4.7,
        placements: "Average package ₹18 LPA",
        overview: "Highly reputed private engineering college.",
      },
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 180000,
        rating: 4.6,
        placements: "Average package ₹15 LPA",
        overview: "Top NIT with excellent placements.",
      },
      {
        name: "VIT Vellore",
        location: "Tamil Nadu",
        fees: 300000,
        rating: 4.3,
        placements: "Average package ₹10 LPA",
        overview: "Popular private engineering university.",
      },
      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 350000,
        rating: 4.7,
        placements: "Average package ₹22 LPA",
        overview: "Excellent research-focused institute.",
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