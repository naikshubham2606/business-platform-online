import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  lazy?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Renders an image with graceful fallback handling.
 * - Shows a placeholder icon if src is null/undefined
 * - Shows a placeholder icon if the image fails to load
 * - Lazy-loads by default
 * - Never shows a broken image icon
 */
export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  lazy = true,
  objectFit = 'cover',
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${fallbackClassName || className}`}
        aria-label={alt}
        role="img"
      >
        <ImageOff className="text-gray-400" style={{ width: 40, height: 40 }} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      onError={() => setErrored(true)}
      style={{ objectFit }}
    />
  );
}
