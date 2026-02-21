import { useKeyboardControls } from "@react-three/drei";
import { useGame } from "./stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const phase = useGame((state) => state.phase);
  const restart = useGame((state) => state.restart);
  const time = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = Number(elapsedTime.toFixed(2));

      if (time.current) time.current.textContent = String(elapsedTime);
    });

    return () => {
      unsubscribeEffect();
    };
  });

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>W</div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>A</div>
          <div className={`key ${backward ? "active" : ""}`}>S</div>
          <div className={`key ${rightward ? "active" : ""}`}>D</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}>Space</div>
        </div>
      </div>
    </div>
  );
};
