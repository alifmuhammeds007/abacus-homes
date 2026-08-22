import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CinematicCamera = ({ scrollProgress = 0, scrollProgressRef, isMobile = false }) => {
  const cameraRef = useRef();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const smoothT = useRef(0);

  // Build Continuous, Symmetrical Catmull-Rom Curves for Smooth Bi-directional Scrolling
  const { posCurve, lookCurve } = useMemo(() => {
    const posPoints = [
      new THREE.Vector3(0, isMobile ? 2.4 : 3.2, isMobile ? 15.5 : 13.5),       // SCENE 01: INTRO (Full front facade view)
      new THREE.Vector3(2.8, 2.6, isMobile ? 14.5 : 10.0),      // SCENE 02: APPROACH (Inviting 3/4 porch view)
      new THREE.Vector3(5.2, 4.5, isMobile ? 13.0 : 8.8),       // SCENE 03: EXPLODED (Elevated crisp multi-level breakdown)
      new THREE.Vector3(isMobile ? 0.0 : 1.35, 1.25, isMobile ? 5.0 : 3.6), // SCENE 04: INTERIOR (Eye-level straight into living, dining & kitchen!)
      new THREE.Vector3(-5.2, 3.0, isMobile ? 13.5 : 9.2),      // SCENE 05: ROTATION (Opposite angle inspect)
      new THREE.Vector3(2.8, 2.4, isMobile ? 14.5 : 10.0),      // SCENE 06: REASSEMBLY (Pristine completed home)
    ];

    const lookPoints = [
      new THREE.Vector3(0, 1.4, 0),         // INTRO
      new THREE.Vector3(0, 1.4, 0),         // APPROACH
      new THREE.Vector3(0, 1.8, 0),         // EXPLODED
      new THREE.Vector3(isMobile ? -0.3 : 1.05, 0.95, 0.1), // INTERIOR (Framing sofa, TV wall, dining table & kitchen island)
      new THREE.Vector3(0, 1.5, 0),         // ROTATION
      new THREE.Vector3(0, 1.4, 0),         // REASSEMBLY
    ];

    return {
      posCurve: new THREE.CatmullRomCurve3(posPoints, false, 'catmullrom', 0.5),
      lookCurve: new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.5),
    };
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    const rawT = scrollProgressRef ? scrollProgressRef.current : scrollProgress;
    const targetT = Math.max(0, Math.min(1, rawT));

    // Frame-rate independent physics damping (prevents lag and stuttering)
    smoothT.current = THREE.MathUtils.damp(smoothT.current, targetT, 8.5, delta);
    const clampedT = Math.max(0, Math.min(1, smoothT.current));

    // Sample continuous spline positions
    const targetPos = posCurve.getPointAt(clampedT);
    const targetLook = lookCurve.getPointAt(clampedT);

    cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, targetPos.x, 10, delta);
    cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetPos.y, 10, delta);
    cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetPos.z, 10, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLook.x, 10, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLook.y, 10, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLook.z, 10, delta);

    cameraRef.current.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={isMobile ? 50 : 38}
      near={0.1}
      far={100}
      position={[0, 3.2, isMobile ? 18.0 : 13.5]}
    />
  );
};

export default CinematicCamera;
