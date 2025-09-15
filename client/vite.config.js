import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".", // client folder root
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/login/login.html"),
        home: resolve(__dirname, "src/pages/home/home.html"),
        createRoom: resolve(__dirname, "src/pages/create-room/create.html"),
        joinRoom: resolve(__dirname, "src/pages/join-room/join.html"),
      },
    },
  },
});