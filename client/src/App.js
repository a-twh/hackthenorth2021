import { useRef } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { useKeyboardControls } from "./hooks/useKeyboaradControls"
import './App.css';
import { Camera, Mesh, Vector3 } from "three"


function Box(props) {
  const [ref] = useBox(() => ({mass: props.mass, position: props.position, args: props.args}))

  return (
    <mesh ref={ref} position={props.position}>
      <boxBufferGeometry args={props.args} />
      <meshPhongMaterial color={props.color} />
    </mesh>
  )
}

function Player(props) {
  const SPEED = 5
  const [ref, api] = useBox(() => ({mass: 2201, position: props.position, args: props.args}))
  const {
    moveForward,
    moveLeft,
    moveBack,
    moveRight,
    jump
  } = useKeyboardControls()
  const forward_vel = (moveForward ? 1 : 0) - (moveBack ? 1 : 0)
  const sideways_vel = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0)
  api.velocity.set( forward_vel * SPEED,0,sideways_vel * SPEED)
  return (
    <mesh ref={ref} position={props.position}>
      <sphereBufferGeometry />
      <meshPhongMaterial color={props.color} />
    </mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0]
  }))
  return (
    <mesh on ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="yellow" />
    </mesh>
  )
}

// main entry point
function App() {
  return (
    <Canvas camera={{position: [-20, 10, 10]}}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <pointLight position={[-10, 0, -10]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1} />

      <Physics >
        <Box position={[-2, 2, 0]} mass={1} color="red" shininess="100" args={[2, 2, 2]} />
        <Box position={[2, 1, 0]} mass={1} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 2, 0]} mass={1} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 3, 0]} mass={1} color="green" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 4, 0]} mass={1} color="yellow" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 5, 0]} mass={1} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 6, 0]} mass={1} color="green" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 7, 0]} mass={1} color="yellow" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 8, 0]} mass={1} color="green" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 9, 0]} mass={1} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[2, 10, 0]} mass={1} color="blue" shininess="100" args={[1, 1, 1]} />
        <Box position={[4, 11, -10]} mass={1} color="teal" shininess="100" args={[4, 4, 4]} />
        <Box position={[7, 5, 2]} mass={1} color="green" shininess="100" args={[8, 8, 8]} />


        <Player position={[2, 2, -2]} color="purple" shininess="20" />
        <Plane />
      </Physics>


    </Canvas>
  );
}

export default App;
