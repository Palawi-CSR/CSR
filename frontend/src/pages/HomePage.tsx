import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Building2,
  Users,
  FileCheck2,
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ClipboardList
} from 'lucide-react';

interface HomePageProps {
  onNavigateTab: (tab: string) => void;
  onOpenQuickOutreach: () => void;
  metrics: any;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  onOpenQuickOutreach,
  metrics,
}) => {
  const { tr } = useLanguage();

  const modules = [
    {
      id: 'gate-register',
      title: tr('Gate Register & Visitor Log', 'गेट रजिस्टर व अभ्यागत नोंद'),
      description: tr(
        'Official 2026 gate entry log recording daily visitors, contact details, locations, and material/item donations.',
        'दैनंदिन अभ्यागत, संपर्क तपशील, ठिकाण आणि साहित्य/वस्तू देणग्यांची अधिकृत २०२६ गेट नोंदवही.'
      ),
      icon: ClipboardList,
      badge: tr('2026 Log Entries', '२०२६ नोंदी'),
    },
    {
      id: 'csr-database',
      title: tr('CSR Partner Database', 'सीएसआर भागीदार डेटाबेस'),
      description: tr(
        'Structured database of prospective CSR partners, regional corporate foundations, and funding opportunities with eligibility notes.',
        'संभाव्य सीएसआर भागीदार, प्रादेशिक कॉर्पोरेट प्रतिष्ठाने आणि पात्रता टिपांसह निधी संधींचा सुव्यवस्थित डेटाबेस.'
      ),
      icon: Building2,
      badge: tr('Verified Partners', 'प्रमाणित भागीदार'),
    },
    {
      id: 'donor-pipeline',
      title: tr('Donor Relationship CRM', 'दाता संबंध व्यवस्थापन'),
      description: tr(
        'Donor and institutional pipeline, call & visit history, commitments, follow-up dates, and action items.',
        'दाता व संस्थात्मक पाइपलाइन, कॉल व भेटींचा इतिहास, वचनबद्धता, पाठपुरावा तारखा आणि करावयाची कामे.'
      ),
      icon: Users,
      badge: tr('Pipeline Deals', 'पाइपलाइन व्यवहार'),
    },
    {
      id: 'donor-records',
      title: tr('Centralised Donor Records', 'मध्यवर्ती दाता रेकॉर्ड'),
      description: tr(
        'Centralised donor records and relevant contribution / relationship information based on approved 12A/80G data fields.',
        'मंजूर 12A/80G माहिती क्षेत्रांवर आधारित मध्यवर्ती दाता रेकॉर्ड आणि योगदान / संबंधांची माहिती.'
      ),
      icon: FileCheck2,
      badge: tr('12A & 80G Certified', '12A व 80G प्रमाणित'),
    },
    {
      id: 'dashboard',
      title: tr('Management Dashboard', 'व्यवस्थापन डॅशबोर्ड'),
      description: tr(
        'A consolidated view of agreed operational and fundraising indicators, task status, inventory information, and donor pipeline.',
        'ठरलेले कामकाज व निधी संकलन निर्देशक, कामांची स्थिती, साठा माहिती आणि दाता पाइपलाइन यांचे एकत्रित चित्र.'
      ),
      icon: LayoutDashboard,
      badge: tr('Real-time KPIs', 'तात्काळ निर्देशक'),
    },
    {
      id: 'whatsapp-suite',
      title: tr('WhatsApp Communications', 'व्हॉट्सॲप संवाद'),
      description: tr(
        'Direct WhatsApp outreach suite to transmit proposal decks, MoU reminders, and automated AI responses to partners.',
        'भागीदारांना प्रस्ताव, सामंजस्य करार स्मरणपत्रे आणि स्वयंचलित एआय उत्तरे पाठवण्यासाठी थेट व्हॉट्सॲप संपर्क सुविधा.'
      ),
      icon: MessageSquare,
      badge: tr('Direct Outreach', 'थेट संपर्क'),
    },
  ];

  return (
    <div className="bg-[#f0f5f7] min-h-screen text-slate-900 font-sans selection:bg-[#039583] selection:text-white">
      {/* Top Accent Stripe */}
      <div className="h-1 bg-[#039583] w-full" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Hero Content (Left Column) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs font-bold tracking-wider text-[#023b77] uppercase font-mono">
              {tr('CSR ESTIMATES & GRANT MANAGEMENT FOR NON-PROFITS', 'स्वयंसेवी संस्थांसाठी सीएसआर अंदाज व अनुदान व्यवस्थापन')}
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {tr('From CSR discovery to grant allocation in minutes', 'सीएसआर शोधापासून अनुदान वाटपापर्यंत काही मिनिटांत')}
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal max-w-xl">
              {tr(
                'Centralized workspace for Palawi to track prospective corporate CSR partners, material donations, gate visitor logs, and donor relationships with 100% transparency.',
                'संभाव्य कॉर्पोरेट सीएसआर भागीदार, साहित्य देणग्या, गेट अभ्यागत नोंदी आणि दाता संबंध १००% पारदर्शकतेने पाहण्यासाठी पालवीचे मध्यवर्ती कार्यक्षेत्र.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('gate-register')}
                className="px-6 py-3 text-sm font-bold text-white bg-[#039583] hover:bg-[#039583]/90 rounded-lg shadow-sm transition-all"
              >
                {tr('Explore Gate Register', 'गेट रजिस्टर पहा')}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
              >
                {tr('See how it works', 'हे कसे कार्य करते ते पहा')}
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium pt-1">
              {tr('Already signed in as', 'यापूर्वीच साइन इन केलेले खाते:')} <strong className="text-slate-900">{tr('Admin', 'प्रशासक')}</strong> ·{' '}
              <button
                onClick={() => onNavigateTab('gate-register')}
                className="font-bold text-[#023b77] hover:underline cursor-pointer"
              >
                {tr('View Live Register', 'चालू रजिस्टर पहा')}
              </button>
            </p>
          </div>

          {/* Hero Visual Card (Right Column) */}
          <div className="lg:col-span-6 relative">
            {/* Elevated White Card - CSR Dashboard Preview */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 space-y-5">

              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#039583] animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 tracking-tight">
                    {tr('Palawi CSR & Gate Register Summary', 'पालवी सीएसआर व गेट रजिस्टर सारांश')}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#039583]/15 text-[#039583]">
                  {tr('2026 Log Active', '२०२६ नोंदवही सक्रिय')}
                </span>
              </div>

              {/* Main Anchor Grant Highlight */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#023b77] to-[#039583] text-white space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-200 block">
                      {tr('Featured Institutional Partner', 'वैशिष्ट्यपूर्ण संस्थात्मक भागीदार')}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      {tr('Bank Of India (Pandharpur Main Branch)', 'बँक ऑफ इंडिया, पंढरपूर मुख्य शाखा')}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[10px] font-bold backdrop-blur-xs">
                    {tr('Partnered', 'भागीदार')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/15 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-200 block">{tr('Stationary & Paper Grant', 'स्टेशनरी व कागद अनुदान')}</span>
                    <span className="font-mono font-bold text-base text-white">₹2,50,000</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-200 block">{tr('Focus Priority', 'प्राधान्य क्षेत्र')}</span>
                    <span className="font-semibold text-white">{tr('Education & Printing', 'शिक्षण व छपाई')}</span>
                  </div>
                </div>

                {/* Grant Disbursement Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-medium text-slate-200">
                    <span>{tr('Paper & Office Supply Allocation', 'कागद व कार्यालयीन साहित्य वाटप')}</span>
                    <span className="font-mono font-bold">{tr('100% Dispatched', '१००% वितरित')}</span>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-full" />
                  </div>
                </div>
              </div>

              {/* Secondary CSR Metrics Row */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {tr('Sweri Student Rations', 'स्वेरी विद्यार्थी शिधा')}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 font-mono text-base">{tr('240 Packets', '२४० पाकिटे')}</span>
                    <span className="text-[10px] font-bold text-[#039583] bg-[#039583]/10 px-2 py-0.5 rounded">
                      {tr('Pledged', 'वचनबद्ध')}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {tr('Ved Prasad Bedding', 'वेद प्रसाद अंथरूण')}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#023b77] font-mono text-base">{tr('33 Chadar', '३३ चादरी')}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{tr('45 Sataranji', '४५ सतरंजी')}</span>
                  </div>
                </div>
              </div>

              {/* Recent Outreach Log */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#039583]/15 text-[#039583]">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{tr('Dr. Preeti Shinde (Innerwheel)', 'डॉ. प्रीती शिंदे, इनरव्हील')}</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      {tr('Grocery & sanitary napkin distribution confirmed', 'किराणा व सॅनिटरी नॅपकिन वाटप निश्चित')}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#039583] font-bold">{tr('WhatsApp Sent', 'व्हॉट्सॲप पाठवला')}</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#023b77]/10 text-[#023b77]">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tr('CSR Funds & Material Value', 'सीएसआर निधी व साहित्य मूल्य')}</p>
              <p className="text-xl font-extrabold font-mono text-slate-900">
                ₹{(metrics?.totalFundsRaised || 650000).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#039583]/15 text-[#039583]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tr('Active Pipeline', 'सक्रिय पाइपलाइन')}</p>
              <p className="text-xl font-extrabold font-mono text-[#039583]">
                ₹{(metrics?.activePipelineValue || 780000).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tr('Verified Regional Donors', 'प्रमाणित प्रादेशिक दाते')}</p>
              <p className="text-xl font-extrabold font-mono text-slate-900">
                {metrics?.totalDonors || 6} {tr('Organizations', 'संस्था')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tr('Tax Compliance', 'कर अनुपालन')}</p>
              <p className="text-xl font-extrabold text-emerald-800">{tr('12A & 80G Certified', '12A व 80G प्रमाणित')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works & Modules Section */}
      <div id="how-it-works-section" className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tr('Palawi CSR Modules', 'पालवी सीएसआर विभाग')}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
            {tr(
              'A single, minimalist workspace for social impact initiatives to manage gate registers, corporate grants, donor relationships, and material inventory.',
              'गेट रजिस्टर, कॉर्पोरेट अनुदान, दाता संबंध आणि साहित्य साठा सांभाळण्यासाठी सामाजिक उपक्रमांचे एकच, सोपे कार्यक्षेत्र.'
            )}
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                onClick={() => onNavigateTab(mod.id)}
                className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#039583] transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#023b77] text-white shadow-2xs group-hover:bg-[#039583] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-[#039583]/15 group-hover:text-[#039583] transition-colors">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#023b77] transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {mod.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#039583] pt-2 border-t border-slate-100">
                  <span>{tr('Open Module', 'विभाग उघडा')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Indicators */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#039583]" />
            <span>{tr('Operational Milestones & Recent Gate Log Highlights', 'कामकाजातील टप्पे व अलीकडील गेट नोंदी')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-[#039583] uppercase tracking-wider">{tr('Stationary Grant Received', 'स्टेशनरी अनुदान प्राप्त')}</span>
              <p className="font-bold text-slate-900">{tr('Bank Of India (Pandharpur Main)', 'बँक ऑफ इंडिया, पंढरपूर मुख्य शाखा')}</p>
              <p className="text-slate-600">{tr('A4 printer paper bundles and office supplies received & logged.', 'A4 प्रिंटर कागदाचे गठ्ठे व कार्यालयीन साहित्य प्राप्त होऊन नोंदवले.')}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-[#023b77] uppercase tracking-wider">{tr('Ration Drive Active', 'शिधा मोहीम सक्रिय')}</span>
              <p className="font-bold text-slate-900">{tr('Sweri Educational Trust', 'स्वेरी शैक्षणिक ट्रस्ट')}</p>
              <p className="text-slate-600">{tr('240 biscuit packets, 30kg pohe, 9kg sugar delivered by student group.', 'विद्यार्थी गटाकडून २४० बिस्किट पाकिटे, ३० किलो पोहे, ९ किलो साखर प्राप्त.')}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{tr('Toy & Book Shipment', 'खेळणी व पुस्तके')}</span>
              <p className="font-bold text-slate-900">{tr('Kidverse Trata Foundation', 'किडव्हर्स त्राता फाउंडेशन')}</p>
              <p className="text-slate-600">{tr('16 toy sets and 28 storybooks allocated for learning center.', 'शिक्षण केंद्रासाठी १६ खेळणी संच व २८ गोष्टींची पुस्तके दिली.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
