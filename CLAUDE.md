# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup        # First-time setup: install deps, generate Prisma client, run migrations
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run dev:daemon   # Start dev server in background, logs to logs.txt
npm run build        # Production build
npm run lint         # ESLint
npm test             # Run all Vitest tests (jsdom environment)
npm run db:reset     # Reset SQLite database (destructive)
npx prisma migrate dev  # Apply new schema migrations
npx prisma generate     # Regenerate Prisma client after schema changes
```

Run a single test file:
```bash
npx vitest src/lib/__tests__/file-system.test.ts
```

## Environment

Copy `.env` and set `ANTHROPIC_API_KEY`. Without a key the app falls back to `MockLanguageModel` in `src/lib/provider.ts`, which returns static hardcoded components.

## Code Style

Use comments sparingly — only on complex code where the logic is non-obvious.

## Architecture

### Pages & Routing
- `/` — anonymous session; user can chat and generate components without signing in
- `/[projectId]` — authenticated project view; redirects to `/` if unauthenticated

### Virtual File System
The core abstraction is `VirtualFileSystem` (`src/lib/file-system.ts`) — an in-memory tree of `FileNode` objects. No files are ever written to disk on behalf of the user. The VFS is serialized as `Record<string, FileNode>` for API transport and database storage, then reconstructed with `deserializeFromNodes()`.

Every generated project requires `/App.jsx` as its root entry point. All imports between generated files use the `@/` alias (e.g. `import Foo from '@/components/Foo'`), which the preview system resolves against the VFS root.

### AI Integration
`POST /api/chat` (`src/app/api/chat/route.ts`) uses the Vercel AI SDK (`streamText`) with two tools:
- `str_replace_editor` — create/str_replace/insert operations on the VFS
- `file_manager` — rename/delete operations on the VFS

Tool calls stream back to the client and are applied live by `FileSystemContext.handleToolCall`. The model is selected by `getLanguageModel()` in `src/lib/provider.ts`.

### Preview Rendering
`src/lib/transform/jsx-transformer.ts` handles client-side compilation:
1. Babel standalone transforms JSX/TSX to JS
2. `createImportMap()` builds an ES module import map, mapping each VFS file path to a `blob:` URL and resolving third-party packages to `https://esm.sh/…`
3. `createPreviewHTML()` generates an iframe document that mounts `/App.jsx` via React 19

### State Management
Two React contexts wrap the workspace:
- `FileSystemContext` (`src/lib/contexts/file-system-context.tsx`) — owns the `VirtualFileSystem` instance, `selectedFile`, and `handleToolCall`
- `ChatContext` (`src/lib/contexts/chat-context.tsx`) — wraps Vercel AI SDK's `useChat`, serializes the VFS into every request body, and dispatches tool calls to `FileSystemContext`

### Authentication
JWT sessions via `jose`, stored as an `httpOnly` cookie named `auth-token`. Server-side helpers (`getSession`, `verifySession`) are in `src/lib/auth.ts`. The middleware (`src/middleware.ts`) protects `/api/projects` and `/api/filesystem` routes. Passwords are hashed with `bcrypt`.

### Database
Prisma with SQLite (`prisma/dev.db`). The generated client outputs to `src/generated/prisma/` (non-default location — import from there, not `@prisma/client`). The schema is defined in `prisma/schema.prisma` — reference it whenever you need to understand the structure of data stored in the database. Two models:
- `User` — email + hashed password
- `Project` — stores serialized `messages` (JSON array) and `data` (serialized VFS) as JSON strings

### Anonymous Work Tracking
`src/lib/anon-work-tracker.ts` uses `sessionStorage` to preserve an unauthenticated user's chat messages and VFS state so they can be recovered if the user signs up mid-session.
