import type { Config } from 'tailwindcss';

// Settlix: neo-brutalist. White field, ink outlines, hard offset shadows, and
// flat blocks of color that each mean one thing:
//   violet = action / open money, lime = settled, sun = waiting, coral = problem, sky = info.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0F',
        field: '#FFFFFF',
        fog: '#EEEEF3',
        violet: { DEFAULT: '#5B2EFF', deep: '#3D17D6', soft: '#E4DCFF' },
        lime: { DEFAULT: '#C6F432', soft: '#F1FDCB' },
        sun: { DEFAULT: '#FFD23F', soft: '#FFF4CC' },
        coral: { DEFAULT: '#FF5B3A', soft: '#FFE1DA' },
        sky: { DEFAULT: '#9AD8FF', soft: '#E3F4FF' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        hard: '5px 5px 0 0 #0B0B0F',
        'hard-sm': '3px 3px 0 0 #0B0B0F',
        'hard-lg': '9px 9px 0 0 #0B0B0F',
      },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pop: { '0%': { transform: 'scale(0.9)', opacity: '0' }, '60%': { transform: 'scale(1.03)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        pop: 'pop 420ms cubic-bezier(.2,.9,.3,1.2) both',
        wiggle: 'wiggle 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
