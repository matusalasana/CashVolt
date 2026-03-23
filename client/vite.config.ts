

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()]
});


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path based on your folder structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
