# CareNest Frontend

The Next.js web app for browsing hospital departments and doctors, requesting appointments, chatting with the appointment assistant, and managing records through the admin portal.

## Local setup

Install dependencies and point the frontend to the local backend in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Then run:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If `NEXT_PUBLIC_API_URL` is unset, the app uses its configured hosted backend.
Appointment times are entered and displayed in the hospital timezone.
