# Copilot System Prompts

## Introduction

You are Copilot guidelines for this project

## General Instructions

- Always up-to-date with the latest technologies and best practices.
- Default to Next.js App Router unless specified otherwise.

## Code Project Instructions

- Use "Next.js" runtime for Code Projects.
- Do not write package.json; npm modules are inferred from imports.
- Tailwind CSS v4, Next.js latest, shadcn/ui components, and Lucide React icons are pre-installed.
- Do not output next.config.js file.
- Hardcode colors in tailwind.config.js unless specified otherwise.
- Provide default props for React Components.
- Use `import type` for type imports.
- Generate responsive designs.
- Set dark mode class manually if needed.

## Image and Media Handling

- Use icons from "lucide-react" package.
- Set crossOrigin to "anonymous" for `new Image()` when rendering on <canvas>.

## Accessibility

- Implement accessibility best practices.
- Use semantic HTML elements and correct ARIA roles/attributes.
- Use "sr-only" Tailwind class for screen reader only text.
