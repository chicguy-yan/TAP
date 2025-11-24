
import React, { useState } from 'react';
import { RelatedLink } from '../types';
import { ArrowLeft, CheckCircle2, BrainCircuit, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';

interface SchemaDeepDiveProps {
  link: RelatedLink;
  onBack: () => void;
}

// Mock data for the deep dive content
const DEEP_DIVE_CONTENT: Record<string, any> = {
  'r1': {
    title: '变式训练：奇函数与不等式',
    problem: "已知 f(x) 是定义在 R 上的奇函数，且在 [0, +∞) 上单调递减。若 f(1-a) + f(2a) < 0，求实数 a 的取值范围。",
    steps: [
      {
        title: "第一步：移项变形",
        content: "由 f(1-a) + f(2a) < 0，得 f(1-a) < -f(2a)。\n利用奇函数性质 -f(x) = f(-x)，得：\n f(1-a) < f(-2a)"
      },
      {
        title: "第二步：利用单调性去 f",
        content: "因为 f(x) 在 [0, +∞) 递减，且是奇函数，所以 f(x) 在 R 上单调递减。\n直接去掉 f，不等号方向改变：\n 1-a > -2a",
        tip: "奇函数在对称区间单调性相同！"
      }
    ],
    conclusion: "解得 a > -1",
    comparison: {
      original: "偶函数：f(|A|) < f(|B|) => |A| < |B| (增)",
      variant: "奇函数：f(A) < -f(B) => f(A) < f(-B) => A > -B (减)"
    }
  },
  'r2': {
    title: '概念解析：抽象函数的对称性',
    isConcept: true,
    content: "对于抽象函数 f(x)，除了常见的奇偶性，还有更广泛的对称模型：",
    points: [
      { label: "轴对称", desc: "若 f(a+x) = f(a-x)，则关于直线 x=a 对称。" },
      { label: "中心对称", desc: "若 f(a+x) + f(a-x) = 2b，则关于点 (a, b) 对称。" },
      { label: "周期性", desc: "若 f(x+a) = -f(x)，则 T=2a。" }
    ],
    insight: "本题中的偶函数其实是 x=0 轴对称的一个特例。"
  },
  'r3': {
    title: '易错警示：定义域隐含条件',
    isConcept: true,
    isWarning: true,
    content: "在去掉函数符号 f 时，务必保证自变量在定义域内！",
    example: "例：若 f(x) = lg(x)，求解 f(x) < f(2)。\n错误解法：x < 2。\n正确解法：0 < x < 2。",
    insight: "本题中 f(x) 定义域为 R，所以不需要额外限制。但遇到对数、根号函数时，这是第一杀手。"
  }
};

export const SchemaDeepDive: React.FC<SchemaDeepDiveProps> = ({ link, onBack }) => {
  const [showSolution, setShowSolution] = useState(false);
  const content = DEEP_DIVE_CONTENT[link.id] || DEEP_DIVE_CONTENT['r1']; // Fallback

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 flex items-center gap-3 shrink-0">
        <button 
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
        >
          <ArrowLeft size={18} className="text-slate-600"/>
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">{link.title}</h2>
          <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
            {link.type === 'variant' ? 'TAP 变式训练' : 'TAP 知识拓展'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className={`h-1.5 w-full ${link.type === 'variant' ? 'bg-amber-400' : 'bg-cyan-400'}`}></div>
          
          <div className="p-6">
            {content.isConcept ? (
               /* Concept View */
               <div>
                 <div className="flex items-center gap-2 mb-4">
                   <div className={`p-2 rounded-lg ${content.isWarning ? 'bg-rose-100 text-rose-600' : 'bg-cyan-100 text-cyan-600'}`}>
                     {content.isWarning ? <AlertTriangle size={24} /> : <Lightbulb size={24} />}
                   </div>
                   <h3 className="font-bold text-lg text-slate-800">{content.title}</h3>
                 </div>
                 <p className="text-slate-600 leading-relaxed mb-6 text-lg font-serif">
                   {content.content}
                 </p>
                 
                 {content.points && (
                   <div className="space-y-3 mb-6">
                     {content.points.map((p: any, idx: number) => (
                       <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-100">
                         <span className="font-bold text-slate-700 block mb-1">{p.label}</span>
                         <span className="text-slate-500 text-sm">{p.desc}</span>
                       </div>
                     ))}
                   </div>
                 )}

                 {content.example && (
                   <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 text-sm mb-6">
                      <pre className="whitespace-pre-wrap font-sans text-rose-800">{content.example}</pre>
                   </div>
                 )}

                 <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-lg">
                    <BrainCircuit className="text-indigo-600 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-indigo-900 text-sm mb-1">TAP 洞察</h4>
                      <p className="text-indigo-800 text-sm leading-relaxed">{content.insight}</p>
                    </div>
                 </div>
               </div>
            ) : (
              /* Problem Variant View */
              <div>
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-slate-800 text-lg">变式题目</h3>
                   <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">挑战</span>
                 </div>
                 <div className="text-lg font-serif text-slate-700 leading-loose mb-8 border-l-4 border-amber-200 pl-4 bg-slate-50/50 py-2">
                   {content.problem}
                 </div>

                 {!showSolution ? (
                   <button 
                     onClick={() => setShowSolution(true)}
                     className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                   >
                     <BrainCircuit size={18} />
                     应用图式解题
                   </button>
                 ) : (
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="space-y-4 mb-6">
                       {content.steps.map((step: any, idx: number) => (
                         <div key={idx} className="relative pl-6 pb-4 border-l-2 border-indigo-200 last:border-0">
                           <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                           <h4 className="font-bold text-indigo-900 text-sm mb-1">{step.title}</h4>
                           <p className="text-slate-600 text-sm leading-relaxed font-serif bg-slate-50 p-2 rounded">{step.content}</p>
                           {step.tip && (
                             <div className="mt-2 text-xs text-amber-600 flex gap-1 items-center">
                               <Lightbulb size={12} /> {step.tip}
                             </div>
                           )}
                         </div>
                       ))}
                     </div>

                     <div className="bg-slate-800 text-white p-4 rounded-xl shadow-lg mb-6">
                       <div className="flex items-center justify-between mb-3 border-b border-slate-600 pb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">模型对比</span>
                          <BrainCircuit size={16} className="text-indigo-400"/>
                       </div>
                       <div className="grid grid-cols-1 gap-3 text-sm font-mono">
                          <div>
                            <span className="text-slate-400 block text-xs mb-1">原题 (偶函数)</span>
                            <span className="text-emerald-300">{content.comparison.original}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-xs mb-1">变式 (奇函数)</span>
                            <span className="text-amber-300">{content.comparison.variant}</span>
                          </div>
                       </div>
                     </div>

                     <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200 justify-center font-bold">
                       <CheckCircle2 size={20} />
                       <span>结论：{content.conclusion}</span>
                     </div>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-4 border-t border-slate-200 shrink-0">
         <button 
           onClick={onBack}
           className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition flex items-center justify-center gap-2"
         >
           {showSolution || content.isConcept ? '掌握了，返回总结' : '稍后再看'}
         </button>
      </div>
    </div>
  );
};
