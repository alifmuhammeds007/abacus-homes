import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CinematicLighting = ({ scrollProgress = 0, scrollProgressRef }) => {
  const dirLightRef = useRef();
  const rimLightRef = useRef();
  const livingRoomLightRef = useRef();
  const bedroomLightRef = useRef();
  const smoothT = useRef(0);

  useFrame((state, delta) => {
    const rawT = scrollProgressRef ? scrollProgressRef.current : scrollProgress;
    const targetT = Math.max(0, Math.min(1, rawT));
    smoothT.current = THREE.MathUtils.damp(smoothT.current, targetT, 8, delta);
    const t = Math.max(0, Math.min(1, smoothT.current));

    let ambientIntensity = 0.85;
    let dirIntensity = 1.6;
    let interiorIntensity = 1.2;

    if (t < 0.20) {
      // Intro: Crisp architectural daylight
      ambientIntensity = 0.9;
      dirIntensity = 1.7;
      interiorIntensity = 1.2;
    } else if (t < 0.60) {
      // Exploded: Bright studio lighting to inspect all materials
      ambientIntensity = 1.0;
      dirIntensity = 1.9;
      interiorIntensity = 1.8;
    } else if (t < 0.80) {
      // Interior Reveal: Warm interior glowing spots
      ambientIntensity = 0.95;
      dirIntensity = 1.5;
      interiorIntensity = 2.4;
    } else {
      // Reassembly: Pure architectural photography lighting
      ambientIntensity = 0.9;
      dirIntensity = 1.7;
      interiorIntensity = 1.4;
    }

    if (dirLightRef.current) dirLightRef.current.intensity = dirIntensity;
    if (rimLightRef.current) rimLightRef.current.intensity = 0.8;
    if (livingRoomLightRef.current) livingRoomLightRef.current.intensity = interiorIntensity;
    if (bedroomLightRef.current) bedroomLightRef.current.intensity = interiorIntensity * 0.9;
  });

  return (
    <>
      {/* Soft Luminous Ambient Sky Fill */}
      <ambientLight color="#fdfbf7" intensity={0.9} />

      {/* Main Directional Sun Light */}
      <directionalLight
        ref={dirLightRef}
        position={[12, 18, 10]}
        color="#fff9f0"
        intensity={1.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
      />

      {/* Soft Fill Light from Opposite Side */}
      <directionalLight
        position={[-12, 10, 8]}
        color="#edf4fb"
        intensity={0.8}
      />

      {/* Subtle Warm Rim Light */}
      <pointLight
        ref={rimLightRef}
        position={[8, 12, -10]}
        color="#e2b968"
        intensity={0.8}
        distance={35}
      />

      {/* Living Room Ground Floor Warm Spot */}
      <pointLight
        ref={livingRoomLightRef}
        position={[-0.8, 0.8, 0.4]}
        color="#ffaa33"
        intensity={1.5}
        distance={8}
      />

      {/* 2nd Floor Master Lounge Warm Spot */}
      <pointLight
        ref={bedroomLightRef}
        position={[-1.0, 2.8, 0.2]}
        color="#ffcc66"
        intensity={1.4}
        distance={8}
      />
    </>
  );
};

export default CinematicLighting;
