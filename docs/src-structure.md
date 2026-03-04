# `src` Directory Structure and Responsibilities

This project keeps application source code under `src/`.  
Navigation is file-based using Expo Router and routes are defined in `src/app`.

## Directory tree

```text
src/
├── app/
│   ├── editor/
│   └── player/
```

## Responsibilities by directory

### `src/`

- Root for all app source code.
- Holds the custom app entry (`src/App.tsx`) that bootstraps Expo Router with `src/app` route context.

### `src/app/`

- Main Expo Router routes directory.
- Owns shared navigation configuration via `_layout.tsx` (stack setup, header actions, modal presentation).
- Contains top-level screens such as:
- `index.tsx` (main screen)
- `settings.tsx` (modal settings screen)

### `src/app/editor/`

- Route segment for editor-related screens.
- Defines editor entry and editor detail routes:
- `new.tsx` for creating a new editor item.
- `[id].tsx` for editing/viewing a specific editor item.

### `src/app/player/`

- Route segment for player-related screens.
- Defines dynamic player detail route:
- `[id].tsx` for a specific player screen instance.

## Route mapping overview

- `/` -> `src/app/index.tsx`
- `/settings` -> `src/app/settings.tsx` (modal presentation configured in `_layout.tsx`)
- `/player/[id]` -> `src/app/player/[id].tsx`
- `/editor/new` -> `src/app/editor/new.tsx`
- `/editor/[id]` -> `src/app/editor/[id].tsx`
