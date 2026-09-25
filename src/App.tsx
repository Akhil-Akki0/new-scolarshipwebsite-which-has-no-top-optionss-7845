/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Clock,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { RightSideNav } from './components/RightSideNav';
import { HeroSection } from './components/HeroSection';
import { GazettePartnersStrip } from './components/GazettePartnersStrip';
import { LiveResultsSection } from './components/LiveResultsSection';
import { ProductProofSection } from './components/ProductProofSection';
import { FrequentlyAppliedSection } from './components/FrequentlyAppliedSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import DefaultCloudSky from './components/CloudSky';
import { SCHOLARSHIPS } from './data/scholarships';
import { UserProfile, Scholarship } from './types/scholarship';
import {
  TIME_ATMOSPHERES,
  getTimeAtmosphere,
  getPeriodForHour,
  TimeOfDayPeriod
} from './utils/timeAtmosphere';

const DEFAULT_SAMPLE_PROFILE: UserProfile = {
  state: 'KA',
  degree: 'UG',
  category: 'OBC',
  annualIncome: 220000,
  marks: 78,
  isFemale: false,
  isPwD: false,
};

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_SAMPLE_PROFILE);
  const [selectedScheme, setSelectedScheme] = useState<Scholarship | null>(null);

  // Time-of-day logic
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [currentHour, setCurrentHour] = useState<number>(() => new Date().getHours());
  const [showSkyMenu, setShowSkyMenu] = useState(false);

  // Keep auto-time synchronized with the real local system clock
  useEffect(() => {
    if (!isAutoTime) return;

    const syncTime = () => {
      const now = new Date();
      setCurrentHour(now.getHours());
    };

    syncTime();
    const interval = setInterval(syncTime, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [isAutoTime]);

  // Current active atmosphere derived from the hour
  const currentAtmosphere = useMemo(() => {
    return getTimeAtmosphere(currentHour);
  }, [currentHour]);

  // Format hour for human display (e.g. "6:00 AM", "2:00 PM")
  const formattedHour = useMemo(() => {
    const period = currentHour >= 12 ? 'PM' : 'AM';
    const displayHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
    return `${displayHour}:00 ${period}`;
  }, [currentHour]);

  // Compute how many are eligible for quick hero feedback badge
  const eligibleCount = useMemo(() => {
    return SCHOLARSHIPS.filter((scheme) => {
      const incomePassed = userProfile.annualIncome <= scheme.maxIncome;
      const marksPassed = userProfile.marks >= scheme.minMarks;
      const stateMatched = scheme.states.includes('ALL') || scheme.states.includes(userProfile.state);
      const degreeMatched = scheme.degrees.includes(userProfile.degree);
      return incomePassed && marksPassed && stateMatched && degreeMatched;
    }).length;
  }, [userProfile]);

  const handleResetToSample = () => {
    setUserProfile(DEFAULT_SAMPLE_PROFILE);
  };

  const handleScrollToChecker = () => {
    const el = document.getElementById('quick-checker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPeriod = (periodId: TimeOfDayPeriod) => {
    setIsAutoTime(false);
    const hourMap: Record<TimeOfDayPeriod, number> = {
      dawn: 6,
      morning: 9,
      noon: 13,
      golden: 17,
      sunset: 19,
      dusk: 21,
      night: 23,
    };
    setCurrentHour(hourMap[periodId]);
  };

  const handleResetAuto = () => {
    setIsAutoTime(true);
    setCurrentHour(new Date().getHours());
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Cloud Sky Fixed WebGL Background with Automatic Time-of-Day */}
      <div
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <DefaultCloudSky
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          background={currentAtmosphere.background}
          baseColor={currentAtmosphere.baseColor}
          accentColor={currentAtmosphere.accentColor}
          density={currentAtmosphere.density}
          speed={currentAtmosphere.speed}
          size={130}
          clouds={currentAtmosphere.clouds}
          sun={currentAtmosphere.sun}
          pointer={{
            wind: 300,
            damping: 50,
            parallax: 300,
          }}
        />
      </div>

      {/* Floating Time-of-Day Atmosphere Customizer Widget */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="relative">
          {showSkyMenu && (
            <div className="absolute bottom-12 right-0 w-80 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl text-xs space-y-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Atmospheric Time of Day</span>
                </div>
                {isAutoTime ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Live Auto Clock
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResetAuto}
                    className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to local</span>
                  </button>
                )}
              </div>

              {/* Current Active Atmosphere Information Card */}
              <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">
                    {currentAtmosphere.label}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">
                    {formattedHour}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {currentAtmosphere.description}
                </p>

                {/* Live Palette Swatches */}
                <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full border border-white shadow-2xs shrink-0"
                      style={{ backgroundColor: currentAtmosphere.background }}
                    />
                    <span>Zenith</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full border border-white shadow-2xs shrink-0"
                      style={{ backgroundColor: currentAtmosphere.baseColor }}
                    />
                    <span>Horizon</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: currentAtmosphere.accentColor }}
                    />
                    <span>Cloud</span>
                  </span>
                </div>
              </div>

              {/* Quick Period Buttons */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-700">Quick Time Presets:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(TIME_ATMOSPHERES) as TimeOfDayPeriod[]).map((periodKey) => {
                    const atmo = TIME_ATMOSPHERES[periodKey];
                    const isSelected = getPeriodForHour(currentHour) === periodKey;

                    return (
                      <button
                        key={periodKey}
                        type="button"
                        onClick={() => handleSelectPeriod(periodKey)}
                        className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                            : 'bg-white/60 hover:bg-white border-white/60 text-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-medium leading-tight truncate">
                          {atmo.label.split(' ')[0]}
                        </div>
                        <div className="text-[9px] opacity-80 truncate">{atmo.hourRange.split('–')[0]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 24-Hour Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">Scrub Time of Day:</span>
                  <span className="font-mono text-slate-600 font-bold">{formattedHour}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={currentHour}
                  onChange={(e) => {
                    setIsAutoTime(false);
                    setCurrentHour(Number(e.target.value));
                  }}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>12 AM</span>
                  <span>6 AM (Dawn)</span>
                  <span>12 PM (Noon)</span>
                  <span>6 PM (Dusk)</span>
                  <span>11 PM</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowSkyMenu(!showSkyMenu)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-white/85 hover:bg-white backdrop-blur-md text-slate-800 text-xs font-semibold rounded-full border border-white/60 shadow-md cursor-pointer transition-all"
            title="Configure Time-of-Day Atmosphere"
          >
            {getPeriodForHour(currentHour) === 'night' ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : getPeriodForHour(currentHour) === 'dawn' || getPeriodForHour(currentHour) === 'sunset' ? (
              <Sunset className="w-4 h-4 text-amber-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span>
              {isAutoTime ? 'Auto Time' : 'Sky'}: {currentAtmosphere.label.split(' ')[0]} ({formattedHour})
            </span>
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Animated Right-Side Navigation Rail / Dock with Anime.js */}
      <RightSideNav onCheckClick={handleScrollToChecker} />

      <main className="space-y-6 sm:space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 1. HeroSection Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <HeroSection
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onSearchSubmit={() => {}}
            onLoadSample={handleResetToSample}
            eligibleCount={eligibleCount}
          />
        </div>

        {/* 2. GazettePartnersStrip Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <GazettePartnersStrip />
        </div>

        {/* 3. LiveResultsSection Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <LiveResultsSection
            userProfile={userProfile}
            scholarships={SCHOLARSHIPS}
            onOpenSchemeModal={(scheme) => setSelectedScheme(scheme)}
            onResetToSample={handleResetToSample}
          />
        </div>

        {/* 4. ProductProofSection Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <ProductProofSection onCheckNow={handleScrollToChecker} />
        </div>

        {/* 5. FrequentlyAppliedSection Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <FrequentlyAppliedSection onCheckStateRules={handleScrollToChecker} />
        </div>

        {/* 6. FaqSection Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <FaqSection />
        </div>

        {/* 7. CtaBanner Container */}
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <CtaBanner onCheckClick={handleScrollToChecker} />
        </div>
      </main>

      {/* 8. Footer Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 md:pb-12">
        <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden transition-all duration-200">
          <Footer />
        </div>
      </div>

      {/* Scheme Detail & Document Checklist Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
}
