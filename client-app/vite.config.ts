import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(
    "Started with >>>\n",
    `COMMAND: \x1b[34m${command}\x1b[0m\n`,
    `MODE: \x1b[34m${mode}\x1b[0m`
  );
  return {
    plugins: [react()],
    preview: {
      port: 3001,
      strictPort: true,
    },
    server: {
      port: 3001,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:3001",
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
