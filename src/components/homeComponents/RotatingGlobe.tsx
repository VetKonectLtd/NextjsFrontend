'use client';

import { useEffect, useRef, useCallback } from 'react';
import globeflat from '../../app/assets/images/globeflat.png';

// Overlay images
import globeImageBottomLeft from '../../app/assets/images/globeimagebottomleft.svg';
import globeImageCenter from '../../app/assets/images/globeimagecenter.svg';
import globeImageMiddleLeft from '../../app/assets/images/globeimagemiddleleft.svg';
import globeImageMiddleRight from '../../app/assets/images/globeimagemiddleright.svg';
import globeImageTopLeft from '../../app/assets/images/globeimagetopleft.svg';
import globeImageTopRight from '../../app/assets/images/globeimagetopright.svg';

import type { GlobeInstance } from 'globe.gl';


const RotatingGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);

  const handleResize = useCallback(() => {
    if (globeRef.current && containerRef.current) {
      globeRef.current
        .width(containerRef.current.offsetWidth)
        .height(containerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    import('globe.gl').then((GlobeModule) => {
      const Globe = GlobeModule.default;

      const world = new Globe(container)
        .globeImageUrl(
          typeof globeflat === 'string' ? globeflat : globeflat.src
        )
        .showAtmosphere(true)
        .backgroundColor('rgba(0,0,0,0)')
        .width(container.offsetWidth)
        .height(container.offsetHeight)
        .htmlElementsData([])
        .labelsData([])
        .pointsData([])
        .arcsData([])
        .polygonsData([]);

      try {
       
        const controls = world.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed =
            window.innerWidth < 640 ? 0.5 : 1.0;
        }
      } catch {}

      globeRef.current = world;

      // Fix initial sizing delay (important for mobile)
      setTimeout(handleResize, 100);

      window.addEventListener('resize', handleResize);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) containerRef.current.innerHTML = '';
      globeRef.current = null;
    };
  }, [handleResize]);

  return (
    <div className="relative w-full h-[350px] sm:h-[500px] md:h-[600px] overflow-hidden mt-10 sm:mt-0">
      {/* Globe */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left */}
        <div className="absolute top-[15%] left-[15%] sm:left-[25%] -translate-x-1/2 -translate-y-1/2">
          <img
            src={typeof globeImageTopLeft === 'string' ? globeImageTopLeft : globeImageTopLeft.src}
            className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
            alt=""
          />
        </div>

        {/* Top Right */}
        <div className="absolute top-[15%] right-[15%] sm:right-[25%] translate-x-1/2 -translate-y-1/2">
          <img
            src={typeof globeImageTopRight === 'string' ? globeImageTopRight : globeImageTopRight.src}
            className="w-16 h-16 sm:w-32 sm:h-32 object-contain"
            alt=""
          />
        </div>

        {/* Middle Left */}
        <div className="absolute top-1/2 left-[10%] sm:left-[15%] -translate-x-1/2 -translate-y-1/2">
          <img
            src={typeof globeImageMiddleLeft === 'string' ? globeImageMiddleLeft : globeImageMiddleLeft.src}
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
            alt=""
          />
        </div>

        {/* Middle Right */}
        <div className="absolute top-1/2 right-[10%] sm:right-[15%] translate-x-1/2 -translate-y-1/2">
          <img
            src={typeof globeImageMiddleRight === 'string' ? globeImageMiddleRight : globeImageMiddleRight.src}
            className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
            alt=""
          />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-[15%] left-[15%] sm:left-[50%] -translate-x-1/2 translate-y-1/2">
          <img
            src={typeof globeImageBottomLeft === 'string' ? globeImageBottomLeft : globeImageBottomLeft.src}
            className="w-16 h-16 sm:w-28 sm:h-28 object-contain"
            alt=""
          />
        </div>

        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={typeof globeImageCenter === 'string' ? globeImageCenter : globeImageCenter.src}
            className="w-14 h-14 sm:w-24 sm:h-24 object-contain"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RotatingGlobe;