import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--color-primary-dark)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'dark': 'var(--color-dark)',
        'light': 'var(--color-light)',
        'backdrop': 'var(--color-backdrop)',
        'neutral': 'var(--color-neutral)',
        'card': 'var(--color-card)',
        'neutral-dark': 'var(--color-neutral-dark)',
        'backdrop-dark': 'var(--color-backdrop-dark)',
        'light-dark': 'var(--color-light-dark)',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: { 
          "primary": "var(--color-primary)",
          "secondary": "var(--color-secondary)",
          "accent": "var(--color-accent)",
          "neutral": "var(--color-neutral)",
          "neutral-dark": "var(--color-neutral-dark)",
          "base-100": "var(--color-base-100)",
          "info": "var(--color-info)",
          "success": "var(--color-success)",
          "warning": "var(--color-warning)",
          "error": "var(--color-error)",
          "card": "var(--color-card)",
          "backdrop-dark": "var(--color-backdrop-dark)",
          "light-dark": "var(--color-light-dark)",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};

export default config;
