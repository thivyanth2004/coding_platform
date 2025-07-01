
import { useState } from 'react';
import { SupportedLanguage } from '../types/problem';
import { Check, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const languages: { value: SupportedLanguage; label: string; icon: string }[] = [
  { value: 'javascript', label: 'JavaScript', icon: 'JS' },
  { value: 'python', label: 'Python', icon: 'PY' },
  { value: 'java', label: 'Java', icon: 'JV' },
  { value: 'cpp', label: 'C++', icon: 'C+' },
  { value: 'rust', label: 'Rust', icon: 'RS' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium transition-colors">
        <Code className="h-4 w-4" />
        <span>{languages.find(l => l.value === selectedLanguage)?.label || 'Select Language'}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-sm border border-border">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => onLanguageChange(language.value)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              selectedLanguage === language.value && "bg-primary/20"
            )}
          >
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded text-xs font-semibold",
              language.value === 'javascript' ? "bg-yellow-500/20 text-yellow-500" :
              language.value === 'python' ? "bg-blue-500/20 text-blue-500" :
              language.value === 'java' ? "bg-red-500/20 text-red-500" :
              language.value === 'cpp' ? "bg-purple-500/20 text-purple-500" :
              "bg-orange-500/20 text-orange-500"
            )}>
              {language.icon}
            </div>
            <span>{language.label}</span>
            {selectedLanguage === language.value && (
              <Check className="ml-auto h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
