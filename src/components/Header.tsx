import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { animate, stagger } from 'animejs';

interface HeaderProps {
  onCheckClick: () => void;
  onTriggerSideNavAnimation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCheckClick, onTriggerSideNavAnimation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animate header options sliding in from the right on mount
  useEffect(() => {
    const $items = document.querySelectorAll('.header-nav-link');
    if ($items.length > 0) {
      animate($items, {
        x: ['4rem', '0rem'],
        opacity: [0, 1],
        delay: stagger(40),
        duration: 500,
        ease: 'outBack(1.2)',
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-white/50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-3">
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="ScholarMatch Home">
          <div className="h-9 w-auto flex items-center">
            <img
              alt="ScholarMatch"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W1MKXf2iuAuWCtc31p7wZ_9yW1cf_-TzGl--TOPg6VcXwW4uTshiaWhUTL02e4LmFlhaEED73fljdWtcWIqGAUf-LF3nlQTWtrTR98GnRGuXbC9-gDwUm1aRyEbiuIBMxY618ayQEq-ddusEMTmg7Jm9h58LS-jSsU_QtDIzoXEwOMmIl4snZGHjBUOEwpDWvnjj-eRbKRjQ4ltRvXkHxuZ_Zbue1xeLqAXt3ACJcdXY3jdDe6JgVYWw"
            />
          </div>
        </a>

        {/* Right-Side Navigation Area (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Navigation Links Grouped to the Right Side */}
          <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
            <a
              href="#"
              className="header-nav-link px-3 py-1.5 rounded-lg text-blue-900 bg-blue-50/80 hover:bg-blue-100/80 font-semibold transition-all"
            >
              Home
            </a>
            <a
              href="#live-results"
              className="header-nav-link px-3 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100/80 transition-all"
            >
              Live Search Demo
            </a>
            <a
              href="#schemes"
              className="header-nav-link px-3 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100/80 transition-all"
            >
              All Schemes
            </a>
            <a
              href="#how-it-works"
              className="header-nav-link px-3 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100/80 transition-all"
            >
              How We Check
            </a>
            <a
              href="#faq"
              className="header-nav-link px-3 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100/80 transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Zone right next to links */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200/80">
            <button
              onClick={onCheckClick}
              type="button"
              className="header-nav-link inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Check Eligibility</span>
            </button>

            {onTriggerSideNavAnimation && (
              <button
                type="button"
                onClick={onTriggerSideNavAnimation}
                title="Play Side Nav Animation"
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onCheckClick}
            type="button"
            className="px-3 py-1.5 bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-xs"
          >
            Check
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (animated from right) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/50 bg-white/95 backdrop-blur-xl px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-right-4 duration-200">
          <div className="pb-2 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            ScholarMatch Menu
          </div>
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-blue-950 bg-blue-50 font-semibold text-sm"
          >
            Home
          </a>
          <a
            href="#live-results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            Live Search Demo
          </a>
          <a
            href="#schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            All Schemes
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            How We Check
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            FAQ
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCheckClick();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold text-sm rounded-xl text-center shadow-md cursor-pointer"
            >
              Check Eligibility Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
