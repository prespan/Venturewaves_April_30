// pages/api/studios/[id]/partners.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    // Get all organizations the studio has collaborated with through projects
    const projects = await prisma.project.findMany({
      where: {
        collaborators: { some: { studioId: parseInt(id) } }
      },
      include: {
        challenge: {
          select: {
            corporate: { select: { id: true, name: true, logo: true, website: true, description: true } },
            government: { select: { id: true, name: true, logo: true, website: true, description: true } },
            researchOrg: { select: { id: true, name: true, logo: true, website: true, description: true } }
          }
        },
        collaborators: {
          include: {
            investor: { select: { id: true, name: true, logo: true, website: true } },
            corporate: { select: { id: true, name: true, logo: true, website: true } },
            government: { select: { id: true, name: true, logo: true, website: true } }
          }
        }
      }
    });

    const partnersMap = new Map();

    // Collect all unique partners
    projects.forEach(project => {
      // Add challenge owners as partners
      if (project.challenge.corporate) {
        const key = `corporate_${project.challenge.corporate.id}`;
        if (!partnersMap.has(key)) {
          partnersMap.set(key, {
            id: project.challenge.corporate.id,
            name: project.challenge.corporate.name,
            logo: project.challenge.corporate.logo,
            website: project.challenge.corporate.website,
            description: project.challenge.corporate.description,
            type: 'Corporate',
            projectsCount: 0,
            relationship: 'Challenge Partner'
          });
        }
        partnersMap.get(key).projectsCount++;
      }

      if (project.challenge.government) {
        const key = `government_${project.challenge.government.id}`;
        if (!partnersMap.has(key)) {
          partnersMap.set(key, {
            id: project.challenge.government.id,
            name: project.challenge.government.name,
            logo: project.challenge.government.logo,
            website: project.challenge.government.website,
            description: project.challenge.government.description,
            type: 'Government',
            projectsCount: 0,
            relationship: 'Challenge Partner'
          });
        }
        partnersMap.get(key).projectsCount++;
      }

      if (project.challenge.researchOrg) {
        const key = `research_${project.challenge.researchOrg.id}`;
        if (!partnersMap.has(key)) {
          partnersMap.set(key, {
            id: project.challenge.researchOrg.id,
            name: project.challenge.researchOrg.name,
            logo: project.challenge.researchOrg.logo,
            website: project.challenge.researchOrg.website,
            description: project.challenge.researchOrg.description,
            type: 'Research Organization',
            projectsCount: 0,
            relationship: 'Research Partner'
          });
        }
        partnersMap.get(key).projectsCount++;
      }

      // Add investors as partners
      project.collaborators.forEach(collab => {
        if (collab.investor) {
          const key = `investor_${collab.investor.id}`;
          if (!partnersMap.has(key)) {
            partnersMap.set(key, {
              id: collab.investor.id,
              name: collab.investor.name,
              logo: collab.investor.logo,
              website: collab.investor.website,
              type: 'Investor',
              projectsCount: 0,
              relationship: 'Investment Partner'
            });
          }
          partnersMap.get(key).projectsCount++;
        }
      });
    });

    const partners = Array.from(partnersMap.values()).sort((a, b) => b.projectsCount - a.projectsCount);

    console.log(`✨ Formatted ${partners.length} partners for studio ${id}`);

    res.status(200).json({ partners });
  } catch (error) {
    console.error('❌ Studio Partners API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch partners',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}