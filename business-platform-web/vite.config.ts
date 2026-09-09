import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/**
 * VITE DEV PROXY — CORS WORKAROUND FOR LOCAL DEVELOPMENT
 * -------------------------------------------------------
 * The backend at https://localhost:44350 does not include CORS headers,
 * so the browser blocks cross-origin fetch requests from http://localhost:5173.
 *
 * The proxy rewrites /api/* requests:
 *   Browser → http://localhost:5173/api/... (same origin, no CORS check)
 *   Vite dev server → https://localhost:44350/api/... (server-to-server, no CORS)
 *
 * This means VITE_API_BASE_URL must be empty in development so that
 * API calls go to the same Vite origin (/api/...) rather than the
 * backend URL directly.
 *
 * NOTE FOR PRODUCTION / STAGING:
 * The backend must add CORS middleware in Program.cs, for example:
 *
 *   builder.Services.AddCors(options =>
 *   {
 *       options.AddPolicy("AllowFrontend", policy =>
 *           policy.WithOrigins("https://your-frontend-domain.com")
 *                 .AllowAnyMethod()
 *                 .AllowAnyHeader());
 *   });
 *   // and in the pipeline:
 *   app.UseCors("AllowFrontend");
 *
 * For development with the proxy active, no backend change is required.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:44350',
        changeOrigin: true,
        secure: false, // accept self-signed dev certificate
      },
    },
  },
})