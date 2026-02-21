import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GameState {
  blockCount: number;
  blocksSeed: number;
  startTime: number;
  endTime:  number;
  phase: "ready" | "playing" | "ended";
  start: () => void;
  restart: () => void;
  end: () => void;
}

export const useGame = create<GameState>()(subscribeWithSelector((set) => ({
  blockCount: 4,
  blocksSeed: 0,
  startTime:0,
  endTime:0,
  phase: "ready",

  start: () => {
    console.log("Playing");
    set((state) => {
      if(state.phase === 'ready') return { phase: "playing", startTime: Date.now() };
      return {}
    });
  },

  // start: () => {
  //   console.log("Playing");
  //   set({ phase: "playing" });
  // },
  restart: () => {
    set((state) => {
      if(state.phase === 'playing' || state.phase == 'ended' ) return { phase: "ready", blocksSeed:Math.random() };
      return {}
    })
  },
  end: () => set((state) => {
      if(state.phase === 'playing' ) return { phase: "ended", endTime: Date.now() };
      return {}
    }),
})));
