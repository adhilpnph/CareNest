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

## AI overview

The chat assistant runs in the backend through OpenRouter. It uses NVIDIA Nemotron 3 Ultra (`nvidia/nemotron-3-ultra-550b-a55b:free`) as its primary model and Google Gemma 4 31B (`google/gemma-4-31b-it:free`) as its fallback. The backend tries the fallback if the primary model is rate-limited or otherwise unavailable.

The assistant can use these backend tools:

- `list_departments` gets the real department list.
- `list_doctors` finds doctors and returns their details and next available slot.
- `check_availability` returns actual open appointment times.
- `prepare_appointment` validates the selected details and prepares a confirmation summary. It does not book; the backend books only after confirmation and another availability check.

**Do not enter real personal or medical information in chat.** The current free models receive chat messages and relevant tool results. Before sending real patient or other sensitive application data to AI, switch to a provider and model with suitable privacy, data retention, and safety controls.

## Room for improvement

- **Error handling:** The backend already handles common AI provider failures, including rate limits, timeouts, and invalid responses. Error messages and recovery can be made more consistent, especially when backend or database operations fail.
- **Conversation flexibility:** This is an appointment assistant. It can reply with ordinary text, but its tools and hospital information focus on departments, doctors, and appointment availability. The current free models may misunderstand slang or informal requests. Better intent recognition, clarifying questions, and approved hospital information would improve the chat.
