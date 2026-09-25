import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/scholarships';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 md:py-16 bg-transparent" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">
            Straightforward answers about how this tool works and where the data comes from.
          </p>
        </div>

        <div className="space-y-4" id="faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border border-white/60 bg-white/80 backdrop-blur-md rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-semibold text-slate-900 flex items-center justify-between hover:bg-white/90 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
