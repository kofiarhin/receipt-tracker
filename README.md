# Receipt Tracker

Production-leaning full-stack MVP for receipt ingestion, OCR extraction, and expense tracking.

## Stack
- Frontend: React + Vite + Tailwind + Redux Toolkit + TanStack Query
- Backend: Node.js + Express + MongoDB/Mongoose + JWT + Multer
- Testing: Vitest (frontend), Jest + Supertest (backend)

## Note on specifications
The referenced files (`receipttrack_design_specification.txt`, `receipttrack_project_brief.txt`, `receipttrack_project_specification.txt`, `receipttrack_ui_screen_specification.txt`) were not present in this repository snapshot at build time. Implementation follows the requirements embedded in the task prompt as the source of truth.

## Setup
1. Copy `.env.example` to `.env` and set values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` - start server and client
- `npm run test` - run backend + frontend tests
- `npm run build` - production build of client
- `npm run start` - start server

## Environment variables
Defined in `.env.example`.

## Architecture summary
- `client/src/services`: raw API calls.
- `client/src/hooks/queries` + `hooks/mutations`: all server state hooks.
- `client/src/features`: Redux global client state (`auth`, `ui`).
- `server/controllers`: request handlers.
- `server/services`: OCR integration + parsing utilities.
- `server/middleware`: auth, upload, validation, centralized errors.

## OCR behavior
- Uses configured external OCR API when endpoint is not the placeholder.
- Fallback mock behavior reads local file text in development/testing.
- Extractor prioritizes total/date/merchant and stores partial/failure safely.

## Tradeoffs
- Chart is rendered as a compact textual monthly trend list for reliability and low dependency overhead in MVP.
