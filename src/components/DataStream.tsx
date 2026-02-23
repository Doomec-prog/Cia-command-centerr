import { useEffect, useState } from 'react';

const generateHex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
const generateIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

export function DataStream() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLine = `[${new Date().toISOString().substr(11, 8)}] SIGINT: ${generateIP()} -> ${generateHex()}...`;
        const next = [...prev, newLine];
        if (next.length > 20) next.shift();
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full font-mono text-[10px] leading-tight text-cyan-500/70 overflow-hidden relative">
      <div className="absolute bottom-0 w-full flex flex-col justify-end">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-nowrap opacity-80">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
