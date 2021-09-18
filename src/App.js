import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import './App.css';


function Box(props) {
  const [ref] = useBox(() => ({mass: 1, position: props.position, args: props.args}))

  return (
    <mesh ref={ref} position={props.position}>
      <boxBufferGeometry args={props.args} />
      <meshPhongMaterial color={props.color} />
    </mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))
  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="yellow" />
    </mesh>
  )
}

// main entry point
function App() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <pointLight position={[-10, 0, -10]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1} />

      <Physics >
        <Box position={[-2, 2, 0]} color="red" shininess="100" args={[2, 2, 2]} />
        <Box position={[2, 2, 0]} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[4, 1, -10]} color="teal" shininess="100" args={[4, 4, 4]} />
        <Plane />
      </Physics>


    </Canvas>
  );
}

export default App;
