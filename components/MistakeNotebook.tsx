
import React, { useState } from 'react';
import { ProblemData } from '../types';
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronRight, Bookmark, BrainCircuit, Filter } from 'lucide-react';
import { MOCK_MISTAKES } from '../constants';

interface MistakeNotebookProps {
  onBack: () => void;
  onSelectProblem: (problem: ProblemData) => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({ onBack, onSelectProblem }) => {
  const [filter, setFilter] = useState<'all' | 'reviewing' | 'mastered'>('all');

  const filteredMistakes = MOCK_MISTAKES.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <ArrowLeft size={18} className="text-slate-600"/>
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">错题本</h1>
            <p className="text-xs text-slate-500">已收录 {MOCK_MISTAKES.length} 道典型错题</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            全部
          </button>
          <button 
            onClick={() => setFilter('reviewing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${filter === 'reviewing' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'}`}
          >
            <AlertCircle size={12} /> 待复习
          </button>
          <button 
            onClick={() => setFilter('mastered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${filter === 'mastered' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-600'}`}
          >
            <CheckCircle2 size={12} /> 已掌握
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMistakes.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-48 text-slate-400">
             <Bookmark size={48} className="mb-2 opacity-20" />
             <p>没有找到相关错题</p>
           </div>
        ) : (
          filteredMistakes.map((problem) => (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem)}
              className="w-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left overflow-hidden group"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    {problem.tags?.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded font-bold">{tag}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{problem.date}</span>
                </div>
                
                <h3 className="text-sm text-slate-700 font-serif leading-relaxed line-clamp-2 mb-3">
                  {problem.rawText}
                </h3>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                     <BrainCircuit size={14} className="text-indigo-500" />
                     <span className="text-xs font-bold text-indigo-700">
                        {problem.schemaTitle || 'TAP 核心图式'}
                     </span>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      {problem.status === 'mastered' ? (
                        <span className="text-green-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <CheckCircle2 size={12} /> Mastered
                        </span>
                      ) : (
                        <span className="text-amber-500 text-[10px] font-bold uppercase flex items-center gap-1">
                          <AlertCircle size={12} /> Review
                        </span>
                      )}
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                   </div>
                </div>
              </div>
              
              {/* Tap Card Preview Strip */}
              <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-500 border-t border-slate-100 flex gap-4 truncate">
                 <span className="truncate flex-1"><strong className="text-indigo-600">T:</strong> {problem.tapCard.trigger}</span>
                 <span className="truncate flex-1"><strong className="text-emerald-600">A:</strong> {problem.tapCard.action}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
