import create from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Shape of the application's global state.  It includes user preferences
 * (native/target language, learning goal, daily goal) as well as
 * progress metrics like XP and current streak.  Additional state
 * pertaining to active voice sessions can be stored here too.
 */
export interface AppState {
  nativeLanguage: string;
  targetLanguage: string;
  goal: string;
  dailyMinutesGoal: number;
  xp: number;
  streak: number;
  inSession: boolean;
  setNativeLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setGoal: (goal: string) => void;
  setDailyMinutesGoal: (mins: number) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  setInSession: (flag: boolean) => void;
}

/**
 * Zustand store implementation.  The `persist` middleware writes the
 * state to local storage so that it is retained across app restarts.
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      nativeLanguage: 'English',
      targetLanguage: 'Spanish',
      goal: '',
      dailyMinutesGoal: 15,
      xp: 0,
      streak: 0,
      inSession: false,
      setNativeLanguage: (lang) => set({ nativeLanguage: lang }),
      setTargetLanguage: (lang) => set({ targetLanguage: lang }),
      setGoal: (goal) => set({ goal }),
      setDailyMinutesGoal: (mins) => set({ dailyMinutesGoal: mins }),
      addXp: (amount) => set({ xp: get().xp + amount }),
      incrementStreak: () => set({ streak: get().streak + 1 }),
      resetStreak: () => set({ streak: 0 }),
      setInSession: (flag) => set({ inSession: flag }),
    }),
    {
      name: 'translate-app-state',
    },
  ),
);