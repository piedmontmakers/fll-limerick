# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FLL Limerick Generator - A React web app that generates celebratory limericks for FIRST LEGO League award ceremonies using GPT-4o-mini via Vercel AI Gateway.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5174)
npm run build    # TypeScript check + production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Environment Setup

Requires `VITE_AI_GATEWAY_API_KEY` in `.env` file. Copy from `.env.example`.

Optional: `VITE_GOOGLE_SHEET_ID` - Google Sheet ID for team list dropdown. If not set, only manual team name entry is available. Sheet must be public with columns A (Team Number) and B (Team Name).

## Architecture

Single-page React app with Vite:

- `src/App.tsx` - Root component with FLL Unearthed theme header
- `src/components/LimerickGenerator.tsx` - Main feature component handling award selection, form input, API calls to Vercel AI Gateway, and limerick display/selection
- `src/data/awards.ts` - Static data for FLL awards (required, optional, fun categories)
- `src/components/ui/` - Reusable UI primitives (shadcn/ui pattern with Radix UI)
- `src/lib/utils.ts` - Tailwind class merging utility (`cn` function)
- `src/lib/teams.ts` - Fetches team list from Google Sheets CSV export

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS with shadcn/ui component pattern
- Radix UI primitives for accessibility
- Vercel AI Gateway for GPT-4o-mini API access

## Key Patterns

- FLL brand colors: Orange `#F26A21`, cream background `#FBF3ED`
- UI components use `class-variance-authority` for variants
- API key loaded via `import.meta.env.VITE_AI_GATEWAY_API_KEY`
