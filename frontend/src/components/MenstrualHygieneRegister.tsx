import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../services/api';
import { Heart, Search, Plus, Calendar, ShieldCheck, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

interface MenstrualHygieneEntry {
  id: string;
  srNo: number;
  monthYear: string;
  monthYearMr: string;
  residentNameMr: string;
  residentNameEn: string;
  age: number;
  sanitaryPadsCount: number;
  distributionDate: string;
  healthNotesMr: string;
  healthNotesEn: string;
  signedBy: string;
}

export const MenstrualHygieneRegister: React.FC = () => {
  const { language, tr, tv } = useLanguage();
  const [entries, setEntries] = useState<MenstrualHygieneEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New entry form state
  const [form, setForm] = useState({
    monthYear: 'November 2026',
    monthYearMr: 'नोव्हेंबर २०२६',
    residentNameMr: '',
    residentNameEn: '',
    age: 16,
    sanitaryPadsCount: 12,
    distributionDate: '05-Nov-2026',
    healthNotesMr: 'नियमित व सुरक्षित स्वच्छता राखली जात आहे.',
    healthNotesEn: 'Maintaining regular and safe hygiene.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (selectedMonth !== 'All') query.set('month', selectedMonth);
      const res = await fetch(`${API_BASE_URL}/api/v1/menstrual-hygiene?${query.toString()}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Error loading menstrual hygiene register:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [search, selectedMonth]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/menstrual-hygiene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchEntries();
        setForm({
          monthYear: 'November 2026',
          monthYearMr: 'नोव्हेंबर २०२६',
          residentNameMr: '',
          residentNameEn: '',
          age: 16,
          sanitaryPadsCount: 12,
          distributionDate: '05-Nov-2026',
          healthNotesMr: 'नियमित व सुरक्षित स्वच्छता राखली जात आहे.',
          healthNotesEn: 'Maintaining regular and safe hygiene.',
          signedBy: 'शीतल वाघ (Shital Wagh)'
        });
      }
    } catch (err) {
      console.error('Error adding menstrual hygiene entry:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-[#039583]" />
            <span>{tr('Menstrual Hygiene Register Archive', 'आरोग्य व स्वच्छता अभिलेख')}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {language === 'mr' ? 'मासिक पाळी रजिस्टर (ऑक्टोबर २०२१ ते नोव्हेंबर २०२६)' : 'Menstrual Hygiene Register (Oct 2021 - Nov 2026)'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr'
              ? 'पालवी संस्थेतील किशोरवयीन निवासिनींच्या मासिक पाळी स्वच्छता, सॅनिटरी पॅड्स वाटप व आरोग्य नोंदी'
              : 'Adolescent residents menstrual hygiene records, sanitary pad distribution, and health logs at Palawi'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#039583] hover:bg-[#027d6e] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'mr' ? 'नवीन नोंद जोडा' : 'Add Register Entry'}</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#039583]"
            >
              <option value="All">{tr('All Months & Years', 'सर्व महिने')}</option>
              <option value="November 2026">{tr('November 2026', 'नोव्हेंबर २०२६')}</option>
              <option value="October 2026">{tr('October 2026', 'ऑक्टोबर २०२६')}</option>
              <option value="September 2026">{tr('September 2026', 'सप्टेंबर २०२६')}</option>
              <option value="August 2026">{tr('August 2026', 'ऑगस्ट २०२६')}</option>
              <option value="July 2026">{tr('July 2026', 'जुलै २०२६')}</option>
              <option value="June 2026">{tr('June 2026', 'जून २०२६')}</option>
              <option value="May 2026">{tr('May 2026', 'मे २०२६')}</option>
              <option value="April 2026">{tr('April 2026', 'एप्रिल २०२६')}</option>
              <option value="March 2026">{tr('March 2026', 'मार्च २०२६')}</option>
              <option value="February 2026">{tr('February 2026', 'फेब्रुवारी २०२६')}</option>
              <option value="January 2026">{tr('January 2026', 'जानेवारी २०२६')}</option>
              <option value="October 2021">{tr('October 2021 (Register Start)', 'ऑक्टोबर २०२१ (रजिस्टर सुरुवात)')}</option>
            </select>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={language === 'mr' ? 'नाव किंवा आरोग्य टीप शोधा...' : 'Search by resident name or notes...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#039583]"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            {language === 'mr' ? 'मासिक पाळी रजिस्टर लोड होत आहे...' : 'Loading menstrual hygiene register records...'}
          </div>
        ) : entries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            {language === 'mr' ? 'कोणत्याही नोंदी आढळल्या नाहीत.' : 'No hygiene register records found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'महिना / वर्ष' : 'Month / Year'}</th>
                  <th className="py-3.5 px-4">{tr('Resident Name', 'निवासिनीचे नाव')}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'वय' : 'Age'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'पॅड्स संख्या' : 'Pads Count'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'वितरण तारीख' : 'Distribution Date'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'आरोग्य व स्वच्छता नोंदी' : 'Health & Hygiene Notes'}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'संनियंत्रण स्वाक्षरी' : 'Coordinator Signature'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {entries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{language === 'mr' ? item.monthYearMr : item.monthYear}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#023b77] text-sm">{language === 'mr' ? item.residentNameMr : item.residentNameEn}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {tr(`${item.age} yrs`, `${item.age} वर्षे`)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 text-pink-700 font-bold text-xs border border-pink-200">
                        <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                        <span>{tr(`${item.sanitaryPadsCount} Pads`, `${item.sanitaryPadsCount} पॅड्स`)}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {tv(item.distributionDate)}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-800 font-medium">{language === 'mr' ? item.healthNotesMr : item.healthNotesEn}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#039583] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#039583]" />
                        <span>{tv(item.signedBy)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#039583]" />
                <span>{language === 'mr' ? 'मासिक पाळी रजिस्टरमध्ये नवीन नोंद जोडा' : 'Add Menstrual Hygiene Entry'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{tr('Month / Year (English)', 'महिना / वर्ष (इंग्रजी)')}</label>
                  <input
                    type="text"
                    required
                    value={form.monthYear}
                    onChange={(e) => setForm({ ...form, monthYear: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{tr('Month / Year (Marathi)', 'महिना / वर्ष (मराठी)')}</label>
                  <input
                    type="text"
                    required
                    value={form.monthYearMr}
                    onChange={(e) => setForm({ ...form, monthYearMr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'निवासिनीचे नाव (मराठी)' : 'Resident Name (Marathi)'}</label>
                  <input
                    type="text"
                    required
                    placeholder={tr('e.g. आरती शिंदे', 'उदा. आरती शिंदे')}
                    value={form.residentNameMr}
                    onChange={(e) => setForm({ ...form, residentNameMr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'निवासिनीचे नाव (इंग्रजी)' : 'Resident Name (English)'}</label>
                  <input
                    type="text"
                    required
                    placeholder={tr('e.g. Aarohi Shinde', 'उदा. Aarohi Shinde')}
                    value={form.residentNameEn}
                    onChange={(e) => setForm({ ...form, residentNameEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'वय' : 'Age'}</label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'पॅड्स संख्या' : 'Pads Count'}</label>
                  <input
                    type="number"
                    value={form.sanitaryPadsCount}
                    onChange={(e) => setForm({ ...form, sanitaryPadsCount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'तारीख' : 'Date'}</label>
                  <input
                    type="text"
                    value={form.distributionDate}
                    onChange={(e) => setForm({ ...form, distributionDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'आरोग्य टीप (मराठी)' : 'Health Notes (Marathi)'}</label>
                <input
                  type="text"
                  value={form.healthNotesMr}
                  onChange={(e) => setForm({ ...form, healthNotesMr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'आरोग्य टीप (इंग्रजी)' : 'Health Notes (English)'}</label>
                <input
                  type="text"
                  value={form.healthNotesEn}
                  onChange={(e) => setForm({ ...form, healthNotesEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'स्वाक्षरी / समन्वयक' : 'Signed By / Coordinator'}</label>
                <input
                  type="text"
                  value={form.signedBy}
                  onChange={(e) => setForm({ ...form, signedBy: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {language === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#039583] hover:bg-[#027d6e] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {language === 'mr' ? 'नोंद जतन करा' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
