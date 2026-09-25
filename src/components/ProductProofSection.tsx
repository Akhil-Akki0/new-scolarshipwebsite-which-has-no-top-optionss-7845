import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface ProductProofSectionProps {
  onCheckNow: () => void;
}

const GAZETTE_SAMPLES = [
  {
    id: 'karnataka-bcwd',
    title: 'Karnataka State SSP Post-Matric Scheme',
    gazetteRef: 'BCWD/SCH/NOTIF-2024/772-B',
    date: 'August 14, 2024',
    ministry: 'Backward Classes Welfare Department, Govt. of Karnataka',
    portalUrl: 'https://ssp.postmatric.karnataka.gov.in',
    rawExcerpt:
      'Clause 4.2: Under Section 4 of the Karnataka Welfare Act, full college maintenance allowance and course fee reimbursement shall be credited via Direct Benefit Transfer to eligible Category-1, 2A, 3A, and 3B candidates whose annual parental income from all sources does not exceed ₹2,50,000 and who have secured not less than 50% in the preceding qualifying examination.',
    parsedRules: [
      { rule: 'Income ceiling', condition: 'Max ₹2,50,000 / year', source: 'Section 4.2, Para 1' },
      { rule: 'Academic marks', condition: 'Minimum 50% in previous exam', source: 'Section 4.2, Para 2' },
      { rule: 'State domicile', condition: 'Karnataka resident with Nadakacheri RD', source: 'Section 2.1' },
      { rule: 'Eligible categories', condition: 'OBC / Category 1, 2A, 2B, 3A, 3B', source: 'Schedule II' },
    ],
    sampleOutput: 'PASS: Qualified for ₹25,000 – ₹55,000 annual fee reimbursement directly through SSP portal.',
  },
  {
    id: 'central-pm-usp',
    title: 'Ministry of Education PM-USP Central Scheme',
    gazetteRef: 'MoE/HE/CSSS/GZ-2024-89',
    date: 'July 1, 2024',
    ministry: 'Department of Higher Education, Govt. of India',
    portalUrl: 'https://scholarships.gov.in',
    rawExcerpt:
      'Paragraph 3.1: The Central Sector Scheme of Scholarship for College and University Students awards 82,000 annual scholarships. Beneficiaries must have obtained above 80th percentile in the relevant stream from the respective Board of Examination in Class 12, with parental income not exceeding ₹4,50,000 per annum, enrolled in regular recognized degree tracks.',
    parsedRules: [
      { rule: 'Income ceiling', condition: 'Max ₹4,50,000 / year', source: 'Para 3.1(b)' },
      { rule: 'Academic cutoff', condition: 'Top 20th percentile in Class 12 board', source: 'Para 3.1(a)' },
      { rule: 'Institution accreditation', condition: 'UGC / AICTE recognized colleges', source: 'Para 4.0' },
      { rule: 'Payment mechanism', condition: 'Direct Bank Transfer via Aadhaar NPCI', source: 'Para 7.2' },
    ],
    sampleOutput: 'PASS: Qualified for ₹12,000/year for undergraduate study via National Scholarship Portal.',
  },
  {
    id: 'maharashtra-shahu',
    title: 'Maharashtra MahaDBT Rajarshi Shahu Maharaj Scheme',
    gazetteRef: 'DHE-EBC-2024/CR-104',
    date: 'July 25, 2024',
    ministry: 'Directorate of Higher Education, Govt. of Maharashtra',
    portalUrl: 'https://mahadbt.maharashtra.gov.in',
    rawExcerpt:
      'Resolution No. EBC-2016/CR-221: Fifty percent (50%) of the tuition and examination fees fixed by the Fee Regulating Authority (FRA) shall be reimbursed to students admitted through Centralized Admission Process (CAP) rounds with family income strictly under ₹8,00,000 per annum.',
    parsedRules: [
      { rule: 'Income ceiling', condition: 'Max ₹8,00,000 / year', source: 'GR Sec 3' },
      { rule: 'Admission channel', condition: 'CAP allotment only (MHT-CET/JEE)', source: 'GR Sec 1.4' },
      { rule: 'State domicile', condition: 'Maharashtra domicile certificate', source: 'GR Sec 2' },
      { rule: 'Reimbursement rate', condition: '50% of approved FRA college fees', source: 'FRA Schedule A' },
    ],
    sampleOutput: 'PASS: Qualified for 50% tuition reimbursement directly into student bank account.',
  },
];

export const ProductProofSection: React.FC<ProductProofSectionProps> = ({ onCheckNow }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeGazette = GAZETTE_SAMPLES[activeTab];

  return (
    <section className="py-12 md:py-16 bg-transparent" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
            Official Eligibility Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How ScholarMatch checks your eligibility against government criteria
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            Government scholarship circulars are detailed and formal. Below is a live look at how official notifications are cross-referenced against student qualifications so you can confirm requirements before applying.
          </p>
        </div>

        {/* Live Gazette-to-Rules Comparison Workbench */}
        <div className="border border-white/60 rounded-xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xs">
          {/* Gazette Switcher Tabs */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-700 mr-2">Select a verified gazette:</span>
              {GAZETTE_SAMPLES.map((g, index) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === index
                      ? 'bg-white text-blue-900 border border-slate-300 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {g.title.split(' ')[0]} {g.title.split(' ')[1]}
                </button>
              ))}
            </div>

            <span className="text-slate-500 font-mono text-[11px]">
              Gazette Ref: {activeGazette.gazetteRef}
            </span>
          </div>

          {/* Side by side: Raw Gazette on Left vs Parsed Verification on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left: Raw Government Circular Excerpt */}
            <div className="lg:col-span-6 p-6 space-y-4 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Step 1: Official Gazette Order
                </span>
                <span className="text-[11px] text-slate-500">Published: {activeGazette.date}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">{activeGazette.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{activeGazette.ministry}</p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-serif leading-relaxed italic">
                "{activeGazette.rawExcerpt}"
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Original Document: Gazette Notification</span>
                <a
                  href={activeGazette.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-900 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: Parsed Logic Extracted by ScholarMatch */}
            <div className="lg:col-span-6 p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                  Step 2: Parsed Rules &amp; Verification Checks
                </span>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active in 2024–25
                </span>
              </div>

              <div className="space-y-2.5">
                {activeGazette.parsedRules.map((rule, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{rule.rule}</div>
                      <div className="text-slate-600 mt-0.5">{rule.condition}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {rule.source}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sample Output Banner */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 font-medium">
                <strong>Result:</strong> {activeGazette.sampleOutput}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Privacy & Action */}
          <div className="p-4 bg-white/60 backdrop-blur-sm border-t border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <p className="text-slate-600">
              <strong>Our privacy promise:</strong> The verification runs entirely inside your browser. We never save your data or sell it to coaching institutes or loan providers.
            </p>
            <button
              type="button"
              onClick={onCheckNow}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              Check your numbers now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
