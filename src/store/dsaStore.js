







import { create } from "zustand";
import { persist } from "zustand/middleware";
import { starterDsaSheet } from "@/data/starterDsa";

export const useDsaStore = create(
  persist(
  (set, get) => ({
    problems: [],
    initialized: false,

    initialize: () => {
      const existing = get().problems;
      if (!existing || existing.length === 0) {
        set({ problems: starterDsaSheet });
      }
    },

    setProblems: (problems) => {
      set({ problems });
    },
    updateStatus: (id, status) => {
  set({
    problems: get().problems.map((p) =>
      p.id === id ? { ...p, status } : p
    )
  });
},


    deleteTopic: (topic) => {
      set({
        problems: get().problems.filter(
          (p) => p.topic !== topic
        )
      });
    },

    resetDatabase: () => {
      set({
        problems: starterDsaSheet,
        initialized: true
      });
    }
  }),

  {
    name: "dsa-tracker-storage",
    version: 2, // 🔥 ADD THIS

    migrate: (persistedState) => {
      return {
        ...persistedState,
        initialized: true
      };
    },

    onRehydrateStorage: () => (state) => {
      if (!state) return;

      if (!state.problems || state.problems.length === 0) {
        state.problems = starterDsaSheet;
      }

      state.initialized = true;
    }
  }
)
);

