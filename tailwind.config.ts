import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['var(--font-jakarta-sans)', 'sans'],
        satoshi: ['var(--font-satoshi)', 'sans'],
      },
    },
  },
};

export default config;