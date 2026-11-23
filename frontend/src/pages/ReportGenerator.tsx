import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage, translateValue } from '../context/LanguageContext';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Filter, 
  MessageSquare,
  BarChart2
} from 'lucide-react';

export const ReportGenerator: React.FC = () => {
  const { t, tr, language } = useLanguage();
  const [reportType, setReportType] = useState('audit');
  const [dateRange, setDateRange] = useState('2026-ytd');
  // The report document has its own language, defaulting to (and following) the app language.
  const [reportLang, setReportLang] = useState<'en' | 'mr'>(language);
  useEffect(() => setReportLang(language), [language]);
  const L = (en: string, mr: string) => (reportLang === 'mr' ? mr : en);
  const lv = (value: string) => translateValue(value, reportLang);
  const reportTitle = (type: string) =>
    type === 'audit'
      ? L('Consolidated CSR & Operational Audit Report 2026', 'एकत्रित सीएसआर व कामकाज लेखापरीक्षण अहवाल २०२६')
      : type === 'gate'
      ? L('Palawi Gate Register Visitor & Material Donation Register', 'पालवी गेट रजिस्टर: अभ्यागत व साहित्य देणगी नोंद')
      : L('80G Statutory Tax Exemption & Donor Contribution Summary', '80G वैधानिक कर सवलत व दाता योगदान सारांश');
  const reportPeriod = (range: string) =>
    range === '2026-ytd' ? L('01-Jan-2026 to 30-Sep-2026', '०१ जानेवारी २०२६ ते ३० सप्टेंबर २०२६') : L('Q3 2026 (Jul-Sep)', 'तिसरी तिमाही २०२६ (जुलै-सप्टेंबर)');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any | null>(null);

  // Fetch metrics and records for report generation
  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const [m, gateEntries, donors] = await Promise.all([
        api.getDashboardMetrics(),
        api.getGateRegisterEntries(),
        api.getDonors(),
      ]);

      const reportData = {
        type: reportType,
        range: dateRange,
        generatedAt: new Date(),
        metrics: m,
        gateCount: gateEntries.length,
        recentGateEntries: gateEntries.slice(0, 8),
        donorCount: donors.length,
        topDonors: donors.slice(0, 5),
      };

      setGeneratedReport(reportData);
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateReport();
  }, [reportType, dateRange]);

  const handleDownloadCsv = () => {
    if (!generatedReport) return;
    const csvRows = [
      ['PALAWI FOUNDATION - AUDIT REPORT'],
      ['Report Title', reportTitle(generatedReport.type)],
      ['Period', reportPeriod(generatedReport.range)],
      ['Generated Date', generatedReport.generatedAt.toLocaleDateString('en-GB')],
      [''],
      ['Metric Name', 'Value'],
      ['Total CSR Grants Received', `₹${generatedReport.metrics.totalFundsRaised}`],
      ['Active Pipeline Value', `₹${generatedReport.metrics.activePipelineValue}`],
      ['Total Gate Register Visits', generatedReport.gateCount],
      ['Total Donors Onboarded', generatedReport.donorCount],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Palawi_Audit_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अधिकृत अहवाल जनरेटर' : 'Official Audit & Impact Reporting'}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {tr('Report Generator', 'अहवाल जनरेटर')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' 
              ? 'सीएसआर ऑडिट, गेट नोंदणी व ८०G कर सवलत अहवाल जनरेट करा व डाऊनलोड करा' 
              : 'Generate verified CSR impact reports, statutory audit logs, and donor statements for stakeholders.'}
          </p>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-slate-700 font-bold mb-1">{tr('Select Report Type', 'अहवालाचा प्रकार निवडा')}</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#039583]"
          >
            <option value="audit">{tr('Consolidated CSR & Operational Audit', 'एकत्रित सीएसआर व कामकाज लेखापरीक्षण')}</option>
            <option value="gate">{tr('Gate Register & Material Log Report', 'गेट रजिस्टर व साहित्य नोंद अहवाल')}</option>
            <option value="80g">{tr('80G Statutory Tax Exemption Report', '80G वैधानिक कर सवलत अहवाल')}</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">{tr('Time Period', 'कालावधी')}</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#039583]"
          >
            <option value="2026-ytd">{tr('01-Jan-2026 to 30-Sep-2026 (Full YTD)', '०१ जानेवारी २०२६ ते ३० सप्टेंबर २०२६ (वर्षारंभापासून)')}</option>
            <option value="q3-2026">{tr('Q3 2026 (Jul - Sep 2026)', 'तिसरी तिमाही २०२६ (जुलै - सप्टेंबर)')}</option>
            <option value="q2-2026">{tr('Q2 2026 (Apr - Jun 2026)', 'दुसरी तिमाही २०२६ (एप्रिल - जून)')}</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">{tr('Report Language', 'अहवालाची भाषा')}</label>
          <select
            value={reportLang}
            onChange={(e) => setReportLang(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#039583]"
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleGenerateReport}
            className="flex-1 py-2.5 bg-[#023b77] hover:bg-[#023b77]/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{tr('Update Report', 'अहवाल अद्ययावत करा')}</span>
          </button>
        </div>
      </div>

      {/* Report Canvas Display */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-medium text-sm bg-white rounded-2xl border border-slate-200">
          {tr('Compiling report data...', 'अहवाल तयार होत आहे...')}
        </div>
      ) : generatedReport ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          {/* Action Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-[#039583]" />
              <span>{tr('Official Palawi Audit Report', 'अधिकृत पालवी लेखापरीक्षण अहवाल')}</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{tr('Print / PDF', 'प्रिंट / PDF')}</span>
              </button>

              <button
                onClick={handleDownloadCsv}
                className="px-3 py-1.5 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{tr('Export CSV', 'CSV डाउनलोड करा')}</span>
              </button>
            </div>
          </div>

          {/* Printable Report Document Sheet */}
          <div className="p-6 bg-slate-50/50 border border-slate-200 rounded-xl space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
            {/* Header Block */}
            <div className="border-b-2 border-[#023b77] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#023b77]">
                  <Building2 className="w-5 h-5 text-[#039583]" />
                  <span className="text-base font-extrabold tracking-tight">{L('PALAWI NGO & CSR CENTER', 'पालवी स्वयंसेवी संस्था व सीएसआर केंद्र')}</span>
                </div>
                <p className="text-[10px] text-slate-500">{L('Pandharpur, District Solapur, Maharashtra - 413304', 'पंढरपूर, जिल्हा सोलापूर, महाराष्ट्र - ४१३३०४')}</p>
                <p className="text-[10px] font-mono text-[#039583] font-bold">
                  {L('12A Reg', '12A नोंदणी')}: AACTP1234F20214 | {L('80G Reg', '80G नोंदणी')}: AACTP1234F80G01 | MCA CSR-1: CSR00034982
                </p>
              </div>

              <div className="text-right font-mono text-[11px] text-slate-600">
                <p className="font-bold text-slate-900">{reportTitle(generatedReport.type)}</p>
                <p className="text-slate-500">{L('Period:', 'कालावधी:')} {reportPeriod(generatedReport.range)}</p>
                <p className="text-[10px]">{L('Date:', 'दिनांक:')} {generatedReport.generatedAt.toLocaleDateString(reportLang === 'mr' ? 'mr-IN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>

            {/* Key Audit KPI Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{L('CSR Funds Raised', 'सीएसआर निधी संकलन')}</span>
                <span className="text-base font-extrabold font-mono text-[#023b77]">
                  ₹{(generatedReport.metrics.totalFundsRaised || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{L('Active Pipeline', 'सक्रिय पाइपलाइन')}</span>
                <span className="text-base font-extrabold font-mono text-[#039583]">
                  ₹{(generatedReport.metrics.activePipelineValue || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{L('Gate Visits Logged', 'नोंदवलेल्या गेट भेटी')}</span>
                <span className="text-base font-extrabold font-mono text-slate-900">
                  {generatedReport.gateCount} {L('Visits', 'भेटी')}
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{L('Donors Onboarded', 'नोंदणीकृत दाते')}</span>
                <span className="text-base font-extrabold font-mono text-slate-900">
                  {generatedReport.donorCount} {L('Donors', 'दाते')}
                </span>
              </div>
            </div>

            {/* Section 1: Gate Register Log Excerpt */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77] border-b border-slate-200 pb-1">
                {L('1. Gate Register & Visitor Activity Audit', '१. गेट रजिस्टर व अभ्यागत नोंदींचे लेखापरीक्षण')}
              </h3>
              <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">{L('Date', 'दिनांक')}</th>
                      <th className="p-2.5">{L('Visitor / Donor', 'अभ्यागत / दाता')}</th>
                      <th className="p-2.5">{L('Location', 'ठिकाण')}</th>
                      <th className="p-2.5">{L('Purpose', 'भेटीचे कारण')}</th>
                      <th className="p-2.5">{L('Items Received / Notes', 'प्राप्त साहित्य / टिपा')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {generatedReport.recentGateEntries.map((e: any) => (
                      <tr key={e.id}>
                        <td className="p-2.5 font-mono text-slate-500 font-bold">{lv(e.date)}</td>
                        <td className="p-2.5 font-bold text-slate-900">{e.visitorName}</td>
                        <td className="p-2.5 text-slate-600">{lv(e.address || 'Pandharpur')}</td>
                        <td className="p-2.5 font-bold text-[#039583]">{lv(e.remarks)}</td>
                        <td className="p-2.5 text-slate-700">{e.extraRemark || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Top CSR Donors */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77] border-b border-slate-200 pb-1">
                {L('2. Key CSR Corporate & Individual Donors', '२. प्रमुख कॉर्पोरेट व वैयक्तिक सीएसआर दाते')}
              </h3>
              <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">{L('Donor Name', 'दात्याचे नाव')}</th>
                      <th className="p-2.5">{L('Donor Type', 'दात्याचा प्रकार')}</th>
                      <th className="p-2.5">{L('80G Tax Exemption Status', '80G कर सवलत स्थिती')}</th>
                      <th className="p-2.5 text-right">{L('Total Contributed (₹)', 'एकूण योगदान (₹)')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {generatedReport.topDonors.map((d: any) => (
                      <tr key={d.id}>
                        <td className="p-2.5 font-bold text-slate-900">{lv(d.name)}</td>
                        <td className="p-2.5 text-slate-600">{lv(d.type)}</td>
                        <td className="p-2.5 text-emerald-700 font-bold">{lv(d.complianceStatus ?? 'Pending Verification')}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#023b77]">
                          ₹{(d.totalContributed ?? d.totalDoned ?? 0).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statutory Compliance Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <div>
                <p className="font-bold text-slate-900">{L('Certified by Palawi Internal Audit Trustee', 'पालवी अंतर्गत लेखापरीक्षण विश्वस्तांकडून प्रमाणित')}</p>
                <p className="text-slate-500">{L('Pandharpur, Maharashtra', 'पंढरपूर, महाराष्ट्र')}</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 inline-block">
                  {L('✓ Statutory 12A / 80G Compliant Audit', '✓ वैधानिक 12A / 80G अनुपालन लेखापरीक्षण')}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
