import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Carglb from "./model/Carglb";
import Hero from "./components/Hero";
import Detail from "./components/Detail";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function App() {
  const cameraRef = useRef();
  const [scalingFactor, setScalingFactor] = useState(1);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const updateScalingFactor = () => {
      const factor = window.innerWidth < 768 ? window.innerWidth / 200 : window.innerWidth / 1500;
      setScalingFactor(factor);
    };

    updateScalingFactor();
    window.addEventListener("resize", updateScalingFactor);
    return () => {
      window.removeEventListener("resize", updateScalingFactor);
    };
  }, []);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.rotation.set(-1.539714944992137, -0.00010467150952159014, -0.0033665622223623226);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%",overflow:"visible" }}>
      <Hero style={{ position: "absolute", top: 0, left: 0 }} />
      <Canvas
        camera={{
          position: [-0.0006264981424644488, 5.982483222189624, 0.18600374546384155],
          fov: 60,
          ref: cameraRef,
        }}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 1, width: "100%", height: "100%"}}
      >
        <ambientLight intensity={1.9} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <directionalLight position={[0, 20, 0]} />
        <Carglb position={[0, 0, 0]} scale={[scalingFactor, scalingFactor, scalingFactor]} />
      </Canvas>
      <Detail  />
    </div>
  );
}

export default App;
