import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: 'localhost',
    port: 3000,
  },
});
