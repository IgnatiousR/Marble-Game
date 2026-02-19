import Lights from "./Lights";
import Level from "./Level";
// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Player } from "./Player";
import { useGame } from "./stores/useGame";

export default function Experience() {
  const blockCount = useGame((state) => {
    return state.blockCount;
  });
  // console.log(blockCount);

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics debug>
        <Lights />
        <Level count={blockCount} />
        <Player position={[0, 1, 0]} />
      </Physics>
    </>
  );
}
