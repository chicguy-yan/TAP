import React, { useState } from 'react';
import { ProblemData, SchemaOption } from '../types';
import { Sparkles, AlertCircle, CheckCircle2, ArrowRight, BrainCircuit } from 'lucide-react';

interface AnalysisViewProps {
  problem: ProblemData;
  onComplete: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ problem, onComplete }) => {
  const [selectedTriggerId, setSelectedTriggerId] = useState<string | null>(null);
  const [selectedSchemaId, setSelectedSchemaId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<SchemaOption | null>(null);

  // Renderer highlights specific phrases
  const renderText = () => {
    let content = problem.rawText;
    const parts = [];
    let lastIndex = 0;

    // Simple text matching for mock data
    problem.triggers.forEach((trigger) => {
      const index = content.indexOf(trigger.text);
      if (index > -1) {
        // Text before
        parts.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex, index)}</span>);
        
        // Trigger Text
        const isSelected = selectedTriggerId === trigger.id;
        parts.push(
          <span
            key={trigger.id}
            onClick={() => !feedback?.isCorrect && setSelectedTriggerId(trigger.id)}
            className={`
              cursor-pointer px-1 rounded transition-all duration-300 border-b-2
              ${isSelected 
                ? 'bg-indigo-100 border-indigo-500 text-indigo-900 font-bold' 
                : 'bg-amber-100 border-amber-400 text-slate-800 hover:bg-amber-200'
              }
            `}
          >
            {trigger.text}
          </span>
        );
        lastIndex = index + trigger.text.length;
      }
    });
    parts.push(<span key="end">{content.substring(lastIndex)}</span>);

    return parts;
  };

  const handleSchemaSelect = (schema: SchemaOption) => {
    setSelectedSchemaId(schema.id);
    setFeedback(schema);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10">
        <div className="flex items-center gap-2 text-indigo-600 mb-1">
          <Sparkles size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Step 1: 识别与匹配</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">模式识别 (Schema)</h2>
        <p className="text-sm text-slate-500 mt-1">点击题干中的高亮关键词，激活你的思维图式。</p>
      </div>

      {/* Problem Text Area */}
      <div className="p-6 bg-white m-4 rounded-xl shadow-sm border border-slate-100 leading-loose text-lg text-slate-700 font-serif">
        {renderText()}
      </div>

      {/* Interaction Area */}
      <div className="flex-1 px-4 pb-8 overflow-y-auto">
        {selectedTriggerId ? (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
             {!feedback?.isCorrect ? (
               <div className="bg-white rounded-xl p-5 shadow-lg border border-indigo-100">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                     <BrainCircuit size={24} />
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800">选择思维模型</h3>
                     <p className="text-xs text-slate-500">看到这个条件，你的第一直觉是？</p>
                   </div>
                 </div>

                 <div className="space-y-3">
                   {problem.schemaOptions.map((opt) => (
                     <button
                       key={opt.id}
                       onClick={() => handleSchemaSelect(opt)}
                       className={`w-full text-left p-4 rounded-lg border transition-all
                         ${selectedSchemaId === opt.id 
                           ? (opt.isCorrect ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-red-300 bg-red-50') 
                           : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                         }
                       `}
                     >
                       <div className="font-semibold text-sm text-slate-800 mb-1">{opt.title}</div>
                       <div className="text-xs text-slate-500">{opt.description}</div>
                     </button>
                   ))}
                 </div>
                 
                 {/* Error Feedback */}
                 {feedback && !feedback.isCorrect && (
                   <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700 flex gap-2">
                     <AlertCircle className="shrink-0" size={18} />
                     <p>{feedback.explanation}</p>
                   </div>
                 )}
               </div>
             ) : (
               /* Success Feedback */
               <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-bold text-green-800 text-lg">图式匹配成功！</h3>
                  <p className="text-green-700 text-sm mt-2 mb-6">{feedback.explanation}</p>
                  
                  <button 
                    onClick={onComplete}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                    进入解题引导 <ArrowRight size={18} />
                  </button>
               </div>
             )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
               <span className="text-xl animate-pulse">👆</span>
            </div>
            <p>点击上方的黄色关键词</p>
          </div>
        )}
      </div>
    </div>
  );
};