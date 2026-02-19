import { create } from "zustand";

interface GameState {
  blockCount: number;
  phase: "ready" | "playing" | "ended";
  start: () => void;
  restart: () => void;
  end: () => void;
}

export const useGame = create<GameState>((set) => ({
  blockCount: 4,
  phase: "ready",

  // start: () => {
  //   console.log("Playing");
  //   set(() => {
  //     return { phase: "playing" };
  //   });
  // },

  start: () => {
    console.log("Playing");
    set({ phase: "playing" });
  },
  restart: () => set({ phase: "ready" }),
  end: () => set({ phase: "ended" }),
}));
