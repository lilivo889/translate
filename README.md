# Translate – Language Learning App

**Translate** is a cross‑platform language learning application built with
Expo and React Native. It helps users learn Spanish (target language) from
English (native language) by combining traditional drills with a
conversation practice feature powered by the VAPI voice API. This repository
contains the source code of the application, a thin wrapper around the
VAPI service and a minimal design system.

## Getting Started

### Prerequisites

The project was scaffolded with Expo SDK 50 and TypeScript. To run the
application locally you’ll need:

- **Node.js ≥ 18** – see `node --version`
- **Expo CLI** – install globally via `npm install -g expo` (recommended)
- **Git** – for version control and dependency installation
- **iOS or Android device/simulator** – for testing the app

### Installation

1. **Clone the repository** and change into the project directory:

   ```bash
   git clone <this-repo-url> translate
   cd translate
   ```

2. **Install dependencies**. If your environment has network access you can
   install the dependencies declared in `package.json` using npm or yarn:

   ```bash
   npm install
   ```

   If you see errors about missing packages, ensure that your npm
   configuration allows access to the npm registry. The dependencies are not
   included in this zip file.

3. **Configure environment variables**. Copy `.env.example` to `.env` and
   fill in your VAPI API key and assistant identifier. These values are
   loaded by the app using `expo-constants`:

   ```bash
   cp .env.example .env
   echo "VAPI_API_KEY=your-public-key" >> .env
   echo "VAPI_ASSISTANT_ID=your-assistant-id" >> .env
   ```

### Running the App

With dependencies installed, start the development server via:

```bash
expo start
```

Use the on‑screen QR code or the `run` shortcuts to launch the app on a
connected device or emulator. The first time you launch the app it will
prompt you for microphone access when you navigate to the **Speak** tab.

### iOS Build with EAS

To create a production build for iOS you can use Expo Application Services
(EAS). You’ll need an Apple developer account and have EAS CLI installed:

```bash
npm install -g eas-cli
eas build -p ios
```

The `app.json` file is already configured with your bundle identifier
(`app.speakspanish.it.com`) and microphone permission string. Follow the
interactive prompts to complete the build. Refer to Expo’s official docs
for detailed instructions on setting up certificates and profiles.

## Project Structure

```
translate-vapi/
├─ app.json            # Expo configuration (name, slug, permissions, etc.)
├─ package.json        # Project manifest and dependencies
├─ tsconfig.json       # TypeScript compiler options
├─ babel.config.js     # Babel configuration
├─ .env.example        # Example environment file
├─ assets/             # Icons and seed data
│  └─ seed/
│     └─ phrases.json  # 50 beginner phrases for seeding the vocab table
├─ app/                # Screens organised by route, following Expo Router conventions
│  ├─ _layout.tsx      # Tab bar layout for the main routes
│  ├─ index.tsx        # Today dashboard
│  ├─ learn/
│  │  ├─ index.tsx     # Lesson selector
│  │  └─ lesson.tsx    # Onboarding and lesson flow
│  ├─ speak/
│  │  └─ index.tsx     # Speaking practice with VAPI
│  ├─ review/
│  │  └─ index.tsx     # Flashcard review
│  └─ stats/
│     └─ index.tsx     # Progress statistics
├─ components/
│  └─ ui/
│     ├─ Button.tsx    # Primary button component
│     ├─ Card.tsx      # Card container with elevation
│     ├─ TextField.tsx # Labelled text input
│     └─ Chip.tsx      # Suggestion chip component
├─ lib/
│  ├─ db.ts            # SQLite wrapper and schema creation
│  ├─ spaced.ts        # Spaced repetition helpers
│  └─ vapi.ts          # Thin client for VAPI (stubbed for now)
├─ store/
│  └─ useAppStore.ts   # Global state management via Zustand
├─ CHANGELOG.md        # Decision log and limitations
└─ README.md           # This file
```

## VAPI Integration

The voice interaction is powered by the VAPI (Voice AI) service. This
repository includes a **stub implementation** of the VAPI client (`lib/vapi.ts`)
to allow the app to compile and demonstrate the expected API surface.
To enable real conversations:

1. Obtain your **VAPI API key** and **assistant ID** from your VAPI
   dashboard.
2. Populate the `.env` file with these values.
3. Replace the stubbed functions in `lib/vapi.ts` with calls to the
   official VAPI React Native SDK. The recommended integration path is to
   initialise the SDK using the API key and assistant ID, start a session
   when the user taps the **Start Session** button, and listen for
   transcript events to update the UI.

Consult the VAPI documentation for details on WebSocket connections,
authentication and streaming audio formats. Remember to handle errors
gracefully and request microphone permissions before starting a session.

## Seeding Data

Upon first run you should seed the database with beginner phrases. The
`assets/seed/phrases.json` file contains 50 common Spanish phrases with
translations and IPA. Use the `insertVocabulary` function exported from
`lib/db.ts` to insert these into the `vocab` table. This seeding logic
could be added to the app initialisation flow.

```ts
import { initDb, insertVocabulary } from './lib/db';
import phrases from './assets/seed/phrases.json';

await initDb();
await insertVocabulary(phrases);
```

## Limitations & Future Work

- The current implementation uses a **stub for the VAPI client**. Voice
  interactions are simulated and do not stream real audio. Integration with
  the official VAPI SDK is required for full functionality.
- State persistence for the user profile and stats is handled in memory via
  Zustand. You may wish to persist this to SQLite or SecureStore.
- The lesson flow is simplified and does not yet include vocabulary drills
  or pattern practice. These modules should be implemented in
  `app/learn/lesson.tsx` and can leverage the spaced repetition helpers in
  `lib/spaced.ts`.
- Charts and rich statistics are not implemented. You can use a library
  like `react-native-svg` or `victory-native` to render progress charts.
- The UI uses a minimal light theme and may require refinement for
  accessibility and responsiveness.

We hope this scaffold provides a solid foundation for your language
learning app. Contributions and feedback are welcome!