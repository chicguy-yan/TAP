import React, { useState, useRef, useEffect } from 'react';
import { ProblemData } from '../types';
import { Skull, ChevronDown, Check, AlertTriangle, Info } from 'lucide-react';

interface ScaffoldSolverProps {
  problem: ProblemData;
  onComplete: () => void;
}

export const ScaffoldSolver: React.FC<ScaffoldSolverProps> = ({ problem, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showPitfall, setShowPitfall] = useState(false);
  const stepsEndRef = useRef<HTMLDivElement>(null);

  const currentStep = problem.steps[currentStepIndex];
  const isLastStep = currentStepIndex === problem.steps.length - 1;

  useEffect(() => {
    stepsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStepIndex, showPitfall]);

  const handleNext = () => {
    const nextStepIdx = currentStepIndex + 1;
    const nextStep = problem.steps[nextStepIdx];
    
    // Logic: Show pitfall if the CURRENT step logic implies a danger zone before moving on
    // In this POC, if current step has a pitfall attached, we show it before allowing progress
    if (currentStep.pitfall && !showPitfall) {
      setShowPitfall(true);
      return;
    }

    if (showPitfall) {
      setShowPitfall(false);
    }

    if (nextStepIdx < problem.steps.length) {
      setCurrentStepIndex(nextStepIdx);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">思维脚手架</h2>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
            步骤 {currentStepIndex + 1}/{problem.steps.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-1 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / problem.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Steps Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {problem.steps.map((step, index) => {
          if (index > currentStepIndex) return null;

          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.id} className={`transition-all duration-500 ${isCurrent ? 'opacity-100' : 'opacity-60'}`}>
              {/* Instruction (Mental Action) */}
              <div className="flex gap-3 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
                  ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}
                `}>
                  {index + 1}
                </div>
                <div className="text-sm font-bold text-slate-600 pt-1">
                  {step.instruction}
                </div>
              </div>

              {/* Math Content (The actual work) */}
              <div className={`ml-9 p-4 rounded-lg border-l-4 shadow-sm font-serif text-lg
                ${isCurrent 
                  ? 'bg-white border-indigo-500 text-slate-800' 
                  : 'bg-slate-100 border-slate-300 text-slate-500'
                }
              `}>
                <pre className="whitespace-pre-wrap font-serif">{step.content}</pre>
              </div>

              {/* Pitfall Warning (Inserted dynamically) */}
              {isCurrent && showPitfall && step.pitfall && (
                <div className="ml-9 mt-4 animate-in slide-in-from-top-4 fade-in">
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 shadow-lg relative overflow-hidden">
                    {/* Background Icon */}
                    <div className="absolute -right-4 -top-4 text-rose-100/50 transform rotate-12">
                      <Skull size={120} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-rose-700 mb-2 font-bold">
                        <AlertTriangle size={20} />
                        <span>警惕！此处有坑 (Pitfall)</span>
                      </div>
                      <p className="text-rose-800 text-sm mb-3 leading-relaxed font-medium">
                        {step.pitfall.description}
                      </p>
                      
                      <div className="bg-white/80 rounded p-3 text-xs text-rose-900 border border-rose-100">
                        <span className="font-bold block mb-1 flex items-center gap-1">
                           <Info size={12}/> 惨痛教训 (反例):
                        </span>
                        {step.pitfall.counterExample}
                      </div>

                      <button 
                        onClick={handleNext}
                        className="mt-4 w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded shadow transition"
                      >
                        已检查，我还没挂。继续。
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={stepsEndRef} />
      </div>

      {/* Footer Controls */}
      <div className="bg-white border-t border-slate-200 p-4 shrink-0">
        {!showPitfall && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isLastStep ? (
              <>完成并生成 TAP 卡片 <Check size={20} /></>
            ) : (
              <>下一步 <ChevronDown size={20} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};