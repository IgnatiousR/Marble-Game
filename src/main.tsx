import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './index.css'
import Experience from './Experience'
import { KeyboardControls } from '@react-three/drei'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Canvas>
//       <Experience />
//     </Canvas>
//   </StrictMode>
// )
const root = createRoot(document.querySelector('#root') as HTMLElement)

root.render(
  <StrictMode>
    <KeyboardControls
        map={[
            { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
            { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
            { name: 'restart', keys: ['Enter', 'KeyR'] },
            { name: 'menu', keys: ['Escape'] },
            { name: 'jump', keys: ['Space'] },
        ]}
    >
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6]
            }}
        >
            <Experience />
        </Canvas>
        {/* <Interface /> */}
    </KeyboardControls>
    </StrictMode>
)