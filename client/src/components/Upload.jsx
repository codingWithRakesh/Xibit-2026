import React, { useState, useRef } from 'react';
import Navbar from './Navbar';

const Upload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey] = useState('sk-rag-f9a8d7e6c5b4a3c2d1e0f9a8d7e6c5b4');
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return { bg: 'bg-red-50', text: 'text-red-500', label: 'PDF' };
    if (ext === 'docx' || ext === 'doc') return { bg: 'bg-blue-50', text: 'text-blue-500', label: 'DOC' };
    return { bg: 'bg-slate-50', text: 'text-slate-500', label: 'TXT' };
  };

  const addFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      status: 'uploading',
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((f) => {
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((item) => item.id === f.id ? { ...item, status: 'done' } : item)
        );
      }, 1200 + Math.random() * 800);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const handleRemove = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const rightContent = (
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-[#7d96f3] hover:to-[#c45a98] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8FA6F8] focus:ring-offset-2"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
      Create API
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-800">
      <Navbar rightContent={rightContent} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Upload Documents</h1>
          <p className="mt-2 text-slate-500">Add your PDFs, Word docs, or text files to your knowledge base.</p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? 'border-[#8FA6F8] bg-[#8FA6F8]/5 scale-[1.01]'
              : 'border-slate-200 bg-white hover:border-[#8FA6F8]/50 hover:bg-[#8FA6F8]/3'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt,.docx,.doc"
            className="hidden"
            onChange={(e) => { if (e.target.files.length) addFiles(e.target.files); }}
          />
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-200 ${isDragging ? 'bg-[#8FA6F8]/15' : 'bg-slate-100'}`}>
              <svg className={`h-8 w-8 transition-colors duration-200 ${isDragging ? 'text-[#8FA6F8]' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-700">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="mt-1 text-sm text-slate-400">or <span className="text-[#8FA6F8] font-medium">browse to upload</span></p>
            <div className="mt-5 flex items-center gap-2">
              {['PDF', 'DOCX', 'TXT'].map((type) => (
                <span key={type} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">{type}</span>
              ))}
            </div>
          </div>
        </div>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} added</p>
              <button onClick={() => setUploadedFiles([])} className="text-xs text-slate-400 hover:text-red-400 transition-colors">Clear all</button>
            </div>

            {uploadedFiles.map((file) => {
              const icon = getFileIcon(file.name);
              return (
                <div key={file.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm">
                  {/* Icon */}
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${icon.bg}`}>
                    <span className={`text-xs font-bold ${icon.text}`}>{icon.label}</span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-shrink-0 items-center gap-3">
                    {file.status === 'uploading' ? (
                      <div className="flex items-center gap-1.5 text-xs text-[#8FA6F8]">
                        <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Processing
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Ready
                      </div>
                    )}
                    <button onClick={() => handleRemove(file.id)} className="rounded-full p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition-colors">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Confirm Button */}
            {uploadedFiles.every((f) => f.status === 'done') && (
              <button className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-[#7d96f3] hover:to-[#c45a98] hover:shadow-lg">
                Add to Knowledge Base →
              </button>
            )}
          </div>
        )}
      </main>

      {/* API Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-[#8FA6F8]/10">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-[#8FA6F8]/10 via-white to-[#D16BA5]/10 px-6 py-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg className="h-5 w-5 text-[#8FA6F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Your API Key
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-slate-600">Please copy this API key and keep it safe. You will not be able to see it again after closing.</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value={apiKey} className="block w-full rounded-lg border border-[#8FA6F8]/15 bg-[#F3F4F6] p-2.5 font-mono text-sm text-slate-800" />
                <button onClick={handleCopy} className="flex min-w-[90px] items-center justify-center gap-1.5 rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#ea670f]">
                  {copied ? (
                    <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
                  ) : (
                    <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>Copy</>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end border-t border-slate-100 bg-[#F3F4F6] px-6 py-4">
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg border border-[#D16BA5]/20 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-[#D16BA5]/5">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;