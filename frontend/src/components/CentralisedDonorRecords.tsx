import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DonorRecord, Contribution } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Plus, 
  Search, 
  Download, 
  MessageSquare, 
  Mail, 
  Phone,
  ShieldCheck
} from 'lucide-react';

interface CentralisedDonorRecordsProps {
  onOpenWhatsAppOutreach: (phone: string, name: string) => void;
}

export const CentralisedDonorRecords: React.FC<CentralisedDonorRecordsProps> = ({
  onOpenWhatsAppOutreach,
}) => {
  const { tr, tv } = useLanguage();
  const [donors, setDonors] = useState<DonorRecord[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<DonorRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Add Donor Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<any>('Corporate CSR');
  const [taxId, setTaxId] = useState('');
  const [complianceStatus, setComplianceStatus] = useState<any>('Verified (12A/80G)');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredProjects, setPreferredProjects] = useState('Educational Supplies, Student Grain Rations');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [d, c] = await Promise.all([api.getDonors(), api.getContributions()]);
      setDonors(d);
      setContributions(c);
      if (d.length > 0 && !selectedDonor) {
        setSelectedDonor(d[0]);
      }
    } catch (err) {
      console.error('Error loading donor records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDonor = await api.addDonor({
      name,
      type,
      taxId,
      complianceStatus,
      primaryContact: {
        name: contactName,
        designation,
        email,
        phone,
      },
      totalContributed: 0,
      activeCommitmentsCount: 1,
      preferredProjects: preferredProjects.split(',').map((s) => s.trim()),
      relationshipHealth: 'Excellent',
      address,
      notes,
    });

    setShowAddModal(false);
    loadData();
    setSelectedDonor(newDonor);
  };

  const contactOf = (d: DonorRecord) => ({
    name: d.primaryContact?.name ?? d.name ?? '',
    designation: d.primaryContact?.designation ?? '',
    email: d.primaryContact?.email ?? (d as any).email ?? '',
    phone: d.primaryContact?.phone ?? (d as any).phone ?? '',
  });
  const taxIdOf = (d: DonorRecord) => d.taxId ?? (d as any).panNumber ?? '';
  const totalOf = (d: DonorRecord) => d.totalContributed ?? (d as any).totalDoned ?? 0;

  const filteredDonors = donors.filter(
    (d) =>
      (d.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      taxIdOf(d).toLowerCase().includes(search.toLowerCase()) ||
      contactOf(d).name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDonorContributions = contributions.filter(
    (c) => c.donorId === selectedDonor?.id || c.donorName === selectedDonor?.name
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583]">
            {tr('Palawi Verified Directory', 'पालवी प्रमाणित सूची')}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
            {tr('Centralised Donor Records & Tax Ledgers', 'मध्यवर्ती दाता रेकॉर्ड व कर खातेवही')}
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-95 rounded-xl transition-all shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{tr('Register Donor Record', 'दाता नोंद करा')}</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={tr('Search donor name, TAN/PAN ID, contact...', 'दात्याचे नाव, TAN/PAN क्रमांक, संपर्क शोधा...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#039583] shadow-2xs"
            />
          </div>

          <div className="space-y-3">
            {filteredDonors.map((donor) => {
              const isSelected = selectedDonor?.id === donor.id;

              return (
                <div
                  key={donor.id}
                  onClick={() => setSelectedDonor(donor)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-white border-[#039583] shadow-sm ring-2 ring-[#039583]/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#039583] uppercase tracking-wider">
                        {tv(donor.type)}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        {tv(donor.name)}
                      </h3>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        (donor.complianceStatus ?? '').includes('Verified')
                          ? 'bg-[#039583]/15 text-[#039583] border border-[#039583]/30'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {tv(donor.complianceStatus ?? 'Pending Verification')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500">{tr('Total Contribution:', 'एकूण योगदान:')}</span>
                    <span className="font-mono font-extrabold text-[#039583] text-sm">
                      ₹{totalOf(donor).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details File (7 cols) */}
        <div className="lg:col-span-7">
          {selectedDonor ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              {/* Header Profile */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#039583]" />
                    <h2 className="text-lg font-bold text-slate-900">{tv(selectedDonor.name)}</h2>
                  </div>
                  <p className="text-xs text-slate-500">
                    {tr('Reg ID:', 'नोंदणी क्रमांक:')} <span className="font-mono text-slate-800 font-bold">{taxIdOf(selectedDonor)}</span> · {tr('Member since', 'सदस्यत्व दिनांक')} {selectedDonor.joinedDate ?? (selectedDonor as any).lastDonationDate}
                  </p>
                </div>

                <button
                  onClick={() =>
                    onOpenWhatsAppOutreach(
                      contactOf(selectedDonor).phone,
                      contactOf(selectedDonor).name
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-90 rounded-xl transition-all shrink-0 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{tr('WhatsApp Representative', 'प्रतिनिधीला व्हॉट्सॲप करा')}</span>
                </button>
              </div>

              {/* Primary Contact & Relationship Health */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {tr('Primary Liaison', 'मुख्य संपर्क व्यक्ती')}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {tv(contactOf(selectedDonor).name)}
                  </div>
                  <p className="text-slate-600">{contactOf(selectedDonor).designation || tv(selectedDonor.type)}</p>

                  <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contactOf(selectedDonor).email}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contactOf(selectedDonor).phone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {tr('Relationship & Focus', 'संबंध व प्राधान्य')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{tr('Health:', 'संबंधांची स्थिती:')}</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#039583]/15 text-[#039583] border border-[#039583]/30">
                      {tv(selectedDonor.relationshipHealth ?? 'Good')}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <span className="text-slate-600">{tr('Supported Programs:', 'सहाय्य केलेले उपक्रम:')}</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(selectedDonor.preferredProjects ?? []).map((proj) => (
                        <span key={proj} className="bg-white border border-slate-200 text-[#023b77] text-[10px] font-bold px-2 py-0.5 rounded">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution Receipts Ledger */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>{tr('Audited Receipts Ledger', 'लेखापरीक्षित पावती खातेवही')}</span>
                  <span className="font-mono text-[#039583]">
                    {tr('Total:', 'एकूण:')} ₹{totalOf(selectedDonor).toLocaleString('en-IN')}
                  </span>
                </h3>

                {selectedDonorContributions.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium">
                    {tr('No historical receipts recorded for this donor yet.', 'या दात्याच्या पावत्या अद्याप नोंदवलेल्या नाहीत.')}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedDonorContributions.map((cnt) => (
                      <div
                        key={cnt.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900">
                              {cnt.receiptNumber ?? (cnt as any).receiptNo}
                            </span>
                            <span className="text-[10px] font-bold text-[#039583] bg-[#039583]/15 px-2 py-0.5 rounded">
                              {tv(cnt.status ?? 'Received')}
                            </span>
                          </div>
                          <p className="text-slate-600">
                            {tr('Project:', 'प्रकल्प:')} <strong className="text-slate-900">{tv(cnt.projectName ?? (cnt as any).purpose)}</strong> ({tv(cnt.paymentMethod ?? (cnt as any).paymentMode)})
                          </p>
                        </div>

                        <div className="text-right shrink-0 space-y-1">
                          <p className="font-mono font-extrabold text-[#039583] text-sm">
                            ₹{(cnt.amount ?? 0).toLocaleString('en-IN')}
                          </p>
                          <button
                            onClick={() => alert(tr(`Downloading 80G Tax Receipt ${cnt.receiptNumber ?? (cnt as any).receiptNo}`, `80G कर पावती ${cnt.receiptNumber ?? (cnt as any).receiptNo} डाउनलोड होत आहे`))}
                            className="text-[11px] text-[#039583] hover:underline flex items-center justify-end gap-1 font-bold"
                          >
                            <Download className="w-3 h-3" />
                            <span>{tr('80G Receipt', '80G पावती')}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs">
              {tr('Select a donor record from the left directory.', 'डावीकडील सूचीतून दात्याची नोंद निवडा.')}
            </div>
          )}
        </div>
      </div>

      {/* Add Donor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-xl text-slate-900 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-slate-900">{tr('Register Verified Donor Record', 'प्रमाणित दात्याची नोंद करा')}</h2>

            <form onSubmit={handleSaveDonor} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Donor / Foundation Name', 'दाता / प्रतिष्ठानाचे नाव')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tr('e.g. Sweri Educational Trust', 'उदा. स्वेरी शैक्षणिक ट्रस्ट')}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Donor Entity Type', 'दात्याचा प्रकार')}</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="Corporate CSR">{tv('Corporate CSR')}</option>
                    <option value="Private Foundation">{tv('Private Foundation')}</option>
                    <option value="HNWI">{tv('HNWI')}</option>
                    <option value="Government Grant">{tv('Government Grant')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Registration / Tax ID', 'नोंदणी / कर क्रमांक')}</label>
                  <input
                    type="text"
                    required
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder={tr('e.g. BOI-PAN-413304', 'उदा. BOI-PAN-413304')}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Compliance Status', 'अनुपालन स्थिती')}</label>
                  <select
                    value={complianceStatus}
                    onChange={(e) => setComplianceStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="Verified (12A/80G)">{tv('Verified (12A/80G)')}</option>
                    <option value="FCRA Approved">{tv('FCRA Approved')}</option>
                    <option value="Pending Verification">{tv('Pending Verification')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Contact Person Name', 'संपर्क व्यक्तीचे नाव')}</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Designation', 'पद')}</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('Email Address', 'ईमेल पत्ता')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">{tr('WhatsApp Phone', 'व्हॉट्सॲप फोन')}</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+919763674147"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#023b77] to-[#039583] text-white font-bold rounded-lg shadow-xs"
                >
                  {tr('Register Donor Record', 'दाता नोंद करा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
