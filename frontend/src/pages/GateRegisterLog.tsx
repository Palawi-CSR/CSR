import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { shrinkPhoto, PHOTO_MAX_SOURCE_BYTES } from '../services/photo';
import { DEFAULT_STATE, INDIA_LOCATIONS, INDIA_STATES } from '../data/indiaLocations';
import { GateRegisterEntry, MaterialDistributionEntry, StaffAttendanceEntry, RegisterDocument, RegisterEntries } from '../types';
import { DonorProfileModal } from '../components/DonorProfileModal';
import { AUTHENTIC_MENSTRUAL_HYGIENE_REGISTER } from '../data/menstrualHygieneRegisterData';
import { AUTHENTIC_ALBENDAZOLE_REGISTER } from '../data/albendazoleRegisterData';
import { AUTHENTIC_BP_VITAL_REGISTER } from '../data/bpVitalRegisterData';
import { AUTHENTIC_MEDICAL_MONITORING_REGISTER } from '../data/medicalMonitoringRegisterData';
import { AUTHENTIC_ART_TABLET_REGISTER } from '../data/artTabletRegisterData';
import { 
  Search, 
  Filter,
  Plus,
  X,
  FileText,
  Download,
  ExternalLink,
  Camera,
  Loader2,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

const OTHER_CITY = '__other__';

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** "1990-05-04" (date input) -> "4/5/1990", the format used in the paper register. */
const isoToRegisterDob = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}/${m}/${y}`;
};

const emptyGateForm = () => ({
  visitorName: '',
  dateOfBirth: '', // YYYY-MM-DD from the date input
  mobileNo: '',
  address: '',
  state: DEFAULT_STATE,
  city: '',
  otherCity: '',
  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-'),
  remarks: 'Donation',
  extraRemark: '',
});

interface GateRegisterLogProps {
  /** Admins can switch between every register and the scanned PDFs; employees only see the gate register. */
  isAdmin?: boolean;
}

export const GateRegisterLog: React.FC<GateRegisterLogProps> = ({ isAdmin = false }) => {
  const { t, tr, tv, tf, language } = useLanguage();
  const records = (n: number) => tr(`${n} Records`, `${n} नोंदी`);
  type RegisterTab = 'gate' | 'hygiene' | 'albendazole' | 'bp' | 'medical' | 'art' | 'material' | 'attendance' | 'sources';
  const [activeRegisterTab, setActiveRegisterTab] = useState<RegisterTab>('gate');
  useEffect(() => {
    if (!isAdmin) setActiveRegisterTab('gate');
  }, [isAdmin]);

  // Original scanned registers (PDFs)
  const [documents, setDocuments] = useState<RegisterDocument[]>([]);
  useEffect(() => {
    api.getRegisterDocuments().then(setDocuments).catch((err) => console.error('Error loading source registers:', err));
  }, []);
  const documentCategories = Array.from(new Set(documents.map((d) => d.category)));
  const [openDocId, setOpenDocId] = useState<string | null>(null);
  const [docEntries, setDocEntries] = useState<Record<string, RegisterEntries>>({});
  const toggleDocEntries = async (docId: string) => {
    if (openDocId === docId) return setOpenDocId(null);
    setOpenDocId(docId);
    if (!docEntries[docId]) {
      try {
        const entries = await api.getRegisterEntries(docId);
        setDocEntries((prev) => ({ ...prev, [docId]: entries }));
      } catch (err) {
        console.error('Error loading register entries:', err);
      }
    }
  };

  // Gate Register State
  const [entries, setEntries] = useState<GateRegisterEntry[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRemark, setSelectedRemark] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Material & Staff State
  const [materialEntries, setMaterialEntries] = useState<MaterialDistributionEntry[]>([]);
  const [staffEntries, setStaffEntries] = useState<StaffAttendanceEntry[]>([]);

  // Modal & Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdEntry, setCreatedEntry] = useState<GateRegisterEntry | null>(null);
  const [formError, setFormError] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [viewPhoto, setViewPhoto] = useState<GateRegisterEntry | null>(null);
  const [profileEntry, setProfileEntry] = useState<GateRegisterEntry | null>(null);
  const photoInput = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState(emptyGateForm);
  const cityOptions = INDIA_LOCATIONS[formData.state] ?? [];

  const openAddModal = () => {
    setFormData(emptyGateForm());
    setPhoto(null);
    setFormError('');
    setCreatedEntry(null);
    setShowAddModal(true);
  };

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // let the same file be picked again after removing it
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError(tr('Please choose an image file for the photo.', 'फोटोसाठी कृपया प्रतिमा फाइल निवडा.'));
      return;
    }
    if (file.size > PHOTO_MAX_SOURCE_BYTES) {
      setFormError(tr('That photo is too large (over 15 MB).', 'हा फोटो खूप मोठा आहे (१५ MB पेक्षा जास्त).'));
      return;
    }
    setPhotoBusy(true);
    try {
      setPhoto(await shrinkPhoto(file));
      setFormError('');
    } catch {
      setFormError(tr('This photo could not be read. Try a JPEG or PNG.', 'हा फोटो वाचता आला नाही. JPEG किंवा PNG वापरून पहा.'));
    } finally {
      setPhotoBusy(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [gateData, matData, staffData] = await Promise.all([
        api.getGateRegisterEntries({ search, remark: selectedRemark }),
        api.getMaterialDistribution(),
        api.getStaffAttendance()
      ]);
      setEntries(gateData);
      setMaterialEntries(matData);
      setStaffEntries(staffData);
    } catch (err) {
      console.error('Error loading register records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, selectedRemark]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const city = formData.city === OTHER_CITY ? formData.otherCity.trim() : formData.city;
    if (!formData.visitorName.trim() || !formData.dateOfBirth || !formData.state || !city) {
      setFormError(tr('Please fill in all required fields.', 'कृपया सर्व आवश्यक माहिती भरा.'));
      return;
    }
    if (formData.dateOfBirth > todayIso()) {
      setFormError(tr('Date of birth cannot be in the future.', 'जन्मतारीख भविष्यातील असू शकत नाही.'));
      return;
    }

    setSubmitting(true);
    setFormError('');
    try {
      const { otherCity: _otherCity, ...fields } = formData;
      const created = await api.addGateRegisterEntry({
        ...fields,
        visitorName: formData.visitorName.trim(),
        dateOfBirth: isoToRegisterDob(formData.dateOfBirth),
        address: formData.address.trim(),
        city,
        extraRemark: formData.extraRemark.trim(),
        photo,
      });
      setCreatedEntry(created);
      loadData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : tr('Could not save the entry.', 'नोंद जतन करता आली नाही.'));
    } finally {
      setSubmitting(false);
    }
  };

  // Categories used in the gate register (normalised from the paper/Excel register).
  const categoryTypes = [
    'Visit',
    'Accompany Visitor',
    'Donation',
    'School/College Visit',
    'Field Work',
    'Maintenance',
    'Birthday Celebration',
    'Regular Visitor',
    'Reference',
    'Staff Meet',
    'Job/Internship',
    'Children / Relative Meet',
    'Social Media',
    'Payment / Cheque Received',
    'Food Meal Donation',
    'New Admission',
    'Medical',
    'Other Organisation',
    'Marriage Enquiry',
    'Activity / Guidance',
    'Delivery / Service',
    'Media / Photography',
    'Event / Award',
    'Inspection',
    'Not Specified',
  ];
  const remarkTypes = ['All', ...categoryTypes];

  const registerButtons: { id: RegisterTab; label: string }[] = [
    { id: 'gate', label: tr('Gate Register', 'गेट रजिस्टर') },
    { id: 'hygiene', label: tr('Menstrual Hygiene', 'मासिक पाळी') },
    { id: 'albendazole', label: tr('Albendazole', 'अल्बेन्धाझोल') },
    { id: 'bp', label: tr('BP & Vitals', 'बीपी व व्हायटल्स') },
    { id: 'medical', label: tr('Medical Monitoring', 'वैद्यकीय तपासणी') },
    { id: 'art', label: tr('ART Tablets', 'एआरटी गोळ्या') },
    { id: 'material', label: tr('Material Distribution', 'साहित्य वाटप') },
    { id: 'attendance', label: tr('Staff Attendance', 'कर्मचारी उपस्थिती') },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {tr('Register Log', 'रजिस्टर नोंदवही')}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {language === 'mr'
              ? 'सर्व अधिकृत रजिस्टर नोंदी व सांख्यिकी डेटा'
              : 'Unified authentic register records'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {activeRegisterTab === 'gate' && (
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'mr' ? 'नवीन नोंद जोडा' : 'Add Entry'}</span>
            </button>
          )}

          <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
            <span>{language === 'mr' ? 'एकूण नोंदी:' : 'Total Records:'} </span>
            <span className="font-bold">
              {activeRegisterTab === 'gate' ? entries.length :
               activeRegisterTab === 'hygiene' ? AUTHENTIC_MENSTRUAL_HYGIENE_REGISTER.length :
               activeRegisterTab === 'albendazole' ? AUTHENTIC_ALBENDAZOLE_REGISTER.length :
               activeRegisterTab === 'bp' ? AUTHENTIC_BP_VITAL_REGISTER.length :
               activeRegisterTab === 'medical' ? AUTHENTIC_MEDICAL_MONITORING_REGISTER.length :
               activeRegisterTab === 'art' ? AUTHENTIC_ART_TABLET_REGISTER.length :
               activeRegisterTab === 'material' ? materialEntries.length :
               activeRegisterTab === 'sources' ? documents.length : staffEntries.length}
            </span>
          </div>
        </div>
      </div>

      {/* Register switcher (admin only) */}
      {isAdmin && (
        <div className="flex flex-wrap items-center gap-2">
          {registerButtons.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegisterTab(reg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                activeRegisterTab === reg.id
                  ? 'bg-slate-800 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {reg.label}
            </button>
          ))}
          <button
            onClick={() => setActiveRegisterTab('sources')}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              activeRegisterTab === 'sources'
                ? 'bg-[#023b77] border-[#023b77] text-white'
                : 'bg-[#023b77]/10 border-[#023b77]/30 text-[#023b77] hover:bg-[#023b77]/15'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            {tr(`Register PDFs (${documents.length})`, `रजिस्टर पीडीएफ (${documents.length})`)}
          </button>
        </div>
      )}

      {/* REGISTER VIEW 1: GATE REGISTER LOG */}
      {activeRegisterTab === 'gate' && (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={language === 'mr' ? 'नोंदणी क्रमांक, नाव, शहर किंवा मोबाईल शोधा...' : 'Search ID, name, city, or mobile...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedRemark}
                onChange={(e) => setSelectedRemark(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none"
              >
                {remarkTypes.map((rt) => (
                  <option key={rt} value={rt}>
                    {rt === 'All' ? tr('All Categories', 'सर्व कारणे') : tv(rt)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-slate-600 text-xs">{tr('Loading...', 'लोड होत आहे...')}</div>
            ) : entries.length === 0 ? (
              <div className="p-8 text-center text-slate-600 text-xs">{tr('No entries found.', 'नोंदी सापडल्या नाहीत.')}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">{language === 'mr' ? 'नोंदणी क्र.' : 'Reg. ID'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'दिनांक' : 'Date'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'जन्मतारीख' : 'DOB'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'मोबाईल' : 'Mobile'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'पत्ता' : 'Address'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'वर्ग / कारण' : 'Category'}</th>
                      <th className="py-3 px-4">{language === 'mr' ? 'देणगी / शेरा' : 'Donation / Remarks'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-[#023b77] whitespace-nowrap">{entry.registrationId || '—'}</td>
                        <td className="py-3 px-4 font-mono">{tv(entry.date)}</td>
                        <td className="py-3 px-4 font-bold">
                          <div className="flex items-center gap-2">
                            {entry.photoUrl && (
                              <button type="button" onClick={() => setViewPhoto(entry)} className="shrink-0 cursor-zoom-in">
                                <img src={entry.photoUrl} alt={entry.visitorName} className="w-8 h-8 rounded-md object-cover border border-slate-200" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setProfileEntry(entry)}
                              className="text-left text-[#023b77] hover:underline cursor-pointer"
                              title={tr('View donor details & visit history', 'दात्याची माहिती व भेटींचा इतिहास पहा')}
                            >
                              {entry.visitorName}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono whitespace-nowrap">{entry.dateOfBirth && entry.dateOfBirth !== 'N/A' ? entry.dateOfBirth : '—'}</td>
                        <td className="py-3 px-4 font-mono">{entry.mobileNo || '—'}</td>
                        <td className="py-3 px-4">
                          {entry.address ? tv(entry.address) : '—'}
                          {(entry.city || entry.state) && (
                            <div className="text-[10px] text-slate-500">
                              {[entry.city !== entry.address ? entry.city : '', entry.state].filter(Boolean).join(', ')}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">{tv(entry.remarks)}</td>
                        <td className="py-3 px-4">{entry.extraRemark || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REGISTER VIEW 2: MENSTRUAL HYGIENE REGISTER */}
      {activeRegisterTab === 'hygiene' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{language === 'mr' ? 'मासिक पाळी रजिस्टर (ऑक्टोबर २०२१ ते नोव्हेंबर २०२६)' : 'Menstrual Hygiene Register (Oct 2021 - Nov 2026)'}</span>
            <span className="font-mono">{records(AUTHENTIC_MENSTRUAL_HYGIENE_REGISTER.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{tr('Sr.', 'अ.क्र.')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'महिना / वर्ष' : 'Month / Year'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'वय' : 'Age'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'तपशील / पॅड्स' : 'Details / Count'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'शेरा' : 'Notes'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्वाक्षरी' : 'Signature'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AUTHENTIC_MENSTRUAL_HYGIENE_REGISTER.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono">{language === 'mr' ? item.monthYearMr : item.monthYear}</td>
                    <td className="py-3 px-4 font-bold">{language === 'mr' ? item.residentNameMr : item.residentNameEn}</td>
                    <td className="py-3 px-4 font-mono">{item.age}</td>
                    <td className="py-3 px-4 font-mono">{tr(`${item.sanitaryPadsCount} Pads`, `${item.sanitaryPadsCount} पॅड्स`)}</td>
                    <td className="py-3 px-4 font-mono">{tv(item.distributionDate)}</td>
                    <td className="py-3 px-4">{language === 'mr' ? item.healthNotesMr : item.healthNotesEn}</td>
                    <td className="py-3 px-4">{tv(item.signedBy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 3: ALBENDAZOLE TABLET REGISTER */}
      {activeRegisterTab === 'albendazole' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{tr('Albendazole Tablet Register (2025-2026)', 'अल्बेन्धाझोल गोळी रजिस्टर (२०२५-२०२६)')}</span>
            <span className="font-mono">{records(AUTHENTIC_ALBENDAZOLE_REGISTER.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{tr('Sr.', 'अ.क्र.')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'वर्ग' : 'Category'}</th>
                  <th className="py-3 px-4 font-mono">10/11/25</th>
                  <th className="py-3 px-4 font-mono">09/5/26</th>
                  <th className="py-3 px-4 font-mono">10/11/2026</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AUTHENTIC_ALBENDAZOLE_REGISTER.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold">{language === 'mr' ? item.nameMr : item.nameEn}</td>
                    <td className="py-3 px-4">{tv(item.category)}</td>
                    <td className="py-3 px-4 font-mono">{tv(item.date1)}</td>
                    <td className="py-3 px-4 font-mono">{tv(item.date2)}</td>
                    <td className="py-3 px-4 font-mono">{tv(item.date3)}</td>
                    <td className="py-3 px-4">{tv(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 4: BP & VITAL SIGNS REGISTER */}
      {activeRegisterTab === 'bp' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{tr('BP & Vitals Register (Jul-Nov 2026)', 'बीपी, एसपीओ२ व वजन रजिस्टर (जुलै-नोव्हेंबर २०२६)')}</span>
            <span className="font-mono">{records(AUTHENTIC_BP_VITAL_REGISTER.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{tr('Sr.', 'अ.क्र.')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                  <th className="py-3 px-4">{tr('BP', 'रक्तदाब')}</th>
                  <th className="py-3 px-4">{tr('SpO2', 'ऑक्सिजन पातळी')}</th>
                  <th className="py-3 px-4">{tr('Pulse (PR)', 'नाडी')}</th>
                  <th className="py-3 px-4">{tr('Weight', 'वजन')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AUTHENTIC_BP_VITAL_REGISTER.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono">{item.date}</td>
                    <td className="py-3 px-4 font-bold">{language === 'mr' ? item.nameMr : item.nameEn}</td>
                    <td className="py-3 px-4 font-mono">{item.bp}</td>
                    <td className="py-3 px-4 font-mono">{item.spo2}</td>
                    <td className="py-3 px-4 font-mono">{item.prBpm}</td>
                    <td className="py-3 px-4 font-mono">{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 5: MEDICAL MONITORING (CD4, CBC, HB, VL) */}
      {activeRegisterTab === 'medical' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{tr('Medical Monitoring Register (CD4, CBC, HB, VL)', 'सीडी४, सीबीसी, एचबी व व्हायरल लोड रजिस्टर (२०२०-२०२६)')}</span>
            <span className="font-mono">{records(AUTHENTIC_MEDICAL_MONITORING_REGISTER.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{tr('Sr.', 'अ.क्र.')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'चाचणी प्रकार' : 'Test Type'}</th>
                  <th className="py-3 px-4">{tr('Result Value', 'निकाल')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'शेरा' : 'Remarks'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AUTHENTIC_MEDICAL_MONITORING_REGISTER.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono">{item.date}</td>
                    <td className="py-3 px-4 font-bold">{language === 'mr' ? item.nameMr : item.nameEn}</td>
                    <td className="py-3 px-4">{tv(item.testType)}</td>
                    <td className="py-3 px-4 font-mono font-bold">{tv(item.resultValue)}</td>
                    <td className="py-3 px-4">{tv(item.remarks)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 6: ART TABLET REGISTER */}
      {activeRegisterTab === 'art' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{tr('ART Tablet Administration Register (2025-2026)', 'एआरटी गोळी घेणाऱ्या मुलांची नोंद वही (२०२५-२०२६)')}</span>
            <span className="font-mono">{records(AUTHENTIC_ART_TABLET_REGISTER.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{tr('Sr.', 'अ.क्र.')}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'सत्र / वेळ' : 'Session'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'तपशील' : 'Details'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {AUTHENTIC_ART_TABLET_REGISTER.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono">{item.date}</td>
                    <td className="py-3 px-4">{tv(item.sessionTime)}</td>
                    <td className="py-3 px-4 font-medium">{tv(item.status)}</td>
                    <td className="py-3 px-4">{tv(item.details)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 7: MATERIAL DISTRIBUTION */}
      {activeRegisterTab === 'material' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{language === 'mr' ? 'साहित्य वाटप रजिस्टर' : 'Material Distribution Register'}</span>
            <span className="font-mono">{records(materialEntries.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{language === 'mr' ? 'महिना' : 'Month'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'नाव' : 'Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'युनिफॉर्म' : 'Uniforms'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'शर्ट / पँट' : 'Shirts / Pants'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'टॉवेल / साबण' : 'Towels / Soaps'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्वच्छता साहित्य' : 'Cleaning Item'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्वाक्षरी' : 'Signature'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {materialEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono">{tv(item.month)}</td>
                    <td className="py-3 px-4 font-bold">{tv(item.residentName)}</td>
                    <td className="py-3 px-4 font-mono">{item.uniforms ? tr(`${item.uniforms} Unit`, `${item.uniforms} नग`) : '—'}</td>
                    <td className="py-3 px-4 font-mono">{item.shirts || item.pants ? tr(`${item.shirts || 0} Shirt, ${item.pants || 0} Pant`, `${item.shirts || 0} शर्ट, ${item.pants || 0} पँट`) : (item as any).shirtsPants ? tr(`${(item as any).shirtsPants} Sets`, `${(item as any).shirtsPants} संच`) : '—'}</td>
                    <td className="py-3 px-4 font-mono">{item.towels || item.soaps ? tr(`${item.towels || 0} Towel, ${item.soaps || 0} Soap`, `${item.towels || 0} टॉवेल, ${item.soaps || 0} साबण`) : (item as any).towelsSoaps ? tr(`${(item as any).towelsSoaps} Sets`, `${(item as any).towelsSoaps} संच`) : '—'}</td>
                    <td className="py-3 px-4">{item.cleaningItem ? (item.quantity ? `${tv(item.cleaningItem)} (${item.quantity})` : tv(item.cleaningItem)) : '—'}</td>
                    <td className="py-3 px-4">{tv(item.signedBy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 8: STAFF ATTENDANCE */}
      {activeRegisterTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
            <span>{language === 'mr' ? 'कर्मचारी उपस्थिती रजिस्टर' : 'Staff Attendance Register'}</span>
            <span className="font-mono">{records(staffEntries.length)}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">{language === 'mr' ? 'कर्मचाऱ्याचे नाव' : 'Staff Name'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'पद' : 'Role'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'महिना' : 'Month'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'उपस्थित दिवस' : 'Attendance Days'}</th>
                  <th className="py-3 px-4">{language === 'mr' ? 'स्थिती' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {staffEntries.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold">{tv(staff.staffName)}</td>
                    <td className="py-3 px-4">{tv(staff.role)}</td>
                    <td className="py-3 px-4 font-mono">{tv(staff.month)}</td>
                    <td className="py-3 px-4 font-mono">{tr(`${staff.attendanceDays ?? (staff as any).daysPresent} Days`, `${staff.attendanceDays ?? (staff as any).daysPresent} दिवस`)}</td>
                    <td className="py-3 px-4">{tv(staff.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REGISTER VIEW 9: ORIGINAL SCANNED REGISTERS */}
      {activeRegisterTab === 'sources' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            {tr(
              'Original scanned Sanjivani registers. Open any register to see the handwritten pages; registers marked "Partly typed" also have searchable entries in their own tab.',
              'संजीवनी मूळ स्कॅन केलेली रजिस्टर. हस्तलिखित पाने पाहण्यासाठी रजिस्टर उघडा; "अंशतः नोंदवलेले" रजिस्टरच्या नोंदी त्यांच्या स्वतंत्र टॅबमध्येही आहेत.'
            )}
          </p>
          {documents.length === 0 && (
            <div className="p-8 text-center text-slate-600 text-xs bg-white rounded-xl border border-slate-200">
              {tr('No source registers found.', 'मूळ रजिस्टर सापडली नाहीत.')}
            </div>
          )}
          {documentCategories.map((category) => {
            const docs = documents.filter((d) => d.category === category);
            return (
              <div key={category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800 flex justify-between">
                  <span>{tv(category)}</span>
                  <span className="font-mono">
                    {tr(`${docs.length} registers · ${docs.reduce((n, d) => n + d.pages, 0)} pages`, `${docs.length} रजिस्टर · ${docs.reduce((n, d) => n + d.pages, 0)} पाने`)}
                  </span>
                </div>
                <ul className="divide-y divide-slate-200">
                  {docs.map((doc) => (
                    <li key={doc.id} className="p-3 flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 text-xs">
                      <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800">{language === 'mr' ? doc.titleMr : doc.titleEn}</div>
                        <div className="text-slate-600 mt-0.5">
                          {language === 'mr' ? doc.titleEn : doc.titleMr}
                          {doc.period && <span className="font-mono"> · {doc.period}</span>}
                          <span className="font-mono"> · {tr(`${doc.pages} pages`, `${doc.pages} पाने`)}</span>
                          <span className="font-mono"> · {(doc.sizeBytes / 1048576).toFixed(1)} MB</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {doc.status === 'scan' ? (
                          <span className="px-2 py-1 rounded bg-slate-100 text-slate-600">{tr('Scan only', 'फक्त स्कॅन')}</span>
                        ) : doc.entryCount > 0 ? (
                          <button
                            onClick={() => toggleDocEntries(doc.id)}
                            className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                          >
                            {openDocId === doc.id
                              ? tr('Hide entries', 'नोंदी लपवा')
                              : doc.status === 'partial'
                                ? tr(`Partly typed — show ${doc.entryCount} entries`, `अंशतः नोंदवलेले — ${doc.entryCount} नोंदी पहा`)
                                : tr(`Typed — show ${doc.entryCount} entries`, `नोंदवलेले — ${doc.entryCount} नोंदी पहा`)}
                          </button>
                        ) : doc.tab ? (
                          <button
                            onClick={() => setActiveRegisterTab(doc.tab as RegisterTab)}
                            className="px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 cursor-pointer"
                          >
                            {doc.status === 'complete' ? tr('Typed — open tab', 'नोंदवलेले — टॅब उघडा') : tr('Partly typed — open tab', 'अंशतः नोंदवलेले — टॅब उघडा')}
                          </button>
                        ) : null}
                        {doc.available ? (
                          <>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              {tr('View', 'पहा')}
                            </a>
                            <a
                              href={doc.url}
                              download={doc.fileName}
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                            >
                              <Download className="w-3.5 h-3.5" />
                              {tr('Download', 'डाउनलोड')}
                            </a>
                          </>
                        ) : (
                          <span className="px-2 py-1 rounded bg-red-50 text-red-700">{tr('File missing', 'फाइल उपलब्ध नाही')}</span>
                        )}
                      </div>
                      {openDocId === doc.id && (
                        <div className="w-full md:basis-full">
                          {!docEntries[doc.id] ? (
                            <div className="p-4 text-center text-slate-600">{tr('Loading...', 'लोड होत आहे...')}</div>
                          ) : (
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                              {docEntries[doc.id].note && (
                                <div className="p-2 bg-amber-50 text-amber-900 text-[11px]">{docEntries[doc.id].note}</div>
                              )}
                              {docEntries[doc.id].tables.map((table, tIdx) => (
                                <div key={tIdx} className={tIdx > 0 ? 'border-t-4 border-slate-100' : ''}>
                                  {(table.title || table.note) && (
                                    <div className="px-3 pt-3 pb-1">
                                      {table.title && (
                                        <div className="text-sm font-bold text-slate-900">
                                          {language === 'mr' ? table.titleMr ?? table.title : table.title}
                                        </div>
                                      )}
                                      {table.note && <div className="text-[11px] text-slate-600">{table.note}</div>}
                                    </div>
                                  )}
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs text-slate-800">
                                      <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                                        <tr>
                                          {table.columns.map((col) => (
                                            <th key={col.key} className="py-2 px-3">{language === 'mr' ? col.mr : col.en}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200">
                                        {table.rows.map((row, idx) => (
                                          <tr key={idx} className="hover:bg-slate-50">
                                            {table.columns.map((col) => (
                                              <td key={col.key} className="py-2 px-3">{row[col.key] ?? '—'}</td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE ENTRY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden my-8">
            <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {language === 'mr' ? 'नवीन नोंद तयार करा' : 'Create New Entry'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {createdEntry ? (
              <div className="p-8 text-center space-y-3 text-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold">
                  {tr('Entry saved for', 'नोंद जतन झाली:')} {createdEntry.visitorName}
                </p>
                <div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">{tr('Registration ID', 'नोंदणी क्रमांक')}</p>
                  <p className="font-mono font-extrabold text-2xl tracking-wide text-[#023b77]">{createdEntry.registrationId}</p>
                </div>
                <div className="flex justify-center gap-2 pt-2 text-xs">
                  <button
                    type="button"
                    onClick={openAddModal}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer font-medium"
                  >
                    {tr('Add Another', 'आणखी नोंद जोडा')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer font-medium"
                  >
                    {tr('Done', 'पूर्ण')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'नाव' : 'Name'} *</label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      value={formData.visitorName}
                      onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'जन्मतारीख' : 'Date of Birth'} *</label>
                    <input
                      type="date"
                      required
                      min="1900-01-01"
                      max={todayIso()}
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'मोबाईल' : 'Mobile'}</label>
                    <input
                      type="text"
                      value={formData.mobileNo}
                      onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'दिनांक' : 'Date'}</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'राज्य' : 'State'} *</label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value, city: '', otherCity: '' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    >
                      {INDIA_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'शहर' : 'City'} *</label>
                    <select
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    >
                      <option value="" disabled>{tr('Select city', 'शहर निवडा')}</option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value={OTHER_CITY}>{tr('Other (type below)', 'इतर (खाली लिहा)')}</option>
                    </select>
                    {formData.city === OTHER_CITY && (
                      <input
                        type="text"
                        required
                        autoFocus
                        maxLength={80}
                        value={formData.otherCity}
                        onChange={(e) => setFormData({ ...formData, otherCity: e.target.value })}
                        placeholder={tr('Type city / village name', 'शहर / गावाचे नाव लिहा')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583] mt-2"
                      />
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'पत्ता (परिसर / गाव)' : 'Address (area / village)'}</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'वर्ग / कारण' : 'Category / Remark'}</label>
                    <select
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    >
                      {categoryTypes.filter((c) => c !== 'Not Specified').map((c) => (
                        <option key={c} value={c}>{tv(c)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-medium text-slate-700">{language === 'mr' ? 'देणगी / शेरा' : 'Donation / Remarks'}</label>
                    <textarea
                      rows={2}
                      maxLength={1000}
                      value={formData.extraRemark}
                      onChange={(e) => setFormData({ ...formData, extraRemark: e.target.value })}
                      placeholder={tr('e.g. ₹1,000 cash, or Jwari 30 kg', 'उदा. ₹१,००० रोख, किंवा ज्वारी ३० किलो')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-medium text-slate-700">
                      {language === 'mr' ? 'फोटो' : 'Photo'} <span className="text-slate-400 font-normal">({tr('optional', 'ऐच्छिक')})</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                        {photoBusy ? (
                          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                        ) : photo ? (
                          <img src={photo} alt={tr('Photo preview', 'फोटो पूर्वावलोकन')} className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <input ref={photoInput} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                      <button
                        type="button"
                        disabled={photoBusy}
                        onClick={() => photoInput.current?.click()}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg cursor-pointer font-medium"
                      >
                        {photo ? tr('Change Photo', 'फोटो बदला') : tr('Add Photo', 'फोटो जोडा')}
                      </button>
                      {photo && (
                        <button
                          type="button"
                          onClick={() => setPhoto(null)}
                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer font-medium"
                        >
                          {tr('Remove', 'काढा')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{formError}</p>
                )}

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer font-medium"
                  >
                    {tr('Cancel', 'रद्द करा')}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || photoBusy}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer font-medium flex items-center gap-2 disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {tr('Save Entry', 'नोंद जतन करा')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Donor profile & visit history */}
      {profileEntry && <DonorProfileModal entry={profileEntry} onClose={() => setProfileEntry(null)} />}

      {/* Photo viewer */}
      {viewPhoto?.photoUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" onClick={() => setViewPhoto(null)}>
          <div className="bg-white rounded-2xl p-3 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <img src={viewPhoto.photoUrl} alt={viewPhoto.visitorName} className="w-full rounded-xl" />
            <div className="flex items-center justify-between mt-2 px-1 text-sm">
              <span className="font-semibold">{viewPhoto.visitorName}</span>
              <span className="font-mono font-bold text-[#023b77]">{viewPhoto.registrationId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
