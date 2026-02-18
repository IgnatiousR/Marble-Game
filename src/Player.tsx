import { useRapier, RapierRigidBody, RigidBody } from "@react-three/rapier";
import type { Vec3 } from "./types";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type PlayerProps = {
  position?: Vec3;
};
export const Player = ({ position = [0, 1, 0] }: PlayerProps) => {
  const rb = useRef<RapierRigidBody | null>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world;

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    console.log("Yes, jump!");
    const origin = rb.current?.translation();
    if (!origin) return;
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);

    const maxToi = 10; // how far downward to check
    const solid = true; // stop at solid colliders

    const hit = rapierWorld.castRay(ray, maxToi, solid);

    // console.log(hit);

    if (hit && hit.timeOfImpact < 0.15) rb.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) jump();
      },
    );

    return () => {
      unsubscribeJump();
    };
  });

  useFrame((state, delta) => {
    if (!rb.current) return;
    // Controls
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

    rb.current.applyImpulse(impulse, true);
    rb.current.applyTorqueImpulse(torque, true);

    //Camera

    const bodyPosition = rb.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
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
