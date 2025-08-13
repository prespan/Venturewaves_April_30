const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixFoundersFactoryId2() {
  try {
    console.log('🔧 Creating Founders Factory with ID 2 (Fixed)...');
    console.log('===============================================');

    // Check if ID 2 exists
    const existingId2 = await prisma.studio.findUnique({
      where: { id: 2 }
    });

    if (existingId2) {
      console.log('✅ ID 2 already exists with:', existingId2.name);
      console.log('Dashboard URL: /dashboard/studio?id=2');
      return;
    }

    // Insert with ID 2 using the correct columns (without updatedAt)
    console.log('🚀 Creating Founders Factory with ID 2...');
    
    await prisma.$executeRaw`
      INSERT INTO "Studio" (id, name, website, address, description, "keyStartups", logo, "createdAt")
      VALUES (2, 'Founders Factory', 'https://foundersfactory.com', 'UK', 
              'Corporate-backed venture studio and accelerator.', '[]'::jsonb, 
              NULL, '2025-05-13T02:16:23.000Z'::timestamp)
    `;

    console.log('✅ Successfully created Founders Factory with ID 2!');

    // Verify the result
    const verifyRecord = await prisma.studio.findUnique({
      where: { id: 2 }
    });

    if (verifyRecord) {
      console.log('\n🎉 SUCCESS! Founders Factory is now at ID 2');
      console.log(`   Name: ${verifyRecord.name}`);
      console.log(`   Website: ${verifyRecord.website}`);
      console.log(`   Created: ${verifyRecord.createdAt?.toISOString()}`);
      console.log('\n✅ Dashboard URL: /dashboard/studio?id=2');
    }

    // Show updated studio list
    console.log('\n📊 Updated studios list:');
    const allStudios = await prisma.studio.findMany({
      select: { id: true, name: true },
      orderBy: { id: 'asc' }
    });
    
    allStudios.forEach(s => {
      const marker = s.id === 2 ? ' ⭐ RESTORED TO ID 2' : '';
      console.log(`  ID: ${s.id} | ${s.name}${marker}`);
    });

  } catch (error) {
    console.error('❌ Error creating ID 2:', error.message);
    
    if (error.message.includes('duplicate key')) {
      console.log('\n💡 ID 2 already exists. Checking what\'s there...');
      
      try {
        const existing = await prisma.studio.findUnique({ where: { id: 2 } });
        if (existing) {
          console.log(`   Found: ${existing.name}`);
          console.log('   Dashboard URL: /dashboard/studio?id=2');
        }
      } catch (checkError) {
        console.log('   Could not check existing record');
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixFoundersFactoryId2();