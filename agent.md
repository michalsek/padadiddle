# AI Coding Agent Instructions – RN/Expo Project

## Project overview

This is a React Native / Expo app using Expo Router and TypeScript.
The project layout reflects logical boundaries for screens, shared UI, rendering layers (Skia + VexFlow), and test surfaces.

## Core commands

- Install: `yarn`
- Start: `yarn start`
- Run tests: `yarn test`
- Typecheck only changed files: `pnpm tsc --noEmit path/to/file`

## Architecture & directories

- `/app`: Expo Router screens & routes
- `/ui`: shared UI primitives (create components here first)
- `/skiaVexflow`: Skia/VexFlow renderer + helpers
- `/components`: context-aware RN components
- `/api`: HTTP/API helpers (authorized fetch, config)
- `/vexflow`: original VexFlow code – **do not modify**
- `/testsuite`: screens that render test cases

Agents should respect these roles when placing new modules or refactors.

## Dos & Don’ts

### Do

- Produce a short plan (bulleted) _before_ generating code
- Add/modify corresponding tests for all logic changes
- Keep diffs small and context clear
- Write summary of function or larger block of code before it

### Don’t

- Modify anything in `/vexflow`
- Read or assume values from `.env` files; ask if keys must be added
- Introduce new heavy dependencies without explicit review
- Write small one line of code only comments

## Style & patterns

- Use functional React components with hooks
- Prefer small, focused components in `/ui` over large monoliths
- Keep business logic out of UI render functions

## Verification & reporting

- After changes, typecheck + format + lint the affected files
- Summarize skipped tasks or open questions at the end of your output
