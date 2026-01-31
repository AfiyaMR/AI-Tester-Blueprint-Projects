import React, { useState } from 'react';
import { Play } from 'lucide-react';

export function PromptInput({ onGenerate, isLoading }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onGenerate(input);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-800">
                    <label htmlFor="requirements" className="block text-sm font-medium text-slate-400 mb-2">
                        Paste Requirements or Code
                    </label>
                    <textarea
                        id="requirements"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-40 bg-slate-950 text-slate-100 rounded-lg p-4 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-none border border-slate-800 placeholder-slate-600 transition-all font-mono text-sm"
                        placeholder="// Paste your code here or describe the feature..."
                        disabled={isLoading}
                    />
                    <div className="mt-4 flex justify-end gap-3">
                        {input.trim() && (
                            <button
                                type="button"
                                onClick={() => setInput('')}
                                disabled={isLoading}
                                className="px-4 py-2.5 rounded-lg font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${isLoading || !input.trim()
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Play size={18} fill="currentColor" />
                            )}
                            {isLoading ? 'Generating...' : 'Generate Cases'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
