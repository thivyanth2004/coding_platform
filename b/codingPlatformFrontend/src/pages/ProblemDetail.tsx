import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Problem, SupportedLanguage } from '../types/problem';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import OutputBox from '../components/OutputBox';
import SubmitButton from '../components/SubmitButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, ThumbsUp, Timer, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { fetchProblemById } from './api/problems';
import { Link } from 'react-router-dom'; // Add this line


const ProblemDetail = () => {
  // const { problemId } = useParams<{ problemId: string }>(); // Get the problemId from the URL params
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast(); // Hook for toast notifications
  const { problemId } = useParams<{ problemId: string }>();
  // Get the problemId from the URL params
   useEffect(() => {
    const fetchProblem = async () => {

      try { 
        const response = await fetch(`http://localhost:5000/api/problems/${problemId}`); // Update to use problemId
        const data = await response.json();
         setProblem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  if (!problem) return <p>Loading problem details...</p>; // Re-run when problemId or language changes

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = async () => {
    setOutput('');
    setIsProcessing(true);

    try {
      const res = await axios.post('http://localhost:5000/api/run-code', {
        script: code,
        language, // like 'python', 'javascript'
        // not needed for RapidAPI
        stdin: '', // optional
      });

      setOutput(res.data.stdout || res.data.stderr || res.data.message);
    } catch (err) {
      console.error(err);
      setOutput('Error running code');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    // You can re-use the `handleRun` function here to execute the code if needed
    await handleRun();
  };

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!problem) {
    
       
    
    
    return (
      <div className="min-h-screen pt-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Problem not found</h2>
        <p className="text-muted-foreground mb-6">
          The problem you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/problems">Back to Problems</Link>
        </Button>
      </div>
    );
  }

  const difficultyColor =
    problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
    problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
    problem.difficulty === 'hard' ? 'bg-red-500/20 text-red-500' :
    'bg-purple-500/20 text-purple-500';

    return (
      <div className="min-h-screen pt-24 pb-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Problem header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link to="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className={cn("px-2 py-0.5 rounded-full text-xs font-medium", difficultyColor)}>
                  {problem?.difficulty
                    ? problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)
                    : "Unknown"}
                </div>
    
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    <span>{Math.round(problem.timeLimit / 1000)}s</span>
                  </div>
                  <div className="h-3 w-px bg-muted-foreground/30" />
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{problem.likes}</span>
                  </div>
                </div>
              </div>
    
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Problem description panel */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <Tabs defaultValue="description">
                    <TabsList className="bg-muted/50">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="examples">Examples</TabsTrigger>
                      <TabsTrigger value="constraints">Constraints</TabsTrigger>
                      <TabsTrigger value="hints">Hints</TabsTrigger>
                    </TabsList>
    
                    <TabsContent value="description" className="mt-4">
                      <p className="text-foreground">{problem.description}</p>
                      <div className="flex flex-wrap gap-2 mt-6">
                      {Array.isArray(problem.category) && problem.category.length > 0 ? (
  problem.category.map((tag) => (
    <Badge key={tag}>{tag}</Badge>
  ))
) : (
  <p className="text-sm text-muted-foreground">No tags</p>
)}

                      </div>
                    </TabsContent>
    
                    <TabsContent value="examples" className="mt-4 space-y-6">
                       { problem.examples && problem.examples.length > 0 ? (problem.examples.map((example, index) => (
                        <div key={index} className="bg-muted/30 rounded-md p-4">
                          <div className="font-medium mb-2">Example {index + 1}:</div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-muted-foreground">Input:</span>
                              <pre className="bg-code p-2 rounded mt-1 text-sm font-mono overflow-x-auto">
                                {example.input}
                              </pre>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Output:</span>
                              <pre className="bg-code p-2 rounded mt-1 text-sm font-mono overflow-x-auto">
                                {example.output}
                              </pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-muted-foreground">Explanation:</span>
                                <p className="text-sm mt-1">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )) ): (
                        <div className="text-sm font-mono">No examples available.</div>
                      )}
                    </TabsContent>
    
                    <TabsContent value="constraints" className="mt-4">
                      <ul className="list-disc list-inside space-y-2">
                        {Array.isArray(problem.constraints) && problem.constraints.length > 0 ? (
                          problem.constraints.map((constraint, index) => (
                            <li key={index} className="text-sm font-mono">
                              {constraint}
                            </li>
                          ))
                        ) : (
                          <li className="text-sm font-mono">No constraints available.</li>
                        )}
                      </ul>
                    </TabsContent>
    
                    <TabsContent value="hints" className="mt-4">
                      {Array.isArray(problem.hints) && problem.hints.length > 0 ? (
                        problem.hints.map((hint, index) => (
                          <div key={index} className="mb-4">
                            <Button
                              variant="outline"
                              className="w-full justify-start border-muted hover:border-primary/50"
                              onClick={() => handleToggleHint()}
                            >
                              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                              <span>Hint {index + 1}</span>
                              <ArrowRight className={`h-4 w-4 ml-auto transition-transform ${showHint[index] ? 'rotate-90' : ''}`} />
                            </Button>
    
                            {showHint[index] && (
                              <div className="bg-muted/30 p-4 rounded-md mt-2">
                                <p>{hint}</p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm font-mono">No hints available.</div>
                      )}
    
                      <div className="text-center mt-8">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>View Solution</span>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Note: Viewing the solution before solving will mark this as not completed.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
    
                {/* Code editor panel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <LanguageSelector
                      selectedLanguage={language}
                      onLanguageChange={setLanguage}
                    />
                    <Button variant="ghost" className="text-xs text-muted-foreground">
                      Reset Code
                    </Button>
                  </div>
    
                  <CodeEditor
                    initialCode={code}
                    language={language}
                    onChange={handleCodeChange}
                  />
    
                  <OutputBox
                    output={output}
                    status={executionStatus}
                    executionTime={executionTime}
                    memoryUsed={executionTime ? Math.floor(executionTime / 10) : undefined}
                  />
    
                  <div className="flex justify-end">
                    <SubmitButton
                      onRun={handleRun}
                      isLoading={isProcessing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
    export default ProblemDetail;
    