<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CareNest Frontend Guide

## Overview

This directory contains the Next.js frontend for CareNest Hospital's
single-hospital MVP. Patients can browse backend-provided departments and
doctors, request appointments, and use the appointment assistant. Admins can
sign in and manage departments, doctors, appointments, and prescriptions.
Marketing and contact content remains static.

The application currently supports one hospital. It has no tenant or
organization ownership, tenant-scoped data, or tenant selection. Treat those
capabilities as unimplemented.

## Directory Structure

```text
src/app/
  components/
    admin/          AdminLogin.tsx, AdminPortal.tsx
    patient/        DepartmentCarousel.tsx, PatientApiSection.tsx, PatientPortal.tsx
    shared/         AssistantSidebar.tsx, ContactSection.tsx, CrudSection.tsx,
                    Header.tsx, HeroSection.tsx, ServicesSection.tsx, StoreProvider.tsx
    ui/             Shared buttons, inputs, cards, badges, selects, and icons
  data.ts           Static hero highlight labels
  globals.css       Tailwind import and global styles
  layout.tsx        Root layout and metadata
  page.tsx          Chooses the patient or admin portal
  store/
    authSlice.ts    In-memory role and admin token state
    careNestApi.ts  API types, RTK Query endpoints, and cache tags
    index.ts        Redux store setup
```

Keep new components under `src/app/components`, using `admin/`, `patient/`,
`shared/`, or `ui/` according to their role. Reuse existing shared components
where practical; do not create another components directory.

## Existing Components

- `page.tsx`: Reads the Redux role and renders either `PatientPortal` or
  `AdminPortal` at the root route.
- `patient/PatientPortal.tsx`: Composes the patient landing page, admin sign-in
  panel, API-backed directory and appointment form, contact section, and chat.
- `patient/PatientApiSection.tsx`: Loads departments and doctors through RTK
  Query, displays `DepartmentCarousel`, and submits patient appointment requests.
- `patient/DepartmentCarousel.tsx`: Browses departments and their doctors using
  backend data, with loading and error states.
- `admin/AdminLogin.tsx`: Signs in through the backend and switches to the admin
  portal only when the response grants the `ADMIN` role.
- `admin/AdminPortal.tsx`: Creates, updates, and deletes departments, doctors,
  appointments, and prescriptions. Doctor schedule fields and appointment times
  are edited in hospital-local time.
- `shared/CrudSection.tsx`: Reusable admin list and record-action layout; each
  admin resource supplies its own form and displayed fields.
- `shared/AssistantSidebar.tsx`: Calls the backend assistant, stores chat
  history in `sessionStorage`, and shows booking results and available-time
  alternatives. Pending booking metadata is not rendered as chat text.
- `shared/Header.tsx`: In-page navigation and admin sign-in action.
- `shared/HeroSection.tsx`: Main message, appointment links, and highlight
  labels from `data.ts`.
- `shared/ServicesSection.tsx` and `shared/ContactSection.tsx`: Static
  presentation content.
- `shared/StoreProvider.tsx`: Makes the Redux store available to client UI.
- `components/ui/`: Reusable visual primitives used by the portals and sections.

## State and Data Flow

The Redux store combines the `auth` slice and RTK Query API cache. The auth
slice starts as an unauthenticated `PATIENT`; `PatientPortal` resets guests to
that state when it mounts. Admin sign-in calls the backend, stores the returned
access token in Redux memory, and sends it as a bearer token on later requests.
Requests also include credentials. The frontend does not persist Redux auth
state across reloads.

`page.tsx` renders one portal according to the current role. Patient-facing
department, doctor, appointment, and prescription data comes from the backend
through `store/careNestApi.ts`; RTK Query caches results and mutation tags
refresh affected lists. The default API URL is the configured hosted backend.
Set `NEXT_PUBLIC_API_URL` to override it, for example with a local backend URL.

The assistant calls `POST /assistant/chat` through RTK Query. Chat history and
pending booking metadata are retained in browser `sessionStorage` for the
current tab session. The backend uses its own doctor and availability data and
creates a booking only after confirmation and a final availability check.
Successful bookings invalidate the appointments cache. A rejected booking can
include backend-provided alternative times.

`data.ts` currently contains hero highlight labels only. Services and contact
copy are local presentation content; do not duplicate backend-owned hospital
records in frontend mock data.

## Routing

The app uses the root App Router route in `src/app/page.tsx`; there are no other
routes or route groups. Header links target the `home`, `services`,
`departments`, and `contact` sections. The hero also links to the appointments
form.

## Styling

Tailwind CSS v4 is imported from `src/app/globals.css` using
`@import "tailwindcss"`. Components use Tailwind utility classes rather than
CSS modules. Global styles provide smooth scrolling, reduced-motion support,
a light grey-white background, and a restrained lavender accent. Keep this
visual style unless the user requests a change.

## Conventions

- Use TypeScript and functional React components.
- Name component files in PascalCase and export named components where the
  existing file does so. The App Router page uses a default export.
- Keep page-level orchestration in `page.tsx`; put reusable UI in the relevant
  components subfolder.
- Define component prop types near the component. API response types are in
  `store/careNestApi.ts`; there is no `types.ts` file.
- Prefer semantic HTML, explicit button `type` values, accessible labels for
  icon-only controls, and stable section IDs for in-page navigation.
- Keep backend-owned operational data in the API layer. Keep shared highlight
  labels in `data.ts` and concise static section copy with its component.
- `package.json` defines lint, build, Vitest, and Playwright scripts. Follow
  task-specific instructions before running them. For assistant work,
  `CHAT_PLAN.md` prohibits automated tests and live model API calls; provide
  manual verification steps for the project owner instead. The project owner
  handles migration, server startup, and deployment for this work.
