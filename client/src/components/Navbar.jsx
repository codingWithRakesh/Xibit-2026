import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ rightContent }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'Upload' },
    { to: '/try', label: 'Try It' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#8FA6F8]/20 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex flex-shrink-0 items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#8FA6F8]/30 bg-white shadow-md">
            <img
              src="https://www.logodesign.net/logo-new/arrows-inside-globe-with-airplane-507ld.png?nwm=1&nws=1&industry=All&txt_keyword="
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
            Rag Flow
          </span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-[#8FA6F8]/15 to-[#D16BA5]/10 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {rightContent && <div className="hidden sm:flex items-center gap-3">{rightContent}</div>}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 sm:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 sm:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#8FA6F8]/15 to-[#D16BA5]/10 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            {rightContent && <div className="mt-2 border-t border-slate-100 pt-2">{rightContent}</div>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;