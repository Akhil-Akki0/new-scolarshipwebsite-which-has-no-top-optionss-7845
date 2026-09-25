import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  ExternalLink,
  Info,
  AlertCircle
} from 'lucide-react';
import { Scholarship, UserProfile, MatchStatus } from '../types/scholarship';

interface LiveResultsSectionProps {
  userProfile: UserProfile;
  scholarships: Scholarship[];
  onOpenSchemeModal: (scheme: Scholarship) => void;
  onResetToSample: () => void;
}

export const LiveResultsSection: React.FC<LiveResultsSectionProps> = ({
  userProfile,
  scholarships,
  onOpenSchemeModal,
  onResetToSample,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'eligible' | 'borderline' | 'catalog'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Evaluate each scholarship against user profile
  const evaluateScholarship = (
    scheme: Scholarship,
    profile: UserProfile
  ): { status: MatchStatus; checkpoints: { label: string; passed: boolean; isWarning?: boolean }[] } => {
    const checkpoints: { label: string; passed: boolean; isWarning?: boolean }[] = [];

    // 1. Income check
    const incomePassed = profile.annualIncome <= scheme.maxIncome;
    const formattedMax = new Intl.NumberFormat('en-IN').format(scheme.maxIncome);
    const formattedUser = new Intl.NumberFormat('en-IN').format(profile.annualIncome);
    checkpoints.push({
      label: `Income cap: ₹${formattedMax} / yr (Yours: ₹${formattedUser})`,
      passed: incomePassed,
    });

    // 2. Marks check
    const marksPassed = profile.marks >= scheme.minMarks;
    checkpoints.push({
      label: `Min. score: ${scheme.minMarks}% (Yours: ${profile.marks}%)`,
      passed: marksPassed,
    });

    // 3. Quota / Category criteria
    let isBorderline = false;
    const hasCategoryMatch = scheme.categories.includes(profile.category) || scheme.categories.includes('GENERAL');

    if (scheme.womenOnly) {
      if (profile.isFemale || profile.isPwD) {
        checkpoints.push({
          label: 'Eligibility: Female or PwD track matched',
          passed: true,
        });
      } else {
        isBorderline = true;
        checkpoints.push({
          label: 'Special quota: Female or PwD students only',
          passed: false,
          isWarning: true,
        });
      }
    }

    if (!hasCategoryMatch) {
      isBorderline = true;
      checkpoints.push({
        label: `Reserved for ${scheme.categories.join('/')} category`,
        passed: false,
        isWarning: true,
      });
    }

    const stateMatched = scheme.states.includes('ALL') || scheme.states.includes(profile.state);
    const degreeMatched = scheme.degrees.includes(profile.degree);

    // Overall status determination
    if (incomePassed && marksPassed && degreeMatched && stateMatched && !isBorderline) {
      return { status: 'eligible', checkpoints };
    } else if ((incomePassed || marksPassed) && isBorderline) {
      return { status: 'borderline', checkpoints };
    } else if (incomePassed && marksPassed && (degreeMatched || stateMatched)) {
      return { status: 'borderline', checkpoints };
    } else {
      return { status: 'ineligible', checkpoints };
    }
  };

  // Filter scholarships
  const evaluatedList = scholarships.map((s) => ({
    scheme: s,
    evaluation: evaluateScholarship(s, userProfile),
  }));

  const filteredResults = evaluatedList.filter(({ scheme, evaluation }) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        scheme.title.toLowerCase().includes(q) ||
        scheme.portal.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filterTab === 'eligible') {
      return evaluation.status === 'eligible';
    }
    if (filterTab === 'borderline') {
      return evaluation.status === 'borderline';
    }
    if (filterTab === 'catalog') {
      return true; // show everything
    }
    // Default 'all': Show eligible and borderline
    return evaluation.status === 'eligible' || evaluation.status === 'borderline';
  });

  const stateNameMap: Record<string, string> = {
    KA: 'Karnataka',
    MH: 'Maharashtra',
    UP: 'Uttar Pradesh',
    TN: 'Tamil Nadu',
    DL: 'Delhi',
    OTHER: 'All India',
  };

  const degreeNameMap: Record<string, string> = {
    UG: 'B.Tech / Degree (UG)',
    PG: 'M.Tech / Master (PG)',
    '12': 'Class 11 - 12',
    '10': 'Class 9 - 10',
    PHD: 'Doctoral / Ph.D',
  };

  const formattedProfileIncome = new Intl.NumberFormat('en-IN').format(
    userProfile.annualIncome
  );

  return (
    <section className="py-12 md:py-16 bg-transparent" id="live-results">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
            Concrete Product Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Real search results with clear match reasons
          </h2>
          <p className="text-slate-600 mt-2 leading-relaxed">
            Here is what the tool actually outputs when someone fills out their profile. Instead of a vague list, you see the exact income cut-off, mark requirements, required papers, and the direct link to apply on the official government site.
          </p>
        </div>

        {/* High-Fidelity Results Container */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl overflow-hidden shadow-xs">
          {/* Sample / Active Profile Pill Bar */}
          <div className="p-4 bg-white/60 backdrop-blur-sm border-b border-white/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700">Sample Profile:</span>
              <span className="bg-white/90 border border-slate-200/80 px-2 py-1 rounded text-slate-800">
                State: {stateNameMap[userProfile.state] || userProfile.state}
              </span>
              <span className="bg-white/90 border border-slate-200/80 px-2 py-1 rounded text-slate-800">
                Degree: {degreeNameMap[userProfile.degree] || userProfile.degree}
              </span>
              <span className="bg-white/90 border border-slate-200/80 px-2 py-1 rounded text-slate-800">
                Income: ₹{formattedProfileIncome} / year
              </span>
              <span className="bg-white/90 border border-slate-200/80 px-2 py-1 rounded text-slate-800">
                Marks: {userProfile.marks}%
              </span>
              <span className="bg-white/90 border border-slate-200/80 px-2 py-1 rounded text-slate-800">
                Category: {userProfile.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium">
                Showing {filteredResults.length} of {scholarships.length} matches
              </span>
              <button
                type="button"
                onClick={onResetToSample}
                className="text-blue-900 hover:text-blue-950 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
              >
                Reset to default sample
              </button>
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="px-6 py-3 bg-white/50 backdrop-blur-sm border-b border-white/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Matches ({evaluatedList.filter((e) => e.evaluation.status !== 'ineligible').length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('eligible')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  filterTab === 'eligible'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                100% Eligible ({evaluatedList.filter((e) => e.evaluation.status === 'eligible').length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('borderline')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  filterTab === 'borderline'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Borderline / Quotas ({evaluatedList.filter((e) => e.evaluation.status === 'borderline').length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('catalog')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  filterTab === 'catalog'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Explore All ({scholarships.length})
              </button>
            </div>

            {/* Keyword filter */}
            <div className="w-full sm:w-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter results..."
                className="w-full sm:w-48 text-xs border border-slate-200 rounded-md px-2.5 py-1.5 focus:border-blue-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Result Items */}
          <div className="divide-y divide-slate-200">
            {filteredResults.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No schemes found under this filter</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your annual family income bracket or score in the checker above, or switch to the "Explore All" tab.
                </p>
                <button
                  type="button"
                  onClick={() => setFilterTab('catalog')}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold"
                >
                  View All Indexed Schemes
                </button>
              </div>
            ) : (
              filteredResults.map(({ scheme, evaluation }) => {
                const isBorderline = evaluation.status === 'borderline';
                const isIneligible = evaluation.status === 'ineligible';

                return (
                  <div
                    key={scheme.id}
                    className="p-6 transition-colors hover:bg-slate-50/50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      {/* Left: Scheme Information */}
                      <div className="space-y-3 max-w-2xl flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {isBorderline ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-900">
                              Special Criteria / Quota
                            </span>
                          ) : isIneligible ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                              Threshold Exceeded
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                              Eligible to apply
                            </span>
                          )}

                          <span className="text-xs text-slate-500 font-medium">
                            • {scheme.portal}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900 leading-snug">
                            {scheme.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{scheme.issuingAuthority}</p>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {scheme.description}
                        </p>

                        {/* Criteria Highlights */}
                        <div className="flex flex-wrap gap-2 pt-1 text-xs">
                          {evaluation.checkpoints.map((cp, idx) => (
                            <div
                              key={idx}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                                cp.isWarning
                                  ? 'bg-amber-50 border-amber-200 text-amber-900 font-medium'
                                  : cp.passed
                                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                                  : 'bg-rose-50 border-rose-200 text-rose-800 font-medium'
                              }`}
                            >
                              {cp.isWarning ? (
                                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              ) : cp.passed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              )}
                              <span>{cp.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Scholarship Amount & Clear Actions */}
                      <div className="lg:text-right shrink-0 flex flex-col justify-between space-y-4 lg:min-w-[220px]">
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Scholarship Amount
                          </div>
                          <div className="text-xl font-bold text-slate-900 mt-0.5 tabular-nums">
                            {scheme.amount}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {scheme.deadline}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <a
                            href={scheme.applyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                          >
                            <span>Apply on official portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => onOpenSchemeModal(scheme)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>View guidelines &amp; checklist</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Table footer explanation */}
          <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-white/40 text-center text-xs text-slate-600">
            Every match is cross-referenced with the latest ministry rules. We show you why you pass and give you the real application link without passing through any middlemen.
          </div>
        </div>
      </div>
    </section>
  );
};
