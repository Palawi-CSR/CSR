import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ORG, amountInWords, financialYear, formatLongDate, formatShortDate, printDocument } from '../data/orgProfile';
import { OrgLetterhead } from '../components/OrgLetterhead';
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

const receiptMode = (method: string) =>
  ({
    'Bank Transfer / NEFT': 'NEFT/RTGS',
    'UPI / QR Code': 'UPI',
    'Cheque / Demand Draft': 'Cheque/DD',
    'Cash / Center Drop': 'Cash',
  } as Record<string, string>)[method] ?? method;

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
  const [receiptNo, setReceiptNo] = useState('776');
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
  const [receiptDate, setReceiptDate] = useState('2026-10-25');
  const [remark, setRemark] = useState('Nutrition Support for HIV Kids');

  const [copied, setCopied] = useState(false);

  const receiptFileName = `Receipt PHP ${financialYear(receiptDate)}-${receiptNo}`;

  const handlePrintReceipt = () => printDocument(receiptFileName);

  const handleCopyReceiptSummary = () => {
    const amountText = donationType === 'monetary' ? `₹${amount.toLocaleString('en-IN')}` : inKindDetails;
    const summary = (language === 'mr'
      ? `
${ORG.name} - देणगी पावती
पावती क्र.: ${receiptNo}
दिनांक: ${formatLongDate(receiptDate)}
दात्याचे नाव: ${donorName}
पॅन कार्ड: ${panNumber}
प्राप्त रक्कम: ${amountText}
भरणा पद्धत: ${paymentLabel(paymentMethod)} (${txnRef})

संस्था पॅन: ${ORG.pan}
80G नोंदणी क्र.: ${ORG.reg80G}

पालवी पंढरपूर येथील अनाथ मुलांना मदत केल्याबद्दल धन्यवाद.
    `
      : `
${ORG.name} - Donation Receipt
Receipt No: ${receiptNo}
Date: ${formatLongDate(receiptDate)}
Donor Name: ${donorName}
PAN: ${panNumber}
Amount Received: ${amountText} (Rupees ${amountInWords(amount)})
Mode: ${receiptMode(paymentMethod)} (${txnRef})

Trust PAN: ${ORG.pan}
80G No: ${ORG.reg80G}

Thank you very much for your generous contribution.
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
            {/* Receipt No & Receipt Date */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Receipt No.', 'पावती क्र.')}</label>
                <input
                  type="text"
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Receipt Date', 'पावती दिनांक')}</label>
                <input
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

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

            {/* Remark */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">{tr('Remark (purpose)', 'शेरा (उद्देश)')}</label>
              <input
                type="text"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder={tr('e.g. Nutrition Support for HIV Kids Oct-26', 'उदा. HIV बाधित मुलांसाठी पोषण मदत')}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
              />
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
                onClick={handlePrintReceipt}
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
                      tr(`Namaste ${donorName}! Thank you for your generous contribution to Palawi NGO. Please find your official 80G Tax Exemption Receipt (No: ${receiptNo}, Amount: ₹${amount.toLocaleString('en-IN')}). 80G No: ${ORG.reg80G}.`, `नमस्कार ${donorName}! पालवी संस्थेला दिलेल्या उदार देणगीबद्दल मनःपूर्वक धन्यवाद. आपली अधिकृत 80G कर सवलत पावती (क्र.: ${receiptNo}, रक्कम: ₹${amount.toLocaleString('en-IN')}) सोबत पाठवत आहोत. 80G क्र.: ${ORG.reg80G}.`)
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

          {/* Printable Official Receipt Sheet (matches Prabha-Hira Pratishthan format) */}
          <div className="overflow-x-auto">
            <div id="palawi-receipt" className="receipt-sheet print-area">
              <div className="receipt-top">
                <div>
                  <div>Receipt No.: {receiptNo}</div>
                  <div>Reg No.: {ORG.regNo}</div>
                </div>
                <div>Date: {formatLongDate(receiptDate)}</div>
              </div>

              <OrgLetterhead />

              <div className="receipt-fields">
                <p>
                  <b>Donor's Name </b>
                  <span className="receipt-fill">{donorName}</span>
                </p>
                <p>
                  <b>Address : </b>
                  <span className="receipt-fill">{address}</span>
                </p>
                <p>
                  <b>Amount : </b>
                  <span className="receipt-fill">{amount.toLocaleString('en-IN')}/-</span>
                </p>
                <p>
                  the sum of Rupees{' '}
                  <span className="receipt-fill font-bold">{amountInWords(amount)}</span>
                </p>
                {donationType === 'inkind' && (
                  <p>
                    <b>Material : </b>
                    <span className="receipt-fill">{inKindDetails}</span>
                  </p>
                )}
                <p>
                  <b>Mode : </b>
                  <span className="receipt-fill">{donationType === 'inkind' ? 'In-Kind' : receiptMode(paymentMethod)}</span>
                </p>
                <p>
                  <b>Dated : </b>
                  <span className="receipt-fill">{formatShortDate(donationDate)}</span>
                  {txnRef && (
                    <>
                      {' '}
                      <b>Ref No.: </b>
                      <span className="receipt-fill">{txnRef}</span>
                    </>
                  )}
                </p>
                <p>
                  <b>Donor PAN : </b>
                  <span className="receipt-fill">{panNumber.toUpperCase() || 'N/A'}</span>
                </p>
                {remark && (
                  <p>
                    <b>Remark : </b>
                    <span className="receipt-fill">{remark}</span>
                  </p>
                )}
              </div>

              <div className="receipt-signatures">
                <div className="receipt-for">For Prabha Hira Pratishthan</div>
                <div className="receipt-sign-row">
                  <div className="receipt-sign">
                    <div className="receipt-sign-line" />
                    <div>President</div>
                    <div>{ORG.president}</div>
                  </div>
                  <div className="receipt-sign">
                    <div className="receipt-sign-line" />
                    <div>Secretary</div>
                    <div>{ORG.secretary}</div>
                  </div>
                </div>
              </div>

              <div className="receipt-footer">
                <p>Prabha Hira Pratishthan Pan number: {ORG.pan}.</p>
                {include80G && <p>Your donations are tax-exempt under Section 80G of Income Tax Act 1961.</p>}
                {include80G && (
                  <p className="mt-3">Donation is Exempted U/s 80G IT Act 1961. Vide Ref No. 80G No: {ORG.reg80G}</p>
                )}
                <p className={include80G ? 'font-bold' : 'font-bold mt-3'}>Thank you very much for your generous contribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
