import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { Vec3 } from "./types";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef } from "react";

type PlayerProps = {
  position?: Vec3;
};
export const Player = ({ position = [0, 1, 0] }: PlayerProps) => {
  const rb = useRef<RapierRigidBody | null>(null);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame(() => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
  });

  return (
    <RigidBody ref={rb} colliders="ball" restitution={0.2} friction={1} position={position}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={"mediumpurple"} />
      </mesh>
    </RigidBody>
  );
};
