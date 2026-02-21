import Lights from "./Lights";
import Level from "./Level";
// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Player } from "./Player";
import { useGame } from "./stores/useGame";
import { Effects } from "./Effects";

export default function Experience() {
  const blockCount = useGame((state) => state.blockCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  // console.log(blockCount);

  return (
    <>
      <color args={["#252731"]} attach={"background"} />
      {/* <OrbitControls makeDefault /> */}
      <Physics
      // debug
      >
        <Lights />
        <Level count={blockCount} seed={blocksSeed} />
        <Player position={[0, 1, 0]} />
      </Physics>

      <Effects />
    </>
  );
}
