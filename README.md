# Premium Portfolio (React + Vite)

A modern, animated, multi-page portfolio for **Md Mahabub Alam** with premium UI and recruiter/client-focused structure.

## Features

- Multi-page React architecture with `react-router-dom`
- Dark/light/navy themes + language toggle + sound toggle
- Framer Motion + GSAP animations
- Glassmorphism + neumorphism styling
- Project filtering + modal details
- Skills charts (radar + bar via Recharts)
- Auto-sliding testimonials
- Blog search/filter
- Contact form validation + mail integration
- AI portfolio assistant widget
- Visitor counter + cursor trail + hidden easter egg
- Responsive and deploy-ready with Vite

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Replace Before Production

- `public/resume.pdf` with your real CV PDF
- Project/demo links in `src/data/content.js`
- Chat assistant responses in `src/components/ChatWidget.jsx`
- Real backend/email service if needed
