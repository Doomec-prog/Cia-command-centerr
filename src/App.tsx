import { Globe } from './components/Globe';
import { Map } from './components/Map';
import { CameraFeed } from './components/CameraFeed';
import { DataStream } from './components/DataStream';
import { Activity, Crosshair, Database, Globe2, Map as MapIcon, Maximize, Radio, ShieldAlert, Terminal, Video } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-cyan-500 font-mono overflow-hidden flex flex-col selection:bg-cyan-900 selection:text-cyan-100">
      {/* Top Navigation Bar */}
      <header className="h-12 border-b border-cyan-900/50 bg-black/80 flex items-center justify-between px-4 shrink-0 relative z-50 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest">
            <ShieldAlert size={18} className="animate-pulse" />
            <span className="hidden sm:inline">GLOBAL THREAT MONITOR</span>
            <span className="sm:hidden">GTM</span>
          </div>
          <div className="h-4 w-[1px] bg-cyan-900/50 mx-2"></div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs tracking-wider">
            <button className="flex items-center gap-2 hover:text-cyan-300 transition-colors px-2 py-1 bg-cyan-950/30 border border-cyan-900/50 rounded-sm">
              <Globe2 size={14} />
              <span className="hidden md:inline">ORBITAL</span>
            </button>
            <button className="flex items-center gap-2 hover:text-cyan-300 transition-colors px-2 py-1 bg-cyan-950/30 border border-cyan-900/50 rounded-sm">
              <MapIcon size={14} />
              <span className="hidden md:inline">TACTICAL</span>
            </button>
            <button className="flex items-center gap-2 hover:text-cyan-300 transition-colors px-2 py-1 bg-cyan-950/30 border border-cyan-900/50 rounded-sm">
              <Video size={14} />
              <span className="hidden md:inline">SURVEILLANCE</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs tracking-widest ml-4">
          <div className="hidden md:flex items-center gap-2">
            <Radio size={14} className="text-green-500 animate-pulse" />
            <span className="text-green-500">UPLINK SECURE</span>
          </div>
          <div className="text-cyan-300">
            {time.toISOString().substring(0, 19).replace('T', ' ')} UTC
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 p-2 flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-6 gap-2 h-auto lg:h-[calc(100vh-3rem)] overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column - Data Streams */}
        <div className="col-span-12 lg:col-span-3 lg:row-span-6 flex flex-col gap-2">
          {/* System Status */}
          <div className="h-48 border border-cyan-900/50 bg-black/40 p-3 relative group shrink-0">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest mb-4 border-b border-cyan-900/50 pb-2">
              <Activity size={14} />
              <span>SYSTEM STATUS</span>
            </div>
            <div className="space-y-3 text-[10px]">
              <div className="flex justify-between items-center">
                <span>SAT_COM_LINK</span>
                <span className="text-green-500">ONLINE</span>
              </div>
              <div className="w-full bg-cyan-950 h-1 mt-1">
                <div className="bg-green-500 h-full w-[98%]"></div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span>SIGINT_PROCESSING</span>
                <span className="text-yellow-500">94% LOAD</span>
              </div>
              <div className="w-full bg-cyan-950 h-1 mt-1">
                <div className="bg-yellow-500 h-full w-[94%]"></div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span>ENCRYPTION_KEY</span>
                <span className="text-cyan-300">ROTATING</span>
              </div>
              <div className="w-full bg-cyan-950 h-1 mt-1">
                <div className="bg-cyan-500 h-full w-[45%]"></div>
              </div>
            </div>
          </div>

          {/* Raw Data Stream */}
          <div className="h-48 lg:flex-1 border border-cyan-900/50 bg-black/40 p-3 relative flex flex-col shrink-0">
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest mb-2 border-b border-cyan-900/50 pb-2">
              <Terminal size={14} />
              <span>RAW INTERCEPT</span>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <DataStream />
            </div>
          </div>
        </div>

        {/* Center Column - Maps */}
        <div className="col-span-12 lg:col-span-6 lg:row-span-6 flex flex-col gap-2">
          {/* 3D Globe */}
          <div className="h-64 lg:flex-1 border border-cyan-900/50 bg-black/40 relative group overflow-hidden shrink-0">
            <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-xs font-bold tracking-widest bg-black/60 px-2 py-1 border border-cyan-900/50">
              <Globe2 size={14} />
              <span>ORBITAL VIEW</span>
            </div>
            <div className="absolute top-2 right-2 z-10">
              <button className="p-1 hover:bg-cyan-900/50 transition-colors border border-transparent hover:border-cyan-500">
                <Maximize size={14} />
              </button>
            </div>
            <Globe />
            {/* Crosshair overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
              <Crosshair size={200} className="lg:w-[400px] lg:h-[400px]" strokeWidth={0.5} />
            </div>
          </div>

          {/* 2D Map */}
          <div className="h-64 border border-cyan-900/50 bg-black/40 relative overflow-hidden shrink-0">
            <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-xs font-bold tracking-widest bg-black/60 px-2 py-1 border border-cyan-900/50">
              <MapIcon size={14} />
              <span>TACTICAL PROJECTION</span>
            </div>
            <Map />
          </div>
        </div>

        {/* Right Column - Camera Feeds & Intel */}
        <div className="col-span-12 lg:col-span-3 lg:row-span-6 flex flex-col gap-2">
          {/* Camera Grid */}
          <div className="h-96 lg:flex-1 border border-cyan-900/50 bg-black/40 p-2 relative flex flex-col gap-2 shrink-0">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
            <div className="flex items-center justify-between text-xs font-bold tracking-widest mb-1 px-1">
              <div className="flex items-center gap-2">
                <Video size={14} />
                <span>LIVE SURVEILLANCE</span>
              </div>
              <span className="text-red-500 animate-pulse">LIVE</span>
            </div>
            
            <div className="flex-1 grid grid-rows-3 gap-2">
              <CameraFeed id="CAM-01" location="SECTOR 7G - ENTRY" seed="1" />
              <CameraFeed id="CAM-02" location="PERIMETER FENCE B" seed="2" />
              <CameraFeed id="CAM-03" location="SERVER ROOM ALPHA" seed="3" />
            </div>
          </div>

          {/* Target Intel */}
          <div className="h-48 border border-cyan-900/50 bg-black/40 p-3 relative shrink-0">
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest mb-2 border-b border-cyan-900/50 pb-2">
              <Database size={14} />
              <span>ACTIVE TARGETS</span>
            </div>
            <div className="space-y-2 text-[10px]">
              <div className="p-2 border border-red-900/50 bg-red-950/20 hover:bg-red-950/40 cursor-pointer transition-colors">
                <div className="flex justify-between text-red-500 font-bold mb-1">
                  <span>TRG-ALPHA-9</span>
                  <span>PRIORITY 1</span>
                </div>
                <div className="text-cyan-500/70">LOC: 40.7128° N, 74.0060° W</div>
                <div className="text-cyan-500/70">STATUS: MOVING</div>
              </div>
              <div className="p-2 border border-yellow-900/50 bg-yellow-950/20 hover:bg-yellow-950/40 cursor-pointer transition-colors">
                <div className="flex justify-between text-yellow-500 font-bold mb-1">
                  <span>TRG-BRAVO-2</span>
                  <span>PRIORITY 2</span>
                </div>
                <div className="text-cyan-500/70">LOC: 51.5074° N, 0.1278° W</div>
                <div className="text-cyan-500/70">STATUS: STATIONARY</div>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      {/* Scanline Overlay for entire screen */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20"></div>
    </div>
  );
}
