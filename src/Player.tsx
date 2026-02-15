import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { Vec3 } from "./types";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

type PlayerProps = {
  position?: Vec3;
};
export const Player = ({ position = [0, 1, 0] }: PlayerProps) => {
  const rb = useRef<RapierRigidBody | null>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const jump = () => {
    // console.log("Yes, jump!");
    rb.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
  };

  useEffect(() => {
    subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) jump();
      },
    );
  }, [subscribeKeys]);

  useFrame((_state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    rb.current?.applyImpulse(impulse, true);
    rb.current?.applyTorqueImpulse(torque, true);
  });

  return (
    <RigidBody
      ref={rb}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={position}
    >
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={"mediumpurple"} />
      </mesh>
    </RigidBody>
  );
};
