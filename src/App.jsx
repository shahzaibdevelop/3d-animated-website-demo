import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Carglb from "./model/Carglb";
import CameraLogger from "./utils/CameraLogger";

function App() {
  const cameraRef = useRef(); // Reference to store the camera object
  const [scalingFactor, setScalingFactor] = useState(1); // State to store the scaling factor

  // Effect to update scaling factor based on window size
  useEffect(() => {
    const updateScalingFactor = () => {
      // Calculate scaling factor based on window width
      const factor = window.innerWidth < 768 ? window.innerWidth / 500 : window.innerWidth / 1500;
      setScalingFactor(factor); // Update state with the calculated factor
    };

    updateScalingFactor(); // Initial update on component mount

    // Add event listener to update scaling factor on window resize
    window.addEventListener("resize", updateScalingFactor);

    // Clean up: Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateScalingFactor);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Effect to set initial rotation of the camera
  useEffect(() => {
    if (cameraRef.current) {
      // Set initial rotation of the camera
      cameraRef.current.rotation.set(-1.539714944992137, -0.00010467150952159014, -0.0033665622223623226);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [-0.0006264981424644488, 5.982483222189624, 0.18600374546384155], // Initial camera position
          fov: 60, // Field of view of the camera
          ref: cameraRef, // Reference to attach camera controls
        }}
      >
        <ambientLight intensity={0.8} /> {/* Ambient light source */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Spot light source */}
        <pointLight position={[-10, -10, -10]} /> {/* Point light source */}
        <directionalLight position={[0, 10, 0]} /> {/* Directional light source */}
        <Carglb position={[0, 0, 0]} scale={[scalingFactor, scalingFactor, scalingFactor]} /> {/* 3D model with scaling based on scalingFactor */}
        <CameraLogger /> {/* Component to log camera position and rotation */}
        <OrbitControls /> {/* Orbit controls for interactive camera movement */}
      </Canvas>
    </div>
  );
}

export default App;
