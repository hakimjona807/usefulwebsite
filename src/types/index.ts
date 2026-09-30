export type ToolId =
  | 'homework'
  | 'translator'
  | 'writing'
  | 'image_ai'
  | 'video_prompt'
  | 'pdf_ai'
  | 'study'
  | 'code'
  | 'idea'
  | 'calculator'
  | 'general';

export type ToolCategory = 'all' | 'learning' | 'creation' | 'creativity' | 'productivity' | 'coding' | 'math';

export interface ToolOptionConfig {
  key: string;
  label: string;
  type: 'select' | 'text';
  options?: { value: string; label: string }[];
  defaultValue: string;
}

export interface AITool {
  id: ToolId;
  name: string;
  shortDesc: string;
  longDesc: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  samplePrompts: string[];
  options?: ToolOptionConfig[];
  placeholder: string;
  acceptsMedia?: 'image' | 'pdf' | 'both' | 'none';
  accentColor: string; // e.g. 'from-blue-600 to-indigo-600'
}

export interface MediaAttachment {
  name: string;
  type: string;
  data: string; // base64
  previewUrl?: string;
  size?: number;
}

export interface ActivityItem {
  id: string;
  toolId: ToolId;
  toolName: string;
  prompt: string;
  result: string;
  timestamp: string;
  model: string;
  favorite: boolean;
  mediaName?: string;
  mediaType?: string;
}

export type NavTab = 'home' | 'tools' | 'history' | 'favorites' | 'pricing';
