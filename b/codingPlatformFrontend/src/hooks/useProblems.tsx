import React, { useEffect, useState } from 'react';
import { fetchProblems} from '@/pages/api/problems';// Make sure the path is correct

const UseProblems = () => {
  const [problems, setProblems] = useState<any[]>([]); // Adjust the type according to your data structure
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);
      } catch (err) {
        setError('Failed to fetch problems');
      }
    };

    getProblems();
  }, []); // This will run only once when the component is mounted

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Problems</h1>
      <ul>
        {problems.map((problem, index) => (
          <li key={index}>{problem.title}</li> // Assuming `title` is a property of a problem
        ))}
      </ul>
    </div>
  );
};

export default UseProblems;
