// Official details of Prabha Hira Pratishthan (Palawi Project), used on receipts,
// proposals, letters and certificates. Taken from the organisation's own documents.
export const ORG = {
  name: 'Palawi Project Prabha-Hira Pratishthan',
  trustName: 'Prabha Hira Pratishthan',
  tagline: 'Rehabilitation project for HIV/AIDS Affected orphan children',
  regNo: 'E772/Solapur',
  address:
    'Project - "PALAWI", Behind HP Balaji Gas Godown, near Kolhapur bypass, Pandharpur, Dist- Solapur-413304, Maharashtra, India',
  registeredOffice: 'Palawi Project, Plot no 33, Behind HP Balaji Gas godown, Korti Road, Pandharpur 413304',
  phone: '9673664455',
  email: 'info@palawi.org',
  website: 'www.palawi.org',
  pan: 'AABTP0199C',
  reg80G: 'AABTP0199C25PN02',
  csrReg: 'CSR00016577',
  president: 'Mangal Shah',
  secretary: 'Dimple Ghadge',
  poc: { name: 'Tejas Ghadge', phone: '9673069949' },
  bank: {
    name: 'IDBI BANK',
    account: '54010010004843 (Current)',
    ifsc: 'IBKL0000540',
    branch: 'Pandharpur',
  },
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const parseIsoDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d };
};

export const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/** "October 17, 2026" */
export const formatLongDate = (iso: string) => {
  if (!iso) return '';
  const { y, m, d } = parseIsoDate(iso);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

/** "17/10/2026" */
export const formatShortDate = (iso: string) => {
  if (!iso) return '';
  const { y, m, d } = parseIsoDate(iso);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
};

/** Indian financial year label, e.g. 2026-10-17 -> "26-27" */
export const financialYear = (iso: string) => {
  const { y, m } = parseIsoDate(iso || todayIso());
  const start = m >= 4 ? y : y - 1;
  return `${String(start % 100).padStart(2, '0')}-${String((start + 1) % 100).padStart(2, '0')}`;
};

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const belowHundred = (n: number) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ' ' + ONES[n % 10] : ''}`);

const belowThousand = (n: number) => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return [h ? `${ONES[h]} Hundred` : '', r ? belowHundred(r) : ''].filter(Boolean).join(' ');
};

/** Indian numbering system: 37500 -> "Thirty Seven Thousand Five Hundred" */
export const amountInWords = (value: number): string => {
  const n = Math.floor(Math.abs(value || 0));
  if (n === 0) return 'Zero';
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  return [
    crore ? `${crore >= 100 ? amountInWords(crore) : belowHundred(crore)} Crore` : '',
    lakh ? `${belowHundred(lakh)} Lakh` : '',
    thousand ? `${belowHundred(thousand)} Thousand` : '',
    rest ? belowThousand(rest) : '',
  ]
    .filter(Boolean)
    .join(' ');
};

/** 1925000 -> "19,25,000/-" */
export const rupees = (value: number) => `${Math.round(value || 0).toLocaleString('en-IN')}/-`;

/**
 * Print only the element with class "print-area" currently on screen, using
 * `fileName` as the document title (browsers use it as the default PDF name).
 */
export const printDocument = (fileName: string) => {
  const previousTitle = document.title;
  document.title = fileName;
  const restore = () => {
    document.title = previousTitle;
    window.removeEventListener('afterprint', restore);
  };
  window.addEventListener('afterprint', restore);
  window.print();
};
