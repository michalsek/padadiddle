# AI Coding Agent Instructions – RN/Expo Project

## Project overview

This is a React Native / Expo app using Expo Router and TypeScript.
The project layout reflects logical boundaries for screens, shared UI, rendering layers (Skia + VexFlow), and test surfaces.

## Core commands

- Install: `yarn`
- Start: `yarn start`
- Run tests: `yarn test`
- Typecheck only changed files: `yarn tsc --noEmit path/to/file`

## Dependency installs

- For Expo native modules, use `npx expo install <package>` to keep SDK-compatible versions.
- If dependency install/fetch is required and sandbox blocks it, request an escalated command immediately instead of implementing import/path workarounds.
- Prefer requesting reusable approval prefixes for install flows: `["npx","expo","install"]`, `["yarn","add"]`, `["npx","expo","prebuild"]`.
- After adding native modules (example: `expo-file-system`, `react-native-mmkv`), run `yarn prebuild` before expecting runtime availability.
- After install, verify dependency version integrity using `npx expo-doctor`

## Architecture & directories

All of the code of the app resides inside src directory. Refer to its AGENTS file for architecture and directory structure.

## Dos & Don’ts

### Do

- Produce a short plan (bulleted) _before_ generating code
- Add/modify corresponding tests for all logic changes
- Keep diffs small and context clear
- Write extensive summary of function or larger block of code before it. It should define input parameters, output, and the summary of logic
- Ask when you need elevated permission to perform some tasks
- If you need to modify existing ui component ask first, summarizing the changes you want to make
- If you need to modify existing code or install something, do not try to workaround the requirements, ask the user to do it or allow you to do it.
- When using react hooks always import them directly
- use functions for custom hooks instead of arrow functions

### Don’t

- Read or assume values from `.env` files; ask if keys must be added
- Write small one line of code only comments
- Add test files inside app src/app directory or its subdirectories
- Do not use main `React` namespace with exception for `React.FC`

## Style & patterns

- Use functional React components with hooks
- Prefer small, focused components in `/ui` over large monoliths
- Keep business or app logic out of components by creating custom hooks

## Verification & reporting

- After changes, typecheck + format + lint the affected files
- Summarize skipped tasks or open questions at the end of your output

## Workflow

For each assigned codding task:

- make sure you are on separate branch. If the tool didn't automatically create an new branch to run the workflow, use `[feat|fix|chore]/[three-word-summary]` pattern
- commit the changes using commit lint pattern `[feat|fix|chore] lower case commit summary`
- push the changes to the git remote origin
- when you're asked to raise an PR, use Github MCP. The description of the PR should contain one paragraph of the PR summary, bullet list of introduced changes and bullet list of unit tests added.
