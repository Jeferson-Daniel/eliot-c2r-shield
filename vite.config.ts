import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redireciona o entry point do servidor do TanStack Start para src/server.ts (SSR error wrapper)
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
