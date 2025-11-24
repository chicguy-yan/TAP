
export enum ScreenState {
  HOME = 'HOME',
  CAMERA = 'CAMERA',
  ANALYSIS = 'ANALYSIS',
  SCAFFOLD = 'SCAFFOLD',
  SUMMARY = 'SUMMARY',
  LIBRARY = 'LIBRARY',
  DEEP_DIVE = 'DEEP_DIVE',
  MISTAKE_LIST = 'MISTAKE_LIST'
}

export interface Trigger {
  id: string;
  text: string; // The text in the problem to highlight
  schemaId: string; // Links to a mental model
}

export interface SchemaOption {
  id: string;
  title: string;
  description: string;
  isCorrect: boolean;
  explanation: string; // Why it is right or wrong
}

export interface Pitfall {
  stepIndex: number; // At which step this warning appears
  title: string;
  description: string;
  counterExample: string; // "Painful Lesson"
}

export interface Step {
  id: string;
  content: string; // The logic/math content
  instruction: string; // What the user should do on paper
  pitfall?: Pitfall;
}

export interface RelatedLink {
  id: string;
  title: string;
  type: 'variant' | 'concept'; // 变式题 or 关联概念
}

export interface ProblemData {
  id: string;
  rawText: string;
  formattedText: string; // HTML string with identifiable spans for highlighting
  triggers: Trigger[];
  schemaOptions: SchemaOption[];
  steps: Step[];
  tapCard: {
    trigger: string;
    action: string;
    pitfall: string;
  };
  relatedLinks: RelatedLink[];
  
  // Notebook Metadata
  date?: string;
  tags?: string[];
  status?: 'reviewing' | 'mastered';
  schemaTitle?: string; // The name of the schema linked to this mistake
}

// New Type for the Library
export type SchemaCategory = 'function' | 'sequence' | 'geometry' | 'statistics';

export interface SchemaItem {
  id: string;
  category: SchemaCategory;
  title: string;
  subTitle?: string;
  masteryLevel: number; // 0 to 100
  lastReviewed: string;
  tapContent: {
    trigger: string;
    action: string;
    pitfall: string;
  };
}
