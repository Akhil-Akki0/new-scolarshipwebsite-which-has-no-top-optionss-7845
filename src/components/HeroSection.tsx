import React, { useState } from 'react';
import { ArrowDown, Eye, Search, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { UserProfile } from '../types/scholarship';

interface HeroSectionProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSearchSubmit: () => void;
  onLoadSample: () => void;
  eligibleCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  userProfile,
  setUserProfile,
  onSearchSubmit,
  onLoadSample,
  eligibleCount,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    onSearchSubmit();
    
    // Auto scroll smoothly to live results
    setTimeout(() => {
      const el = document.getElementById('live-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = parseInt(rawVal, 10) || 0;
    setUserProfile((prev) => ({ ...prev, annualIncome: num }));
  };

  const formatIncomeDisplay = (amount: number) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <section className="py-16 md:py-20 bg-transparent relative" id="quick-checker">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/60 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Free Public Service • No Sign-up Required
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 leading-tight">
              Find government scholarships you actually qualify for.
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Government portals are messy and hard to search. Tell us what you're studying and your household income, and we'll show you the exact grants you can apply for right now.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#quick-form"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-blue-800"
              >
                <span>Start eligibility check</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onLoadSample}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-lg border border-slate-300 transition-colors cursor-pointer shadow-xs"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>See sample results</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-xl font-bold text-slate-900">Direct</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-normal">Official .gov.in links</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">100% Free</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-normal">No fees or agents</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">Private</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-normal">Runs in your browser</div>
              </div>
            </div>
          </div>

          {/* Hero Search Widget */}
          <div className="lg:col-span-5" id="quick-form">
            <div className="bg-white/85 backdrop-blur-md rounded-xl border border-white/60 p-6 md:p-8 shadow-sm">
              <div className="pb-5 border-b border-slate-200/60 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Check what you qualify for</h2>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">Enter approximate numbers. We do not store or track this data.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-5">
                {/* State Selection */}
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    htmlFor="form-state"
                  >
                    Home State / Domicile
                  </label>
                  <select
                    id="form-state"
                    value={userProfile.state}
                    onChange={(e) =>
                      setUserProfile((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="w-full text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 py-2.5 px-3 transition-colors"
                  >
                    <option value="KA">Karnataka</option>
                    <option value="MH">Maharashtra</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="DL">Delhi</option>
                    <option value="OTHER">Other State / All India</option>
                  </select>
                </div>

                {/* Education Level */}
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                    htmlFor="form-course"
                  >
                    Current Degree or Class
                  </label>
                  <select
                    id="form-course"
                    value={userProfile.degree}
                    onChange={(e) =>
                      setUserProfile((prev) => ({ ...prev, degree: e.target.value }))
                    }
                    className="w-full text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 py-2.5 px-3 transition-colors"
                  >
                    <option value="UG">Undergraduate (B.Tech, B.Sc, B.Com, BA, MBBS)</option>
                    <option value="PG">Postgraduate (M.Tech, M.Sc, MBA, MA)</option>
                    <option value="12">Class 11 - 12 / Polytechnic Diploma</option>
                    <option value="10">Class 9 - 10 (Pre-Matric)</option>
                    <option value="PHD">Ph.D or Doctoral research</option>
                  </select>
                </div>

                {/* Category & Income Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                      htmlFor="form-category"
                    >
                      Category
                    </label>
                    <select
                      id="form-category"
                      value={userProfile.category}
                      onChange={(e) =>
                        setUserProfile((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 py-2.5 px-3 transition-colors"
                    >
                      <option value="GENERAL">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                      htmlFor="form-income"
                    >
                      Annual Family Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">₹</span>
                      <input
                        id="form-income"
                        type="text"
                        value={formatIncomeDisplay(userProfile.annualIncome)}
                        onChange={handleIncomeChange}
                        placeholder="e.g. 2,20,000"
                        className="w-full pl-6 pr-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 py-2.5 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Income shortcuts */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>Quick pick:</span>
                  <button
                    type="button"
                    onClick={() => setUserProfile((p) => ({ ...p, annualIncome: 150000 }))}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    ₹1.5L
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserProfile((p) => ({ ...p, annualIncome: 220000 }))}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    ₹2.2L
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserProfile((p) => ({ ...p, annualIncome: 450000 }))}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    ₹4.5L
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserProfile((p) => ({ ...p, annualIncome: 800000 }))}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    ₹8.0L
                  </button>
                </div>

                {/* Last Score */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                      htmlFor="form-marks"
                    >
                      Previous Year Score
                    </label>
                    <span className="text-xs font-medium text-slate-500">
                      {userProfile.marks}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="form-marks"
                      type="number"
                      min={0}
                      max={100}
                      value={userProfile.marks}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          marks: Number(e.target.value) || 0,
                        }))
                      }
                      placeholder="e.g. 78"
                      className="w-full text-sm rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 py-2.5 px-3 pr-8 transition-colors"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">%</span>
                  </div>
                </div>

                {/* Optional Quota options accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-xs font-medium text-blue-900 hover:text-blue-950 flex items-center gap-1 focus:outline-none"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{showAdvanced ? 'Hide special quota options' : 'More options (Gender / Disability quota)'}</span>
                  </button>

                  {showAdvanced && (
                    <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!userProfile.isFemale}
                          onChange={(e) =>
                            setUserProfile((p) => ({ ...p, isFemale: e.target.checked }))
                          }
                          className="rounded text-blue-900 focus:ring-blue-900"
                        />
                        <span>Female candidate (unlocks AICTE Pragati &amp; Women in STEM grants)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!userProfile.isPwD}
                          onChange={(e) =>
                            setUserProfile((p) => ({ ...p, isPwD: e.target.checked }))
                          }
                          className="rounded text-blue-900 focus:ring-blue-900"
                        />
                        <span>Person with Benchmark Disability (PwD &ge; 40%)</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer focus:ring-2 focus:ring-blue-800"
                >
                  <span>Show eligible schemes</span>
                  <Search className="w-4 h-4" />
                </button>

                {/* Search confirmation alert */}
                {showConfirmation && (
                  <div
                    id="search-confirmation"
                    className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 leading-normal flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      Found <strong>{eligibleCount} eligible schemes</strong> matching your profile below. Scroll to review the verified criteria and official portal links.
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                Direct official links only. No agent fees, no commissions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
