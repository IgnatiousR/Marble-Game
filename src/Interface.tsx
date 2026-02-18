import { useKeyboardControls } from "@react-three/drei";

export const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  // console.log(controls);

  return (
    <div className="interface">
      {/* Time */}
      <div className="time">0.00</div>

      {/* Restart */}
      <div className="restart">Restart</div>

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
