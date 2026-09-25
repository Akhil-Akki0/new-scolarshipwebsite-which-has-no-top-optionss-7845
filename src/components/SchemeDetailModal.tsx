import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  FileText,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface SchemeDetailModalProps {
  scheme: Scholarship | null;
  onClose: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({ scheme, onClose }) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!scheme) return null;

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [doc]: !prev[doc],
    }));
  };

  const totalDocs = scheme.documentsRequired.length;
  const completedDocs = scheme.documentsRequired.filter((d) => checkedDocs[d]).length;
  const progressPercent = Math.round((completedDocs / totalDocs) * 100);

  const handleCopyChecklist = () => {
    const text = `Document Checklist for ${scheme.title}:\n` +
      scheme.documentsRequired.map((d, i) => `${i + 1}. [${checkedDocs[d] ? 'X' : ' '}] ${d}`).join('\n') +
      `\n\nOfficial Apply Link: ${scheme.applyUrl}\nGazette Ref: ${scheme.gazetteRef}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/60 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
              Official Gazette Rulebook &amp; Checklist
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {scheme.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{scheme.issuingAuthority}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Facts Summary Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
            <div>
              <div className="text-slate-500">Award Amount</div>
              <div className="font-bold text-slate-900 mt-0.5 text-sm tabular-nums">{scheme.amount}</div>
            </div>
            <div>
              <div className="text-slate-500">Income Cap</div>
              <div className="font-bold text-slate-900 mt-0.5 text-sm tabular-nums">
                ₹{new Intl.NumberFormat('en-IN').format(scheme.maxIncome)}
              </div>
            </div>
            <div>
              <div className="text-slate-500">Min. Marks</div>
              <div className="font-bold text-slate-900 mt-0.5 text-sm">{scheme.minMarks}%</div>
            </div>
            <div>
              <div className="text-slate-500">Application Mode</div>
              <div className="font-bold text-emerald-700 mt-0.5 text-sm">Online (DBT)</div>
            </div>
          </div>

          {/* Gazette Extract Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-900" />
                <span>Gazette Order Details</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Gazette Ref: {scheme.gazetteRef} ({scheme.gazetteDate})
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
              <p className="italic mb-2">"{scheme.gazetteSummary}"</p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
                <span>Disbursement Method: {scheme.disbursementType}</span>
                {scheme.gazetteUrl && (
                  <a
                    href={scheme.gazetteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-900 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Gazette Notification</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Document Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-900" />
                  <span>Mandatory Document Checklist</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Check off the papers you have ready before heading to the portal
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-800">
                  {completedDocs}/{totalDocs} Ready ({progressPercent}%)
                </span>
                <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-white">
              {scheme.documentsRequired.map((doc, idx) => {
                const isChecked = !!checkedDocs[doc];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer text-xs ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDoc(doc)}
                      className="mt-0.5 rounded text-blue-900 focus:ring-blue-900"
                    />
                    <span className="leading-snug">{doc}</span>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyChecklist}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy checklist</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print checklist</span>
                </button>
              </div>

              {progressPercent === 100 && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>You're 100% application ready!</span>
                </span>
              )}
            </div>
          </div>

          {/* Official Step-by-Step Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Application Steps on Official Portal
            </h4>
            <div className="space-y-2">
              {scheme.applicationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0 font-bold text-[10px] text-slate-800">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Helpdesk Contact */}
          {(scheme.departmentPhone || scheme.departmentEmail) && (
            <div className="p-3 bg-slate-100 rounded-xl flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
              <span className="font-semibold text-slate-800">Official Department Helpdesk:</span>
              <div className="flex items-center gap-4">
                {scheme.departmentPhone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{scheme.departmentPhone}</span>
                  </span>
                )}
                {scheme.departmentEmail && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{scheme.departmentEmail}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500 leading-tight">
            Apply only on verified government portals. No intermediaries or agents required.
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto text-center"
            >
              Close
            </button>
            <a
              href={scheme.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-sm"
            >
              <span>Go to {scheme.portal.split('(')[0].trim()}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
