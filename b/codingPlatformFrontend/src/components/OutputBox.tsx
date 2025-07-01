
import { useState, useEffect } from 'react';

interface OutputBoxProps {
  output: string;
  status: 'idle' | 'running' | 'success' | 'error';
  executionTime?: number;
  memoryUsed?: number;
}

const OutputBox: React.FC<OutputBoxProps> = ({ 
  output, 
  status, 
  executionTime, 
  memoryUsed 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (status === 'running') {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted">
        <div className="flex items-center gap-2">
          <div 
            className={`h-3 w-3 rounded-full ${
              status === 'idle' ? 'bg-muted-foreground' :
              status === 'running' ? 'bg-yellow-400 animate-pulse' :
              status === 'success' ? 'bg-code-success' :
              'bg-code-error'
            }`} 
          />
          <span className="font-medium text-sm">
            {status === 'idle' ? 'Output' :
             status === 'running' ? 'Running...' :
             status === 'success' ? 'Success' :
             'Error'}
          </span>
        </div>
        
        {(executionTime !== undefined || memoryUsed !== undefined) && (
          <div className="flex gap-4 text-xs text-muted-foreground">
            {executionTime !== undefined && (
              <div className="flex items-center gap-1">
                <span>Time:</span>
                <span className="font-mono">{executionTime} ms</span>
              </div>
            )}
            {memoryUsed !== undefined && (
              <div className="flex items-center gap-1">
                <span>Memory:</span>
                <span className="font-mono">{memoryUsed} MB</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div 
        className={`bg-code p-4 min-h-[120px] max-h-[300px] overflow-auto font-mono text-sm whitespace-pre ${
          status === 'error' ? 'text-code-error' : 'text-code-text'
        } ${isAnimating ? 'animate-pulse' : ''}`}
      >
        {output || 'Run your code to see the output here'}
      </div>
    </div>
  );
};

export default OutputBox;
