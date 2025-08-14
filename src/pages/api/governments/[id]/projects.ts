// pages/api/governments/[id]/projects.ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// Define types for better TypeScript support
interface MilestonePhase {
  name: string;
  completed?: boolean;
}

interface ProjectMilestones {
  phases?: MilestonePhase[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  try {
    const projects = await prisma.project.findMany({
      where: { challenge: { governmentId: parseInt(id) } },
      include: {
        challenge: {
          select: {
            title: true
          }
        },
        proposal: {
          select: {
            title: true
          }
        },
        collaborators: {
          include: {
            studio: true,
            corporate: true,
            government: true,
            investor: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform to match your dashboard's expected format
    const formattedProjects = projects.map((project, index) => {
      // Type guard for milestones
      const milestones = project.milestones as ProjectMilestones | null;
      const milestoneNames = Array.isArray(milestones?.phases) 
        ? milestones.phases.map((phase: MilestonePhase) => phase.name)
        : ["Planning", "Development", "Implementation"]; // fallback

      return {
        id: project.id,
        investment: project.investment,
        challenge: {
          title: project.challenge?.title || 'Unknown Challenge'
        },
        proposal: {
          title: project.proposal?.title || 'Unknown Proposal'
        },
        milestones: milestoneNames,
        // Generate demo values for fields you don't have
        progress: Math.floor(Math.random() * 80) + 10, // Random 10-90%
        status: index % 2 === 0 ? "In Progress" : "On Track",
        collaborators: project.collaborators.map(collab => ({
          name: collab.studio?.name || collab.corporate?.name || collab.government?.name || collab.investor?.name || 'Unknown',
          role: collab.role,
          type: collab.studioId ? 'studio' as const :
                 collab.corporateId ? 'corporate' as const :
                 collab.governmentId ? 'government' as const : 'investor' as const
        }))
      };
    });

    res.status(200).json({ projects: formattedProjects });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch projects',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}