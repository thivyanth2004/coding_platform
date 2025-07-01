
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Submission, SupportedLanguage } from '../types/problem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Code, FileX2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock submissions data
const mockSubmissions: Submission[] = [
  {
    id: '1',
    userId: 'user1',
    problemId: '3',
    code: 'function lengthOfLongestSubstring(s) { /* code here */ }',
    language: 'javascript',
    status: 'accepted',
    runtime: 56,
    memory: 42,
    submittedAt: '2023-04-10T14:48:00.000Z'
  },
  {
    id: '2',
    userId: 'user1',
    problemId: '1',
    code: 'function twoSum(nums, target) { /* code here */ }',
    language: 'javascript',
    status: 'accepted',
    runtime: 32,
    memory: 38,
    submittedAt: '2023-04-09T10:15:00.000Z'
  },
  {
    id: '3',
    userId: 'user1',
    problemId: '2',
    code: 'function isValid(s) { /* code here */ }',
    language: 'python',
    status: 'wrong_answer',
    runtime: 25,
    memory: 24,
    submittedAt: '2023-04-08T16:30:00.000Z'
  },
  {
    id: '4',
    userId: 'user1',
    problemId: '5',
    code: 'function minWindow(s, t) { /* code here */ }',
    language: 'javascript',
    status: 'time_limit_exceeded',
    runtime: 2001,
    memory: 87,
    submittedAt: '2023-04-07T09:22:00.000Z'
  },
  {
    id: '5',
    userId: 'user1',
    problemId: '4',
    code: 'function mergeKLists(lists) { /* code here */ }',
    language: 'cpp',
    status: 'runtime_error',
    runtime: 0,
    memory: 0,
    submittedAt: '2023-04-06T14:05:00.000Z'
  }
];

// Mock problem titles
const mockProblemTitles: Record<string, string> = {
  '1': 'Two Sum',
  '2': 'Valid Parentheses',
  '3': 'Longest Substring Without Repeating Characters',
  '4': 'Merge K Sorted Lists',
  '5': 'Minimum Window Substring'
};

const Submissions = () => {
  const [currentTab, setCurrentTab] = useState<'all' | 'accepted' | 'failed'>('all');
  
  const filteredSubmissions = mockSubmissions.filter(submission => {
    if (currentTab === 'all') return true;
    if (currentTab === 'accepted') return submission.status === 'accepted';
    if (currentTab === 'failed') return submission.status !== 'accepted';
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <Badge className="bg-code-success/20 text-code-success hover:bg-code-success/30 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Accepted</span>
          </Badge>
        );
      case 'wrong_answer':
        return (
          <Badge className="bg-code-error/20 text-code-error hover:bg-code-error/30 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Wrong Answer</span>
          </Badge>
        );
      case 'time_limit_exceeded':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Time Limit</span>
          </Badge>
        );
      case 'runtime_error':
      case 'compilation_error':
        return (
          <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 flex items-center gap-1">
            <FileX2 className="h-3 w-3" />
            <span>Runtime Error</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  const getLanguageBadge = (language: SupportedLanguage) => {
    switch (language) {
      case 'javascript':
        return (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <span>JavaScript</span>
          </div>
        );
      case 'python':
        return (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-400"></div>
            <span>Python</span>
          </div>
        );
      case 'java':
        return (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <span>Java</span>
          </div>
        );
      case 'cpp':
        return (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-purple-400"></div>
            <span>C++</span>
          </div>
        );
      case 'rust':
        return (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-orange-400"></div>
            <span>Rust</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Submissions</h1>
        <p className="text-muted-foreground">
          Track your previous submissions, identify patterns in your errors, and improve your solutions.
        </p>
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={(v) => setCurrentTab(v as any)} className="mb-6">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredSubmissions.length > 0 ? (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Problem</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Language</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Runtime</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Memory</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Submitted</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="group hover:bg-muted/20">
                    <td className="py-3 px-4">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/problem/${submission.problemId}`} className="text-primary hover:underline">
                        {mockProblemTitles[submission.problemId]}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {getLanguageBadge(submission.language)}
                    </td>
                    <td className={cn(
                      "py-3 px-4 text-sm font-mono",
                      submission.status === 'time_limit_exceeded' ? "text-yellow-500" : 
                      submission.status === 'accepted' ? "text-code-success" : undefined
                    )}>
                      {submission.runtime} ms
                    </td>
                    <td className="py-3 px-4 text-sm font-mono">
                      {submission.memory} MB
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {formatDate(submission.submittedAt)}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Code className="h-4 w-4" />
                        <span className="sr-only">View Code</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <div className="max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-2">No submissions yet</h3>
            <p className="text-muted-foreground mb-6">
              Start solving problems to track your progress and improve your coding skills.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link to="/problems">
                Explore Problems
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;
