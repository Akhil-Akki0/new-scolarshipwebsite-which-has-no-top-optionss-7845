import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FREQUENTLY_APPLIED_SCHEMES } from '../data/scholarships';

interface FrequentlyAppliedSectionProps {
  onCheckStateRules: () => void;
}

export const FrequentlyAppliedSection: React.FC<FrequentlyAppliedSectionProps> = ({
  onCheckStateRules,
}) => {
  return (
    <section className="py-12 md:py-16 bg-transparent" id="schemes">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
            Scheme Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Frequently applied government programs
          </h2>
          <p className="text-slate-600 mt-2 leading-relaxed">
            These are the largest scholarship funds run by central ministries and state departments for school and college students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FREQUENTLY_APPLIED_SCHEMES.map((scheme, idx) => (
            <div
              key={idx}
              className="bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {scheme.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {scheme.amount}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {scheme.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  {scheme.criteria.map((c, cIdx) => (
                    <div key={cIdx}>• {c}</div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    scheme.status.includes('Active')
                      ? 'text-emerald-700'
                      : 'text-slate-600'
                  }`}
                >
                  {scheme.status}
                </span>

                {scheme.portalUrl.startsWith('#') ? (
                  <button
                    type="button"
                    onClick={onCheckStateRules}
                    className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{scheme.portalLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 transition-colors"
                    href={scheme.portalUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{scheme.portalLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
