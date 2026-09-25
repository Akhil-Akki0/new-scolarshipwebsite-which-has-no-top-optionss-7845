import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & About */}
          <div className="md:col-span-2 space-y-3">
            <div className="h-8 flex items-center">
              <img
                alt="ScholarMatch"
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida/AEtjO1W1MKXf2iuAuWCtc31p7wZ_9yW1cf_-TzGl--TOPg6VcXwW4uTshiaWhUTL02e4LmFlhaEED73fljdWtcWIqGAUf-LF3nlQTWtrTR98GnRGuXbC9-gDwUm1aRyEbiuIBMxY618ayQEq-ddusEMTmg7Jm9h58LS-jSsU_QtDIzoXEwOMmIl4snZGHjBUOEwpDWvnjj-eRbKRjQ4ltRvXkHxuZ_Zbue1xeLqAXt3ACJcdXY3jdDe6JgVYWw"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              ScholarMatch is a free, independent guide to public and state academic scholarships in India. We help students find official schemes without paying agents or consulting middlemen.
            </p>
          </div>

          {/* Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                  href="https://scholarships.gov.in"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                  href="https://dbtbharat.gov.in"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>DBT Bharat Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                  href="https://www.ugc.gov.in"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>University Grants Commission</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                  href="https://www.aicte-india.org"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>AICTE Portals &amp; Schemes</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a className="hover:text-slate-900 transition-colors" href="#quick-checker">
                  Eligibility Checker
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 transition-colors" href="#live-results">
                  Sample Result Table
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 transition-colors" href="#faq">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900 transition-colors" href="#schemes">
                  Supported State Welfare Portals
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Strip */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="leading-relaxed max-w-2xl text-justify md:text-left">
            Disclaimer: ScholarMatch is not an official government entity or application processor. All scheme details, eligibility guidelines, and deadlines are compiled from public gazette releases and are subject to ministry amendments. Please double-check with the respective portal before applying.
          </p>
          <p className="shrink-0">
            &copy; 2024 ScholarMatch. Public Information Guide.
          </p>
        </div>
      </div>
    </footer>
  );
};
