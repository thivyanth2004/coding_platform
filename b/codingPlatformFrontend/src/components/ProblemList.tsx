// src/components/ProblemList.tsx

import React, { useEffect, useState } from 'react';
import ProblemCard from './ProblemCard';
import { Problem } from '../types/problem';

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/problems');
        const data = await response.json();
        setProblems(data);

        // ⚠️ Replace with real logic later
        const solvedIds = new Set<string>(['661d37cfbb8a4e65c2ecedf4']);
        setSolvedProblems(solvedIds);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {problems.map((problem) => (
        <ProblemCard
          key={problem._id}
          problem={problem}
          isSolved={solvedProblems.has(problem._id)}
        />
      ))}
    </div>
  );
};

export default ProblemList;
