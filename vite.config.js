import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});

// vite.config.js
// import { defineConfig } from "vite";
// import laravel from "laravel-vite-plugin";
// import vue from "@vitejs/plugin-vue";

// export default defineConfig({
//   plugins: [vue(), laravel(["resources/js/app.js", "resource/scss/app.scss"])],
//   resolve: {
//     alias: {
//       "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
//       "@": "/resources/js",
//     },
//   },
// });
