/**
 * Centralized image URL resolver.
 * Handles local API paths, absolute URLs, and CDN URLs uniformly.
 * Update this single function when the image storage strategy changes.
 */
import { API_BASE_URL } from '@/config/api';

/**
 * Resolves an image path from the API into a fully-qualified URL.
 *
 * Supports:
 *  - Absolute URLs (https://...)         → returned as-is
 *  - Relative paths (/uploads/logo.png)  → prepended with API_BASE_URL
 *  - null / undefined                    → returns null (caller shows fallback)
 */
export function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}
