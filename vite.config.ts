import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
  },
  esbuild: {
    jsxFactory: `jsx`,
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  plugins: [tsconfigPaths()],
  optimizeDeps: {
    include: ["@emotion/react"],
  },
});
