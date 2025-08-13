const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restoreFoundersFactory() {
  try {
    console.log('🔧 Restoring Founders Factory record...');
    console.log('=====================================');

    // Check if ID 2 already exists
    const existingRecord = await prisma.studio.findUnique({
      where: { id: 2 }
    });

    if (existingRecord) {
      console.log('⚠️  Record with ID 2 already exists:');
      console.log(`   Name: ${existingRecord.name}`);
      console.log('   No action needed.');
      return;
    }

    console.log('✅ Confirmed: ID 2 (Founders Factory) is missing and needs to be restored.');

    // First, let's check what the highest ID is
    const maxStudio = await prisma.studio.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    
    console.log(`📊 Current highest studio ID: ${maxStudio?.id || 'none'}`);

    // Create the record without specifying ID (let Prisma auto-generate)
    console.log('\n🚀 Creating Founders Factory record...');
    
    const restoredRecord = await prisma.studio.create({
      data: {
        name: 'Founders Factory',
        website: 'https://foundersfactory.com',
        address: 'UK',
        description: 'Corporate-backed venture studio and accelerator.',
        keyStartups: [],
        logo: null, // Optional field
        createdAt: new Date('2025-05-13T02:16:23.000Z')
      }
    });

    console.log('✅ Successfully created Founders Factory!');
    console.log(`   ID: ${restoredRecord.id} (auto-generated)`);
    console.log(`   Name: ${restoredRecord.name}`);
    console.log(`   Website: ${restoredRecord.website}`);

    // Now we need to handle the ID 2 issue
    if (restoredRecord.id !== 2) {
      console.log('\n🔄 The record was created with a different ID than expected.');
      console.log(`   Created with ID: ${restoredRecord.id}`);
      console.log(`   Expected ID: 2`);
      console.log('\n📋 Options:');
      console.log('   1. Keep the new ID and update any references that expect ID 2');
      console.log('   2. Use database-level commands to change the ID to 2');
      console.log('   3. Delete and recreate with proper ID sequence management');
      
      // For now, let's update the dashboard URL to use the correct ID
      console.log(`\n✅ Founders Factory restored successfully!`);
      console.log(`Dashboard URL: /dashboard/studio?id=${restoredRecord.id}`);
      console.log(`\n⚠️  Note: Update any hardcoded references from ID 2 to ID ${restoredRecord.id}`);
    } else {
      console.log('\n🎉 Perfect! Founders Factory restored with the correct ID 2!');
      console.log('Dashboard URL: /dashboard/studio?id=2');
    }

    // Verify the restoration by showing all studios
    console.log('\n📊 Current studios:');
    const allStudios = await prisma.studio.findMany({
      select: { id: true, name: true },
      orderBy: { id: 'asc' }
    });
    
    allStudios.forEach(s => {
      const marker = s.name === 'Founders Factory' ? ' ⭐ RESTORED' : '';
      console.log(`  ID: ${s.id} | ${s.name}${marker}`);
    });

  } catch (error) {
    console.error('❌ Error restoring Founders Factory:', error);
    
    // Provide helpful guidance based on the error
    if (error.message.includes('Unique constraint')) {
      console.log('\n💡 Tip: A record with this data might already exist.');
    } else if (error.message.includes('Unknown argument')) {
      console.log('\n💡 Tip: Check the Prisma schema for available fields.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the restoration
restoreFoundersFactory();