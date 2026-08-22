import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BuildingModel = ({ scrollProgress = 0, scrollProgressRef, dragRotationRef, isMobile = false }) => {
  const houseGroupRef = useRef();

  // Component references for smooth exploded animation
  const roofGroupRef = useRef();
  const upperFloorGroupRef = useRef();
  const upperFrontWallRef = useRef();
  const frontWallGroupRef = useRef();
  const rearWallGroupRef = useRef();
  const leftWallGroupRef = useRef();
  const rightWallGroupRef = useRef();
  const windowsGroupRef = useRef();
  const groundFloorGroupRef = useRef();

  // Smooth Interpolation State Refs (Zero frame jitter / zero lag)
  const smoothExplode = useRef(0);
  const smoothInteriorReveal = useRef(0);
  const smoothRotY = useRef(0);
  const smoothRotX = useRef(0);

  // Materials tailored exactly to the Modern Cantilevered Timber & Charcoal Villa in the reference image
  const materials = useMemo(() => ({
    // Concrete, Plaster & Stucco
    wallWhitePlaster: new THREE.MeshStandardMaterial({
      color: '#f8f8f8',
      roughness: 0.75,
      metalness: 0.05,
    }),
    wallWarmCream: new THREE.MeshStandardMaterial({
      color: '#eee9e0',
      roughness: 0.8,
    }),
    wallSlateDark: new THREE.MeshStandardMaterial({
      color: '#2a2e35',
      roughness: 0.65,
      metalness: 0.2,
    }),
    wallCharcoalMasonry: new THREE.MeshStandardMaterial({
      color: '#34383f',
      roughness: 0.7,
      metalness: 0.15,
    }),

    // Warm Teak & Cedar Timber Paneling (Matching reference image)
    timberCedarSlat: new THREE.MeshStandardMaterial({
      color: '#9c582d',
      roughness: 0.45,
      metalness: 0.05,
    }),
    timberCedarLight: new THREE.MeshStandardMaterial({
      color: '#b8703b',
      roughness: 0.48,
    }),
    timberSoffit: new THREE.MeshStandardMaterial({
      color: '#844722',
      roughness: 0.42,
    }),
    teakDeck: new THREE.MeshStandardMaterial({
      color: '#af6d3e',
      roughness: 0.52,
    }),
    walnutTrim: new THREE.MeshStandardMaterial({
      color: '#42281a',
      roughness: 0.4,
    }),

    // Black Steel Structural Frames & Mullions
    blackSteelFrame: new THREE.MeshStandardMaterial({
      color: '#181a1d',
      roughness: 0.35,
      metalness: 0.7,
    }),
    darkFascia: new THREE.MeshStandardMaterial({
      color: '#1f2227',
      roughness: 0.4,
      metalness: 0.5,
    }),

    // Stones, Patio Pavers & Zen Landscaping
    patioWhiteTile: new THREE.MeshStandardMaterial({
      color: '#eae7e1',
      roughness: 0.3,
      metalness: 0.08,
    }),
    patioBorderGrey: new THREE.MeshStandardMaterial({
      color: '#3e444e',
      roughness: 0.65,
    }),
    gravelBorder: new THREE.MeshStandardMaterial({
      color: '#555e6b',
      roughness: 0.85,
    }),
    plinthDarkStone: new THREE.MeshStandardMaterial({
      color: '#22262d',
      roughness: 0.7,
      metalness: 0.2,
    }),

    // Ultra-Clear Architectural Glass
    panoramicGlass: new THREE.MeshStandardMaterial({
      color: '#cbe7f8',
      transparent: true,
      opacity: 0.32,
      roughness: 0.04,
      metalness: 0.2,
    }),
    balconyGlass: new THREE.MeshStandardMaterial({
      color: '#b6e0fc',
      transparent: true,
      opacity: 0.4,
      roughness: 0.06,
      metalness: 0.15,
    }),

    // Interior Furnishings & Emissive Spotlights
    sofaFabricCream: new THREE.MeshStandardMaterial({
      color: '#eae4d9',
      roughness: 0.85,
    }),
    interiorFloorParquet: new THREE.MeshStandardMaterial({
      color: '#d4bc9f',
      roughness: 0.45,
    }),
    ceilingSpotGlow: new THREE.MeshStandardMaterial({
      color: '#fff5e0',
      emissive: '#ffb547',
      emissiveIntensity: 2.2,
      roughness: 0.2,
    }),
    interiorAmbientGlow: new THREE.MeshStandardMaterial({
      color: '#ffe0b2',
      emissive: '#ffaa33',
      emissiveIntensity: 0.8,
    }),

    // Lush Manicured Greenery & Trees
    topiaryShrubGreen: new THREE.MeshStandardMaterial({
      color: '#27521c',
      roughness: 0.85,
    }),
    leafGoldenAutumn: new THREE.MeshStandardMaterial({
      color: '#9e7b28',
      roughness: 0.8,
    }),
    treeTrunkWood: new THREE.MeshStandardMaterial({
      color: '#4e3a2b',
      roughness: 0.85,
    }),
    planterWhite: new THREE.MeshStandardMaterial({
      color: '#f5f5f7',
      roughness: 0.35,
    }),
  }), []);

  useFrame((state, delta) => {
    if (!houseGroupRef.current) return;

    const rawT = scrollProgressRef ? scrollProgressRef.current : scrollProgress;
    const t = Math.max(0, Math.min(1, rawT));

    let targetExplode = 0;
    let targetInteriorReveal = 0;
    let targetScrollRotY = 0;

    if (t < 0.18) {
      // Scene 01: Hero View (Angled 3/4 Isometric matching reference image)
      targetExplode = 0;
      targetScrollRotY = 0;
    } else if (t < 0.38) {
      // Scene 02: Approach
      const p = (t - 0.18) / 0.20;
      targetScrollRotY = p * 0.28;
      targetExplode = 0;
    } else if (t < 0.58) {
      // Scene 03: Exploded Multi-Level View
      const p = (t - 0.38) / 0.20;
      targetExplode = THREE.MathUtils.smoothstep(p, 0, 1);
      targetScrollRotY = 0.28 + p * 0.35;
    } else if (t < 0.78) {
      // Scene 04: Interior Reveal (Opens up wide for full visibility)
      const p = (t - 0.58) / 0.20;
      targetExplode = 1.0;
      targetInteriorReveal = THREE.MathUtils.smoothstep(p, 0, 1);
      targetScrollRotY = 0.63 + p * 0.32;
    } else if (t < 0.90) {
      // Scene 05: 360° Inspection & Beginning Reassembly
      const p = (t - 0.78) / 0.12;
      targetExplode = 1.0 - THREE.MathUtils.smoothstep(p, 0, 1) * 0.75;
      targetInteriorReveal = 1.0 - p;
      targetScrollRotY = 0.95 + p * Math.PI * 1.5;
    } else {
      // Scene 06: Full Reassembly into Completed Luxury Villa
      const p = (t - 0.90) / 0.10;
      targetExplode = THREE.MathUtils.lerp(0.25, 0, Math.min(1, p * 1.4));
      targetInteriorReveal = 0;
      targetScrollRotY = 0.95 + Math.PI * 1.5 + p * 0.12;
    }

    // Read click-drag rotation directly from ref
    const dragX = dragRotationRef?.current?.x || 0;
    const dragY = dragRotationRef?.current?.y || 0;

    const targetRotY = -0.22 + targetScrollRotY + dragY; // Initial ~-12° angle matching reference image
    const targetRotX = 0.08 + dragX; // Gentle isometric downward angle

    // Delta-damped smooth rotation and animation transforms
    smoothRotY.current = THREE.MathUtils.damp(smoothRotY.current, targetRotY, 9, delta);
    smoothRotX.current = THREE.MathUtils.damp(smoothRotX.current, targetRotX, 9, delta);
    smoothExplode.current = THREE.MathUtils.damp(smoothExplode.current, targetExplode, 9, delta);
    smoothInteriorReveal.current = THREE.MathUtils.damp(smoothInteriorReveal.current, targetInteriorReveal, 9, delta);

    houseGroupRef.current.rotation.y = smoothRotY.current;
    houseGroupRef.current.rotation.x = smoothRotX.current;

    const ex = smoothExplode.current;
    const ir = smoothInteriorReveal.current;

    if (roofGroupRef.current) {
      roofGroupRef.current.position.y = 4.25 + ex * 3.6;
    }
    if (upperFloorGroupRef.current) {
      upperFloorGroupRef.current.position.y = 2.22 + ex * 2.2;
    }
    if (upperFrontWallRef.current) {
      upperFrontWallRef.current.position.z = 2.4 + ex * 1.4 + ir * 3.6;
    }
    if (frontWallGroupRef.current) {
      // Slides completely forward to open unobstructed panoramic view into the ground floor
      frontWallGroupRef.current.position.z = 2.4 + ex * 2.0 + ir * 4.4;
    }
    if (rearWallGroupRef.current) {
      rearWallGroupRef.current.position.z = -2.4 - ex * 2.0;
    }
    if (leftWallGroupRef.current) {
      leftWallGroupRef.current.position.x = -3.2 - ex * 2.4;
    }
    if (rightWallGroupRef.current) {
      rightWallGroupRef.current.position.x = 3.2 + ex * 2.4;
    }
    if (windowsGroupRef.current) {
      windowsGroupRef.current.position.z = ex * 0.8 + ir * 4.4;
      windowsGroupRef.current.position.x = ex * 0.8;
    }
  });

  // House Size Scaling (Optimized for mobile vertical gap framing)
  const houseScale = isMobile ? 0.66 : 0.82;

  return (
    <group 
      ref={houseGroupRef} 
      position={[isMobile ? 0 : 1.35, isMobile ? -0.15 : -0.85, 0]} 
      scale={[houseScale, houseScale, houseScale]}
    >
      
      {/* ========================================================================= */}
      {/* 1. PLINTH, WHITE STONE PATIO, TIMBER DECK STEPS & MANICURED GARDEN       */}
      {/* ========================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Main Base Dark Stone Plinth */}
        <mesh position={[0, 0.08, 0.4]} material={materials.plinthDarkStone} receiveShadow>
          <boxGeometry args={[8.4, 0.16, 6.6]} />
        </mesh>

        {/* Polished White Stone Front Patio & Courtyard */}
        <mesh position={[1.1, 0.17, 2.5]} material={materials.patioWhiteTile} receiveShadow>
          <boxGeometry args={[5.8, 0.04, 2.2]} />
        </mesh>

        {/* Left Sunken Garden Border with Dark River Gravel */}
        <mesh position={[-2.7, 0.14, 2.6]} material={materials.gravelBorder} receiveShadow>
          <boxGeometry args={[1.8, 0.05, 2.4]} />
        </mesh>

        {/* Linear Ground Planter Box with Green Shrubs (Front Left) */}
        <group position={[-2.6, 0.22, 2.6]}>
          <mesh material={materials.planterWhite}>
            <boxGeometry args={[1.6, 0.18, 2.1]} />
          </mesh>
          <mesh position={[0, 0.12, 0]} material={materials.topiaryShrubGreen}>
            <boxGeometry args={[1.5, 0.14, 2.0]} />
          </mesh>
        </group>

        {/* Warm Timber Deck Entrance Steps (Leading to Right Entrance Pavilion) */}
        <group position={[2.4, 0.18, 2.1]}>
          <mesh position={[0, 0.04, 0.3]} material={materials.timberCedarLight} receiveShadow>
            <boxGeometry args={[1.8, 0.08, 0.6]} />
          </mesh>
          <mesh position={[0, 0.12, -0.2]} material={materials.timberCedarLight} receiveShadow>
            <boxGeometry args={[1.8, 0.08, 0.6]} />
          </mesh>
        </group>

        {/* Manicured Rounded Topiary / Bonsai Shrubs (Matching Reference Image) */}
        <group position={[1.4, 0.36, 3.1]}>
          <mesh material={materials.topiaryShrubGreen} castShadow>
            <sphereGeometry args={[0.38, 16, 16]} />
          </mesh>
        </group>
        <group position={[2.6, 0.28, 3.2]}>
          <mesh material={materials.topiaryShrubGreen} castShadow>
            <sphereGeometry args={[0.24, 16, 16]} />
          </mesh>
        </group>

        {/* Golden / Warm Autumn Architectural Trees Flanking the House (Left & Right) */}
        {/* Left Autumn Tree */}
        <group position={[-3.6, 0, 0.2]}>
          <mesh position={[0, 1.6, 0]} material={materials.treeTrunkWood}>
            <cylinderGeometry args={[0.08, 0.12, 3.2, 8]} />
          </mesh>
          <mesh position={[0, 3.2, 0]} material={materials.leafGoldenAutumn} castShadow>
            <sphereGeometry args={[1.2, 12, 12]} />
          </mesh>
          <mesh position={[0.2, 2.5, 0.3]} material={materials.leafGoldenAutumn} castShadow>
            <sphereGeometry args={[0.85, 10, 10]} />
          </mesh>
        </group>

        {/* Right Autumn Tree */}
        <group position={[3.8, 0, -0.6]}>
          <mesh position={[0, 1.8, 0]} material={materials.treeTrunkWood}>
            <cylinderGeometry args={[0.09, 0.13, 3.6, 8]} />
          </mesh>
          <mesh position={[0, 3.5, 0]} material={materials.leafGoldenAutumn} castShadow>
            <sphereGeometry args={[1.3, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 2. GROUND FLOOR: PANORAMIC LIVING LOUNGE & RIGHT CHARCOAL PAVILION       */}
      {/* ========================================================================= */}
      <group ref={groundFloorGroupRef} position={[0, 0.2, 0]}>
        {/* Warm Oak Parquet Floor */}
        <mesh position={[0, 0.01, 0]} material={materials.interiorFloorParquet} receiveShadow>
          <boxGeometry args={[6.6, 0.04, 4.8]} />
        </mesh>

        {/* --- A. LIVING ROOM INTERIOR (VISIBLE THROUGH GROUND FLOOR GLASS) --- */}
        <group position={[-0.8, 0, 0.2]}>
          {/* Minimalist Cream Designer Sofa */}
          <group position={[0, 0.32, 0.2]}>
            <mesh material={materials.sofaFabricCream} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.34, 0.8]} />
            </mesh>
            <mesh position={[0, 0.28, -0.32]} material={materials.sofaFabricCream}>
              <boxGeometry args={[1.8, 0.38, 0.18]} />
            </mesh>
            <mesh position={[-0.85, 0.18, 0]} material={materials.sofaFabricCream}>
              <boxGeometry args={[0.18, 0.32, 0.8]} />
            </mesh>
          </group>

          {/* Minimalist Walnut Coffee Table */}
          <mesh position={[0, 0.16, 0.85]} material={materials.walnutTrim} castShadow>
            <boxGeometry args={[1.0, 0.08, 0.45]} />
          </mesh>

          {/* Warm Ambient Floor Lighting */}
          <group position={[1.1, 0.6, -0.6]}>
            <mesh material={materials.ceilingSpotGlow}>
              <sphereGeometry args={[0.12, 12, 12]} />
            </mesh>
          </group>
        </group>

        {/* --- B. RIGHT WING: CHARCOAL GROOVED STONE PAVILION --- */}
        <group position={[2.4, 0.95, 0.8]}>
          {/* Main Charcoal Textured Masonry Block */}
          <mesh material={materials.wallCharcoalMasonry} castShadow receiveShadow>
            <boxGeometry args={[1.9, 1.9, 2.8]} />
          </mesh>

          {/* Recessed Timber-Framed Vertical Ribbon Window */}
          <group position={[0.7, 0.1, 1.42]}>
            <mesh material={materials.timberCedarSlat}>
              <boxGeometry args={[0.45, 1.4, 0.08]} />
            </mesh>
            <mesh position={[0, 0, 0.02]} material={materials.panoramicGlass}>
              <boxGeometry args={[0.3, 1.2, 0.04]} />
            </mesh>
          </group>

          {/* Entrance Door Jamb & Timber Lintel */}
          <mesh position={[-0.6, -0.15, 1.42]} material={materials.timberCedarSlat}>
            <boxGeometry args={[0.6, 1.6, 0.08]} />
          </mesh>
        </group>

        {/* --- C. TIMBER VERTICAL SLAT ACCENT WALL BEHIND GROUND GLASS --- */}
        <group position={[-2.4, 0.95, 0.4]}>
          <mesh material={materials.timberCedarSlat} castShadow>
            <boxGeometry args={[0.12, 1.9, 2.6]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 3. GROUND FLOOR FRONT FACADE & PANORAMIC GLASS WALLS                      */}
      {/* ========================================================================= */}
      <group ref={frontWallGroupRef} position={[0, 1.15, 2.2]}>
        {/* Large Panoramic Frameless Glass Wall for Living Room */}
        <group position={[-0.8, 0, 0]}>
          <mesh material={materials.panoramicGlass}>
            <boxGeometry args={[3.2, 1.9, 0.04]} />
          </mesh>
          {/* Sleek Black Aluminum Edge Frame & Mullions */}
          <mesh position={[0, 0.92, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[3.24, 0.06, 0.08]} />
          </mesh>
          <mesh position={[0, -0.92, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[3.24, 0.06, 0.08]} />
          </mesh>
          <mesh position={[-1.6, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.06, 1.9, 0.08]} />
          </mesh>
          <mesh position={[0.2, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.05, 1.9, 0.06]} />
          </mesh>
        </group>

        {/* Left Facade Vertical Timber Feature Panel */}
        <group position={[-2.6, 0, 0]}>
          <mesh material={materials.timberCedarSlat} castShadow>
            <boxGeometry args={[0.8, 1.9, 0.16]} />
          </mesh>
        </group>

        {/* Cantilevered Black Intermediate Beam / Canopy separating 1st & 2nd floor */}
        <mesh position={[-0.7, 0.98, 0.2]} material={materials.darkFascia} castShadow>
          <boxGeometry args={[4.8, 0.18, 1.2]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 4. GROUND FLOOR REAR & LEFT EXTERIOR WALLS                                */}
      {/* ========================================================================= */}
      <group ref={rearWallGroupRef} position={[0, 1.15, -2.4]}>
        <mesh material={materials.wallWhitePlaster} castShadow>
          <boxGeometry args={[6.6, 1.9, 0.2]} />
        </mesh>
      </group>

      <group ref={leftWallGroupRef} position={[-3.3, 1.15, 0]}>
        <mesh material={materials.wallWhitePlaster} castShadow>
          <boxGeometry args={[0.2, 1.9, 4.8]} />
        </mesh>
      </group>

      <group ref={rightWallGroupRef} position={[3.3, 1.15, 0]}>
        <mesh material={materials.wallCharcoalMasonry} castShadow>
          <boxGeometry args={[0.2, 1.9, 4.8]} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 5. SECOND FLOOR (2ND LEVEL): CANTILEVERED TIMBER BOX & BALCONY TERRACE    */}
      {/* ========================================================================= */}
      <group ref={upperFloorGroupRef} position={[0, 2.22, 0]}>
        {/* Second Floor Structural Slab */}
        <mesh position={[-0.6, 0.05, 0.3]} material={materials.interiorFloorParquet} receiveShadow>
          <boxGeometry args={[5.2, 0.12, 4.6]} />
        </mesh>

        {/* Master Bedroom Left / Rear Enclosure with Vertical Cedar Slats */}
        <group position={[-1.7, 0.95, 0.2]}>
          {/* Left Exterior Vertical Cedar Timber Slat Wall */}
          <mesh position={[-1.0, 0, 0]} material={materials.timberCedarSlat} castShadow>
            <boxGeometry args={[0.16, 1.8, 4.2]} />
          </mesh>
          {/* Back White Plaster Wall */}
          <mesh position={[0.4, 0, -2.1]} material={materials.wallWhitePlaster} castShadow>
            <boxGeometry args={[3.0, 1.8, 0.18]} />
          </mesh>
        </group>

        {/* --- 2ND FLOOR BALCONY TERRACE WITH GLASS RAILING & GREEN PLANTERS --- */}
        <group position={[0.4, 0, 1.6]}>
          {/* Teak Balcony Floor Deck */}
          <mesh position={[0, 0.06, 0]} material={materials.teakDeck} receiveShadow>
            <boxGeometry args={[2.8, 0.08, 1.6]} />
          </mesh>

          {/* Frameless Glass Railing (Front) */}
          <mesh position={[0, 0.44, 0.76]} material={materials.balconyGlass}>
            <boxGeometry args={[2.8, 0.72, 0.03]} />
          </mesh>
          {/* Black Steel Top Rail Cap */}
          <mesh position={[0, 0.81, 0.76]} material={materials.blackSteelFrame}>
            <boxGeometry args={[2.84, 0.04, 0.05]} />
          </mesh>

          {/* Frameless Glass Railing (Right Side) */}
          <mesh position={[1.38, 0.44, 0]} material={materials.balconyGlass}>
            <boxGeometry args={[0.03, 0.72, 1.55]} />
          </mesh>
          <mesh position={[1.38, 0.81, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.05, 0.04, 1.58]} />
          </mesh>

          {/* Green Balcony Planters with Shrubs */}
          <group position={[0, 0.18, 0.65]}>
            <mesh material={materials.planterWhite}>
              <boxGeometry args={[2.6, 0.22, 0.14]} />
            </mesh>
            <mesh position={[0, 0.11, 0]} material={materials.topiaryShrubGreen}>
              <boxGeometry args={[2.55, 0.12, 0.12]} />
            </mesh>
          </group>
        </group>

        {/* 2nd Floor Master Suite / Lounge Interior Details */}
        <group position={[-1.2, 0.1, -0.4]}>
          {/* Lounge Bed / Daybed */}
          <mesh position={[0, 0.2, 0]} material={materials.sofaFabricCream} castShadow>
            <boxGeometry args={[1.6, 0.32, 1.8]} />
          </mesh>
          {/* Bedside Teak Stand */}
          <mesh position={[0.9, 0.15, -0.4]} material={materials.timberCedarSlat}>
            <boxGeometry args={[0.3, 0.28, 0.3]} />
          </mesh>
        </group>

        {/* 2nd Floor Front Panoramic Sliding Glass Walls */}
        <group ref={upperFrontWallRef} position={[-0.8, 0.95, 2.0]}>
          <mesh material={materials.panoramicGlass}>
            <boxGeometry args={[3.2, 1.8, 0.04]} />
          </mesh>
          {/* Black Steel Perimeter Frame */}
          <mesh position={[0, 0.88, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[3.24, 0.06, 0.08]} />
          </mesh>
          <mesh position={[0, -0.88, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[3.24, 0.06, 0.08]} />
          </mesh>
          <mesh position={[-1.6, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.06, 1.8, 0.08]} />
          </mesh>
          <mesh position={[0.2, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.05, 1.8, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 6. CANTILEVERED ROOF CANOPY & RECESSED CEILING SPOTLIGHTS                 */}
      {/* ========================================================================= */}
      <group ref={roofGroupRef} position={[0, 4.25, 0]}>
        {/* Main Angled Cantilevered Flat-Roof Slab with Charcoal Fascia */}
        <mesh position={[-0.5, 0.1, 0.4]} material={materials.darkFascia} castShadow>
          <boxGeometry args={[5.8, 0.22, 5.2]} />
        </mesh>

        {/* Warm Timber Under-Soffit Ceiling Lining */}
        <mesh position={[-0.5, -0.02, 0.4]} material={materials.timberSoffit}>
          <boxGeometry args={[5.6, 0.02, 5.0]} />
        </mesh>

        {/* Bold Black Steel Roof Trim / Outer Box Frame (Matching Reference) */}
        <group position={[-0.5, 0.1, 0.4]}>
          {/* Front Extended Canopy Overhang */}
          <mesh position={[0, 0, 2.65]} material={materials.blackSteelFrame}>
            <boxGeometry args={[5.9, 0.26, 0.12]} />
          </mesh>
          {/* Left Extended Canopy Overhang */}
          <mesh position={[-2.95, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.12, 0.26, 5.3]} />
          </mesh>
          {/* Right Extended Canopy Overhang */}
          <mesh position={[2.95, 0, 0]} material={materials.blackSteelFrame}>
            <boxGeometry args={[0.12, 0.26, 5.3]} />
          </mesh>
        </group>

        {/* 4 Recessed Warm Architectural Ceiling Spotlights (Soffit Downlights) */}
        {[
          [-1.6, -0.03, 1.8],
          [-0.6, -0.03, 1.8],
          [0.4, -0.03, 1.8],
          [1.4, -0.03, 1.8],
        ].map((spotPos, idx) => (
          <group key={idx} position={spotPos}>
            {/* Dark Bezel Ring */}
            <mesh material={materials.blackSteelFrame}>
              <boxGeometry args={[0.22, 0.02, 0.22]} />
            </mesh>
            {/* Glowing Warm Light Emitter */}
            <mesh position={[0, -0.01, 0]} material={materials.ceilingSpotGlow}>
              <boxGeometry args={[0.16, 0.02, 0.16]} />
            </mesh>
          </group>
        ))}
      </group>

    </group>
  );
};

export default BuildingModel;
