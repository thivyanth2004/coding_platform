import { useState, useEffect } from 'react';
import { Problem } from '../types/problem';
import ProblemCard from '../components/ProblemCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');

  const solvedProblems = new Set(['1']);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(problem => {
    const title = problem.title?.toLowerCase() || '';
    const description = problem.description?.toLowerCase() || '';
    const categories = Array.isArray(problem.category) ? problem.category : [];
  
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase()) ||
      categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
  
    const matchesTab =
      currentTab === 'all' ||
      (currentTab === 'easy' && problem.difficulty === 'easy') ||
      (currentTab === 'medium' && problem.difficulty === 'medium') ||
      (currentTab === 'hard' && problem.difficulty === 'hard') ||
      (currentTab === 'expert' && problem.difficulty === 'expert') ||
      (currentTab === 'solved' && solvedProblems.has(problem._id)) ||
      (currentTab === 'unsolved' && !solvedProblems.has(problem._id));
  
    return matchesSearch && matchesTab;
   
  });

  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
        <p className="text-muted-foreground">
          Sharpen your skills with our collection of coding challenges. Filter by difficulty or search for specific topics.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search problems by title, description or tags..."
          className="pl-10 bg-card border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-6">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
          <TabsTrigger value="expert">Expert</TabsTrigger>
          <TabsTrigger value="solved">Solved</TabsTrigger>
          <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredProblems.length > 0 ? (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {filteredProblems.map((problem) => {
      // Log the problem ID for debugging
      if (!problem._id) {
        console.error('Problem ID is undefined for:', problem);
        return null;  // Skip rendering if _id is not available
      }
      // Return the JSX for each problem
      return (
        <Link
          to={`/problems/${problem._id}`}
          key={problem._id}
          className="hover:scale-[1.02] transition-transform"
        >
          <ProblemCard 
            problem={problem}
          />
        </Link>
      );
    })}
  </div>
) : (
  <div className="text-center py-12">
    <p className="text-muted-foreground">No problems found matching your criteria.</p>
  </div>
)};

    </div>
  );
}


export default Problems ;
