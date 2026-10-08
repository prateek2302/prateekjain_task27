# Task 27 — Custom React Hooks

A small React app that demonstrates a reusable `useFetch` hook with real API data from JSONPlaceholder.

## What it does

- Accepts a URL and fetches JSON in a React effect.
- Returns `data`, `loading`, and `error`.
- Aborts an in-flight request if the URL changes or the component unmounts.
- Checks HTTP status codes and presents request errors with a retry action.
- Shows loading placeholders, a successful response, and a refresh control in the interface.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run:

```sh
npm run build
```

## Deploy to GitHub Pages

The included GitHub Actions workflow builds and deploys the site when changes are pushed to `main`. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions** if it is not already selected.

## Project structure

```text
src/
  hooks/useFetch.js   Reusable data-fetching hook
  App.jsx             API demo and request states
  main.jsx            React entry point
  styles.css          Responsive page styles
vite.config.js        GitHub Pages base path and Vite configuration
.github/workflows/    Automated GitHub Pages deployment
```

## Decisions

The hook uses the browser's built-in `fetch` and an `AbortController`, so it stays dependency-free and avoids updating state from a stale request. The demo uses the public JSONPlaceholder posts endpoint and makes the loading, success, and error states visible.
