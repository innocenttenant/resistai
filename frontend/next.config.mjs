import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      // Pin tailwindcss resolution to THIS project's node_modules.
      // Without this, Turbopack walks up from the CSS file's directory
      // and exits the frontend/ folder before finding node_modules.
      tailwindcss: path.join(__dirname, 'node_modules/tailwindcss'),
    },
  },
};

export default nextConfig;
