
import { ProblemData, SchemaItem } from './types';

// Mock Data: Classic Function Property Problem (Chinese)
export const MOCK_PROBLEM: ProblemData = {
  id: 'prob_001',
  date: '2023-10-24',
  tags: ['函数', '导数'],
  status: 'reviewing',
  schemaTitle: '脱“f”模型',
  rawText: "已知 f(x) 是定义在 R 上的偶函数，且在 [0, +∞) 上单调递增。若 f(a-1) < f(2)，求实数 a 的取值范围。",
  // Formatting for highlighting
  formattedText: "已知 <span class='text-content'>f(x) 是定义在 R 上的偶函数</span>，且在 <span class='text-content'>[0, +∞) 上单调递增</span>。若 <span class='text-content'>f(a-1) < f(2)</span>，求实数 a 的取值范围。",
  triggers: [
    {
      id: 't1',
      text: '偶函数',
      schemaId: 'schema_symmetry'
    },
    {
      id: 't2',
      text: '单调递增',
      schemaId: 'schema_monotonicity'
    }
  ],
  schemaOptions: [
    {
      id: 'opt_A',
      title: "模型 A：特值代入法",
      description: "代入几个具体的数字试试，比如 a=1, a=0。",
      isCorrect: false,
      explanation: "代入法只能排除选项，无法求解完整的取值范围。这是一道逻辑推演题，不是选择题。"
    },
    {
      id: 'opt_B',
      title: "模型 B：脱“f”法（转化不等式）",
      description: "利用奇偶性和单调性，去掉函数符号 f，转化为自变量的大小比较。",
      isCorrect: true,
      explanation: "正确！核心逻辑是：偶函数意味着 f(x)=f(|x|)，结合单调性，可以直接比较自变量的绝对值。"
    },
    {
      id: 'opt_C',
      title: "模型 C：导数法求极值",
      description: "对 f(x) 求导，分析导数的正负性。",
      isCorrect: false,
      explanation: "题目没有给出 f(x) 的具体解析式，无法求导。"
    }
  ],
  steps: [
    {
      id: 's1',
      instruction: "第一步：利用“偶函数”性质处理符号",
      content: "因为 f(x) 是偶函数，所以 f(x) = f(|x|)。\n不等式转化为：f(|a-1|) < f(|2|)"
    },
    {
      id: 's2',
      instruction: "第二步：利用“单调性”去掉函数符号 f",
      content: "因为 f(x) 在 [0, +∞) 单调递增，且 |a-1| 和 |2| 都在这个区间内。\n这意味着：自变量越大，函数值越大。\n所以可以直接得到：|a-1| < 2",
      pitfall: {
        stepIndex: 1, // Shows after step 1, before step 2 completes
        title: "去符号陷阱",
        description: "注意！准备去掉 f 之前，你检查自变量是否落在单调区间了吗？\n很多人直接写 a-1 < 2，这是错的！",
        counterExample: "反例：若 f(x)=x² (偶函数)，f(-3)=9 > f(2)=4。但是 -3 < 2 成立吗？不成立。必须加绝对值！"
      }
    },
    {
      id: 's3',
      instruction: "第三步：解绝对值不等式",
      content: "-2 < a - 1 < 2\n各加 1 得：\n-1 < a < 3"
    }
  ],
  tapCard: {
    trigger: "f(x) 是偶函数 + 单调性 + 不等式 f(A) < f(B)",
    action: "转化为 |A| < |B| (若在正区间递增)",
    pitfall: "脱去 f 时，忘记给自变量加绝对值，导致漏解。"
  },
  relatedLinks: [
    { id: 'r1', title: '变式：f(x) 是奇函数且单调递增', type: 'variant' },
    { id: 'r2', title: '关联：利用对称性解抽象函数不等式', type: 'concept' },
    { id: 'r3', title: '易错：忽略定义域的隐含条件', type: 'concept' }
  ]
};

// Additional Mock Mistakes for the Notebook
export const MOCK_MISTAKES: ProblemData[] = [
  MOCK_PROBLEM,
  {
    ...MOCK_PROBLEM,
    id: 'prob_002',
    date: '2023-10-22',
    tags: ['数列', '求和'],
    status: 'reviewing',
    schemaTitle: '错位相减法',
    rawText: "已知数列 {an} 满足 an = n·2^n，求数列 {an} 的前 n 项和 Sn。",
    tapCard: {
      trigger: "通项公式 = 等差 × 等比 (n · 2^n)",
      action: "写出 Sn, 2Sn，两式相减，构成等比数列求和",
      pitfall: "相减后最后一项 -n·2^(n+1) 容易忘记负号"
    }
  },
  {
    ...MOCK_PROBLEM,
    id: 'prob_003',
    date: '2023-10-20',
    tags: ['解析几何', '椭圆'],
    status: 'mastered',
    schemaTitle: '韦达定理设而不求',
    rawText: "直线 y=kx+1 与椭圆 x²/4 + y² = 1 交于 A, B 两点，若 OA⊥OB，求 k 的值。",
    tapCard: {
      trigger: "直线交圆锥曲线 + 向量垂直 (x1x2 + y1y2 = 0)",
      action: "联立方程 -> 韦达定理 -> 代入 x1x2 + y1y2 = 0 求解",
      pitfall: "忘记 Δ > 0 判定，算出 k 值后必须验根"
    }
  }
];

export const MOCK_SCHEMAS: SchemaItem[] = [
  // FUNCTION CATEGORY
  {
    id: 'sch_f1',
    category: 'function',
    title: '脱“f”模型 (解抽象不等式)',
    subTitle: '利用单调性去掉函数符号',
    masteryLevel: 85,
    lastReviewed: '2天前',
    tapContent: {
      trigger: 'f(x) 单调性已知 + 不等式两边都有 f',
      action: '利用单调性去掉 f，注意奇偶性调整自变量符号',
      pitfall: '偶函数去 f 时，必须给自变量加绝对值 (|A| < |B|)'
    }
  },
  {
    id: 'sch_f2',
    category: 'function',
    title: '函数零点存在性定理',
    subTitle: '判断零点所在区间',
    masteryLevel: 40,
    lastReviewed: '1周前',
    tapContent: {
      trigger: '连续函数 + 区间端点异号 f(a)f(b)<0',
      action: '判定 (a,b) 内至少有一个零点',
      pitfall: '忽略函数必须是“连续”的这一前提条件'
    }
  },
  {
    id: 'sch_f3',
    category: 'function',
    title: '导数切线方程',
    subTitle: '求曲线上某点的切线',
    masteryLevel: 92,
    lastReviewed: '昨天',
    tapContent: {
      trigger: '求“在”点 P 的切线 vs 求“过”点 P 的切线',
      action: '“在”点P：k=f\'(x0)；“过”点P：设切点 (x0, y0) 列方程',
      pitfall: '混淆切点与定点。如果点不在曲线上，必须设切点！'
    }
  },

  // SEQUENCE CATEGORY
  {
    id: 'sch_s1',
    category: 'sequence',
    title: '累加法求通项',
    subTitle: 'an+1 - an = f(n)',
    masteryLevel: 60,
    lastReviewed: '3天前',
    tapContent: {
      trigger: '递推式形如 an+1 - an = f(n)',
      action: '列出 n-1 个式子累加消项',
      pitfall: '累加后项数计算错误，通常是 1 到 n-1'
    }
  },
  {
    id: 'sch_s2',
    category: 'sequence',
    title: '错位相减法求和',
    subTitle: '等差 × 等比 数列',
    masteryLevel: 25,
    lastReviewed: '1个月前',
    tapContent: {
      trigger: '通项公式 = 等差数列 × 等比数列',
      action: '写出 Sn，写出 qSn，两式相减',
      pitfall: '相减后最后一项的符号容易写错（应该是负号）'
    }
  },

  // GEOMETRY CATEGORY
  {
    id: 'sch_g1',
    category: 'geometry',
    title: '直线与圆锥曲线联立',
    subTitle: '韦达定理设而不求',
    masteryLevel: 70,
    lastReviewed: '5天前',
    tapContent: {
      trigger: '直线交椭圆/双曲线于 A, B 两点',
      action: '联立方程 -> Δ>0 -> 韦达定理 x1+x2, x1x2',
      pitfall: '忘记验证 Δ > 0 导致增根'
    }
  },
  {
    id: 'sch_g2',
    category: 'geometry',
    title: '点差法 (中点弦问题)',
    subTitle: '涉及弦中点坐标',
    masteryLevel: 55,
    lastReviewed: '2周前',
    tapContent: {
      trigger: '已知弦中点坐标或涉及中点轨迹',
      action: '代点作差，得到 k·k_mid 与参数的关系',
      pitfall: '忘记检验直线是否与曲线相交 (Δ判定)'
    }
  }
];
