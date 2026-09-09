/**
 * TEMPORARY demo project/gallery data.
 *
 * These items are isolated here so they can be replaced with
 * GET /api/public/projects responses without modifying components.
 * The ProjectItem interface is designed to match a future ProjectDto.
 *
 * DO NOT scatter these values into multiple components.
 */

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Unsplash landscape images — temporary visual stand-ins */
  imageUrl: string;
}

/** @temporary — replace with API data when projects endpoint is available */
export const TEMP_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Modern Garden Transformation',
    category: 'Landscape Design',
    description:
      'A complete backyard redesign featuring native plantings, defined pathways, and a central entertaining lawn.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70',
  },
  {
    id: 'proj-2',
    title: 'Lush Lawn Restoration',
    category: 'Lawn Care',
    description:
      'Revitalised a tired suburban lawn through scarification, overseeding, and a tailored fertilisation programme.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=70',
  },
  {
    id: 'proj-3',
    title: 'Native Garden Installation',
    category: 'Gardening',
    description:
      'A drought-tolerant native garden designed to attract local wildlife and reduce ongoing maintenance requirements.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&auto=format&fit=crop&q=70',
  },
  {
    id: 'proj-4',
    title: 'Commercial Streetscape',
    category: 'Commercial Landscaping',
    description:
      'Large-scale commercial planting and landscaping for a mixed-use development entrance and common areas.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=70',
  },
  {
    id: 'proj-5',
    title: 'Courtyard Garden Design',
    category: 'Landscape Design',
    description:
      'A compact inner-city courtyard transformed into a private green sanctuary with raised beds and vertical planting.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=70',
  },
];
