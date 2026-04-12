'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Play, CheckCircle, RefreshCcw, FileText, CheckSquare, MessageSquare, Bot, Loader2, Lock } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

export default function ArenaPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params?.challengeId as string;

  const [challenge, setChallenge] = useState<any>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  
  const [activeTab, setActiveTab] = useState('description');
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcases');
  const [output, setOutput] = useState<string | null>(null);
  
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockedSolution, setUnlockedSolution] = useState<string | null>(null);

  // 1. Fetch Challenge Data
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch('/api/problems');
        if (res.ok) {
          const json = await res.json();
          const found = json.challenges?.find((p: any) => p.id === challengeId);
          if (found) {
            setChallenge(found);
            setCode(found.boilerplate[language] || '');
          }
        }
      } catch (err) {
        console.error("Failed to fetch challenge", err);
      }
    };
    if (challengeId) fetchChallenge();
  }, [challengeId, language]);

  // 1.5 Fetch Solution (Economy Engine)
  const handleUnlockSolution = async () => {
    setIsUnlocking(true);
    try {
      const res = await fetch('/api/problems/solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId })
      });
      const data = await res.json();
      if (res.ok) {
        setUnlockedSolution(data.solutionCode[language] || '// Solution not available in this language.');
        setActiveConsoleTab('result');
        setOutput("✅ " + data.message + "\nYour wallet was updated successfully.");
      } else {
        setActiveConsoleTab('result');
        setOutput("❌ Transaction Failed: " + data.error + "\nRequires: " + data.required + " CR\nCurrent Balance: " + data.owned + " CR\n\nPlease solve more algorithms to accumulate credits!");
      }
    } catch (e) {
      setOutput('Failed to contact economy server.');
    } finally {
      setIsUnlocking(false);
    }
  };

  // 2. Run Code (Dry Sandbox)
  const handleRunCode = async () => {
    setIsExecuting(true);
    setActiveConsoleTab('result');
    setOutput('Running via Piston engine...');
    
    try {
      const res = await fetch('/api/execute/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode: code, language })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setOutput("Execution Error:\n" + (data.error || 'Unknown error'));
      } else {
        setOutput(data.output || data.stderr || 'No output.');
      }
    } catch (e) {
      setOutput('Failed to connect to execution server.');
    } finally {
      setIsExecuting(false);
    }
  };

  // 3. Submit Code (Arena Validation)
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setActiveConsoleTab('result');
    setOutput('Evaluating against hidden test cases...');
    
    try {
      const res = await fetch('/api/execute/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode: code, language, challengeId })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setOutput("Submission Failed:\n\n" + (data.feedback || data.error));
      } else {
        setOutput("🎊 Submission Successful!\n\nAll test cases passed.\nExecution Time: " + (data?.metrics?.executionTimeMs || '<1') + "ms\nModules Unlocked.");
      }
    } catch (e) {
      setOutput('Failed to submit code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. AI Hint request
  const requestHint = async () => {
    setIsAiThinking(true);
    setActiveTab('editorial');
    setAiResponse('Synthesizing debug context...');
    
    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, currentCode: code })
      });
      const data = await res.json();
      if (!res.ok) {
        setAiResponse("Internal AI Error: " + data.error);
      } else {
        setAiResponse(data.reply);
      }
    } catch (e) {
      setAiResponse('Failed to contact AI Coach.');
    } finally {
      setIsAiThinking(false);
    }
  };

  if (!challenge) {
    return (
       <div className="flex items-center justify-center h-[calc(100vh-100px)] w-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-4 mt-[-10px] w-full">
      {/* Left Pane: Description & AI */}
      <div className="w-5/12 bg-surface/50 rounded-lg border border-surface-border flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 glow-ray pointer-events-none opacity-30"></div>
        
        {/* Left Pane Tabs */}
        <div className="flex bg-surface-hover/50 border-b border-surface-border px-2 pt-2 gap-1 relative z-10">
          <button onClick={() => setActiveTab('description')} className={`px-4 py-2 text-sm font-medium rounded-t-md flex items-center gap-2 ${activeTab === 'description' ? 'bg-surface text-blue-400 border-t border-x border-surface-border' : 'text-gray-500 hover:text-gray-300'}`}>
            <FileText className="w-4 h-4" /> Description
          </button>
          <button onClick={() => setActiveTab('solution')} className={`px-4 py-2 text-sm font-medium rounded-t-md flex items-center gap-2 ${activeTab === 'solution' ? 'bg-surface text-green-400 border-t border-x border-surface-border' : 'text-gray-500 hover:text-gray-300'}`}>
            <CheckSquare className="w-4 h-4" /> Solution
          </button>
          <button onClick={() => setActiveTab('editorial')} className={`px-4 py-2 text-sm font-medium rounded-t-md flex items-center gap-2 ${activeTab === 'editorial' ? 'bg-surface text-purple-400 border-t border-x border-surface-border' : 'text-gray-500 hover:text-gray-300'}`}>
            <Bot className="w-4 h-4" /> AI Coach
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface prose prose-invert max-w-none text-gray-300 text-sm z-10 flex flex-col">
          
          {activeTab === 'description' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white m-0">{challenge.moduleIndex}. {challenge.title}</h1>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>

              <div className="whitespace-pre-wrap">{challenge.problemStatement}</div>

              <div className="mt-8 border-t border-surface-border/50 pt-6">
                <h3 className="text-white font-semibold mb-3">Example:</h3>
                <div className="bg-surface-hover/50 p-4 rounded-lg border border-surface-border/50 font-mono text-[13px] leading-relaxed">
                  <span className="text-gray-500">Input:</span> {JSON.stringify(challenge.sampleTestCases?.[0]?.input)}<br/>
                  <span className="text-gray-500">Expected Output:</span> {JSON.stringify(challenge.sampleTestCases?.[0]?.expected)}
                </div>
              </div>
            </>
          ) : activeTab === 'solution' ? (
            <div className="flex-1 flex flex-col h-full">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-green-600/20 border border-green-500/30 flex items-center justify-center">
                     <CheckSquare className="w-5 h-5 text-green-400" />
                   </div>
                   <div>
                     <h2 className="text-lg font-bold text-white mb-0">Solution Editor</h2>
                     <p className="text-xs text-gray-400 m-0">Unlock the optimal answer using Credits.</p>
                   </div>
                 </div>
               </div>

               {unlockedSolution ? (
                 <div className="flex-1 bg-surface-hover/50 rounded-lg border border-surface-border/50 overflow-hidden mb-4">
                   <CodeEditor code={unlockedSolution} onChange={() => {}} />
                 </div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-surface-border rounded-lg bg-surface-hover/20 mb-4 p-8 text-center text-gray-400">
                    <Lock className="w-12 h-12 text-gray-500 mb-4" />
                    <h3 className="text-white font-semibold mb-2 text-lg">Solution Locked</h3>
                    <p className="text-sm mb-6 max-w-[250px]">You have not solved this challenge yet. Reveal the authoritative solution to study the optimal approach.</p>
                    <button 
                      onClick={handleUnlockSolution}
                      disabled={isUnlocking}
                      className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md flex items-center gap-2 transition-colors border border-green-400/50 disabled:opacity-50"
                    >
                      {isUnlocking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                      Unlock (-50 CR)
                    </button>
                 </div>
               )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                   <Bot className="w-5 h-5 text-purple-400" />
                 </div>
                 <div>
                   <h2 className="text-lg font-bold text-white mb-0">Debug Assistant</h2>
                   <p className="text-xs text-gray-400 m-0">The AI reads your code and past failures.</p>
                 </div>
               </div>

               <div className="flex-1 bg-surface-hover/30 rounded-lg border border-surface-border/50 p-4 overflow-y-auto mb-4 whitespace-pre-wrap font-mono text-xs">
                 {aiResponse || "Click below to request a context-aware hint."}
               </div>

               <button 
                 onClick={requestHint}
                 disabled={isAiThinking}
                 className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-300 font-bold tracking-wide rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
               >
                 {isAiThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                 {isAiThinking ? 'Analyzing your code...' : 'Get AI Hint'}
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Split Editor & Console */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        
        {/* Editor */}
        <div className="flex-[3] bg-surface/50 rounded-lg border border-surface-border flex flex-col overflow-hidden shadow-sm relative">
          <div className="absolute top-0 w-full h-11 bg-surface-hover/80 flex items-center px-4 justify-between z-10 border-b border-surface-border">
             <div className="flex items-center gap-2">
               <select 
                 className="text-xs font-mono text-gray-300 bg-surface px-2 py-1 flex items-center gap-2 rounded border border-surface-border outline-none focus:border-primary"
                 value={language}
                 onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(challenge.boilerplate?.[e.target.value] || '');
                 }}
               >
                 <option value="javascript">JavaScript</option>
                 <option value="python">Python</option>
               </select>
             </div>
             <div className="flex gap-3">
               <button onClick={() => setCode(challenge.boilerplate?.[language] || '')} className="text-gray-500 hover:text-gray-300 transition-colors" title="Reset Code">
                 <RefreshCcw className="w-4 h-4" />
               </button>
             </div>
          </div>
          <div className="flex-1 pt-11 bg-[#090a0c]">
            <CodeEditor code={code} onChange={(val) => setCode(val || '')} />
          </div>
        </div>

        {/* Console / Output */}
        <div className="flex-[2] bg-surface rounded-lg border border-surface-border flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b border-surface-border flex items-center justify-between bg-surface-hover/50">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveConsoleTab('testcases')}
                className={`text-sm font-medium ${activeConsoleTab === 'testcases' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Public Tests
              </button>
              <button 
                onClick={() => setActiveConsoleTab('result')}
                className={`text-sm font-medium ${activeConsoleTab === 'result' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Output Console
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleRunCode}
                disabled={isExecuting || isSubmitting}
                className="flex items-center gap-2 bg-surface-hover text-gray-300 hover:text-white px-4 py-1.5 rounded border border-surface-border hover:border-gray-500 transition-colors text-sm disabled:opacity-50"
              >
                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run code
              </button>
              <button 
                onClick={handleSubmitCode}
                disabled={isExecuting || isSubmitting}
                className="flex items-center gap-2 bg-green-600/90 text-white hover:bg-green-600 px-4 py-1.5 rounded transition-colors text-sm disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Submit
              </button>
            </div>
          </div>
          <div className="p-4 font-mono text-[13px] leading-relaxed text-gray-400 flex-1 overflow-y-auto whitespace-pre-wrap relative">
            <div className="absolute inset-0 glow-ray opacity-10 pointer-events-none"></div>
            
            {activeConsoleTab === 'testcases' ? (
              <div className="space-y-4">
                {challenge.testCases?.map((tc: any, i: number) => (
                  <div key={i} className="mb-4">
                    <div className="text-gray-300 font-bold mb-2">Test Case {i+1}:</div>
                    <div className="text-gray-500 mb-1">Input:</div>
                    <div className="bg-surface-hover px-3 py-2 rounded border border-surface-border mb-2">{JSON.stringify(tc.input)}</div>
                    <div className="text-gray-500 mb-1">Expected:</div>
                    <div className="bg-surface-hover px-3 py-2 rounded border border-surface-border">{JSON.stringify(tc.expected)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full">
                {output ? (
                  <span className={output.includes("🎊") ? "text-green-400" : output.includes("Error") || output.includes("Failed") ? "text-red-400" : "text-gray-300"}>{output}</span>
                ) : (
                  "Run or submit your code to evaluate against test cases."
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
