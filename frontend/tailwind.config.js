/**
 * Tailwind v4 is configured mainly in CSS (src/index.css). This file is loaded
 * from there with `@config` and is the place for theme extensions.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
