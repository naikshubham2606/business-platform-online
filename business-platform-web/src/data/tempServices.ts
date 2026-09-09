/**
 * TEMPORARY demo service data.
 *
 * This data is intentionally isolated here so it can be replaced
 * with a real API call (e.g. GET /api/public/services) without
 * modifying any home page components. Simply swap the import.
 *
 * DO NOT scatter these values into multiple components.
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  highlight?: boolean;
}

/** @temporary — replace with API data when services endpoint is available */
export const TEMP_SERVICES: ServiceItem[] = [
  {
    id: 'landscaping',
    title: 'Landscaping',
    description:
      'Transform your outdoor space with expert landscape design and installation tailored to your property.',
    icon: 'Trees',
    highlight: true,
  },
  {
    id: 'lawn-care',
    title: 'Lawn Care',
    description:
      'Regular mowing, edging, fertilisation, and seasonal treatments to keep your lawn lush and healthy.',
    icon: 'Leaf',
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    description:
      'Ongoing care for garden beds, pruning, weeding, mulching, and planting to keep your garden thriving.',
    icon: 'Flower2',
  },
  {
    id: 'landscape-design',
    title: 'Landscape Design',
    description:
      'Professional design plans that balance aesthetics, functionality, and long-term sustainability.',
    icon: 'Pencil',
  },
  {
    id: 'irrigation',
    title: 'Irrigation Systems',
    description:
      'Smart irrigation installation and maintenance to conserve water and keep your garden nourished.',
    icon: 'Droplets',
  },
  {
    id: 'cleanup',
    title: 'Seasonal Cleanup',
    description:
      'Spring and autumn clean-ups including leaf removal, pruning, and preparing your garden for each season.',
    icon: 'Wind',
  },
];
