import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
export const Effects = () => {
  return (
    <EffectComposer>
      <DepthOfField focalLength={0.2} focusDistance={0.01} focusRange={3} />
    </EffectComposer>
  );
};
