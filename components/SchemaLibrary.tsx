
import React, { useState, useMemo } from 'react';
import { MOCK_SCHEMAS } from '../constants';
import { SchemaCategory, SchemaItem } from '../types';
import { ArrowLeft, Search, Filter, ChevronRight, BarChart3, BrainCircuit, AlertTriangle, Zap } from 'lucide-react';

interface SchemaLibraryProps {
  onBack: () => void;
}

export const SchemaLibrary: React.FC<SchemaLibraryProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<SchemaCategory | 'all'>('all');
  const [selectedSchema, setSelectedSchema] = useState<SchemaItem | null>(null);

  const filteredSchemas = useMemo(() => {
    if (activeCategory === 'all') return MOCK_SCHEMAS;
    return MOCK_SCHEMAS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  // Helper to get color based on category
  const getCategoryColor = (cat: SchemaCategory) => {
    switch (cat) {
      case 'function': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'sequence': return 'text-cyan-600 bg-cyan-100 border-cyan-200';
      case 'geometry': return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      case 'statistics': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getCategoryLabel = (cat: SchemaCategory) => {
    switch (cat) {
      case 'function': return '函数与导数';
      case 'sequence': return '数列';
      case 'geometry': return '解析几何';
      case 'statistics': return '概率统计';
      default: return '未知';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <ArrowLeft size={18} className="text-slate-600"/>
          </button>
          <h1 className="text-lg font-bold text-slate-800">图式模型库</h1>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: '全部' },
            { id: 'function', label: '函数' },
            { id: 'sequence', label: '数列' },
            { id: 'geometry', label: '几何' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
                ${activeCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schema List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSchemas.map((schema) => (
          <button
            key={schema.id}
            onClick={() => setSelectedSchema(schema)}
            className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(schema.category)}`}>
                {getCategoryLabel(schema.category)}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <BarChart3 size={12} />
                熟练度 {schema.masteryLevel}%
              </div>
            </div>

            <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-indigo-700 transition-colors">
              {schema.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{schema.subTitle}</p>

            {/* Mastery Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${schema.masteryLevel > 80 ? 'bg-green-500' : schema.masteryLevel > 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                style={{ width: `${schema.masteryLevel}%` }}
              ></div>
            </div>
          </button>
        ))}
      </div>

      {/* Schema Detail Modal (Overlay) */}
      {selectedSchema && (
        <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full h-[85%] sm:h-auto sm:max-h-[90%] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="font-bold text-lg text-slate-800">{selectedSchema.title}</h2>
                <p className="text-xs text-slate-500">上次复习: {selectedSchema.lastReviewed}</p>
              </div>
              <button 
                onClick={() => setSelectedSchema(null)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"
              >
                <ArrowLeft size={18} className="rotate-[-90deg] sm:rotate-0 text-slate-600" />
              </button>
            </div>

            {/* Modal Content (TAP Card Style) */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="space-y-4">
                {/* Trigger */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase">
                    <Zap size={14} /> Trigger (识别特征)
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {selectedSchema.tapContent.trigger}
                  </p>
                </div>

                {/* Action */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-xs uppercase">
                    <BrainCircuit size={14} /> Action (思维动作)
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedSchema.tapContent.action}
                  </p>
                </div>

                {/* Pitfall */}
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-xs uppercase">
                    <AlertTriangle size={14} /> Pitfall (易错警示)
                  </div>
                  <p className="text-rose-800 text-sm italic">
                    "{selectedSchema.tapContent.pitfall}"
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
              <button 
                 onClick={() => setSelectedSchema(null)}
                 className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 transition"
              >
                记住了 (关闭)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
