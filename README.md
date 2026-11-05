# Hive Now pre-launch page

![Hive Now](public/hero.png)

This is the waitlist page we ran before [Hive Now](https://hivenow.in) went live in Kochi in August 2026. People signed up for early access, and a countdown ticked down to launch day.

Hive Now is live now at [hivenow.in](https://hivenow.in), so this page has been retired. The code stays here as a record of where it started.

## What it did

- A launch countdown to 20 August 2026
- A waitlist form with name, phone and email, checked as you type
- A small server route that saved each sign-up to a Google Sheet, once per submit

## Built with

Next.js, React, Tailwind CSS and Framer Motion, hosted on Vercel.

## Running it

```bash
npm install
npm run dev
```

The waitlist form needs a `WAITLIST_SHEET_ENDPOINT` environment variable pointing to a Google Apps Script web app. Without it, the form shows an error and nothing is saved.
