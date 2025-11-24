
import React, { useState } from 'react';
import { ScreenState, RelatedLink, ProblemData } from './types';
import { MOCK_PROBLEM } from './constants';
import { CameraMock } from './components/CameraMock';
import { AnalysisView } from './components/AnalysisView';
import { ScaffoldSolver } from './components/ScaffoldSolver';
import { TapCard } from './components/TapCard';
import { SchemaLibrary } from './components/SchemaLibrary';
import { SchemaDeepDive } from './components/SchemaDeepDive';
import { MistakeNotebook } from './components/MistakeNotebook';
import { Zap, BookOpen, History, User, ChevronRight, Target, BrainCircuit, Bookmark } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.HOME);
  const [selectedLink, setSelectedLink] = useState<RelatedLink | null>(null);
  const [activeProblem, setActiveProblem] = useState<ProblemData>(MOCK_PROBLEM);

  const renderScreen = () => {
    switch (screen) {
      case ScreenState.HOME:
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800">
            {/* Header */}
            <div className="px-6 py-6 bg-white border-b border-slate-200 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-indigo-900">
                    TAP<span className="text-indigo-500">.数学</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                    核心图式构建器
                  </p>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                  <User size={20} />
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Philosophy / Hero */}
              <section>
                <div className="bg-gradient-to-br from-indigo-700 to-violet-800 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                  {/* Background Decor */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                      <Target size={16} className="text-yellow-300" />
                      <span className="text-xs font-bold tracking-wide uppercase">高考策略</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 leading-snug">
                      80% 的分数属于<br/>“标准化模型”
                    </h2>
                    <p className="text-indigo-100 text-sm mb-6 leading-relaxed opacity-90">
                      不要在基础题上重复发明轮子。快速识别图式，把宝贵的时间留给那 20% 的压轴题。
                    </p>
                    
                    <button 
                      onClick={() => {
                        setActiveProblem(MOCK_PROBLEM); // Reset to default for demo
                        setScreen(ScreenState.CAMERA);
                      }}
                      className="w-full bg-white text-indigo-800 py-3.5 rounded-xl font-bold shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                    >
                      <Zap size={18} className="fill-indigo-700" />
                      拍题 · 提取图式
                    </button>
                  </div>
                </div>
              </section>

              {/* Tools Grid */}
              <section className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => setScreen(ScreenState.MISTAKE_LIST)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition text-left group flex flex-col justify-between h-32"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
                    <Bookmark size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">我的错题本</div>
                    <div className="text-xs text-slate-400 mt-1">3 道待复习</div>
                  </div>
                </button>

                <button 
                  onClick={() => setScreen(ScreenState.LIBRARY)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition text-left group flex flex-col justify-between h-32"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">图式模型库</div>
                    <div className="text-xs text-slate-400 mt-1">已掌握 20 个模型</div>
                  </div>
                </button>
              </section>

              {/* Recent Pitfalls (Anti-pattern list) */}
              <section>
                 <div className="flex items-center gap-2 mb-3">
                   <History size={18} className="text-slate-400"/>
                   <h3 className="font-bold text-slate-700">最近的“坑” (Pitfalls)</h3>
                 </div>
                 
                 <div className="bg-slate-50 rounded-xl border border-slate-200 p-1">
                    <div className="p-3 border-b border-slate-100 flex gap-3 items-start">
                       <div className="bg-rose-100 p-1.5 rounded text-rose-600">
                         <Zap size={14} />
                       </div>
                       <div>
                         <p className="text-xs text-rose-600 font-bold uppercase">对数函数</p>
                         <p className="text-sm text-slate-600 mt-0.5">解方程时忘记检查真数大于0</p>
                       </div>
                    </div>
                    <div className="p-3 flex gap-3 items-start">
                       <div className="bg-rose-100 p-1.5 rounded text-rose-600">
                         <Zap size={14} />
                       </div>
                       <div>
                         <p className="text-xs text-rose-600 font-bold uppercase">基本不等式</p>
                         <p className="text-sm text-slate-600 mt-0.5">使用“一正二定三相等”时没检查取等条件</p>
                       </div>
                    </div>
                 </div>
              </section>

            </div>
          </div>
        );

      case ScreenState.LIBRARY:
        return (
          <SchemaLibrary onBack={() => setScreen(ScreenState.HOME)} />
        );

      case ScreenState.MISTAKE_LIST:
        return (
          <MistakeNotebook 
            onBack={() => setScreen(ScreenState.HOME)}
            onSelectProblem={(problem) => {
              setActiveProblem(problem);
              setScreen(ScreenState.SUMMARY);
            }}
          />
        );

      case ScreenState.CAMERA:
        return (
          <CameraMock 
            onCapture={() => setScreen(ScreenState.ANALYSIS)} 
          />
        );

      case ScreenState.ANALYSIS:
        return (
          <AnalysisView 
            problem={activeProblem} 
            onComplete={() => setScreen(ScreenState.SCAFFOLD)} 
          />
        );

      case ScreenState.SCAFFOLD:
        return (
          <ScaffoldSolver 
            problem={activeProblem} 
            onComplete={() => setScreen(ScreenState.SUMMARY)} 
          />
        );

      case ScreenState.SUMMARY:
        return (
          <TapCard 
            problem={activeProblem} 
            onHome={() => setScreen(ScreenState.HOME)} 
            onLinkClick={(link) => {
              setSelectedLink(link);
              setScreen(ScreenState.DEEP_DIVE);
            }}
          />
        );
      
      case ScreenState.DEEP_DIVE:
        return selectedLink ? (
          <SchemaDeepDive 
            link={selectedLink}
            onBack={() => setScreen(ScreenState.SUMMARY)}
          />
        ) : null;
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center">
      {/* Mobile Frame Wrapper */}
      <div className="w-full h-full max-w-md bg-white relative overflow-hidden md:rounded-3xl md:h-[90vh] md:shadow-2xl md:border-4 md:border-zinc-800">
        {renderScreen()}
      </div>
    </div>
  );
}
