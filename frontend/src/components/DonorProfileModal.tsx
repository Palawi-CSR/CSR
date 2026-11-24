import React, { useEffect, useState } from 'react';
import { GateRegisterEntry, GateVisitorHistory } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { X, Phone, Cake, MapPin, CalendarDays, Repeat, Users, Loader2 } from 'lucide-react';

const MONTHS: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

/** "30-Sep-26" (register format) -> Date, or null if it can't be read. */
const parseRegisterDate = (value: string): Date | null => {
  const m = /^(\d{1,2})-([A-Za-z]{3})[A-Za-z]*-(\d{2,4})$/.exec((value || '').trim());
  if (!m || MONTHS[m[2].toLowerCase()] === undefined) return null;
  const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  return new Date(year, MONTHS[m[2].toLowerCase()], Number(m[1]));
};

const isBlank = (value?: string | null) => !value || /^(-+|na|n\/a|not provided)$/i.test(value.trim());

/** First non-blank value of a field, newest visit first. */
const latest = (visits: GateRegisterEntry[], field: keyof GateRegisterEntry) =>
  visits.map((v) => v[field] as string | undefined).find((v) => !isBlank(v)) || '';

interface DonorProfileModalProps {
  entry: GateRegisterEntry;
  onClose: () => void;
}

export const DonorProfileModal: React.FC<DonorProfileModalProps> = ({ entry, onClose }) => {
  const { tr, tv } = useLanguage();
  const [history, setHistory] = useState<GateVisitorHistory | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setHistory(null);
    setError('');
    api
      .getGateVisitorHistory(entry.visitorName, entry.mobileNo)
      .then(setHistory)
      .catch((err) => setError(err.message));
  }, [entry.visitorName, entry.mobileNo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Fall back to the clicked entry while the history loads.
  const visits = history?.visits.length ? history.visits : [entry];
  const dob = latest(visits, 'dateOfBirth');
  const mobile = latest(visits, 'mobileNo');
  const address = [latest(visits, 'address'), latest(visits, 'city'), latest(visits, 'state')]
    .filter((v, i, all) => v && all.indexOf(v) === i)
    .join(', ');
  const photo = visits.find((v) => v.photoUrl)?.photoUrl;

  const dated = visits.map((v) => parseRegisterDate(v.date)).filter((d): d is Date => d !== null).sort((a, b) => a.getTime() - b.getTime());
  const fmt = (d?: Date) => (d ? d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—');

  const categoryCounts = visits.reduce<Record<string, number>>((acc, v) => {
    const key = v.remarks || 'Not Specified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start gap-4">
          {photo ? (
            <img src={photo} alt={entry.visitorName} className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#023b77] to-[#039583] text-white flex items-center justify-center text-xl font-bold shrink-0">
              {entry.visitorName.trim().charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold text-slate-900 truncate">{entry.visitorName}</h2>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1"><Cake className="w-3.5 h-3.5" />{dob || '—'}</span>
              <span className="flex items-center gap-1 font-mono"><Phone className="w-3.5 h-3.5" />{mobile || '—'}</span>
              {address && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{tv(address)}</span>}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer" aria-label={tr('Close', 'बंद करा')}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto text-xs">
          {error && <p className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">{error}</p>}
          {!history && !error && (
            <p className="flex items-center gap-2 text-slate-500"><Loader2 className="w-4 h-4 animate-spin" />{tr('Loading visit history...', 'भेटींचा इतिहास लोड होत आहे...')}</p>
          )}

          {history && (
            <>
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#023b77]/5 border border-[#023b77]/15">
                  <div className="flex items-center gap-1 text-slate-500"><Repeat className="w-3.5 h-3.5" />{tr('Total visits', 'एकूण भेटी')}</div>
                  <div className="text-2xl font-extrabold text-[#023b77] mt-1">{visits.length}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1 text-slate-500"><CalendarDays className="w-3.5 h-3.5" />{tr('First visit', 'पहिली भेट')}</div>
                  <div className="text-sm font-bold text-slate-800 mt-1.5">{fmt(dated[0])}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1 text-slate-500"><CalendarDays className="w-3.5 h-3.5" />{tr('Last visit', 'शेवटची भेट')}</div>
                  <div className="text-sm font-bold text-slate-800 mt-1.5">{fmt(dated[dated.length - 1])}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">{tr('Purpose of visits', 'भेटीचे कारण')}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {Object.entries(categoryCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, n]) => (
                        <span key={cat} className="px-1.5 py-0.5 rounded bg-[#039583]/15 text-[#026b5e] font-semibold">
                          {tv(cat)} × {n}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Visit history with remarks */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{tr('Visit history & remarks', 'भेटींचा इतिहास व शेरा')}</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2 px-3">#</th>
                        <th className="py-2 px-3">{tr('Date', 'दिनांक')}</th>
                        <th className="py-2 px-3">{tr('Time', 'वेळ')}</th>
                        <th className="py-2 px-3">{tr('Category', 'कारण')}</th>
                        <th className="py-2 px-3">{tr('Donation / Remarks', 'देणगी / शेरा')}</th>
                        <th className="py-2 px-3">{tr('Reg. ID', 'नोंदणी क्र.')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {visits.map((v, i) => (
                        <tr key={v.id} className={v.id === entry.id ? 'bg-amber-50' : ''}>
                          <td className="py-2 px-3 text-slate-400 font-mono">{visits.length - i}</td>
                          <td className="py-2 px-3 font-mono whitespace-nowrap">{tv(v.date)}</td>
                          <td className="py-2 px-3 font-mono">{v.time || '—'}</td>
                          <td className="py-2 px-3">{tv(v.remarks)}</td>
                          <td className="py-2 px-3">{v.extraRemark || '—'}</td>
                          <td className="py-2 px-3 font-mono text-[#023b77]">{v.registrationId || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Others on the same number */}
              {history.sharedMobile.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    <Users className="w-3.5 h-3.5" />
                    {tr('Other names registered with this mobile number', 'याच मोबाईल नंबरवर नोंदलेली इतर नावे')}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tr('Usually family members, or the same person with a different spelling. Their visits are not counted above.', 'सहसा कुटुंबातील सदस्य, किंवा वेगळ्या स्पेलिंगने नोंदलेली हीच व्यक्ती. त्यांच्या भेटी वरील संख्येत मोजलेल्या नाहीत.')}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {history.sharedMobile.map((o) => (
                      <span key={o.name} className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        {o.name} · {tr(`${o.visits} visit${o.visits === 1 ? '' : 's'}`, `${o.visits} भेटी`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
