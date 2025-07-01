
import { useState, useEffect } from 'react';
import { SupportedLanguage } from '../types/problem';

interface CodeEditorProps {
  initialCode: string;
  language: SupportedLanguage;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  language, 
  onChange 
}) => {
  const [code, setCode] = useState(initialCode);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    // Count lines and add line numbers
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  useEffect(() => {
    // Update code when language changes
    setCode(initialCode);
  }, [initialCode, language]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
    
    // Update line count
    const lines = newCode.split('\n').length;
    setLineCount(lines);
  };

  const renderLineNumbers = () => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).map(num => (
      <div key={num} className="py-0.5">{num}</div>
    ));
  };

  return (
    <div className="code-editor-container">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-code-lighter">
        <span className={`h-3 w-3 rounded-full ${language === 'javascript' ? 'bg-yellow-400' : 
          language === 'python' ? 'bg-blue-400' : 
          language === 'java' ? 'bg-red-400' : 
          language === 'cpp' ? 'bg-purple-400' : 'bg-orange-400'}`} />
        <span className="font-mono text-xs text-muted-foreground">
          {language === 'javascript' ? 'script.js' : 
           language === 'python' ? 'main.py' : 
           language === 'java' ? 'Main.java' : 
           language === 'cpp' ? 'solution.cpp' : 'main.rs'}
        </span>
      </div>
      <div className="flex">
        <div className="code-editor-line-numbers">
          {renderLineNumbers()}
        </div>
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="code-editor"
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          rows={Math.max(15, lineCount)} // Minimum 15 rows
        />
      </div>
      <div className="absolute bottom-0 right-0 text-xs text-muted-foreground p-2 opacity-70">
        {language}
      </div>
    </div>
  );
};

export default CodeEditor;
