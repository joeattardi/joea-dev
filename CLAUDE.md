# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Architecture

This is a personal portfolio/blog site built with Astro 5 and Tailwind CSS 4.

### Content Source

Blog posts are fetched from Hashnode's GraphQL API (gql.hashnode.com) at build time. The content is NOT stored locally.

- [src/lib/client.ts](src/lib/client.ts) - GraphQL client with `getAllPosts()` and `getPost(slug)` functions
- [src/lib/schema.ts](src/lib/schema.ts) - Zod schemas and TypeScript types for post data

### Key Patterns

- **Tailwind CSS 4**: Uses the new `@tailwindcss/vite` plugin (not the PostCSS approach). Configuration is in [src/styles/global.css](src/styles/global.css) via `@theme` directive
- **Icons**: Uses `astro-icon` with Iconify icon sets (`@iconify-json/simple-icons`, `@iconify-json/ph`, `@iconify-json/fa7-brands`)
- **Dark mode**: Uses `prefers-color-scheme` media queries with `dark:` Tailwind variants
- **Fonts**: Roboto Variable (sans) and Merriweather Variable (serif) via `@fontsource-variable`

### Page Structure

- [src/layouts/Layout.astro](src/layouts/Layout.astro) - Base layout with Header/Footer
- [src/pages/index.astro](src/pages/index.astro) - Homepage with bento grid layout
- [src/pages/blog/[slug].astro](src/pages/blog/[slug].astro) - Individual blog post pages (uses `getStaticPaths`)
- [src/pages/blog/[...page].astro](src/pages/blog/[...page].astro) - Paginated blog listing

### General Guidelines/Rules

- Whenever possible, use Tailwind CSS classes instead of CSS rules inside <style> elements.
- Aim for a clean, modern, beautiful design using a "bento box" visual approach.
- Keep animations subtle.
- Use beautiful, subtle gradients when appropriate.
- Keep different device sizes/responsive design in mind when building pages.
