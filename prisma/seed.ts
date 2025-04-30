import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Seed studios
  await prisma.studio.createMany({
    data: [
      { name: "Antler", website: "https://antler.co", address: "Singapore", description: "Global early-stage VC and startup generator.", keyStartups: "Airalo, Reebelo", logo: "/logos/antler.png" },
      { name: "Founders Factory", website: "https://foundersfactory.com", address: "UK", description: "Startup studio partnered with corporates.", keyStartups: "Zebra Health, Vidsy", logo: "/logos/foundersfactory.png" },
      // ... (you can continue adding your full studio preload data here)
    ]
  })

  // Seed corporates
  await prisma.corporate.createMany({
    data: [
      { name: "Siemens", website: "https://www.siemens.com", address: "Germany", industryTags: "Mobility, Energy", description: "Global leader in electrification, automation, digitalization.", notableProducts: "Smart Grid, Mobility Platform", logo: "/logos/siemens.png" },
      // Add more corporates...
    ]
  })

  // (Add governments, research organizations, investors similarly...)

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })

