import React, { useEffect, useState, useRef, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import {
  GraduationCap,
  Home,
  Search,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface RightSideNavProps {
  onCheckClick: () => void;
  animationTrigger?: number;
}

interface NavItem {
  id: string;
  label: string;
  subtitle?: string;
  icon: React.ReactNode;
  targetId?: string;
  isCta?: boolean;
  isBrand?: boolean;
}

export const RightSideNav: React.FC<RightSideNavProps> = ({
  onCheckClick,
  animationTrigger = 0,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    {
      id: 'brand',
      label: 'ScholarMatch',
      subtitle: 'Govt Scholarship Portal',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      targetId: 'top',
      isBrand: true,
    },
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      targetId: 'top',
    },
    {
      id: 'live-results',
      label: 'Live Search Demo',
      subtitle: 'Real Live Cutoffs',
      icon: <Search className="w-4 h-4" />,
      targetId: 'live-results',
    },
    {
      id: 'schemes',
      label: 'All Schemes',
      subtitle: 'State & Central List',
      icon: <BookOpen className="w-4 h-4" />,
      targetId: 'schemes',
    },
    {
      id: 'how-it-works',
      label: 'How We Check',
      subtitle: 'Gazette Criteria',
      icon: <ShieldCheck className="w-4 h-4" />,
      targetId: 'how-it-works',
    },
    {
      id: 'faq',
      label: 'FAQ',
      subtitle: 'Instant Answers',
      icon: <HelpCircle className="w-4 h-4" />,
      targetId: 'faq',
    },
    {
      id: 'quick-checker',
      label: 'Check Eligibility',
      subtitle: 'Instant Free Match',
      icon: <CheckCircle2 className="w-4 h-4" />,
      targetId: 'quick-checker',
      isCta: true,
    },
  ];

  // Run Anime.js entrance animation on mount and state changes
  const playEntranceAnimation = useCallback(() => {
    const $demo = document.querySelector('#selector-demo') as HTMLElement | null;
    if (!$demo) return;
    const $squares = $demo.querySelectorAll('.square');

    setIsAnimating(true);

    // Animate container scale (as in user sample: animate($demo, { scale: .75 }))
    animate($demo, {
      scale: [0.75, 1],
      opacity: [0, 1],
      duration: 550,
      ease: 'outBack(1.2)',
    });

    // Animate squares sliding in from right (as in user sample: animate($squares, { x: '23rem' }))
    animate($squares, {
      x: ['23rem', '0rem'],
      opacity: [0, 1],
      delay: stagger(60),
      duration: 650,
      ease: 'outBack(1.3)',
      onComplete: () => {
        setIsAnimating(false);
      },
    });
  }, []);

  // Demo animation showing the exact user snippet transition: scale .75 and x: 23rem
  const playDemoAnimation = useCallback(() => {
    const $demo = document.querySelector('#selector-demo') as HTMLElement | null;
    if (!$demo) return;
    const $squares = $demo.querySelectorAll('.square');

    setIsAnimating(true);

    // Container bounce scale: 1 -> .75 -> 1
    animate($demo, {
      scale: [1, 0.75, 1],
      duration: 750,
      ease: 'inOutQuad',
    });

    // Squares translate out to 23rem then back into place
    animate($squares, {
      x: ['0rem', '23rem', '0rem'],
      delay: stagger(50),
      duration: 850,
      ease: 'inOutCubic',
      onComplete: () => {
        setIsAnimating(false);
      },
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      playEntranceAnimation();
    }, 150);

    return () => clearTimeout(timer);
  }, [playEntranceAnimation]);

  // Trigger from parent if header triggers it
  useEffect(() => {
    if (animationTrigger > 0) {
      playDemoAnimation();
    }
  }, [animationTrigger, playDemoAnimation]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;

      if (scrollPos < 450) {
        setActiveSection('home');
        return;
      }

      const sections = ['quick-checker', 'live-results', 'how-it-works', 'schemes', 'faq'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item: NavItem) => {
    if (mobileOpen) setMobileOpen(false);

    if (item.isCta) {
      onCheckClick();
      return;
    }

    if (item.targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.targetId);
      }
    }
  };

  // Hover animation on individual square items using animejs
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      x: '-0.35rem',
      scale: 1.02,
      duration: 200,
      ease: 'outQuad',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      x: '0rem',
      scale: 1,
      duration: 200,
      ease: 'outQuad',
    });
  };

  return (
    <>
      {/* Mobile Floating Side Tab on Right Edge */}
      <button
        type="button"
        onClick={() => {
          setMobileOpen(!mobileOpen);
          setTimeout(playEntranceAnimation, 60);
        }}
        className="sm:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-l from-blue-900 to-indigo-900 text-white p-2.5 rounded-l-2xl shadow-xl flex flex-col items-center gap-1 border-y border-l border-white/30 cursor-pointer"
        aria-label="Open Side Navigation"
      >
        <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
        <span className="text-[10px] font-bold [writing-mode:vertical-lr] tracking-wider uppercase rotate-180">
          Menu
        </span>
      </button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="sm:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Main Right Side Navigation Dock / Rail */}
      <aside
        className={`fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          mobileOpen ? 'block' : 'hidden sm:block'
        }`}
        aria-label="Right Side Navigation Menu"
      >
        {/* Anime.js Selector Demo Navigation Container */}
        <div
          id="selector-demo"
          ref={containerRef}
          className={`relative backdrop-blur-xl bg-white/90 border border-white/70 shadow-2xl rounded-2xl p-2.5 transition-all duration-200 ring-1 ring-slate-900/5 ${
            isExpanded ? 'w-56 md:w-60' : 'w-16'
          }`}
        >
          {/* Top Header of the Right Nav: Controls & Expand Toggle */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/70 px-1">
            {isExpanded ? (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Right Menu</span>
              </div>
            ) : (
              <div className="w-2 h-2 mx-auto rounded-full bg-blue-600 animate-pulse"></div>
            )}

            <div className="flex items-center gap-1">
              {/* Anime.js Replay Demo Animation Button */}
              <button
                type="button"
                onClick={playDemoAnimation}
                disabled={isAnimating}
                title="Play Anime.js Animation (scale .75, x 23rem)"
                className="p-1 rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              {/* Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  setTimeout(playEntranceAnimation, 50);
                }}
                title={isExpanded ? 'Collapse to icon rail' : 'Expand navigation'}
                className="hidden sm:inline-flex p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                  <ChevronLeft className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Mobile close button */}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="sm:hidden p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* The Rows and Squares (matching user's structure: .row -> .square) */}
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'home' && activeSection === 'home') ||
                (item.id === 'brand' && activeSection === 'home') ||
                (item.targetId && activeSection === item.targetId);

              return (
                <div key={item.id} className="medium row">
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`square w-full flex items-center text-left transition-all duration-150 rounded-xl cursor-pointer ${
                      item.isBrand
                        ? 'p-2 bg-gradient-to-r from-blue-50/95 to-indigo-50/95 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/80 shadow-xs'
                        : item.isCta
                        ? 'p-2.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white shadow-md font-semibold ring-1 ring-blue-500/30'
                        : isActive
                        ? 'p-2 bg-blue-600 text-white font-semibold shadow-sm'
                        : 'p-2 text-slate-700 hover:bg-slate-100/90 hover:text-slate-950'
                    }`}
                    title={item.label}
                  >
                    <div
                      className={`flex items-center justify-center shrink-0 ${
                        isExpanded ? 'mr-2.5' : 'mx-auto'
                      } ${
                        item.isBrand
                          ? 'p-1 rounded-lg bg-blue-100 text-blue-800'
                          : item.isCta
                          ? 'p-1 rounded-lg bg-white/20 text-white'
                          : isActive
                          ? 'text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.icon}
                    </div>

                    {isExpanded && (
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs truncate ${
                              item.isCta || isActive
                                ? 'font-bold'
                                : item.isBrand
                                ? 'font-bold text-slate-900'
                                : 'font-medium'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.isCta && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-bold uppercase tracking-tight">
                              Live
                            </span>
                          )}
                          {item.isBrand && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-200/80 text-blue-950 font-bold uppercase tracking-tight">
                              Gov
                            </span>
                          )}
                        </div>
                        {item.subtitle && !item.isCta && !isActive && (
                          <div className="text-[10px] text-slate-500 truncate leading-tight">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Quick-Action Footer */}
          {isExpanded && (
            <div className="pt-2 mt-2 border-t border-slate-200/70 text-center">
              <button
                type="button"
                onClick={playDemoAnimation}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 text-[10px] font-semibold text-blue-700 hover:text-blue-900 hover:bg-blue-50/80 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Slide Animation</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
