
import React, { useEffect, useState } from 'react';
import { ProblemData, RelatedLink } from '../types';
import { Share2, Download, Home, Layers, ChevronRight, Network, Zap, Sparkles, BrainCircuit, ScanLine } from 'lucide-react';

interface TapCardProps {
  problem: ProblemData;
  onHome: () => void;
  onLinkClick: (link: RelatedLink) => void;
}

// Visual Graph Component with Staged Animation
const KnowledgeGraph: React.FC<{ problem: ProblemData; onLinkClick: (link: RelatedLink) => void }> = ({ problem, onLinkClick }) => {
  const [phase, setPhase] = useState(0); // 0: Scanning, 1: Nodes Appear, 2: Links Form

  useEffect(() => {
    // Sequence the animation to create a "process" feel
    const t1 = setTimeout(() => setPhase(1), 1200); // Show nodes after scanning
    const t2 = setTimeout(() => setPhase(2), 2000); // Draw links
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Fixed positions for up to 5 related links (0-100 coordinate space)
  const POSITIONS = [
    { x: 20, y: 30 },  // Top Left
    { x: 80, y: 30 },  // Top Right
    { x: 50, y: 85 },  // Bottom
    { x: 15, y: 60 },  // Mid Left
    { x: 85, y: 60 },  // Mid Right
  ];

  return (
    <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-xl mb-4 overflow-hidden border border-slate-800 shadow-2xl group select-none ring-1 ring-white/10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/50 via-slate-950 to-black"></div>
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Phase 0: Scanning Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 flex flex-col items-center justify-center ${phase === 0 ? 'opacity-100' : 'opacity-0'}`}>
         <div className="relative">
           <BrainCircuit size={48} className="text-indigo-500 animate-pulse" />
           <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 animate-pulse"></div>
         </div>
         <p className="text-indigo-300 text-xs font-mono mt-3 animate-pulse">正在检索知识库关联...</p>
         {/* Scanning line */}
         <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,1)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
      </div>

      {/* Connection Layer (SVG) - Visible in Phase 2 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
             <stop offset="50%" stopColor="rgba(99, 102, 241, 0.8)" />
             <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {phase >= 2 && problem.relatedLinks.map((_, idx) => {
          const pos = POSITIONS[idx % POSITIONS.length];
          return (
            <g key={idx}>
              {/* Static faint line */}
              <line 
                x1="50" y1="50" 
                x2={pos.x} y2={pos.y} 
                stroke="rgba(148, 163, 184, 0.1)" 
                strokeWidth="0.5" 
              />
              
              {/* Growing beam */}
              <path
                d={`M50 50 L${pos.x} ${pos.y}`}
                stroke="url(#gradientLine)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#glow)"
                strokeDasharray="100"
                strokeDashoffset="100"
                className="animate-[draw_0.8s_ease-out_forwards]"
              />

              {/* Data Packet Particle */}
              <circle r="1.5" fill="#a5b4fc">
                <animateMotion 
                  dur={`${2 + idx}s`}
                  repeatCount="indefinite"
                  path={`M50 50 L${pos.x} ${pos.y}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central Node (Core Schema) - Visible in Phase 1 */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
         ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <div className="relative group/center cursor-default">
           <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-40 animate-pulse"></div>
           <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border-4 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.4)] relative z-10">
              <Zap size={28} className="text-indigo-400 fill-indigo-500/20 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
           </div>
           {/* Orbiting ring */}
           <div className="absolute inset-[-8px] rounded-full border border-indigo-500/20 border-t-indigo-400/60 animate-spin-slow"></div>
        </div>
        <span className="mt-4 px-3 py-1 bg-slate-900/80 backdrop-blur border border-indigo-500/30 rounded-full text-[10px] font-bold text-indigo-300 tracking-wider shadow-lg">
          CORE SCHEMA
        </span>
      </div>

      {/* Satellite Nodes (Related Links) - Visible in Phase 1 */}
      {problem.relatedLinks.map((link, idx) => {
        const pos = POSITIONS[idx % POSITIONS.length];
        // Staggered entrance for nodes
        const delay = idx * 100;

        return (
          <button
            key={link.id}
            onClick={() => onLinkClick(link)}
            className={`absolute z-30 flex flex-col items-center group/node focus:outline-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: phase >= 1 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
              opacity: phase >= 1 ? 1 : 0,
              transitionDelay: `${delay}ms`
            }}
          >
            {/* Icon Circle */}
            <div className={`w-10 h-10 rounded-xl rotate-45 flex items-center justify-center shadow-lg border transition-all duration-300 hover:scale-110 hover:shadow-xl hover:rotate-90 hover:rounded-full
               ${link.type === 'variant' 
                 ? 'bg-slate-900 border-amber-500/40 hover:bg-amber-900/20 hover:border-amber-400' 
                 : 'bg-slate-900 border-cyan-500/40 hover:bg-cyan-900/20 hover:border-cyan-400'}
            `}>
              <div className="-rotate-45 group-hover/node:rotate-0 transition-transform">
                 {link.type === 'variant' ? (
                   <Layers size={16} className="text-amber-400" />
                 ) : (
                   <Network size={16} className="text-cyan-400" />
                 )}
              </div>
            </div>

            {/* Always visible mini label */}
            <div className={`mt-6 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-slate-950/80 backdrop-blur-sm shadow-lg whitespace-nowrap
              ${link.type === 'variant' ? 'text-amber-500 border-amber-500/20' : 'text-cyan-500 border-cyan-500/20'}
            `}>
              {link.title.length > 6 ? link.title.substring(0, 6) + '...' : link.title}
            </div>

          </button>
        );
      })}

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export const TapCard: React.FC<TapCardProps> = ({ problem, onHome, onLinkClick }) => {
  return (
    <div className="flex flex-col h-full bg-slate-800 p-6 text-white overflow-y-auto">
      <div className="mb-6 text-center pt-2">
        <div className="inline-block px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold tracking-wider uppercase mb-2 shadow-glow animate-pulse">
          TAP 图式已生成
        </div>
        <h2 className="text-2xl font-bold">核心思维模型</h2>
        <p className="text-slate-400 text-sm">已存入你的大脑外挂库</p>
      </div>

      {/* The TAP Card UI */}
      <div className="bg-white text-slate-800 rounded-2xl p-1 shadow-2xl transform transition hover:scale-[1.01] mb-8">
        <div className="border-2 border-slate-100 rounded-xl p-5 h-full flex flex-col gap-5">
          
          {/* T - Trigger */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">T</span>
              <h3 className="font-bold text-indigo-900 text-sm tracking-wide">TRIGGER (触发器)</h3>
            </div>
            <p className="text-sm bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-800 font-medium leading-relaxed">
              {problem.tapCard.trigger}
            </p>
          </div>

          {/* A - Action */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">A</span>
              <h3 className="font-bold text-emerald-900 text-sm tracking-wide">ACTION (思维动作)</h3>
            </div>
            <p className="text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-emerald-800 leading-relaxed">
              {problem.tapCard.action}
            </p>
          </div>

          {/* P - Pitfall */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-rose-600 text-white flex items-center justify-center font-bold text-xs">P</span>
              <h3 className="font-bold text-rose-900 text-sm tracking-wide">PITFALL (陷阱)</h3>
            </div>
            <p className="text-sm bg-rose-50 p-3 rounded-lg border border-rose-100 text-rose-800 italic leading-relaxed">
              "{problem.tapCard.pitfall}"
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Linking Visualization */}
      <div className="mb-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 fill-mode-backwards">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase">
            <Sparkles size={14} className="text-yellow-400" />
            图式关联 (Knowledge Graph)
          </div>
          <div className="flex items-center gap-1">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             <span className="text-[10px] text-emerald-400 font-bold ml-1">Live Updating</span>
          </div>
        </div>
        
        {/* The Graph */}
        <KnowledgeGraph problem={problem} onLinkClick={onLinkClick} />
        
        {/* Reward Feedback */}
        <div className="bg-indigo-900/40 border border-indigo-500/20 rounded-lg p-3 flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
             <div className="p-1.5 bg-indigo-500/20 rounded-full text-indigo-300">
               <Network size={14} />
             </div>
             <div>
               <p className="text-xs font-bold text-indigo-200">双链构建成功</p>
               <p className="text-[10px] text-indigo-400">已激活 {problem.relatedLinks.length} 个相关神经元</p>
             </div>
           </div>
           <div className="text-emerald-400 text-xs font-bold">
             +15 EXP
           </div>
        </div>
        
        {/* List Fallback / Detail */}
        <div className="space-y-2">
          {problem.relatedLinks.map(link => (
            <button 
              key={link.id} 
              onClick={() => onLinkClick(link)}
              className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg p-3 flex items-center justify-between group cursor-pointer hover:bg-slate-700 hover:border-slate-500 transition-all text-left"
            >
               <div className="flex items-center gap-3">
                 <div className={`p-1.5 rounded ${link.type === 'variant' ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                   {link.type === 'variant' ? <Layers size={14} /> : <Network size={14} />}
                 </div>
                 <div>
                   <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{link.title}</p>
                 </div>
               </div>
               <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto grid grid-cols-2 gap-4">
        <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm">
          <Download size={16} /> 保存图式
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm">
          <Share2 size={16} /> 分享给同学
        </button>
        <button onClick={onHome} className="col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition">
          <Home size={20} /> 返回首页
        </button>
      </div>
    </div>
  );
};
