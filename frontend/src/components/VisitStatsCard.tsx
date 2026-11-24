import React, { useEffect, useState } from 'react';
import { GateVisitStats } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { DoorOpen, Loader2 } from 'lucide-react';

/** Today's date as YYYY-MM-DD in the viewer's own time zone. */
export const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const fromIso = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** Gate register visits today, this week (from Monday) and this month. */
export const VisitStatsCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { tr, language } = useLanguage();
  const [stats, setStats] = useState<GateVisitStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getGateVisitStats(localToday())
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  const locale = language === 'mr' ? 'mr-IN' : 'en-GB';
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => fromIso(iso).toLocaleDateString(locale, opts);

  const sections = stats
    ? [
        { label: tr('Today', 'आज'), value: stats.today, hint: fmt(stats.date, { weekday: 'short', day: 'numeric', month: 'short' }) },
        {
          label: tr('This week', 'या आठवड्यात'),
          value: stats.week,
          hint: tr(`Since ${fmt(stats.weekStart, { weekday: 'short', day: 'numeric', month: 'short' })}`, `${fmt(stats.weekStart, { weekday: 'short', day: 'numeric', month: 'short' })} पासून`),
        },
        { label: tr('This month', 'या महिन्यात'), value: stats.month, hint: fmt(stats.monthStart, { month: 'long', year: 'numeric' }) },
      ]
    : [];

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-2xs p-5 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#023b77]/10 text-[#023b77] shrink-0">
          <DoorOpen className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500">{tr('Visits', 'भेटी')}</div>
          <div className="text-[11px] text-slate-500">{tr('Entries in the gate register', 'गेट रजिस्टरमधील नोंदी')}</div>
        </div>
      </div>

      {error ? (
        <p className="mt-4 text-xs text-red-700">{error}</p>
      ) : !stats ? (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          {tr('Loading...', 'लोड होत आहे...')}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-xl">
          {sections.map((s) => (
            <div key={s.label} className="p-3 text-center">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{s.label}</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{s.hint}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
