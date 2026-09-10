import {
  Leaf,
  TreePine,
  ShieldCheck,
  HeartHandshake,
  Award,
  Clock,
  Star,
  Users,
  Sprout,
  CheckCircle,
  Sun,
  Droplets,
  Flower2,
  Shovel,
  Wind,
  Wrench,
  ThumbsUp,
  MapPin,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  tree: TreePine,
  'shield-check': ShieldCheck,
  'heart-handshake': HeartHandshake,
  award: Award,
  clock: Clock,
  star: Star,
  users: Users,
  sprout: Sprout,
  'check-circle': CheckCircle,
  sun: Sun,
  droplets: Droplets,
  flower: Flower2,
  shovel: Shovel,
  wind: Wind,
  wrench: Wrench,
  'thumbs-up': ThumbsUp,
  'map-pin': MapPin,
  'trending-up': TrendingUp,
  briefcase: Briefcase,
};

interface DynamicIconProps {
  name: string | null;
  className?: string;
  style?: React.CSSProperties;
}

export function DynamicIcon({ name, className, style }: DynamicIconProps) {
  const IconComponent = name && iconMap[name.toLowerCase()] ? iconMap[name.toLowerCase()] : CheckCircle;

  return <IconComponent className={className} style={style} aria-hidden="true" />;
}
