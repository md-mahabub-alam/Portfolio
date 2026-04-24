import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingCluster() {
  const group = useRef(null);
  const count = 220;
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 16;
      arr[i + 1] = (Math.random() - 0.5) * 10;
      arr[i + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.2,
      0.02
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.2,
      0.02
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh position={[-2.8, 0.6, -2.5]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#7f5af0" metalness={0.55} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[3.1, -1.2, -1.4]}>
          <torusKnotGeometry args={[0.75, 0.24, 130, 22]} />
          <meshStandardMaterial color="#00d4ff" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={1.5}>
        <mesh position={[0.2, 2.2, -3.8]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#9a89ff" metalness={0.65} roughness={0.22} />
        </mesh>
      </Float>
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#9cd7ff" size={0.03} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.1, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.65, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AnimatedBackground() {
  return (
    <div className="particles" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 58 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#090b18", 7, 16]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 3]} intensity={1.2} color="#88ccff" />
        <pointLight position={[-5, -4, 4]} intensity={0.9} color="#7f5af0" />
        <CameraRig />
        <FloatingCluster />
      </Canvas>
    </div>
  );
}
