import React, { useEffect, useState } from 'react';
import { GateBirthday } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { VisitStatsCard, localToday } from '../components/VisitStatsCard';
import { Cake, ChevronDown, ChevronUp, Phone, Loader2 } from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const { tr } = useLanguage();
  const [birthdays, setBirthdays] = useState<GateBirthday[] | null>(null);
  const [error, setError] = useState('');
  const [showBirthdays, setShowBirthdays] = useState(false);

  useEffect(() => {
    api
      .getGateBirthdays(localToday())
      .then(setBirthdays)
      .catch((err) => setError(err.message));
  }, []);

  const todayLabel = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-[calc(100vh-61px)]">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl font-bold text-slate-800">{tr('My Dashboard', 'माझा डॅशबोर्ड')}</h1>
        <p className="text-xs text-slate-600 mt-1">{todayLabel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Birthdays today */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={() => setShowBirthdays((v) => !v)}
            disabled={!birthdays}
            aria-expanded={showBirthdays}
            className="w-full p-5 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-default"
          >
            <div className="p-3 rounded-xl bg-pink-100 text-pink-600 shrink-0">
              <Cake className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-500">{tr("Today's Birthdays", 'आजचे वाढदिवस')}</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-0.5">
                {birthdays ? birthdays.length : error ? '—' : <Loader2 className="w-6 h-6 animate-spin text-slate-400" />}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {error
                  ? error
                  : tr('Visitors from the gate register · click to see names & numbers', 'गेट रजिस्टरमधील अभ्यागत · नावे व नंबर पाहण्यासाठी क्लिक करा')}
              </div>
            </div>
            {birthdays && (showBirthdays ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />)}
          </button>

          {showBirthdays && birthdays && (
            <div className="border-t border-slate-200">
              {birthdays.length === 0 ? (
                <p className="p-5 text-xs text-slate-500">{tr('No birthdays today.', 'आज कोणाचाही वाढदिवस नाही.')}</p>
              ) : (
                <ul className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {birthdays.map((b) => (
                    <li key={`${b.name}-${b.mobileNo}`} className="px-5 py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{b.name}</div>
                        <div className="text-slate-500 mt-0.5">
                          {b.age !== null && tr(`Turns ${b.age}`, `${b.age} वर्षे पूर्ण`)}
                          {b.age !== null && b.address && ' · '}
                          {b.address}
                        </div>
                      </div>
                      {b.mobileNo ? (
                        <a
                          href={`tel:${b.mobileNo}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#039583]/10 text-[#026b5e] font-mono font-semibold hover:bg-[#039583]/20 shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {b.mobileNo}
                        </a>
                      ) : (
                        <span className="text-slate-400 shrink-0">{tr('No number', 'नंबर नाही')}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Visits today / this week / this month */}
        <VisitStatsCard />
      </div>
    </div>
  );
};
