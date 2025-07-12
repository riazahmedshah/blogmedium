import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ui':path.resolve(__dirname, './src/components/ui'),
      '@modules':path.resolve(__dirname,'./src/modules'),
      '@schemas':path.resolve(__dirname, './src/schemas'),
    },
  },
});


