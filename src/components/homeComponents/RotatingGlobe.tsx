'use client';

import { useEffect, useRef, useCallback } from 'react';
import globeflat from '../../app/assets/images/globeflat.png';
// Import all globe images
import globeImageBottomLeft from '../../app/assets/images/globeimagebottomleft.svg';
import globeImageCenter from '../../app/assets/images/globeimagecenter.svg';
import globeImageMiddleLeft from '../../app/assets/images/globeimagemiddleleft.svg';
import globeImageMiddleRight from '../../app/assets/images/globeimagemiddleright.svg';
import globeImageTopLeft from '../../app/assets/images/globeimagetopleft.svg';
import globeImageTopRight from '../../app/assets/images/globeimagetopright.svg';

// Import globe.gl types
import type { GlobeInstance } from 'globe.gl';

const RotatingGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);

  const handleResize = useCallback(() => {
    if (globeRef.current && containerRef.current) {
      const container = containerRef.current;
      globeRef.current
        .width(container.offsetWidth)
        .height(container.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // Skip if we're in SSR mode or refs aren't ready
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;
    
    // Clear any existing content first
    container.innerHTML = '';
    
    // Dynamically import Globe to avoid SSR issues
    import('globe.gl').then((GlobeModule) => {
      const Globe = GlobeModule.default;
      
      // Initialize the globe with minimal configuration
      const world = new Globe(container)
        .globeImageUrl(typeof globeflat === 'string' ? globeflat : globeflat.src)
        .showAtmosphere(true)
        .width(container.offsetWidth)
        .height(container.offsetHeight)
        .backgroundColor('rgba(0, 0, 0, 0)')
        // Explicitly disable all overlay elements
        .htmlElementsData([])
        .labelsData([])
        .pointsData([])
        .arcsData([])
        .polygonsData([])
        .pathsData([])
        .hexBinPointsData([])
        .hexPolygonsData([])
        .tilesData([]);

      // Set up auto rotation manually
      try {
        const controls = world.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
        }
      } catch (e) {
        console.warn('Could not set up auto rotation:', e);
      }

      globeRef.current = world;
      resizeHandlerRef.current = handleResize;

      // Add resize listener
      window.addEventListener('resize', handleResize);
    });

    // Cleanup function
    return () => {
      // Remove event listener
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
      }
      
      // Clean up globe
      if (globeRef.current && containerRef.current) {
        try {
          // Clear any HTML elements first
          globeRef.current.htmlElementsData([]);
          
          const renderer = globeRef.current.renderer();
          if (renderer && renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        } catch (error) {
          console.warn('Error cleaning up globe:', error);
        }
        
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      }
      
      globeRef.current = null;
      resizeHandlerRef.current = null;
    };
  }, [handleResize]);

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Globe container */}
      <div 
        ref={containerRef} 
        className="w-full h-full absolute inset-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Fixed position container for images - overlaid on top */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Position each image absolutely within this container */}
        <div className="absolute" style={{ top: '15%', left: '25%', transform: 'translate(-50%, -50%)' }}>
          <img src={typeof globeImageTopLeft === 'string' ? globeImageTopLeft : globeImageTopLeft.src} alt="" className="w-16 h-16 object-contain" />
        </div>
        <div className="absolute" style={{ top: '15%', right: '25%', transform: 'translate(50%, -50%)' }}>
          <img src={typeof globeImageTopRight === 'string' ? globeImageTopRight : globeImageTopRight.src} alt="" className="w-16 h-16 object-contain" />
        </div>
        <div className="absolute" style={{ top: '50%', left: '15%', transform: 'translate(-50%, -50%)' }}>
          <img src={typeof globeImageMiddleLeft === 'string' ? globeImageMiddleLeft : globeImageMiddleLeft.src} alt="" className="w-20 h-20 object-contain" />
        </div>
        <div className="absolute" style={{ top: '50%', right: '15%', transform: 'translate(50%, -50%)' }}>
          <img src={typeof globeImageMiddleRight === 'string' ? globeImageMiddleRight : globeImageMiddleRight.src} alt="" className="w-20 h-20 object-contain" />
        </div>
        <div className="absolute" style={{ bottom: '20%', left: '25%', transform: 'translate(-50%, 50%)' }}>
          <img src={typeof globeImageBottomLeft === 'string' ? globeImageBottomLeft : globeImageBottomLeft.src} alt="" className="w-16 h-16 object-contain" />
        </div>
        <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img src={typeof globeImageCenter === 'string' ? globeImageCenter : globeImageCenter.src} alt="" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default RotatingGlobe;
