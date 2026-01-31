import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Premium dark theme
import { Copy, Check, RefreshCw } from 'lucide-react';

export function TestCaseDisplay({ content, status, error }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (status === 'idle') {
        return (
            <div className="text-center text-slate-500 py-20 animate-fade-in">
                <p>Enter requirements above to generate test cases.</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="w-full max-w-4xl mx-auto p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
                <h3 className="font-bold flex items-center gap-2">Error Generating Cases</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                    Generated Test Cases
                </h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-full"
                >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy markdown'}
                </button>
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-20 transition duration-1000"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl p-8 border border-slate-800 shadow-2xl overflow-hidden min-h-[300px]">
                    <div className="prose prose-invert prose-slate max-w-none 
                        prose-table:border-collapse prose-table:border prose-table:border-slate-800 
                        prose-th:bg-indigo-950/50 prose-th:p-4 prose-th:text-indigo-200 
                        prose-td:p-4 prose-td:border-b prose-td:border-slate-800/50 
                        prose-headings:text-indigo-300
                        prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
                    </div>
                    {status === 'loading' && (
                        <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center backdrop-blur-sm z-10">
                            <div className="flex flex-col items-center gap-4">
                                <RefreshCw className="animate-spin text-indigo-500" size={48} />
                                <span className="text-slate-400 animate-pulse font-mono">Consulting Llama...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
