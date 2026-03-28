# ResumeForge AI Frontend

Production-quality AI Resume Maker frontend built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, and Zod.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- next-themes

## Pages

- `/` Landing page with premium storytelling sections, sticky blur navbar, gradient hero, reveal animations, parallax depth, feature cards, template previews, and footer.
- `/dashboard` Sidebar dashboard with collapsible navigation, animated resume cards, CTA panel, and skeleton loading state.
- `/builder` Multi-step resume builder with RHF + Zod, stepper transitions, floating labels, auto-save feedback, AI improve button animation, and lazy-loaded real-time preview panel with template switching.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
  layout.tsx
  globals.css
  page.tsx
  dashboard/page.tsx
  builder/page.tsx
components/
  providers/
    app-providers.tsx
    page-transition.tsx
    theme-provider.tsx
  ui/
    button.tsx
    floating-input.tsx
    floating-textarea.tsx
    parallax-panel.tsx
    reveal.tsx
    section-heading.tsx
    skeleton.tsx
    theme-toggle.tsx
  layout/
    main-footer.tsx
    main-navbar.tsx
  landing/
    hero-section.tsx
    features-section.tsx
    story-section.tsx
    templates-section.tsx
  dashboard/
    dashboard-shell.tsx
    dashboard-sidebar.tsx
    resume-card.tsx
  builder/
    resume-builder-shell.tsx
    form-stepper.tsx
    step-sections.tsx
    ai-improve-button.tsx
    resume-preview-panel.tsx
hooks/
  use-auto-save.ts
  use-mounted.ts
lib/
  data.ts
  schemas.ts
  types.ts
  utils.ts
public/
  templates/
    aurora.svg
    slate.svg
    executive.svg
```
