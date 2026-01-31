import { useState } from 'react';

// SYSTEM PROMPT - Source of Truth
const CONST_SYSTEM_PROMPT = `
You are an expert QA Engineer. 
Your task is to generate comprehensive test cases based on the provided user requirements or code snippets. 
Output the test cases in a clear Markdown format. 

For each test case, include the following:
- **Test Case ID**
- **Description**
- **Pre-conditions**
- **Steps**
- **Expected Result**

Ensure you cover:
1. Happy Paths (Standard usage)
2. Edge Cases (Boundary values, empty inputs)
3. Error Handling (Invalid inputs)

Output ONLY the markdown content. Do not include conversational filler.
`;

export function useOllama() {
    const [response, setResponse] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState(null);

    const generateTestCases = async (userInput) => {
        setStatus('loading');
        setResponse('');
        setError(null);

        try {
            const payload = {
                model: "llama3.2",
                prompt: `${CONST_SYSTEM_PROMPT}\n\nUSER INPUT:\n${userInput}`,
                stream: false
            };

            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`Ollama API Error: ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data.response);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to generate test cases.');
            setStatus('error');
        }
    };

    return { response, status, error, generateTestCases };
}
