import React from 'react';

export const GazettePartnersStrip: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">
            <span className="font-bold text-slate-900">Official government sources:</span> Direct links to central and state scholarship portals.
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
            <a
              href="https://scholarships.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 bg-white/80 hover:bg-white border border-white/60 shadow-2xs rounded-md transition-colors"
            >
              scholarships.gov.in (NSP)
            </a>
            <a
              href="https://dbtbharat.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 bg-white/80 hover:bg-white border border-white/60 shadow-2xs rounded-md transition-colors"
            >
              dbtbharat.gov.in
            </a>
            <a
              href="https://www.ugc.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 bg-white/80 hover:bg-white border border-white/60 shadow-2xs rounded-md transition-colors"
            >
              UGC &amp; AICTE Gazettes
            </a>
            <span className="px-2.5 py-1.5 bg-white/80 border border-white/60 shadow-2xs rounded-md text-slate-700">
              State Welfare Portals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
