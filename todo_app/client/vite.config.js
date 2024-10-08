import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   server: {
//     port: 3000, // You can specify the port
//   },
  build: {
    outDir:'../server/todo_server/todo_app/templates', // Customize build output directory
  },
});
