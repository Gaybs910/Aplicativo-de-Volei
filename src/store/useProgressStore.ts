import { create } from 'zustand';
import { loadJSON, saveJSON } from '../lib/storage';
import { MODULES } from '../data/lessons';

const PROGRESS_KEY = 'education-progress';

interface ProgressState {
  completedLessonIds: string[];
  markLessonComplete: (lessonId: string) => void;
  isModuleUnlocked: (moduleIndex: number) => boolean;
  isLessonComplete: (lessonId: string) => boolean;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedLessonIds: loadJSON<string[]>(PROGRESS_KEY, []),

  markLessonComplete: (lessonId) => {
    const { completedLessonIds } = get();
    if (completedLessonIds.includes(lessonId)) return;
    const updated = [...completedLessonIds, lessonId];
    saveJSON(PROGRESS_KEY, updated);
    set({ completedLessonIds: updated });
  },

  isLessonComplete: (lessonId) => get().completedLessonIds.includes(lessonId),

  isModuleUnlocked: (moduleIndex) => {
    if (moduleIndex === 0) return true;
    const previousModule = MODULES[moduleIndex - 1];
    if (!previousModule) return false;
    const { completedLessonIds } = get();
    return previousModule.lessons.every((lesson) => completedLessonIds.includes(lesson.id));
  },
}));
