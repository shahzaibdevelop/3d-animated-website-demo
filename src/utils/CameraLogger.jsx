import { useThree } from '@react-three/fiber';
import { useRef,useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
const CameraLogger = () => {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
  
    useEffect(() => {
      const handleChange = () => {
        console.log("Camera Position:", camera.position);
        console.log("Camera Rotation:", camera.rotation);
      };
  
      const controls = controlsRef.current;
      controls.addEventListener('change', handleChange);
  
      return () => {
        controls.removeEventListener('change', handleChange);
      };
    }, [camera, gl]);
  
    return <OrbitControls ref={controlsRef} />;
}

export default CameraLogger
