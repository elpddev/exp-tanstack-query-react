import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://vitejs.dev/guide/static-deploy.html#github-pages
  base: "/exp-tanstack-query-react/",
});
