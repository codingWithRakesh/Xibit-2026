import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const rightContent = (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-[#8FA6F8] focus:ring-offset-2"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Sign in with Google
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar rightContent={rightContent} />

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h1 className="mb-6 mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Interact with your documents like never before
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-slate-600">
            Our RAG (Retrieval-Augmented Generation) application allows you to upload text or PDFs
            and ask questions directly to them using the power of generative AI.
          </p>
        </div>

        <div className="mt-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">How to use our application</h2>
            <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"></div>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="absolute left-[15%] right-[15%] top-[44px] hidden h-0.5 border-t border-dashed border-slate-300 md:block"></div>

            {[
              {
                bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'bg-indigo-500',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />,
                title: '1. Upload Documents',
                desc: 'Securely upload your PDFs, Word documents, or plain text files. Our engine processes and indexes your files in seconds.',
              },
              {
                bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'bg-emerald-500',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />,
                title: '2. Ask Questions',
                desc: 'Interact with the AI using natural language. Ask complex or highly specific questions about the content of your knowledge base.',
              },
              {
                bg: 'bg-violet-50', text: 'text-violet-600', hover: 'bg-violet-500',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                title: '3. Get Instant Insights',
                desc: 'Receive accurate, context-aware answers extracted directly from your files. The AI cites its sources so you can verify instantly.',
              },
            ].map(({ bg, text, hover, icon, title, desc }) => (
              <div key={title} className="group relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-md transition-transform duration-300 group-hover:-translate-y-2">
                  <div className={`absolute inset-0 ${hover} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10`}></div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${text} shadow-inner`}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;