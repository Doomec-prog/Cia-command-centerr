import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.05, 0.1, 0.15],
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 },
        { location: [40.7128, -74.0060], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.08 },
        { location: [35.6895, 139.6917], size: 0.1 },
        { location: [55.7558, 37.6173], size: 0.06 },
        { location: [39.9042, 116.4074], size: 0.09 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/40">
      <canvas
        ref={canvasRef}
        style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
        className="cursor-move"
      />
    </div>
  );
}
