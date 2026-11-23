import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../services/api';
import { Pill, Search, Plus, Calendar, CheckCircle2, ShieldCheck, User } from 'lucide-react';

interface AlbendazoleEntry {
  id: string;
  srNo: number;
  nameMr: string;
  nameEn: string;
  date1: string;
  date2: string;
  date3: string;
  status: string;
  category: string;
}

export const AlbendazoleRegister: React.FC = () => {
  const { language, tr, tv } = useLanguage();
  const [entries, setEntries] = useState<AlbendazoleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    nameMr: '',
    nameEn: '',
    date1: '10/11/25',
    date2: '09/5/26',
    date3: '—',
    status: 'Given (दिले)',
    category: 'Children (मुलांची नावे)'
  });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (statusFilter !== 'All') query.set('status', statusFilter);
      const res = await fetch(`${API_BASE_URL}/api/v1/albendazole?${query.toString()}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Error loading Albendazole register:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [search, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE_URL + '/api/v1/albendazole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchEntries();
        setForm({
          nameMr: '',
          nameEn: '',
          date1: '10/11/25',
          date2: '09/5/26',
          date3: '—',
          status: 'Given (दिले)',
          category: 'Children (मुलांची नावे)'
        });
      }
    } catch (err) {
      console.error('Error adding Albendazole entry:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5" />
            <span>{tr('Albendazole Tablet Administration Register', 'आरोग्य व औषध प्रशासन')}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {tr('Albendazole Tablet Register (2025-2026)', 'अल्बेन्धाझोल गोळी रजिस्टर (२०२५-२०२६)')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr'
              ? 'पालवी संस्थेतील मुलांसाठी व स्टाफसाठी जंतनाशक अल्बेन्धाझोल टॅबलेट वाटपाच्या अधिकृत नोंदी'
              : 'Official deworming Albendazole tablet administration logs for residents and staff at Palawi'}
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
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#039583]"
          >
            <option value="All">{tr('All Status', 'सर्व स्थिती')}</option>
            <option value="Given (दिले)">{tv('Given (दिले)')}</option>
            <option value="Not Given (नाही)">{tv('Not Given (नाही)')}</option>
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={language === 'mr' ? 'नावावरून शोधा...' : 'Search by name...'}
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
            {language === 'mr' ? 'अल्बेन्धाझोल रजिस्टर लोड होत आहे...' : 'Loading Albendazole register records...'}
          </div>
        ) : entries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            {language === 'mr' ? 'कोणत्याही नोंदी आढळल्या नाहीत.' : 'No register records found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3.5 px-4">{tr('Name', 'नाव')}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'वर्ग' : 'Category'}</th>
                  <th className="py-3.5 px-4">{tr('Date 1 (10/11/25)', 'दिनांक १ (१०/११/२५)')}</th>
                  <th className="py-3.5 px-4">{tr('Date 2 (09/5/26)', 'दिनांक २ (०९/५/२६)')}</th>
                  <th className="py-3.5 px-4">{tr('Next Date (10/11/2026)', 'पुढील दिनांक (१०/११/२०२६)')}</th>
                  <th className="py-3.5 px-4">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {entries.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#023b77] text-sm">{language === 'mr' ? item.nameMr : item.nameEn}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
                        {tv(item.category)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">
                      {tv(item.date1)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {tv(item.date2)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {tv(item.date3)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status.includes('दिले')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{tv(item.status)}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#039583]" />
                <span>{language === 'mr' ? 'अल्बेन्धाझोल रजिस्टरमध्ये नोंद जोडा' : 'Add Albendazole Entry'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'नाव (मराठी)' : 'Name (Marathi)'}</label>
                <input
                  type="text"
                  required
                  placeholder={tr('e.g. राहुल शिंदे', 'उदा. राहुल शिंदे')}
                  value={form.nameMr}
                  onChange={(e) => setForm({ ...form, nameMr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'नाव (इंग्रजी)' : 'Name (English)'}</label>
                <input
                  type="text"
                  required
                  placeholder={tr('e.g. Rahul Shinde', 'उदा. Rahul Shinde')}
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'वर्ग' : 'Category'}</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="Children (मुलांची नावे)">{tv('Children (मुलांची नावे)')}</option>
                    <option value="Staff / Elders (स्टाफ व ज्येष्ठ)">{tv('Staff / Elders (स्टाफ व ज्येष्ठ)')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{language === 'mr' ? 'स्थिती' : 'Status'}</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="Given (दिले)">{tv('Given (दिले)')}</option>
                    <option value="Not Given (नाही)">{tv('Not Given (नाही)')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{tr('Date 1', 'दिनांक १')}</label>
                  <input
                    type="text"
                    value={form.date1}
                    onChange={(e) => setForm({ ...form, date1: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{tr('Date 2', 'दिनांक २')}</label>
                  <input
                    type="text"
                    value={form.date2}
                    onChange={(e) => setForm({ ...form, date2: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{tr('Next Date', 'पुढील दिनांक')}</label>
                  <input
                    type="text"
                    value={form.date3}
                    onChange={(e) => setForm({ ...form, date3: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
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
