// pages/api/partner-details/[id].ts
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid partner ID' });
  }

  try {
    let partner: any = null;
    let partnerType = '';

    // Try Studio first
    partner = await prisma.studio.findUnique({
      where: { id: parseInt(id) },
      include: {
        proposals: {
          include: {
            challenge: {
              select: {
                id: true,
                title: true,
                corporate: { select: { name: true } },
                government: { select: { name: true } },
                researchOrg: { select: { name: true } }
              }
            }
          }
        },
        collaborators: {
          include: {
            project: {
              select: {
                id: true,
                investment: true,
                challenge: {
                  select: {
                    id: true,
                    title: true,
                    corporate: { select: { name: true } },
                    government: { select: { name: true } },
                    researchOrg: { select: { name: true } }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (partner) {
      partnerType = 'Studio';
    }

    // If not found in Studio, try Investor
    if (!partner) {
      partner = await prisma.investor.findUnique({
        where: { id: parseInt(id) }
      });
      if (partner) {
        partnerType = 'Investor';
      }
    }

    // If still not found, try ResearchOrganization
    if (!partner) {
      partner = await prisma.researchOrganization.findUnique({
        where: { id: parseInt(id) },
        include: {
          challenges: true
        }
      });
      if (partner) {
        partnerType = 'Research Organization';
      }
    }

    // If still not found, try Government
    if (!partner) {
      partner = await prisma.government.findUnique({
        where: { id: parseInt(id) },
        include: {
          challenges: true
        }
      });
      if (partner) {
        partnerType = 'Government';
      }
    }

    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    // Safely format the partner data - handle missing fields
    let formattedPartner: any = {
      id: partner.id,
      name: partner.name || 'Unknown',
      description: partner.description || 'No description available',
      address: partner.address || 'Address not provided',
      website: partner.website || '',
      type: partnerType,
      createdAt: partner.createdAt ? partner.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    };

    // Add type-specific data with safe access
    if (partnerType === 'Studio') {
      formattedPartner = {
        ...formattedPartner,
        keyStartups: partner.keyStartups || {},
        
        // Proposals and projects with safe access
        proposals: (partner.proposals || []).map((proposal: any) => ({
          id: proposal.id,
          title: proposal.title || 'Untitled',
          status: proposal.status || 'Unknown',
          challengeTitle: proposal.challenge?.title || 'Unknown Challenge',
          challengeOrganization: proposal.challenge?.corporate?.name || 
                                proposal.challenge?.government?.name || 
                                proposal.challenge?.researchOrg?.name || 'Unknown Organization',
          submittedAt: proposal.submittedAt ? proposal.submittedAt.toISOString().split('T')[0] : 'Unknown'
        })),
        
        projects: (partner.collaborators || []).map((collab: any) => ({
          id: collab.project?.id || 0,
          investment: collab.project?.investment || 0,
          role: collab.role || 'Unknown',
          challengeTitle: collab.project?.challenge?.title || 'Unknown Challenge',
          challengeOrganization: collab.project?.challenge?.corporate?.name || 
                                collab.project?.challenge?.government?.name || 
                                collab.project?.challenge?.researchOrg?.name || 'Unknown Organization',
          invitedAt: collab.invitedAt ? collab.invitedAt.toISOString().split('T')[0] : 'Unknown'
        })),
        
        // Statistics with safe calculations
        totalProposals: (partner.proposals || []).length,
        activeProjects: (partner.collaborators || []).length,
        averageProjectValue: (partner.collaborators || []).length > 0 ? 
          (partner.collaborators || []).reduce((sum: number, c: any) => sum + (c.project?.investment || 0), 0) / (partner.collaborators || []).length : 0
      };
    } else if (partnerType === 'Investor') {
      formattedPartner = {
        ...formattedPartner,
        focus: partner.focus || {},
        notableInvestments: partner.notableInvestments || {},
        
        // Add investor-specific metrics here
        totalInvestments: 0,
        activeInvestments: 0,
        averageInvestment: 0
      };
    } else if (partnerType === 'Research Organization') {
      formattedPartner = {
        ...formattedPartner,
        focusDomains: partner.focusDomains || {},
        
        challenges: (partner.challenges || []).map((challenge: any) => ({
          id: challenge.id,
          title: challenge.title || 'Untitled',
          hasProposals: challenge.hasProposals || false,
          projectLinked: challenge.projectLinked || false
        })),
        
        totalChallenges: (partner.challenges || []).length,
        activeChallenges: (partner.challenges || []).filter((c: any) => !c.projectLinked).length
      };
    } else if (partnerType === 'Government') {
      formattedPartner = {
        ...formattedPartner,
        focusAreas: partner.focusAreas || {},
        
        challenges: (partner.challenges || []).map((challenge: any) => ({
          id: challenge.id,
          title: challenge.title || 'Untitled',
          hasProposals: challenge.hasProposals || false,
          projectLinked: challenge.projectLinked || false
        })),
        
        totalChallenges: (partner.challenges || []).length,
        activeChallenges: (partner.challenges || []).filter((c: any) => !c.projectLinked).length
      };
    }

    console.log(`🤝 Fetched partner details for ID ${id}:`, formattedPartner.name, `(${partnerType})`);

    res.status(200).json(formattedPartner);
  } catch (error) {
    console.error('❌ Partner Detail API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch partner details',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}