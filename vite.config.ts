import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      "/test": "http://192.168.0.117:8000/",
      "/api": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/ws": {
      //   target: "ws://192.168.0.117:8000/ws",
      //   ws: true,
      // },
    },
  },
});
