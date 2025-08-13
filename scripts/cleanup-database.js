const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Configuration - Set to true to actually perform the cleanup
const PERFORM_CLEANUP = true; // Change to true when ready to execute

console.log('🚀 Starting Database Cleanup Script...');
console.log(`Mode: ${PERFORM_CLEANUP ? 'EXECUTION' : 'ANALYSIS ONLY'}`);
console.log('=====================================\n');

async function findOriginalsAndCleanup() {
  try {
    console.log('🔍 Finding original entries and cleaning duplicates...');
    console.log('=====================================================');

    // 1. Find all entries to identify originals vs duplicates
    console.log('\n📊 ANALYZING CURRENT DATABASE:');
    
    const corporates = await prisma.corporate.findMany({ 
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'asc' } // Order by creation date instead of ID
    });
    const governments = await prisma.government.findMany({ 
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    const investors = await prisma.investor.findMany({ 
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    const researchOrgs = await prisma.researchOrganization.findMany({ 
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    const studios = await prisma.studio.findMany({ 
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    
    // Display current entries
    console.log('\nCORPORATES:');
    corporates.forEach(c => console.log(`  ID: ${c.id} | ${c.name} | Created: ${c.createdAt?.toISOString()}`));
    
    console.log('\nGOVERNMENTS:');
    governments.forEach(g => console.log(`  ID: ${g.id} | ${g.name} | Created: ${g.createdAt?.toISOString()}`));
    
    console.log('\nINVESTORS:');
    investors.forEach(i => console.log(`  ID: ${i.id} | ${i.name} | Created: ${i.createdAt?.toISOString()}`));
    
    console.log('\nRESEARCH ORGANIZATIONS:');
    researchOrgs.forEach(r => console.log(`  ID: ${r.id} | ${r.name} | Created: ${r.createdAt?.toISOString()}`));
    
    console.log('\nSTUDIOS:');
    studios.forEach(s => console.log(`  ID: ${s.id} | ${s.name} | Created: ${s.createdAt?.toISOString()}`));

    // 2. Function to find duplicates based on name similarity
    function findDuplicateGroups(entities, nameField = 'name') {
      const groups = [];
      const processed = new Set();
      
      entities.forEach(entity => {
        if (processed.has(entity.id)) return;
        
        const duplicates = entities.filter(e => 
          e.id !== entity.id && 
          !processed.has(e.id) && 
          e[nameField].toLowerCase().includes(entity[nameField].toLowerCase().split(' ')[0]) // Match first word
        );
        
        if (duplicates.length > 0) {
          const group = [entity, ...duplicates].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          groups.push({
            original: group[0],
            duplicates: group.slice(1),
            name: entity[nameField]
          });
          
          group.forEach(e => processed.add(e.id));
        }
      });
      
      return groups;
    }

    // 3. Identify all duplicate groups
    console.log('\n🎯 IDENTIFYING DUPLICATE GROUPS:');
    
    const corporateDuplicates = findDuplicateGroups(corporates);
    const governmentDuplicates = findDuplicateGroups(governments);
    const investorDuplicates = findDuplicateGroups(investors);
    const researchOrgDuplicates = findDuplicateGroups(researchOrgs);
    const studioDuplicates = findDuplicateGroups(studios);

    // Display duplicate analysis
    function displayDuplicateGroup(title, duplicateGroups) {
      console.log(`\n${title}:`);
      if (duplicateGroups.length === 0) {
        console.log('  No duplicates found');
        return;
      }
      
      duplicateGroups.forEach(group => {
        console.log(`  "${group.name}":`);
        console.log(`    ✅ Keep: ID ${group.original.id} (${group.original.createdAt?.toISOString()})`);
        console.log(`    ❌ Delete: ${group.duplicates.map(d => `ID ${d.id}`).join(', ')}`);
      });
    }

    displayDuplicateGroup('CORPORATE DUPLICATES', corporateDuplicates);
    displayDuplicateGroup('GOVERNMENT DUPLICATES', governmentDuplicates);
    displayDuplicateGroup('INVESTOR DUPLICATES', investorDuplicates);
    displayDuplicateGroup('RESEARCH ORG DUPLICATES', researchOrgDuplicates);
    displayDuplicateGroup('STUDIO DUPLICATES', studioDuplicates);

    // 4. Count relationships that will be affected
    console.log('\n🔗 CHECKING RELATIONSHIPS:');
    
    async function countRelationships(duplicateGroups, relationshipQueries) {
      for (const group of duplicateGroups) {
        console.log(`\n"${group.name}" relationships:`);
        for (const [description, query] of relationshipQueries) {
          try {
            const count = await query(group.duplicates.map(d => d.id));
            if (count > 0) {
              console.log(`  ${description}: ${count} records will be updated`);
            }
          } catch (error) {
            console.log(`  ${description}: Error checking - ${error.message}`);
          }
        }
      }
    }

    // Check corporate relationships
    if (corporateDuplicates.length > 0) {
      await countRelationships(corporateDuplicates, [
        ['Challenges', async (ids) => prisma.challenge.count({ where: { corporateId: { in: ids } } })],
        // Add other corporate relationships here if they exist
      ]);
    }

    // Check government relationships
    if (governmentDuplicates.length > 0) {
      await countRelationships(governmentDuplicates, [
        ['Challenges', async (ids) => prisma.challenge.count({ where: { governmentId: { in: ids } } })],
        // Add other government relationships here if they exist
      ]);
    }

    // Check research org relationships
    if (researchOrgDuplicates.length > 0) {
      await countRelationships(researchOrgDuplicates, [
        ['Challenges', async (ids) => prisma.challenge.count({ where: { researchOrgId: { in: ids } } })],
        // Add other research org relationships here if they exist
      ]);
    }

    // Check studio relationships
    if (studioDuplicates.length > 0) {
      await countRelationships(studioDuplicates, [
        ['Proposals', async (ids) => prisma.proposal.count({ where: { studioId: { in: ids } } })],
        // Add other studio relationships here if they exist
      ]);
    }

    // 5. Safety check
    if (!PERFORM_CLEANUP) {
      console.log('\n⚠️  SAFETY MODE - NO CHANGES WILL BE MADE');
      console.log('To proceed with cleanup:');
      console.log('1. Review the analysis above carefully');
      console.log('2. Set PERFORM_CLEANUP = true at the top of this script');
      console.log('3. Run the script again');
      console.log('\n🛑 SCRIPT COMPLETED IN ANALYSIS MODE');
      return;
    }

    // 6. Perform cleanup (only runs if PERFORM_CLEANUP is true)
    console.log('\n🚀 PERFORMING CLEANUP OPERATIONS:');
    
    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Update corporate relationships
      for (const group of corporateDuplicates) {
        if (group.duplicates.length > 0) {
          const challengeUpdate = await tx.challenge.updateMany({
            where: { corporateId: { in: group.duplicates.map(d => d.id) }},
            data: { corporateId: group.original.id }
          });
          console.log(`✅ Updated ${challengeUpdate.count} challenges for ${group.name} (ID ${group.original.id})`);
        }
      }

      // Update government relationships
      for (const group of governmentDuplicates) {
        if (group.duplicates.length > 0) {
          const challengeUpdate = await tx.challenge.updateMany({
            where: { governmentId: { in: group.duplicates.map(d => d.id) }},
            data: { governmentId: group.original.id }
          });
          console.log(`✅ Updated ${challengeUpdate.count} challenges for ${group.name} (ID ${group.original.id})`);
        }
      }

      // Update research org relationships
      for (const group of researchOrgDuplicates) {
        if (group.duplicates.length > 0) {
          const challengeUpdate = await tx.challenge.updateMany({
            where: { researchOrgId: { in: group.duplicates.map(d => d.id) }},
            data: { researchOrgId: group.original.id }
          });
          console.log(`✅ Updated ${challengeUpdate.count} challenges for ${group.name} (ID ${group.original.id})`);
        }
      }

      // Update studio relationships
      for (const group of studioDuplicates) {
        if (group.duplicates.length > 0) {
          const proposalUpdate = await tx.proposal.updateMany({
            where: { studioId: { in: group.duplicates.map(d => d.id) }},
            data: { studioId: group.original.id }
          });
          console.log(`✅ Updated ${proposalUpdate.count} proposals for ${group.name} (ID ${group.original.id})`);
        }
      }

      // Delete duplicates
      console.log('\n🗑️ DELETING DUPLICATES:');
      
      for (const group of corporateDuplicates) {
        if (group.duplicates.length > 0) {
          const deletion = await tx.corporate.deleteMany({
            where: { id: { in: group.duplicates.map(d => d.id) }}
          });
          console.log(`✅ Deleted ${deletion.count} duplicate ${group.name} entries`);
        }
      }

      for (const group of governmentDuplicates) {
        if (group.duplicates.length > 0) {
          const deletion = await tx.government.deleteMany({
            where: { id: { in: group.duplicates.map(d => d.id) }}
          });
          console.log(`✅ Deleted ${deletion.count} duplicate ${group.name} entries`);
        }
      }

      for (const group of investorDuplicates) {
        if (group.duplicates.length > 0) {
          const deletion = await tx.investor.deleteMany({
            where: { id: { in: group.duplicates.map(d => d.id) }}
          });
          console.log(`✅ Deleted ${deletion.count} duplicate ${group.name} entries`);
        }
      }

      for (const group of researchOrgDuplicates) {
        if (group.duplicates.length > 0) {
          const deletion = await tx.researchOrganization.deleteMany({
            where: { id: { in: group.duplicates.map(d => d.id) }}
          });
          console.log(`✅ Deleted ${deletion.count} duplicate ${group.name} entries`);
        }
      }

      for (const group of studioDuplicates) {
        if (group.duplicates.length > 0) {
          const deletion = await tx.studio.deleteMany({
            where: { id: { in: group.duplicates.map(d => d.id) }}
          });
          console.log(`✅ Deleted ${deletion.count} duplicate ${group.name} entries`);
        }
      }
    });

    console.log('\n🎉 CLEANUP COMPLETED SUCCESSFULLY!');
    console.log('Clean dashboard URLs:');
    
    corporateDuplicates.forEach(group => 
      console.log(`• Corporate (${group.name}): /dashboard/corporate?id=${group.original.id}`)
    );
    governmentDuplicates.forEach(group => 
      console.log(`• Government (${group.name}): /dashboard/government?id=${group.original.id}`)
    );
    investorDuplicates.forEach(group => 
      console.log(`• Investor (${group.name}): /dashboard/investor?id=${group.original.id}`)
    );
    researchOrgDuplicates.forEach(group => 
      console.log(`• Research Org (${group.name}): /dashboard/research?id=${group.original.id}`)
    );
    studioDuplicates.forEach(group => 
      console.log(`• Studio (${group.name}): /dashboard/studio?id=${group.original.id}`)
    );

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup function
findOriginalsAndCleanup();