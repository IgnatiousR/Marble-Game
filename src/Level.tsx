import * as THREE from "three";
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Vec3 } from "./types";

// THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export type BlockStartProps = {
  position?: Vec3;
};

export function BlockStart({ position = [0, 0, 0] }: BlockStartProps) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
      {/* <boxGeometry args={[4, 0.2, 4]} /> */}
      {/* <meshStandardMaterial color={"limegreen"} /> */}
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }: BlockStartProps) {
  const obstacle = useRef<RapierRigidBody | null>(null);
  const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // console.log(time);
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />

      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.6, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }: BlockStartProps) {
  const obstacle = useRef<RapierRigidBody | null>(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // console.log(time);
    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />

      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.6, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }: BlockStartProps) {
  const obstacle = useRef<RapierRigidBody | null>(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // console.log(time);
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current?.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />

      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }: BlockStartProps) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  // hamburger.scene.traverse((child) => {
  //   if (child instanceof THREE.Mesh) {
  //     child.castShadow = true;
  //     child.receiveShadow = true;
  //   }
  // });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        // position={[0, 0, 0]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        position={[0, 0.25, 0]}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        {/* Left Right */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          position={[2.15, 0.75, -(length * 2) + 2]}
          receiveShadow
          castShadow
        />

        {/* Left Wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          receiveShadow
          castShadow
        />

        {/* Starting Wall */}
        {/* <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          position={[0, 0.75, 2]}
          receiveShadow
          castShadow
        /> */}

        {/* Ending Wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          position={[0, 0.75, -(length * 4) + 2]}
          receiveShadow
          castShadow
        />

        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
}

// function mulberry32(a: number) {
//   return function () {
//     let t = (a += 0x6d2b79f5);
//     t = Math.imul(t ^ (t >>> 15), t | 1);
//     t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
//     return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//   };
// }

export default function Level({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo] }) {
  // const seed = useMemo(() => Math.random(), [count, types]);
  // const [seed, setSeed] = useState(() => Math.random());

  const blocks = useMemo(() => {
    const generated = [];

    // const rng = mulberry32(seed);

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      generated.push(type);
    }

    return generated;
  }, [count, types]);

  // function useSetupBlocks() {
  //   const [blocks] = useState(() => {
  //   const generated = [];

  //   for (let i = 0; i < count; i++) {
  //     const type = types[Math.floor(Math.random() * types.length)];
  //     generated.push(type);
  //   }

  //   return generated;
  // });
  // }

  // const [blocks] = useState(() => {
  //   const generated = [];

  //   for (let i = 0; i < count; i++) {
  //     const type = types[Math.floor(Math.random() * types.length)];
  //     generated.push(type);
  //   }

  //   return generated;
  // });

  console.log(blocks);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, idx) => (
        <Block key={idx} position={[0, 0, -(idx + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
