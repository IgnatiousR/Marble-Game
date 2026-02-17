import Lights from "./Lights";
import Level from "./Level";
// import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Player } from "./Player";

export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics debug>
        <Lights />
        <Level />
        <Player position={[0, 1, 0]} />
      </Physics>
    </>
  );
}
