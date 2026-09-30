import React from 'react';
import {
  GraduationCap,
  Languages,
  PenTool,
  Sparkles,
  Film,
  FileText,
  BookOpen,
  Code,
  Lightbulb,
  Calculator,
  Bot
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Languages':
      return <Languages className={className} />;
    case 'PenTool':
      return <PenTool className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Code':
      return <Code className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    default:
      return <Bot className={className} />;
  }
};
