const API_BASE = 'http://localhost:5000/api'; // your backend URL

export async function fetchProblems() {
  const res = await fetch(`${API_BASE}/problems`);
  const text = await res.text();
   try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid JSON from backend');
  }
}

export async function fetchProblemById(id: string) {
   const res = await fetch(`${API_BASE}/problems/${id}`);
   if (!res.ok) throw new Error('Failed to fetch problem');
  return res.json();
}
