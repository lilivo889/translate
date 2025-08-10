# Changelog

All notable changes to this project will be documented in this file.

## 1.0.0 – Initial release (August 2025)

- **Project scaffolding** – Bootstrapped an Expo application with TypeScript, Expo Router, and minimal UI components.  Created the standard file structure under `app`, `components`, `lib`, and `store`.
- **SQLite data layer** – Added `lib/db.ts` with table definitions for user profiles, vocabulary, spaced repetition scheduling, sessions, and transcripts.
- **State management** – Added `store/useAppStore.ts` using Zustand to hold user preferences, session status, and XP/streak data.
- **VAPI integration stub** – Implemented a placeholder client in `lib/vapi.ts` that logs actions.  The real VAPI SDK or WebSocket implementation can be plugged in here.
- **Seed content** – Added 50 beginner Spanish phrases in `assets/seed/phrases.json`.  A helper in `lib/db.ts` imports this data on first launch.
- **UI components** – Created basic `Button`, `Card`, `TextField`, and `Chip` components in `components/ui` to standardise the look of the application.  The primary brand colour (teal) is used throughout.
- **Screens** – Added scaffolded screens for Today (index), Learn, Lesson, Speak, Review and Stats.  Each screen demonstrates navigation via Expo Router.
- **Configuration** – Added `app.json` with the bundle identifier `app.speakspanish.it.com` and microphone usage description.  Added `.env.example` for secrets.
- **Documentation** – Added a comprehensive `README.md` with setup instructions, environment variables, VAPI integration notes, and guidance for using EAS Build.

## Future

* Implement the actual VAPI WebSocket integration to enable real voice conversations.
* Extend the lesson logic to include vocabulary drills, pattern practice and placement tests.
* Improve the UI with richer layouts, animations and icons.
* Add tests and continuous integration.