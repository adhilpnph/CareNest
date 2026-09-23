<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CareNest Frontend Guide

## Overview

This directory contains the CareNest Hospital MVP, a small Next.js App Router
application styled with Tailwind CSS. The current experience is a single-page
hospital landing page with static mock content and a client-side department
doctor panel.

## Directory Structure

```text
src/app/
	components/       Reusable page sections and role-based portal components
	components/admin/ Admin-only portal components
	components/patient/ Patient-facing portal components
	components/shared/ Shared application infrastructure
	data.ts           Static department, doctor, and hero highlight data
	globals.css       Tailwind import and global document styles
	layout.tsx        Root layout, metadata, and document-level styles
	page.tsx          Client page orchestrator and modal state owner
	store/            Redux store and authentication role slice
	types.ts          Shared Department and Doctor types
```

Keep all new components under `src/app/components`, using `admin/`, `patient/`,
or `shared/` according to the role guidance above. The original landing-page
sections remain directly under `components/` until they are naturally reused
by a later feature; do not create a second components directory.

## Existing Components

- `Header.tsx`: Sticky CareNest header with anchor navigation and a book-visit
	action.
- `HeroSection.tsx`: Hero statement, calls to action, and highlight pills. It
	receives the highlight labels from `data.ts`.
- `ServicesSection.tsx`: Static cards for primary care, diagnostics, and
	specialist care.
- `DepartmentsSection.tsx`: Department card grid. It receives department data
	and calls the page callback when a department is selected.
- `DoctorModal.tsx`: Conditional modal panel showing one doctor from the
	selected department, with close, previous, and next controls.
- `ContactSection.tsx`: Static contact details for phone, address, and hours.
- `patient/PatientPortal.tsx`: Existing landing-page experience, including its
	department modal state and temporary admin-preview switch.
- `admin/AdminPortal.tsx`: Lightweight admin landing placeholder with a switch
	back to the patient experience through logout.
- `admin/AdminLogin.tsx`: Temporary admin credential form that dispatches the
	Redux login action and reports invalid credentials without changing role.
- `shared/StoreProvider.tsx`: Client boundary that supplies the Redux store.
- `shared/AssistantSidebar.tsx`: Session-persistent assistant UI with loading,
  error, booking-success, and rejected-booking states.
- `patient/PatientApiSection.tsx`: RTK Query-backed department and doctor
	directory plus patient appointment creation.

## State and Data Flow

The Redux store in `store/` is the single source of truth for the current role.
The `auth` slice starts as an unauthenticated `PATIENT`; guests are explicitly
initialized as patients on the patient portal mount. Admin login and logout
call backend auth endpoints. The backend keeps the JWT in an httpOnly cookie,
so the frontend never stores or reads the token directly.

`page.tsx` reads the role with `useSelector` and renders exactly one portal.
The patient portal owns its temporary UI state with React `useState`:

- `selectedDepartment` identifies the department shown in the panel.
- `activeIndex` identifies the doctor currently shown.
- `isModalOpen` controls whether the panel is mounted.

The patient portal passes data and event callbacks into presentational
components. Mock departments, doctors, and hero highlights live in `data.ts`;
their shapes are defined in `types.ts`. There is no API, persistence, or real
backend authentication, or persistence yet.

`store/careNestApi.ts` is the single frontend data layer for backend resources.
It uses `NEXT_PUBLIC_API_URL` when provided and otherwise targets the local
backend at `http://localhost:8000`. Requests include credentials so the
backend can validate its JWT cookie. RTK Query tags invalidate resource lists
after mutations.

The assistant uses `POST /assistant/chat` through the same API slice. Its
conversation history is stored in `sessionStorage` for the current browser
session. Successful booking results invalidate the appointments tag; rejected
booking results are shown inline.

## Routing

The app currently uses only the root App Router route supplied by
`src/app/page.tsx`. Header links use in-page anchors for `home`, `services`,
`departments`, and `contact`. There are no additional routes or route groups.

## Styling

Tailwind CSS v4 is imported from `src/app/globals.css` using
`@import "tailwindcss"`. Components use inline Tailwind utility classes rather
than CSS modules. Global CSS provides smooth scrolling, the light color scheme,
the stone-toned gradient background, the font stack, and shared transitions.
Keep the existing restrained grey, white, and stone visual language unless a
future requirement explicitly changes the design direction.

## Conventions

- Use TypeScript and functional React components.
- Name component files in PascalCase and export named components where the
	existing file does so.
- Keep page-level orchestration in `page.tsx`; put reusable UI in the relevant
	components subfolder.
- Define component prop types near the component and reuse shared domain types
	from `types.ts`.
- Prefer semantic HTML, explicit button `type` values, accessible labels for
	icon-only controls, and stable section IDs for in-page navigation.
- Keep mock content concise and centralized in `data.ts` rather than embedding
	duplicated domain data across components.
- Run `npm run lint` and `npm run build` from `frontend/` after meaningful
	changes.
- Run `npm test` for Vitest component tests and `npm run test:e2e` for the
	Playwright browser suite. The E2E suite expects the local backend to be
	available at port 8000 and never targets the hosted app.
