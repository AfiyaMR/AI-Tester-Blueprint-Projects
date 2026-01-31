import React from 'react';
import { PromptInput } from './components/PromptInput';
import { TestCaseDisplay } from './components/TestCaseDisplay';
import { useOllama } from './hooks/useOllama';
import { Sparkles, Terminal } from 'lucide-react';

function App() {
    const { response, status, error, generateTestCases } = useOllama();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 selection:bg-violet-500/30">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4 animate-fade-in-down">
                    <div className="inline-flex items-center justify-center p-2 bg-slate-900/50 rounded-2xl mb-4 ring-1 ring-slate-800">
                        <div className="bg-indigo-600 p-2 rounded-xl mr-3">
                            <Terminal size={24} className="text-white" />
                        </div>
                        <span className="text-slate-400 font-medium pr-2">Local Intelligence</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            AI Test Generator
                        </span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Generate comprehensive QA test cases instantly using your local <span className="text-indigo-400 font-semibold">Ollama</span> instance.
                        Zero cloud latency. 100% Privacy.
                    </p>
                </div>

                {/* Main Content */}
                <PromptInput onGenerate={generateTestCases} isLoading={status === 'loading'} />
                <TestCaseDisplay content={response} status={status} error={error} />

            </div>

            <div className="fixed bottom-4 right-4 text-xs text-slate-700 font-mono">
                Running on llama3.2 @ localhost:11434
            </div>
        </div>
    );
}

export default App;
