
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Send } from 'lucide-react';

interface SubmitButtonProps {
  onRun: () => void;
   isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  onRun, 
   isLoading = false 
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline"
        onClick={onRun}
        disabled={isLoading}
        className={`bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity ${
          isLoading ? 'animate-pulse' : ''
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Run</span>
          </div>
        )}
      </Button>
      
      {/* <Button 
        onClick={onSubmit}
        disabled={isLoading}
        className={`bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity ${
          isLoading ? 'animate-pulse' : ''
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Submit</span>
          </div>
        )}
      </Button> */}
    </div>
  );
};

export default SubmitButton;
