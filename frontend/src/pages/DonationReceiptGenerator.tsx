import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileCheck2, 
  Download, 
  Printer, 
  MessageSquare, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  IndianRupee, 
  User, 
  Gift
} from 'lucide-react';

interface DonationReceiptGeneratorProps {
  onOpenWhatsAppOutreach?: (phone: string, name: string, defaultText?: string) => void;
}

export const DonationReceiptGenerator: React.FC<DonationReceiptGeneratorProps> = ({
  onOpenWhatsAppOutreach,
}) => {
  const { t, tr, language } = useLanguage();
  const paymentLabel = (method: string) =>
    ({
      'Bank Transfer / NEFT': tr('Bank Transfer / NEFT', 'बँक हस्तांतरण / NEFT'),
      'UPI / QR Code': tr('UPI / QR Code', 'यूपीआय / क्यूआर कोड'),
      'Cheque / Demand Draft': tr('Cheque / Demand Draft', 'धनादेश / डिमांड ड्राफ्ट'),
      'Cash / Center Drop': tr('Cash / Center Drop', 'रोख / केंद्रात जमा'),
    } as Record<string, string>)[method] ?? method;

  // Receipt Form State
  const [receiptNo, setReceiptNo] = useState(`PLW/80G/2026/${Math.floor(1000 + Math.random() * 9000)}`);
  const [donorName, setDonorName] = useState(() => tr('Aamjat Inamdar (Kasegaon)', 'आमजत इनामदार, कासेगाव'));
  const [panNumber, setPanNumber] = useState('IND-PAN-976723');
  const [mobileNo, setMobileNo] = useState('+919767235918');
  const [email, setEmail] = useState('aamjat.inamdar@gmail.com');
  const [address, setAddress] = useState(() => tr('Kasegaon, Taluka Pandharpur, Solapur, Maharashtra', 'कासेगाव, ता. पंढरपूर, जि. सोलापूर, महाराष्ट्र'));
  const [donationType, setDonationType] = useState<'monetary' | 'inkind'>('monetary');
  const [amount, setAmount] = useState<number>(180000);
  const [inKindDetails, setInKindDetails] = useState(() => tr('30kg Jwari, 30kg Gahu, 30kg Tandul, 10kg Cooking Oil, 5kg Soybean', '३० किलो ज्वारी, ३० किलो गहू, ३० किलो तांदूळ, १० किलो खाद्यतेल, ५ किलो सोयाबीन'));
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer / NEFT');
  const [txnRef, setTxnRef] = useState('TXN981723491823');
  const [donationDate, setDonationDate] = useState('2026-10-25');
  const [include80G, setInclude80G] = useState(true);

  const [copied, setCopied] = useState(false);

  const handleCopyReceiptSummary = () => {
    const amountText = donationType === 'monetary' ? `₹${amount.toLocaleString('en-IN')}` : inKindDetails;
    const summary = (language === 'mr'
      ? `
पालवी फाउंडेशन - 80G देणगी पावती
पावती क्र.: ${receiptNo}
दिनांक: ${donationDate}
दात्याचे नाव: ${donorName}
पॅन कार्ड: ${panNumber}
प्राप्त रक्कम: ${amountText}
भरणा पद्धत: ${paymentLabel(paymentMethod)} (${txnRef})

12A नोंदणी: AACTP1234F20214
80G कर सवलत नोंदणी: AACTP1234F80G01 (१००% कर वजावट)

पालवी पंढरपूर येथील अनाथ मुलांना मदत केल्याबद्दल धन्यवाद.
    `
      : `
PALAWI FOUNDATION - 80G DONATION RECEIPT
Receipt No: ${receiptNo}
Date: ${donationDate}
Donor Name: ${donorName}
PAN Card: ${panNumber}
Amount Received: ${amountText}
Payment Method: ${paymentMethod} (${txnRef})

12A Reg: AACTP1234F20214
80G Tax Exemption Reg: AACTP1234F80G01 (100% Tax Deductible)

Thank you for supporting orphaned children at Palawi Pandharpur.
    `).trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अधिकृत ८०G देणगी पावती जनरेटर' : 'Official Statutory 80G Tax Exemption Receipt Studio'}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {tr('Donation Receipt Generator', 'देणगी पावती जनरेटर')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' 
              ? 'दात्यांसाठी कर सवलत ८०G पावती तयार करा व डाऊनलोड किंवा व्हॉट्सॲपवर पाठवा' 
              : 'Generate verified 80G tax exemption donation receipts and send them directly to donors.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Receipt Input Parameters */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>{tr('Donor & Receipt Details', 'दाता व पावती तपशील')}</span>
            <span className="text-[10px] font-bold text-[#039583] bg-[#039583]/10 px-2 py-0.5 rounded">
              {tr('80G Certified', '80G प्रमाणित')}
            </span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Donor Name */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                {tr('Donor Name / Organization', 'दात्याचे / संस्थेचे नाव')}
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder={tr('e.g. Aamjat Inamdar / Bank Of India', 'उदा. आमजत इनामदार / बँक ऑफ इंडिया')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
              />
            </div>

            {/* PAN Card & Mobile */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('PAN Number (for 80G)', 'पॅन क्रमांक (80G साठी)')}
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  placeholder={tr('e.g. ABCDE1234F', 'उदा. ABCDE1234F')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold uppercase focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('Mobile / WhatsApp', 'मोबाईल / व्हॉट्सॲप')}
                </label>
                <input
                  type="text"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                {tr('Donor Address', 'दात्याचा पत्ता')}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={tr('Location / Address...', 'ठिकाण / पत्ता...')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
              />
            </div>

            {/* Donation Type & Amount */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Donation Type', 'देणगीचा प्रकार')}</label>
                <select
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                >
                  <option value="monetary">{tr('Monetary (₹ Cash/Online)', 'आर्थिक (₹ रोख/ऑनलाइन)')}</option>
                  <option value="inkind">{tr('In-Kind (Material/Grains)', 'वस्तू स्वरूपात (साहित्य/धान्य)')}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {donationType === 'monetary' ? tr('Amount (₹)', 'रक्कम (₹)') : tr('Estimated Value (₹)', 'अंदाजे मूल्य (₹)')}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

            {donationType === 'inkind' && (
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Material Details', 'साहित्याचा तपशील')}</label>
                <textarea
                  rows={2}
                  value={inKindDetails}
                  onChange={(e) => setInKindDetails(e.target.value)}
                  placeholder={tr('e.g. 30kg Jwari, 30kg Gahu...', 'उदा. ३० किलो ज्वारी, ३० किलो गहू...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                ></textarea>
              </div>
            )}

            {/* Payment Method & Ref */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Payment Method', 'भरणा पद्धत')}</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                >
                  <option value="Bank Transfer / NEFT">{paymentLabel('Bank Transfer / NEFT')}</option>
                  <option value="UPI / QR Code">{paymentLabel('UPI / QR Code')}</option>
                  <option value="Cheque / Demand Draft">{paymentLabel('Cheque / Demand Draft')}</option>
                  <option value="Cash / Center Drop">{paymentLabel('Cash / Center Drop')}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Txn / Cheque Ref', 'व्यवहार / धनादेश क्रमांक')}</label>
                <input
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

            {/* Date & 80G Checkbox */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Donation Date', 'देणगी दिनांक')}</label>
                <input
                  type="date"
                  value={donationDate}
                  onChange={(e) => setDonationDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-800 font-bold">
                  <input
                    type="checkbox"
                    checked={include80G}
                    onChange={(e) => setInclude80G(e.target.checked)}
                    className="w-4 h-4 text-[#039583] rounded border-slate-300 focus:ring-[#039583]"
                  />
                  <span>{tr('80G Exemption Clause', '80G सवलत कलम')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Sheet: Live Official 80G Receipt Preview */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#039583]" />
              <span>{tr('80G Official Receipt Certificate', '80G अधिकृत पावती प्रमाणपत्र')}</span>
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
                onClick={handleCopyReceiptSummary}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? tr('Copied!', 'कॉपी झाले!') : tr('Copy', 'कॉपी करा')}</span>
              </button>

              {onOpenWhatsAppOutreach && (
                <button
                  onClick={() =>
                    onOpenWhatsAppOutreach(
                      mobileNo,
                      donorName,
                      tr(`Namaste ${donorName}! Thank you for your generous contribution to Palawi NGO. Please find your official 80G Tax Exemption Receipt (No: ${receiptNo}, Amount: ₹${amount.toLocaleString('en-IN')}). Reg: AACTP1234F80G01.`, `नमस्कार ${donorName}! पालवी संस्थेला दिलेल्या उदार देणगीबद्दल मनःपूर्वक धन्यवाद. आपली अधिकृत 80G कर सवलत पावती (क्र.: ${receiptNo}, रक्कम: ₹${amount.toLocaleString('en-IN')}) सोबत पाठवत आहोत. नोंदणी: AACTP1234F80G01.`)
                    )
                  }
                  className="px-3 py-1.5 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{tr('Send via WhatsApp', 'व्हॉट्सॲपने पाठवा')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Printable Official Receipt Sheet */}
          <div className="p-6 bg-slate-50/50 border-2 border-slate-300 rounded-2xl space-y-5 text-xs text-slate-800 leading-relaxed font-sans relative">
            {/* Watermark / Badge */}
            <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
              <Building2 className="w-32 h-32 text-[#023b77]" />
            </div>

            {/* Letterhead Header */}
            <div className="border-b-2 border-[#023b77] pb-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#023b77]">
                  <Building2 className="w-5 h-5 text-[#039583]" />
                  <span className="text-base font-extrabold tracking-tight">{tr('PALAWI FOUNDATION', 'पालवी फाउंडेशन')}</span>
                </div>
                <p className="text-[10px] text-slate-500">{tr('Pandharpur, District Solapur, Maharashtra - 413304', 'पंढरपूर, जिल्हा सोलापूर, महाराष्ट्र - ४१३३०४')}</p>
                <p className="text-[10px] font-mono text-[#039583] font-bold">
                  {tr('12A Reg', '12A नोंदणी')}: AACTP1234F20214 | {tr('80G Tax Reg', '80G कर नोंदणी')}: AACTP1234F80G01
                </p>
              </div>

              <div className="text-right font-mono text-[11px] text-slate-700 space-y-0.5">
                <p className="font-extrabold text-[#023b77] text-xs">{tr('OFFICIAL DONATION RECEIPT', 'अधिकृत देणगी पावती')}</p>
                <p className="font-bold">{receiptNo}</p>
                <p className="text-slate-500">{tr('Date:', 'दिनांक:')} {donationDate}</p>
              </div>
            </div>

            {/* Receipt Main Body */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{tr('Received With Thanks From', 'यांच्याकडून सधन्यवाद प्राप्त')}</span>
                  <span className="font-extrabold text-slate-900 text-sm block">{donorName}</span>
                  <span className="text-slate-600 font-mono text-[11px] block">{address}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{tr('Donor PAN / Tax Registration', 'दात्याचा पॅन / कर नोंदणी')}</span>
                  <span className="font-mono font-extrabold text-slate-900 text-sm bg-slate-100 px-2 py-0.5 rounded inline-block">
                    {panNumber || tr('NOT PROVIDED', 'दिलेला नाही')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{tr('Donation Amount / Material', 'देणगी रक्कम / साहित्य')}</span>
                  {donationType === 'monetary' ? (
                    <span className="font-mono text-xl font-extrabold text-[#023b77]">
                      ₹{amount.toLocaleString('en-IN')}
                    </span>
                  ) : (
                    <span className="font-bold text-slate-800 text-xs">
                      {inKindDetails} ({tr('Est.', 'अंदाजे')} ₹{amount.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>

                <div className="text-right space-y-0.5 font-mono text-[11px]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{tr('Payment Method & Reference', 'भरणा पद्धत व संदर्भ')}</span>
                  <p className="font-bold text-slate-900">{paymentLabel(paymentMethod)}</p>
                  <p className="text-slate-500">{txnRef}</p>
                </div>
              </div>
            </div>

            {/* Legal 80G Declaration Clause */}
            {include80G && (
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1 text-[11px] text-emerald-900">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{tr('Statutory Section 80G Income Tax Deduction Declaration', 'आयकर कलम 80G अंतर्गत कर वजावट घोषणापत्र')}</span>
                </p>
                <p className="text-[10.5px] leading-relaxed text-emerald-800">
                  {tr('Certified that donations made to Palawi NGO qualify for 100% / 50% tax deduction under Section 80G of the Income Tax Act, 1961 (Registration No:', 'प्रमाणित करण्यात येते की पालवी संस्थेला दिलेल्या देणग्या आयकर अधिनियम, १९६१ च्या कलम 80G अंतर्गत १००% / ५०% कर वजावटीस पात्र आहेत (नोंदणी क्र.:')} <strong>AACTP1234F80G01</strong>). {tr('No goods or services were provided in exchange for this contribution.', 'या देणगीच्या मोबदल्यात कोणतीही वस्तू किंवा सेवा देण्यात आलेली नाही.')}
                </p>
              </div>
            )}

            {/* Signatory Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">{tr('Palawi Center Office', 'पालवी केंद्र कार्यालय')}</p>
                <p className="text-slate-500">{tr('Pandharpur, Maharashtra', 'पंढरपूर, महाराष्ट्र')}</p>
              </div>

              <div className="text-right space-y-1">
                <div className="font-bold text-[#023b77]">{tr('Authorized Signatory', 'अधिकृत स्वाक्षरीकर्ता')}</div>
                <div className="text-[10px] text-slate-400 font-mono">{tr('Palawi Foundation Trust', 'पालवी फाउंडेशन ट्रस्ट')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
