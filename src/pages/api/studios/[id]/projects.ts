// pages/api/studios/[id]/projects.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const projects = await prisma.project.findMany({
      where: {
        collaborators: {
          some: {
            studioId: parseInt(id)
          }
        }
      },
      include: {
        challenge: {
          select: {
            title: true,
            id: true,
            description: true,
            corporateId: true,
            governmentId: true,
            researchOrgId: true,
            corporate: {
              select: { name: true }
            },
            government: {
              select: { name: true }
            },
            researchOrg: {
              select: { name: true }
            }
          }
        },
        proposal: {
          select: {
            title: true,
            id: true,
            status: true
          }
        },
        collaborators: {
          include: {
            studio: {
              select: { name: true }
            },
            corporate: {
              select: { name: true }
            },
            government: {
              select: { name: true }
            },
            investor: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match dashboard expected format
    const formattedProjects = projects.map(project => {
      // Determine challenge owner
      const challengeOwner = project.challenge.corporate?.name || 
                           project.challenge.government?.name || 
                           project.challenge.researchOrg?.name || 
                           'Unknown';

      // Get collaborator names
      const collaboratorNames = project.collaborators.map(collab => 
        collab.studio?.name || 
        collab.corporate?.name || 
        collab.government?.name || 
        collab.investor?.name || 
        'Unknown'
      ).filter((name, index, self) => self.indexOf(name) === index); // Remove duplicates

      // Calculate progress (mock data based on milestones)
      const totalMilestones = Array.isArray(project.milestones) ? project.milestones.length : 0;
      const completedMilestones = Math.floor(totalMilestones * Math.random() * 0.7); // Random progress 0-70%
      const progress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

      return {
        id: project.id,
        title: project.proposal.title,
        challenge: {
          title: project.challenge.title,
          id: project.challenge.id,
          owner: challengeOwner,
          description: project.challenge.description
        },
        proposal: {
          title: project.proposal.title,
          id: project.proposal.id,
          status: project.proposal.status
        },
        investment: project.investment,
        milestones: project.milestones,
        progress: progress,
        collaborators: collaboratorNames,
        createdAt: project.createdAt.toISOString().split('T')[0],
        status: progress >= 100 ? 'Completed' : progress >= 50 ? 'Active' : 'Starting'
      };
    });

    console.log(`✨ Formatted ${formattedProjects.length} projects for studio ${id}`);

    res.status(200).json({ projects: formattedProjects });
  } catch (error) {
    console.error('❌ Studio Projects API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch projects',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}