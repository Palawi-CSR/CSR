import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CSRPartner, CSRStatus, CSRPriority, FocusArea } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Search, 
  Plus, 
  ExternalLink, 
  MessageSquare, 
  Calendar, 
  Edit2,
  Trash2,
  FileText
} from 'lucide-react';

interface CsrPartnerDatabaseProps {
  onOpenWhatsAppOutreach: (phone: string, name: string, defaultText?: string) => void;
}

export const CsrPartnerDatabase: React.FC<CsrPartnerDatabaseProps> = ({
  onOpenWhatsAppOutreach,
}) => {
  const { tr, tv } = useLanguage();
  const [partners, setPartners] = useState<CSRPartner[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedFocus, setSelectedFocus] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Add/Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<CSRPartner | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [annualCsrBudget, setAnnualCsrBudget] = useState<number>(2500000);
  const [maxGrantAmount, setMaxGrantAmount] = useState<number>(500000);
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(['Education']);
  const [eligibilityNotes, setEligibilityNotes] = useState('');
  const [priority, setPriority] = useState<CSRPriority>('High');
  const [status, setStatus] = useState<CSRStatus>('Prospective');
  const [sourceLink, setSourceLink] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [nextStepDueDate, setNextStepDueDate] = useState('');

  const loadPartners = async () => {
    setLoading(true);
    try {
      const data = await api.getCsrPartners({
        search,
        priority: selectedPriority,
        status: selectedStatus,
        focusArea: selectedFocus,
      });
      setPartners(data);
    } catch (err) {
      console.error('Error loading partners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, [search, selectedPriority, selectedStatus, selectedFocus]);

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setCompanyName('');
    setSector('Banking & Financial Services');
    setAnnualCsrBudget(25000000);
    setMaxGrantAmount(5000000);
    setFocusAreas(['Education']);
    setEligibilityNotes('Requires 12A/80G tax exemption & 3-year audited financial records.');
    setPriority('High');
    setStatus('Prospective');
    setSourceLink('');
    setContactName('');
    setContactEmail('');
    setContactPhone('+919800000000');
    setNextStep('Schedule initial introductory meeting');
    setNextStepDueDate('2026-11-10');
    setShowModal(true);
  };

  const handleOpenEditModal = (partner: CSRPartner) => {
    setEditingPartner(partner);
    setCompanyName(partner.companyName);
    setSector(partner.sector);
    setAnnualCsrBudget(partner.annualCsrBudget);
    setMaxGrantAmount(partner.maxGrantAmount);
    setFocusAreas(partner.focusAreas);
    setEligibilityNotes(partner.eligibilityNotes);
    setPriority(partner.priority);
    setStatus(partner.status);
    setSourceLink(partner.sourceLink);
    setContactName(partner.primaryContactName);
    setContactEmail(partner.primaryContactEmail);
    setContactPhone(partner.primaryContactPhone);
    setNextStep(partner.nextStep);
    setNextStepDueDate(partner.nextStepDueDate);
    setShowModal(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      companyName,
      sector,
      annualCsrBudget: Number(annualCsrBudget),
      maxGrantAmount: Number(maxGrantAmount),
      focusAreas,
      eligibilityNotes,
      priority,
      status,
      sourceLink,
      primaryContactName: contactName,
      primaryContactEmail: contactEmail,
      primaryContactPhone: contactPhone,
      nextStep,
      nextStepDueDate,
      matchScore: Math.floor(80 + Math.random() * 18),
    };

    if (editingPartner) {
      await api.updateCsrPartner(editingPartner.id, payload);
    } else {
      await api.addCsrPartner(payload);
    }

    setShowModal(false);
    loadPartners();
  };

  const handleDeletePartner = async (id: string) => {
    if (confirm(tr('Are you sure you want to remove this record?', 'ही नोंद काढून टाकायची आहे का?'))) {
      await api.deleteCsrPartner(id);
      loadPartners();
    }
  };

  const allFocusAreas: FocusArea[] = [
    'Education',
    'Environmental Sustainability',
    'Healthcare & Sanitation',
    'Skill Development',
    'Rural Infrastructure',
    'Disaster Relief',
    'Women Empowerment',
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {tr('Database', 'डेटाबेस')}
        </h1>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-95 rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{tr('Add Record', 'नोंद जोडा')}</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={tr('Search partners, sectors, requirements...', 'भागीदार, क्षेत्र, अटी शोधा...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#039583]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#039583]"
          >
            <option value="All">{tr('All Priorities', 'सर्व प्राधान्य')}</option>
            <option value="High">{tr('High Priority', 'उच्च प्राधान्य')}</option>
            <option value="Medium">{tr('Medium Priority', 'मध्यम प्राधान्य')}</option>
            <option value="Low">{tr('Low Priority', 'कमी प्राधान्य')}</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#039583]"
          >
            <option value="All">{tr('All Statuses', 'सर्व स्थिती')}</option>
            <option value="Prospective">{tv('Prospective')}</option>
            <option value="Contacted">{tv('Contacted')}</option>
            <option value="Proposal Submitted">{tv('Proposal Submitted')}</option>
            <option value="Eligible">{tv('Eligible')}</option>
            <option value="Pledged">{tv('Pledged')}</option>
            <option value="Partnered">{tv('Partnered')}</option>
          </select>

          {/* Focus Area Filter */}
          <select
            value={selectedFocus}
            onChange={(e) => setSelectedFocus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#039583]"
          >
            <option value="All">{tr('All Focus Areas', 'सर्व कार्यक्षेत्रे')}</option>
            {allFocusAreas.map((fa) => (
              <option key={fa} value={fa}>
                {tv(fa)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Cards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm font-medium">
            {tr('Loading records...', 'नोंदी लोड होत आहेत...')}
          </div>
        ) : partners.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
            <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-800">{tr('No matching partners found', 'जुळणारे भागीदार सापडले नाहीत')}</p>
          </div>
        ) : (
          partners.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#039583]/60 transition-all space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                      {partner.companyName || tv((partner as any).organizationName)}
                    </h3>

                    {/* Sector Badge */}
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {partner.sector || tv((partner as any).city)}
                    </span>

                    {/* Priority Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        partner.priority === 'High'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : partner.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tr(`${partner.priority || 'Medium'} Priority`, `${tv(partner.priority || 'Medium')} प्राधान्य`)}
                    </span>

                    {/* Status Badge */}
                    <span className="text-[11px] font-bold text-[#039583] bg-[#039583]/15 border border-[#039583]/30 px-2.5 py-0.5 rounded-md">
                      {tv(partner.status)}
                    </span>
                  </div>

                  {/* Focus Areas Clean Unboxed List */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 flex-wrap">
                    <span className="font-semibold text-slate-700">{tr('Focus Priorities:', 'प्राधान्य क्षेत्रे:')}</span>
                    {(partner.focusAreas || [(partner as any).focusArea].filter(Boolean)).map((fa, i) => (
                      <React.Fragment key={fa}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span className="text-[#023b77] font-semibold">{tv(fa)}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Financials */}
                <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{tr('Annual CSR Budget', 'वार्षिक सीएसआर अंदाजपत्रक')}</p>
                    <p className="font-mono font-extrabold text-slate-900 text-sm">
                      ₹{(partner.annualCsrBudget ?? (partner as any).totalDonationAmount ?? 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{tr('Max Grant Cap', 'कमाल अनुदान मर्यादा')}</p>
                    <p className="font-mono font-extrabold text-[#039583] text-sm">
                      ₹{(partner.maxGrantAmount ?? 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Eligibility Notes Callout Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#039583]" />
                    {tr('Eligibility Requirements', 'पात्रतेच्या अटी')}
                  </span>
                  {partner.sourceLink && (
                    <a
                      href={partner.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#039583] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <span>{tr('Link', 'दुवा')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed pl-5 font-normal">
                  {partner.eligibilityNotes}
                </p>
              </div>

              {/* Contact, Next Steps & Actions */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-4 text-slate-600 flex-wrap">
                  <div>
                    <span className="text-slate-500">{tr('Contact:', 'संपर्क:')}</span>{' '}
                    <strong className="text-slate-900">{partner.primaryContactName || tv((partner as any).contactPerson)}</strong> ({partner.primaryContactEmail || (partner as any).email})
                  </div>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{tr('Next Action:', 'पुढील कृती:')} <strong className="text-slate-900">{partner.nextStep || '—'}</strong></span>
                    <span className="font-mono text-amber-700 font-bold">({partner.nextStepDueDate || (partner as any).lastInteractionDate})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      onOpenWhatsAppOutreach(
                        partner.primaryContactPhone,
                        partner.primaryContactName,
                        tr(`Hello ${partner.primaryContactName}, regarding ${partner.companyName}...`, `नमस्कार ${partner.primaryContactName}, ${partner.companyName} संदर्भात...`)
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-90 rounded-lg transition-all shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{tr('WhatsApp', 'व्हॉट्सॲप')}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(partner)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    title={tr('Edit Record', 'नोंद संपादित करा')}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeletePartner(partner.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    title={tr('Delete Record', 'नोंद हटवा')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit CSR Partner Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-xl text-slate-900">
            <h2 className="text-lg font-bold text-slate-900">
              {editingPartner ? tr('Edit Record', 'नोंद संपादित करा') : tr('Add Record', 'नोंद जोडा')}
            </h2>

            <form onSubmit={handleSavePartner} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Company / Foundation Name', 'कंपनी / प्रतिष्ठानाचे नाव')}</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Sector / Industry', 'क्षेत्र / उद्योग')}</label>
                  <input
                    type="text"
                    required
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Annual Budget (₹)', 'वार्षिक अंदाजपत्रक (₹)')}</label>
                  <input
                    type="number"
                    required
                    value={annualCsrBudget}
                    onChange={(e) => setAnnualCsrBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Max Grant Cap (₹)', 'कमाल अनुदान मर्यादा (₹)')}</label>
                  <input
                    type="number"
                    required
                    value={maxGrantAmount}
                    onChange={(e) => setMaxGrantAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Priority', 'प्राधान्य')}</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as CSRPriority)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  >
                    <option value="High">{tr('High Priority', 'उच्च प्राधान्य')}</option>
                    <option value="Medium">{tr('Medium Priority', 'मध्यम प्राधान्य')}</option>
                    <option value="Low">{tr('Low Priority', 'कमी प्राधान्य')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Status', 'स्थिती')}</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CSRStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  >
                    <option value="Prospective">{tv('Prospective')}</option>
                    <option value="Contacted">{tv('Contacted')}</option>
                    <option value="Proposal Submitted">{tv('Proposal Submitted')}</option>
                    <option value="Eligible">{tv('Eligible')}</option>
                    <option value="Pledged">{tv('Pledged')}</option>
                    <option value="Partnered">{tv('Partnered')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">{tr('Eligibility Notes', 'पात्रता टिपा')}</label>
                <textarea
                  rows={3}
                  required
                  value={eligibilityNotes}
                  onChange={(e) => setEligibilityNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Contact Name', 'संपर्क व्यक्तीचे नाव')}</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Contact Email', 'संपर्क ईमेल')}</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('WhatsApp Phone Number', 'व्हॉट्सॲप फोन नंबर')}</label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:border-[#039583] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Next Action', 'पुढील कृती')}</label>
                  <input
                    type="text"
                    required
                    value={nextStep}
                    onChange={(e) => setNextStep(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">{tr('Due Date', 'अंतिम तारीख')}</label>
                  <input
                    type="date"
                    required
                    value={nextStepDueDate}
                    onChange={(e) => setNextStepDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-[#039583] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#023b77] to-[#039583] text-white font-bold rounded-lg shadow-xs"
                >
                  {tr('Save', 'जतन करा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
