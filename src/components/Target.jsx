import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef();

  useGSAP(() => {
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  return (
    <group ref={targetRef} {...props} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.5, 0.12, 16, 100]} />
        <meshStandardMaterial color="#ff3d3d" metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color="#ff3d3d" />
      </mesh>

      <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export default Target;
