import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useKeyboardControls } from "./hooks/useKeyboaradControls"
import { useBox } from '@react-three/cannon'


export default function Model(props) {
  const SPEED = 25
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

  const { nodes, materials } = useGLTF('/character.gltf')
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={nodes.Body.material}
        position={[-0.95, 1.69, -0.2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Legs.geometry}
        material={nodes.Legs.material}
        position={[-1.36, 0.49, -0.62]}
        scale={[0.49, 0.49, 0.49]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Head.geometry}
        material={nodes.Head.material}
        position={[-1.14, 1.89, -1.7]}
        scale={[0.57, 0.57, 0.57]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ears.geometry}
        material={nodes.Ears.material}
        position={[-1.64, 2.53, -1.82]}
        scale={[-0.2, -0.2, -0.2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tail.geometry}
        material={nodes.Tail.material}
        position={[-0.95, 2, 1.01]}
        scale={[-0.27, -0.27, -0.27]}
      />
    </group>
  )
}

useGLTF.preload('/character.gltf')