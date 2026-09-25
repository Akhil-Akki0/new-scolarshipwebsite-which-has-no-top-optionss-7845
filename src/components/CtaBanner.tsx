import React from 'react';
import { ArrowUp } from 'lucide-react';

interface CtaBannerProps {
  onCheckClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onCheckClick }) => {
  return (
    <section className="py-14 md:py-18 bg-slate-950/75 backdrop-blur-md text-white">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Find out what you qualify for in 60 seconds
        </h2>
        <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
          Skip the confusing PDF circulars. Fill in four fields and get a straightforward list of scholarships matching your state and degree.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onCheckClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
          >
            <span>Check your eligibility</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-slate-400">
          Completely free. No account or password needed.
        </div>
      </div>
    </section>
  );
};
