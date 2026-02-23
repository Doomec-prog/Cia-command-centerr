import { useEffect, useState } from 'react';

export function CameraFeed({ id, location, seed }: { id: string, location: string, seed: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full border border-zinc-800 bg-black overflow-hidden group">
      {/* Simulated camera feed using a grayscale image */}
      <img 
        src={`https://picsum.photos/seed/${seed}/400/200?blur=1`} 
        alt={`Camera ${id}`}
        className="w-full h-full object-cover opacity-60 grayscale contrast-125 brightness-75"
        referrerPolicy="no-referrer"
      />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-50"></div>
      
      {/* REC indicator */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-red-500 tracking-widest">REC</span>
      </div>

      {/* Camera Info */}
      <div className="absolute bottom-2 left-2 z-20 text-[10px] text-zinc-300 font-mono">
        <div>{location}</div>
        <div className="text-cyan-500">{time.toISOString().replace('T', ' ').substr(0, 19)}</div>
      </div>

      {/* Target box overlay (simulated AI tracking) */}
      <div className="absolute top-1/4 left-1/3 w-16 h-16 border border-cyan-500/50 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-500"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-500"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-500"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-500"></div>
        <div className="absolute -bottom-4 left-0 text-[8px] text-cyan-500 bg-black/50 px-1">TARGET_ACQ</div>
      </div>
    </div>
  );
}
