import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

const starterPrompts = [
  'Summarize in 5 bullet points',
  'What are the key risks?',
  'Compare findings across docs',
  'Extract action items',
];

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Welcome back! Ask me anything about your knowledge base — I\'ll answer using your uploaded documents.',
    time: '09:41',
  },
  {
    id: 2,
    role: 'user',
    text: 'Give me the main takeaways from the latest strategy document.',
    time: '09:42',
  },
  {
    id: 3,
    role: 'assistant',
    text: 'The strategy document focuses on three priorities: faster document ingestion, stronger retrieval accuracy, and clearer source-grounded responses. It also recommends expanding enterprise support and improving user onboarding.',
    time: '09:42',
  },
];

const assistantReply =
  'Based on the indexed files, the strongest pattern is a push toward faster onboarding, better answer accuracy, and clearer source visibility. Want me to break that down by document or turn it into an action list?';

function maskApiKey(value) {
  if (!value) return 'Not connected';
  if (value.length <= 8) return value;
  return `${value.slice(0, 6)}••••${value.slice(-4)}`;
}

function Try() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(true);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const addUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking || showApiModal) return;
    const nextId = Date.now();
    setMessages((c) => [...c, { id: nextId, role: 'user', text: trimmed, time: 'Now' }]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = '44px';
    setIsThinking(true);
    setTimeout(() => {
      setMessages((c) => [...c, { id: nextId + 1, role: 'assistant', text: assistantReply, time: 'Now' }]);
      setIsThinking(false);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addUserMessage(input);
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = '44px';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  const submitApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;
    setApiKey(trimmed);
    setShowApiModal(false);
  };

  const rightContent = (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-500 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        {maskApiKey(apiKey)}
      </div>
      <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
        3 docs
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900">
      <div className={showApiModal ? 'pointer-events-none select-none blur-sm' : ''}>
        <Navbar rightContent={rightContent} />

        <main className="mx-auto flex h-[calc(100vh-64px)] max-w-3xl flex-col px-4 sm:px-6">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Avatar - assistant only */}
                {msg.role === 'assistant' && (
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8FA6F8] to-[#D16BA5] shadow-sm">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}

                <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-[15px] leading-7 ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm bg-white border border-slate-200 text-slate-800 shadow-sm'
                        : 'rounded-tl-sm bg-gradient-to-br from-[#8FA6F8]/12 to-[#D16BA5]/8 border border-[#8FA6F8]/15 text-slate-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="px-1 text-[11px] text-slate-400">{msg.time}</span>
                </div>

                {/* Avatar - user only */}
                {msg.role === 'user' && (
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
                    U
                  </div>
                )}
              </div>
            ))}

            {/* Thinking */}
            {isThinking && (
              <div className="flex gap-3 justify-start">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8FA6F8] to-[#D16BA5] shadow-sm">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-[#8FA6F8]/15 bg-gradient-to-br from-[#8FA6F8]/12 to-[#D16BA5]/8 px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 rounded-full bg-[#8FA6F8] opacity-60"
                        style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="pb-5 pt-2">
            {/* Starter prompts */}
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addUserMessage(prompt)}
                  disabled={isThinking || showApiModal}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-[#8FA6F8]/40 hover:bg-[#8FA6F8]/5 hover:text-slate-800 disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input box */}
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow focus-within:shadow-lg focus-within:border-[#8FA6F8]/40">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your documents…"
                rows={1}
                disabled={showApiModal}
                className="w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-[15px] leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
                style={{ minHeight: '44px', maxHeight: '140px' }}
              />
              <button
                onClick={() => addUserMessage(input)}
                disabled={!input.trim() || isThinking || showApiModal}
                className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316] text-white shadow-sm transition-all hover:bg-[#ea670f] disabled:bg-slate-200 disabled:text-slate-400"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </main>
      </div>

      {/* API Key Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_32px_80px_-16px_rgba(15,23,42,0.28)]">

            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#8FA6F8] via-[#D16BA5] to-[#F97316]"></div>

            <div className="px-7 pt-7 pb-2">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8FA6F8]/20 to-[#D16BA5]/15">
                <svg className="h-6 w-6 text-[#8FA6F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Enter your API key</h2>
              <p className="mt-1.5 text-sm text-slate-500">Paste your Rag Flow API key to unlock the chat workspace.</p>
            </div>

            <div className="px-7 py-5">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitApiKey()}
                placeholder="sk-rag-••••••••••••••••"
                autoFocus
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-mono text-sm text-slate-800 outline-none transition focus:border-[#8FA6F8] focus:bg-white focus:ring-4 focus:ring-[#8FA6F8]/10"
              />
              <button
                onClick={submitApiKey}
                disabled={!apiKeyInput.trim()}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Unlock Workspace
              </button>
            </div>

            <div className="px-7 pb-6">
              <p className="text-center text-xs text-slate-400">
                Don't have a key?{' '}
                <a href="/upload" className="text-[#8FA6F8] hover:underline font-medium">Generate one on the Upload page</a>
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Try;