import React, { useState } from 'react';
import { Scan, Image as ImageIcon, X } from 'lucide-react';

interface CameraMockProps {
  onCapture: () => void;
}

export const CameraMock: React.FC<CameraMockProps> = ({ onCapture }) => {
  const [scanning, setScanning] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    setTimeout(() => {
      onCapture();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {/* Camera Viewport Mock */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Live Feed Simulation */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
           <p className="text-white/50 text-sm font-medium">请将题目置于方框内</p>
        </div>

        {/* Framing Box */}
        <div className="relative w-4/5 aspect-[4/3] border-2 border-white/30 rounded-lg z-10 overflow-hidden">
           {/* Scanning Line Animation */}
           {scanning && (
             <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
           )}
           <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500"></div>
           <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500"></div>
           <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500"></div>
           <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500"></div>
           
           {/* Mock Text Content visible "through camera" */}
           <div className="p-6 text-gray-300 font-serif text-lg leading-relaxed opacity-80 blur-[0.5px]">
             已知 f(x) 是定义在 R 上的偶函数...
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-36 bg-black flex items-center justify-around px-8 pb-8 pt-4 z-20">
        <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition">
          <ImageIcon size={24} />
        </button>
        
        <button 
          onClick={handleCapture}
          disabled={scanning}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group"
        >
          <div className={`w-16 h-16 bg-white rounded-full transition-transform duration-200 ${scanning ? 'scale-90 bg-indigo-500' : 'group-active:scale-90'}`}></div>
        </button>

        <button className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition">
          <Scan size={24} />
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};