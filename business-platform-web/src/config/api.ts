/**
 * Centralized API configuration.
 *
 * LOCAL DEVELOPMENT (npm run dev):
 *   VITE_API_BASE_URL is intentionally empty.
 *   The Vite dev proxy in vite.config.ts forwards /api/* requests
 *   to https://localhost:44350 server-side, bypassing browser CORS.
 *   API_BASE_URL = '' → endpoint paths like '/api/public/...' are relative
 *   to the Vite dev server origin, which the proxy intercepts.
 *
 * PRODUCTION / STAGING:
 *   Set VITE_API_BASE_URL=https://api.yourdomain.com in the environment.
 *   The backend must have CORS configured for the frontend origin.
 *   See vite.config.ts for the required backend CORS setup.
 *
 * NEVER hard-code 'https://localhost:44350' (or any API host)
 * inside components or services — always use API_ENDPOINTS below.
 */
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

export const API_ENDPOINTS = {
  PUBLIC: {
    BUSINESS_PROFILE: `${API_BASE_URL}/api/public/business-profile`,
    BRANDING:         `${API_BASE_URL}/api/public/branding`,
    CONTACT:          `${API_BASE_URL}/api/public/contact`,
  },
} as const;

export { API_BASE_URL };
