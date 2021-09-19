import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/character.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
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