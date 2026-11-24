import React, { useState } from 'react';
import { Plus, Printer, Trash2, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ORG, amountInWords, formatLongDate, formatShortDate, printDocument, rupees, todayIso } from '../data/orgProfile';
import { OrgLetterhead, OrgSignatures } from './OrgLetterhead';

/**
 * Official proposal & letter formats used by Prabha Hira Pratishthan (Palawi Project).
 * Each format reproduces the structure and standard wording of the organisation's
 * own documents (CSR covering letters, proposals, utilisation certificates, etc.).
 */

type FormatId =
  | 'covering'
  | 'fullProposal'
  | 'projectDetails'
  | 'itemRequest'
  | 'requirements'
  | 'utilisation'
  | 'thankYou'
  | 'declaration';

type Field = 'outwardNo' | 'recipient' | 'address' | 'subject' | 'projectTitle' | 'items' | 'points' | 'body' | 'amount' | 'heading';

interface LineItem {
  particulars: string;
  details: string;
  qty: string;
  amount: string;
}

interface FormatDef {
  id: FormatId;
  en: string;
  mr: string;
  hint: { en: string; mr: string };
  fields: Field[];
  /** Column labels for the line-item editor. */
  itemLabels?: { particulars: string; details?: string; qty?: string; amount?: string };
  defaults: {
    subject?: string;
    projectTitle?: string;
    heading?: string;
    body?: string;
    points?: string;
    amount?: number;
    items?: LineItem[];
  };
}

const item = (particulars: string, qty = '', amount = '', details = ''): LineItem => ({ particulars, details, qty, amount });

const FORMATS: FormatDef[] = [
  {
    id: 'covering',
    en: 'CSR Covering / Appeal Letter',
    mr: 'सीएसआर विनंती / आवाहन पत्र',
    hint: {
      en: 'Covering letter to a company Board & CSR team requesting funds for specific programmes.',
      mr: 'विशिष्ट उपक्रमांसाठी निधीची विनंती करणारे कंपनीच्या संचालक मंडळ व सीएसआर टीमला पत्र.',
    },
    fields: ['recipient', 'subject', 'items', 'body'],
    itemLabels: { particulars: 'Programme', details: 'What the support covers', amount: 'Amount (₹)' },
    defaults: {
      subject: 'Request for CSR Support for Food Grain, Nutrition Support & School Digitization at Palawi Project.',
      body: '',
      items: [
        item(
          'Poshan Saathi Programme (Food Grain and Nutrition Supplements Support)',
          '',
          '1275000',
          'This support will help provide daily food grains, pulses, protein-rich nutrition, breakfast, snacks and special diet support for HIV positive children and vulnerable residents. Proper nutrition is essential for children on regular medication and directly supports their immunity, health, school attendance and emotional wellbeing.'
        ),
        item(
          'Digital Classroom Initiative',
          '',
          '650000',
          'We request support for 3 digital classroom boards for Palawi Dnyanmandir School, our self-reliant, non-granted school. These digital boards will help bridge the rural digital education gap and provide our children with better visual, interactive and confidence-building learning opportunities in subjects like science, mathematics, languages and general knowledge.'
        ),
      ],
    },
  },
  {
    id: 'fullProposal',
    en: 'Full CSR Proposal',
    mr: 'संपूर्ण सीएसआर प्रस्ताव',
    hint: {
      en: 'Complete proposal: About Palawi, vision, projects, support table, compliance and bank details.',
      mr: 'संपूर्ण प्रस्ताव: पालवीविषयी, ध्येय, प्रकल्प, सहाय्य तक्ता, अनुपालन व बँक तपशील.',
    },
    fields: ['outwardNo', 'recipient', 'address', 'projectTitle'],
    defaults: { projectTitle: 'Holistic Care & Empowerment for HIV+ Children & Women' },
  },
  {
    id: 'projectDetails',
    en: 'Project Details (Organisation Profile)',
    mr: 'प्रकल्प तपशील (संस्था परिचय)',
    hint: {
      en: 'Introduction, heads of organisation, focus areas, all 9 projects and awards.',
      mr: 'परिचय, संस्थेचे प्रमुख, कार्यक्षेत्रे, सर्व ९ प्रकल्प व पुरस्कार.',
    },
    fields: ['recipient'],
    defaults: {},
  },
  {
    id: 'itemRequest',
    en: 'In-Kind / Item Request Letter',
    mr: 'वस्तू स्वरूपात मदतीची विनंती',
    hint: {
      en: 'Request for specific items (digital boards, cupboards, van…) with a requirement table and expected impact.',
      mr: 'विशिष्ट वस्तूंसाठी विनंती (डिजिटल बोर्ड, कपाटे, वाहन…) — गरजेचा तक्ता व अपेक्षित परिणाम.',
    },
    fields: ['outwardNo', 'recipient', 'subject', 'body', 'items', 'points'],
    itemLabels: { particulars: 'Particulars', qty: 'Quantity' },
    defaults: {
      subject: 'Request for in-kind donation of four Teachmint Digital Classroom Boards',
      body:
        'Palawi Dnyan Mandir School provides inclusive education from pre-primary to Class 10 to approximately 150 children, including Palawi residents and students from economically disadvantaged families. To strengthen classroom teaching and provide equal access to modern learning resources, we respectfully request {company} to support the school through an in-kind donation of four digital classroom boards.',
      items: [
        item('Teachmint Digital Classroom Board 75" with standard software, accessories and classroom installation', '4 Units'),
        item('Teacher orientation, warranty and technical support', 'As applicable'),
      ],
      points: [
        'Enable interactive teaching through videos, diagrams, presentations, digital textbooks and educational applications.',
        "Improve students' conceptual understanding, participation and interest, particularly in Science, Mathematics, Languages and Social Studies.",
        'Develop digital literacy among approximately 150 students each year and strengthen teachers\' classroom delivery.',
        'Reduce the digital learning gap for children from vulnerable and economically disadvantaged backgrounds.',
      ].join('\n'),
    },
  },
  {
    id: 'requirements',
    en: 'Requirements List',
    mr: 'गरजांची यादी',
    hint: {
      en: 'Table of required items with quantity and tentative price (capital or monthly list).',
      mr: 'आवश्यक वस्तूंचा तक्ता — नग व अंदाजे किंमत (भांडवली किंवा मासिक यादी).',
    },
    fields: ['recipient', 'heading', 'items'],
    itemLabels: { particulars: 'Name', qty: 'Quantity', amount: 'Tentative Price' },
    defaults: {
      heading: 'REQUIREMENTS LIST',
      items: [
        item('Water purifier 60 liters', '2', '52,000/- each'),
        item('Bicycle (8 to 12 years, after 12)', '30', '1,15,000/-'),
        item('Water bottle 1 liter (Milton)', '100', '36,900/-'),
        item('Iron cupboard with compartments 6 feet, 4 feet', '5', '1,50,000/-'),
        item('Iron cupboard with glass locker for storing books 6 feet, 4 feet', '5', '1,50,000/-'),
        item('Science toys (age groups 6 to 10, 12 to 15, 15 to 18)', '100', 'Tentative 1,00,000/-'),
        item('Printer (Canon G 670)', '2', '15,000/- each'),
        item('School seating Bench', '50', '2,77,250/-'),
        item('White board', '5', '10,000/- each'),
        item('Digital classroom board (55" to 65") 8 / 128 GB', '4', '85,000/- each'),
        item('Laptop 8 GB RAM 1TB', '2', '65,000/- each'),
        item('Projector + Screen', '1', '55,000/-'),
        item('Force Motors Kruzer B 6 model', '1', '17,80,000/-'),
      ],
    },
  },
  {
    id: 'utilisation',
    en: 'CSR Funds Utilisation Certificate',
    mr: 'सीएसआर निधी वापर प्रमाणपत्र',
    hint: {
      en: 'Statutory certificate confirming utilisation of CSR funds (Companies Act 2013, Sec. 135).',
      mr: 'सीएसआर निधीच्या वापराची खात्री देणारे वैधानिक प्रमाणपत्र (कंपनी कायदा २०१३, कलम १३५).',
    },
    fields: ['recipient', 'address', 'amount', 'items'],
    itemLabels: { particulars: 'Other contributor', amount: 'Amount (₹)' },
    defaults: { amount: 137280, items: [] },
  },
  {
    id: 'thankYou',
    en: 'Thank-You Letter',
    mr: 'आभार पत्र',
    hint: {
      en: 'Thank-you letter to a donor company for a specific donation.',
      mr: 'विशिष्ट देणगीबद्दल दाता कंपनीला आभार पत्र.',
    },
    fields: ['recipient', 'address', 'subject', 'body'],
    defaults: {
      subject: 'Thank you letter for the Donation of Laptops for Palawi Dnyanmandir School for 150 HIV+ Positive Children.',
      body:
        'We would like to extend our warm thank you for your support in the form of 2 laptops. These devices will enable our students to access e-learning materials, enhance their computer literacy, and prepare them for the professional world.',
    },
  },
  {
    id: 'declaration',
    en: 'Non-Political Declaration',
    mr: 'अराजकीय असल्याचे घोषणापत्र',
    hint: {
      en: 'Declaration that the trust does not take part in political activities.',
      mr: 'संस्था कोणत्याही राजकीय उपक्रमात सहभागी नसल्याचे घोषणापत्र.',
    },
    fields: [],
    defaults: {},
  },
];

const parseAmount = (s: string) => Number(String(s).replace(/[^0-9.]/g, '')) || 0;

const fillCompany = (text: string, company: string) => text.split('{company}').join(company || 'your organisation');

export const ProposalFormats: React.FC = () => {
  const { tr, language } = useLanguage();

  const [formatId, setFormatId] = useState<FormatId>('covering');
  const fmt = FORMATS.find((f) => f.id === formatId)!;

  // Shared across formats (recipient details stay when switching format).
  const [outwardNo, setOutwardNo] = useState('78/26');
  const [date, setDate] = useState(todayIso());
  const [company, setCompany] = useState('Jaquar & Company Pvt. Ltd.');
  const [contactName, setContactName] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('Pandharpur');

  // Format-specific content (reset to the format's sample text when switching).
  const [subject, setSubject] = useState(fmt.defaults.subject ?? '');
  const [projectTitle, setProjectTitle] = useState(fmt.defaults.projectTitle ?? '');
  const [heading, setHeading] = useState(fmt.defaults.heading ?? '');
  const [body, setBody] = useState(fmt.defaults.body ?? '');
  const [points, setPoints] = useState(fmt.defaults.points ?? '');
  const [amount, setAmount] = useState<number>(fmt.defaults.amount ?? 0);
  const [items, setItems] = useState<LineItem[]>(fmt.defaults.items ?? []);
  const [copied, setCopied] = useState(false);

  const selectFormat = (id: FormatId) => {
    const next = FORMATS.find((f) => f.id === id)!;
    setFormatId(id);
    setSubject(next.defaults.subject ?? '');
    setProjectTitle(next.defaults.projectTitle ?? '');
    setHeading(next.defaults.heading ?? '');
    setBody(next.defaults.body ?? '');
    setPoints(next.defaults.points ?? '');
    setAmount(next.defaults.amount ?? 0);
    setItems(next.defaults.items ?? []);
  };

  const updateItem = (idx: number, patch: Partial<LineItem>) =>
    setItems((list) => list.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const has = (f: Field) => fmt.fields.includes(f);
  const pointList = points.split('\n').map((p) => p.trim()).filter(Boolean);
  const itemsTotal = items.reduce((sum, it) => sum + parseAmount(it.amount), 0);
  const companyShort = company || 'your organisation';

  const fileName = `${fmt.en} - ${company || ORG.trustName} ${formatShortDate(date).split('/').join('-')}`;

  const handleCopy = () => {
    const el = document.getElementById('palawi-format-doc');
    if (!el) return;
    navigator.clipboard.writeText(el.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const inputCls =
    'w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]';
  const labelCls = 'block text-slate-700 font-bold mb-1';

  /* ----------------------------- Recipient block ----------------------------- */
  const ToBlock = ({ boardTeam }: { boardTeam?: boolean }) => (
    <div className="mb-3">
      <div>To,</div>
      {contactName && <div>{contactName}</div>}
      {boardTeam && !contactName && <div>Hon. Esteemed Board Member's &amp; CSR Team,</div>}
      {company && <div className="font-bold">{company}</div>}
      {address &&
        address.split('\n').map((line, i) => (
          <div key={i}>{line}</div>
        ))}
    </div>
  );

  /* ------------------------------- Documents -------------------------------- */
  const renderDocument = () => {
    switch (formatId) {
      case 'covering':
        return (
          <>
            <div className="letter-meta">
              <span />
              <span>Date: {formatLongDate(date)}</span>
            </div>
            <ToBlock boardTeam />
            <p>
              <b>Subject: {subject}</b>
            </p>
            <p>Respected Members of the Board,</p>
            <p>
              Warm greetings from Prabha Hira Pratishthan – Palawi Project, located at Pandharpur, District Solapur,
              Maharashtra.
            </p>
            <p>
              We respectfully submit this request for CSR support towards the care, nutrition and education of HIV
              positive orphan children, vulnerable children, young adults and women living at Palawi. For the last 25
              years, Palawi has been working for one of the most marginalised communities in rural Maharashtra: children
              and women affected by HIV/AIDS, orphanhood, abandonment, poverty &amp; social stigma.
            </p>
            <p>
              Today, Palawi supports 150+ children, young adults and women, many of whom have faced rejection and
              discrimination only because of their health status or life circumstances.
            </p>
            {body && <p>{fillCompany(body, companyShort)}</p>}
            <p>
              Through this proposal, we humbly request {companyShort}'s CSR support for the following{' '}
              {items.length === 1 ? 'area' : `${items.length} urgent and meaningful areas`}:
            </p>
            <ol>
              {items.map((it, i) => (
                <li key={i} className="mb-2">
                  <b>
                    {it.particulars}
                    {parseAmount(it.amount) > 0 && ` – ₹${rupees(parseAmount(it.amount))}`}
                  </b>
                  {it.details && <div className="text-justify">{fillCompany(it.details, companyShort)}</div>}
                </li>
              ))}
            </ol>
            <p>
              <b>
                Total CSR Funds Requested: ₹{rupees(itemsTotal)} (Rupees {amountInWords(itemsTotal)} Only)
              </b>
            </p>
            <p>
              This CSR support will align with key development areas such as nutrition, health care, quality education,
              support for vulnerable children and women, reduced inequalities and rural development. It will also
              contribute to SDGs including SDG 2 – Zero Hunger, SDG 3 – Good Health and Well-being, SDG 4 – Quality
              Education, SDG 5 – Gender Equality and SDG 10 – Reduced Inequalities.
            </p>
            <p>
              We assure the {companyShort} Board &amp; CSR Team of complete transparency through project-wise budget,
              bills, photographs, utilisation certificate, impact report and periodic updates. We would also be honoured to
              welcome the {companyShort} team to visit Palawi &amp; witness the work personally.
            </p>
            <p>
              We sincerely request {companyShort} to consider this partnership as an opportunity to bring dignity,
              nutrition, education and hope to children and women who are among the most excluded sections of society.
            </p>
            <p>With warm regards,</p>
            <OrgSignatures />
          </>
        );

      case 'fullProposal':
        return (
          <>
            <div className="letter-meta">
              <span>Out.No. {outwardNo}</span>
              <span>Date: {formatShortDate(date)}</span>
            </div>
            <h1>CSR Proposal by Prabha Hira Pratishthan</h1>
            <ToBlock />
            <p>
              <b>Submitted by:</b> Prabha Hira Pratishthan (Palawi Project), Pandharpur
              <br />
              <b>Project Title:</b> {projectTitle}
            </p>

            <h2>1. About Palawi</h2>
            <p>
              Palawi under Prabha Hira Pratishthan was founded in 2001 by Mangal Shah (Founder President) and her daughter
              Dimple Ghadge (Founder Secretary). In the last 25 years we continue to meet the urgency of the challenges
              faced by vulnerable and marginalized CLWHA/PLWHA (children and people living with HIV/AIDS). The Palawi
              mission is focused on providing solutions and system-change for people living with HIV/AIDS, with a
              holistic approach towards ensuring a better life for HIV positive orphan children, women, and the HIV
              positive population in general.
            </p>
            <p>
              Today, Palawi is home to over 150+ HIV+ orphan children and young adults (ages 1 to 26), providing them with
              shelter, nutrition, medical care, education, and emotional support. Through the Care Home, 6000+ children
              have received shelter, nutrition, healthcare, and education. Our HIV/AIDS awareness initiative has educated
              15,00,000 students, youth and people, while 38,000 underprivileged children have gained knowledge and skills
              for a brighter future.
            </p>
            <p>
              <i>
                "Since inception, Palawi Project, Prabha Hira Pratishthan has zero mortality — one of the only few
                organisations to achieve this milestone."
              </i>{' '}
              Palawi Project runs purely on donations and CSR support.
            </p>

            <h2>2. Vision &amp; Mission</h2>
            <ul>
              <li>
                <b>Vision:</b> A just, stigma-free society where HIV+ individuals live with dignity.
              </li>
              <li>
                <b>Mission:</b> Provide lifelong support and systemic change for HIV+ children and women through
                residential care, health, education, and vocational empowerment.
              </li>
            </ul>

            <h2>3. CSR Collaboration Objective</h2>
            <p>
              We seek a CSR partnership with {companyShort} to sustain and expand the Palawi programmes, with daily running
              costs supported through corporate social responsibility. This proposal outlines the areas where your support
              can directly impact lives.
            </p>

            <h2>4. Key Projects Needing Support</h2>
            <ul>
              <li><b>Residential Care:</b> Shelter for 150+ HIV-positive orphan children, young adults, and women (ages 1 to 26).</li>
              <li><b>Education:</b> Running a self-reliant school (since 2013) with 117+ students, without government aid.</li>
              <li><b>Medical Assistance:</b> Essential healthcare, ART treatment, and counselling through Palawi Sanjeevani, a 7-bed medical care unit.</li>
              <li><b>Nutrition &amp; Hygiene:</b> Daily nutritious meals, sanitation, and personal hygiene support.</li>
              <li><b>Skill Development:</b> Training in tailoring, farming, and handicrafts for economic self-reliance.</li>
              <li><b>Awareness &amp; Advocacy:</b> HIV/AIDS awareness campaigns and community outreach programmes.</li>
            </ul>
            <p>
              <b>How You Can Support</b>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Daily Beneficiaries</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1. Palawi Sangopan (Child Care)</td><td>Complete residential care for HIV+ orphans</td><td>150</td></tr>
                <tr><td>2. Shree Naivaidyam Seva</td><td>Daily meals at ART Centre for poor patients</td><td>200 patients</td></tr>
                <tr><td>3. Palawi Dnyanmandir (School)</td><td>School for HIV+ children (Std 1-10)</td><td>117 students</td></tr>
                <tr><td>4. Palawi Sanjeevani Medical Unit</td><td>7-bed medical care + counselling</td><td>25-30 patients</td></tr>
                <tr><td>5. Palawi Apna Ghar</td><td>Residential support for destitute women, senior citizens</td><td>50+</td></tr>
                <tr><td>6. Palawi Creations (Vocational &amp; Skill Training)</td><td>Art, quilts, tailoring, crafts, computers</td><td>50 youths</td></tr>
              </tbody>
            </table>
            <p>
              <b>Total Daily Operational Cost: ₹36,875/-</b> &nbsp;|&nbsp; <b>Monthly Estimate (30 Days): ₹11,06,250/-</b>
            </p>

            <h2>5. CSR Impact Possibilities</h2>
            <ul>
              <li>Sponsor daily meals (₹7,000/day)</li>
              <li>Adopt a child or woman (₹3,000/month/beneficiary)</li>
              <li>Fund the school or medical unit monthly</li>
              <li>Set up solar systems, ambulances, or digital labs</li>
              <li>Engage employees in volunteering or fundraising campaigns</li>
            </ul>

            <h2>6. Past CSR Collaborations</h2>
            <p>
              Companies like Seagate, IDBI, Burns and McDonnell have previously supported us through an eco ambulance
              donation, a solar water heating system, and food &amp; educational support. We welcome an MoU, reporting
              cycle, and site visits to ensure transparency.
            </p>

            <h2>7. Legal Status &amp; Compliance</h2>
            <ul>
              <li>Registered Public Trust since 2001 (Reg. No. {ORG.regNo})</li>
              <li>12A &amp; 80G certified (80G No: {ORG.reg80G})</li>
              <li>CSR Form 1 registration completed ({ORG.csrReg})</li>
              <li>PAN: {ORG.pan}</li>
              <li>Annual audit &amp; CSR utilisation report available</li>
            </ul>

            <h2>8. Bank &amp; Contact Details</h2>
            <table>
              <tbody>
                <tr><td>Name</td><td>{ORG.trustName}</td></tr>
                <tr><td>Bank</td><td>{ORG.bank.name}</td></tr>
                <tr><td>Account No.</td><td>{ORG.bank.account}</td></tr>
                <tr><td>IFSC</td><td>{ORG.bank.ifsc}</td></tr>
                <tr><td>Branch</td><td>{ORG.bank.branch}</td></tr>
                <tr><td>Contact</td><td>{ORG.poc.name} ({ORG.poc.phone}), {ORG.secretary} ({ORG.phone})</td></tr>
                <tr><td>Email</td><td>{ORG.email}</td></tr>
              </tbody>
            </table>

            <h2>9. Attachments</h2>
            <ul>
              <li>Budget Breakdown</li>
              <li>Photos &amp; Media Coverage</li>
              <li>80G, 12A, Trust Registration Certificate Copy</li>
            </ul>
            <OrgSignatures />
          </>
        );

      case 'projectDetails':
        return (
          <>
            <div className="letter-meta">
              <span />
              <span>Date: {formatLongDate(date)}</span>
            </div>
            <ToBlock boardTeam />
            <p>
              <b>INTRODUCTION: Details about Palawi project for 150 HIV+ Orphan Children &amp; Women</b>
            </p>
            <p>
              The project Palawi under Prabha Hira Pratishthan (Reg. No: {ORG.regNo}) was founded in 2001. In the last 25
              years we continue to meet the urgency of the challenges faced by vulnerable and marginalized CLWHA/PLWHA
              (children and people living with HIV/AIDS). The Palawi mission is focused on providing solutions and
              system-change for people living with HIV/AIDS.
            </p>
            <p>
              <b>Details of the head of the organisation:</b> 1. Mangal Shah (Founder President) &nbsp; 2. Dimple Ghadge
              (Founder Secretary)
            </p>
            <p>
              Providing a holistic approach towards ensuring a better life of HIV positive orphan children, women, and HIV
              positive population in general: residential care-home for HIV positive orphan children, food &amp; nutrition,
              education, medical assistance, hygiene &amp; sanitation, skill development and vocational training, and
              awareness campaigns.
            </p>
            <h2>Program Objective</h2>
            <p>
              The Palawi Care Home is the direct service for 150 children and young adults living with HIV/AIDS. The care
              home furnishes daily nutrition, educational needs, school, medical requirements, psychological assistance,
              counselling, recreational needs, vocational training and employment.
            </p>
            <h2>Key Focus Areas</h2>
            <ul>
              <li><b>Residential Care:</b> Shelter for 150+ HIV-positive orphan children, young adults, and women (ages 0 to 26).</li>
              <li><b>Education:</b> Running a self-reliant school (since 2013) with 117+ students, without government aid.</li>
              <li><b>Medical Assistance:</b> Essential healthcare, ART treatment, and counselling through Palawi Sanjeevani, a 7-bed medical care unit.</li>
              <li><b>Nutrition &amp; Hygiene:</b> Daily nutritious meals, sanitation, and personal hygiene support.</li>
              <li><b>Skill Development:</b> Training in tailoring, farming, and handicrafts for economic self-reliance.</li>
              <li><b>Awareness &amp; Advocacy:</b> HIV/AIDS awareness campaigns and community outreach programmes.</li>
            </ul>
            <h2>Projects</h2>
            <ol>
              <li><b>Palawi Sangopan Project</b> – Core project offering housing, food, medical aid, and education to 150+ HIV positive orphan children and women.</li>
              <li><b>Palawi Dnyanmandir School</b> – Self-sustained non-granted school providing formal education (Class 1 to 10) to HIV positive and financially weaker students. No government funding; runs entirely on donations.</li>
              <li><b>Palawi Sanjeevani – 7-bed Medical Care Unit</b> – Visiting medical officer, nurse, and counsellor; supports ART treatment, psychological well-being, and emergency care.</li>
              <li><b>Palawi Shree Naivaidyam Seva &amp; Community Kitchen</b> – Daily meals to residents and destitute individuals in Pandharpur, including at hospitals and railway stations.</li>
              <li><b>Palawi Parisparsh Project</b> – Supports 32+ underprivileged children from slum and rag-picking communities with education and vocational training.</li>
              <li><b>Palawi Apna Ghar</b> – Home for destitute women, rape survivors, domestic violence survivors and senior citizens; 200+ rehabilitated, 50+ currently residing.</li>
              <li><b>Hirkani Project – Women's Empowerment &amp; Shelter</b> – Rehabilitation into the family, counselling, psychiatric help, vocational training and employment support.</li>
              <li><b>Palawi Goshala – Dairy Farming for Nutrition</b> – 10+ cows providing fresh milk for children and residents.</li>
              <li><b>Palawi Creations</b> – Income generation through handicrafts, tailoring and organic farming; 70+ handmade products.</li>
            </ol>
            <h2>Impact &amp; Achievements</h2>
            <ul>
              <li>Only NGO in Maharashtra working with 3 generations together with a holistic approach to HIV positive orphan care.</li>
              <li>Rescued and rehabilitated 1000+ HIV positive orphans, abandoned children, and women.</li>
              <li>Facilitated education for 150+ children, ensuring zero dropouts.</li>
              <li>Loksatta Durga Award to Mangal Shah; Shining World Compassion Award by Supreme Master Ching Hai, Taiwan (2021).</li>
              <li>IBN Lokmat Mukta Sanman 2025; London Book of Records; nomination for the Amazing Indians Award.</li>
              <li>Punyashlok Ahilyadevi Holkar Solapur University Lifetime Achievement Award.</li>
            </ul>
            <OrgSignatures />
          </>
        );

      case 'itemRequest':
        return (
          <>
            <div className="letter-meta">
              <span>Outward No: {outwardNo}</span>
              <span>Date: {formatShortDate(date)}</span>
            </div>
            <ToBlock />
            <p>
              <b>Subject: {subject}</b>
            </p>
            <p>Respected Sir/Madam,</p>
            <p>
              Greetings from Prabha Hira Pratishthan's Palawi Project, Pandharpur. Since 2001, Palawi has been providing
              residential care, education, healthcare, nutrition, counselling and rehabilitation support to children and
              women living with HIV and those facing abandonment or difficult social circumstances.
            </p>
            {body && <p>{fillCompany(body, companyShort)}</p>}
            <p>
              <b>Proposed Requirement</b>
            </p>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>Sr.</th>
                  <th>Particulars</th>
                  <th style={{ width: '22%' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{it.particulars}</td>
                    <td>{it.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pointList.length > 0 && (
              <>
                <p>
                  <b>Purpose and Expected Impact</b>
                </p>
                <ul>
                  {pointList.map((p, i) => (
                    <li key={i}>{fillCompany(p, companyShort)}</li>
                  ))}
                </ul>
              </>
            )}
            <p>
              Prabha Hira Pratishthan will ensure the secure installation, responsible use, regular maintenance and
              appropriate monitoring of the donated items. We will share acknowledgement, photographs and utilisation
              updates with {companyShort}. This support will create a lasting resource and help our children learn and
              grow with confidence, dignity and equal opportunity.
            </p>
            <p>
              We sincerely request your kind consideration and look forward to {companyShort}'s partnership in empowering
              Palawi's children.
            </p>
            <p>
              <b>POC:</b> {ORG.poc.name} {ORG.poc.phone}
            </p>
            <OrgSignatures secretaryOnly />
          </>
        );

      case 'requirements':
        return (
          <>
            <div className="letter-meta">
              <span />
              <span>Date: {formatShortDate(date)}</span>
            </div>
            {company && <ToBlock />}
            <h1>{heading || 'REQUIREMENTS LIST'}</h1>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>Sr. No.</th>
                  <th>Name</th>
                  <th style={{ width: '16%' }}>Quantity</th>
                  {items.some((it) => it.amount) && <th style={{ width: '24%' }}>Tentative Price</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{it.particulars}</td>
                    <td>{it.qty}</td>
                    {items.some((x) => x.amount) && <td>{it.amount}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            <OrgSignatures />
          </>
        );

      case 'utilisation': {
        const others = items.filter((it) => it.particulars || it.amount);
        const othersTotal = others.reduce((s, it) => s + parseAmount(it.amount), 0);
        return (
          <>
            <ToBlock />
            <p>
              <b>Sub.: Certificate for Utilization of Funds</b>
            </p>
            <p>Respected Sir,</p>
            <p>
              With respect to the contribution of funds by your Company towards Corporate Social Responsibility (CSR)
              Activities, we hereby state and confirm that:
            </p>
            <ol>
              <li>
                We are a public trust registered under the Bombay Public Trust Act 1950, bearing registration number
                E772/SOLAPUR, having its registered office at {ORG.registeredOffice}. The certified copies of the
                constitutional documents along with the Registration certificates are enclosed.
              </li>
              <li>
                We, PRABHA HIRA PRATISHTHAN, are formed for and engaged in the Activities that are covered under Section 135
                of the Companies Act, 2013 (Act) read with The Companies (Corporate Social Responsibility Policy) Amendment
                Rules, 2021 and Schedule VII under the Act.
              </li>
              <li>
                We have an established track record of at least three years in undertaking CSR activities specified in the
                Act read with The Companies (Corporate Social Responsibility Policy) Rules, 2014 and Schedule VII of the Act.
              </li>
              <li>
                We are registered with the Ministry of Corporate Affairs (MCA) under Rule 4(2) of the Companies (Corporate
                Social Responsibility Policy) Amendment Rules, 2021 for undertaking CSR activities and our unique CSR
                Registration number is {ORG.csrReg}.
              </li>
              <li>
                The funds contributed by your Company towards CSR are deployed in respect of CSR Activities as specified in
                the Companies Act, 2013 (Act) read with the Companies (Corporate Social Responsibility Policy) Amendment
                Rules, 2021 and these CSR Activities are carried out in Maharashtra, India.
              </li>
              <li>
                We will only carry out the objects mentioned in the Trust Deed of PRABHA HIRA PRATISHTHAN openly and
                honestly, guided by high ethical standards in accordance with all the applicable legislations, with funds
                derived from legitimate sources.
              </li>
              <li>
                We further undertake to provide implementation/status reports of the CSR projects or programmes, manner of
                execution, modalities of utilization of funds and implementation schedules to your Company from time to
                time, limited to the CSR fund disbursed by your Company.
              </li>
              <li>
                We undertake to extend our full co-operation to the representatives (including agencies, auditors, etc.) of
                the Company during their visit to our premises for monitoring the implementation of the CSR projects or
                programmes, limited to the CSR fund disbursed by your Company; and
              </li>
              <li>We are not associated with any Political Party.</li>
            </ol>
            <p>Details of Project for which contribution is obtained are as hereunder:</p>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="num">Amount (In INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Cost of CSR Project</td>
                  <td className="num">Rs {rupees(amount + othersTotal)}</td>
                </tr>
                <tr>
                  <td>Contribution as obtained from {companyShort}</td>
                  <td className="num">Rs {rupees(amount)}</td>
                </tr>
                <tr>
                  <td>Contribution as obtained from other contributors</td>
                  <td className="num">{othersTotal ? `Rs ${rupees(othersTotal)}` : 'NIL'}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Name of contributors</th>
                  <th className="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                {others.length === 0 ? (
                  <tr>
                    <td>NIL</td>
                    <td className="num">Rs NIL /-</td>
                  </tr>
                ) : (
                  others.map((it, i) => (
                    <tr key={i}>
                      <td>{it.particulars}</td>
                      <td className="num">Rs {rupees(parseAmount(it.amount))}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p>
              We the undersigned are authorized and have satisfied ourselves that the conditions on which the funds were
              sanctioned have been duly fulfilled and that we have exercised thorough verification to see that the funds
              were actually utilized for the activity for which they were sanctioned. Further, NIL unspent balance is
              available in the account of the said project.
            </p>
            <p>Thanking you,</p>
            <p>Yours truly,</p>
            <p>For {ORG.trustName}</p>
            <div style={{ height: 50 }} />
            <div>Name: {ORG.secretary.toUpperCase()}</div>
            <div>Designation: SECRETARY</div>
            <div className="mt-3">Date: {formatShortDate(date)}</div>
            <div>Place: {place}</div>
          </>
        );
      }

      case 'thankYou':
        return (
          <>
            <div className="letter-meta">
              <span />
              <span>Date: {formatShortDate(date)}</span>
            </div>
            <ToBlock />
            <p>
              <b>Subject: {subject}</b>
            </p>
            <p>Dear Sir/Madam,</p>
            <p>Greetings from Palawi!</p>
            <p>
              We hope this message finds you in the best of health and spirits. We are a grassroots organisation based in
              Pandharpur, Solapur District of Maharashtra since 2001, dedicated to providing care and support to
              HIV-positive orphaned children, underprivileged students, and vulnerable members of society. At our
              educational facility, over 107 HIV-positive children and more than 20 underprivileged children from nearby
              villages receive quality education and support.
            </p>
            {body && <p>{fillCompany(body, companyShort)}</p>}
            <p>
              Your contribution will not only fulfil an immediate need but will also make a lasting impact on the lives of
              these children by giving them an opportunity to dream big and work towards a better future.
            </p>
            <p>
              We warmly invite you to visit our organisation &amp; school and witness the difference your support makes in
              the lives of our children. Please feel free to reach out to us at any time.
            </p>
            <p>Warm regards,</p>
            <OrgSignatures secretaryOnly />
          </>
        );

      case 'declaration':
        return (
          <>
            <div className="letter-meta">
              <span />
              <span>Date: {formatShortDate(date)}</span>
            </div>
            <h1>DECLARATION</h1>
            <p>
              We hereby declare that Prabha Hira Pratishthan (Reg. No. {ORG.regNo}, PAN {ORG.pan}) is a non-political
              organization and does not undertake, support, or participate in any political activities, directly or
              indirectly.
            </p>
            <OrgSignatures secretaryOnly />
          </>
        );
    }
  };

  /* --------------------------------- Layout --------------------------------- */
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Form */}
      <div className="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3.5 text-xs h-fit">
        <div>
          <label className={labelCls}>{tr('Document Format', 'दस्तऐवजाचा नमुना')}</label>
          <select value={formatId} onChange={(e) => selectFormat(e.target.value as FormatId)} className={inputCls}>
            {FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {language === 'mr' ? f.mr : f.en}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 mt-1.5">{language === 'mr' ? fmt.hint.mr : fmt.hint.en}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {has('outwardNo') ? (
            <div>
              <label className={labelCls}>{tr('Outward No.', 'जावक क्र.')}</label>
              <input value={outwardNo} onChange={(e) => setOutwardNo(e.target.value)} className={inputCls} />
            </div>
          ) : (
            <div />
          )}
          <div>
            <label className={labelCls}>{tr('Date', 'दिनांक')}</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </div>
        </div>

        {has('recipient') && (
          <>
            <div>
              <label className={labelCls}>{tr('Company / Organisation', 'कंपनी / संस्था')}</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{tr('Contact Person & Designation (optional)', 'संपर्क व्यक्ती व पद (ऐच्छिक)')}</label>
              <input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={tr('e.g. Miss. Shital Jadhav, Manager - ESG', 'उदा. कु. शीतल जाधव, व्यवस्थापक - ESG')}
                className={inputCls}
              />
            </div>
          </>
        )}

        {(has('address') || has('recipient')) && (
          <div>
            <label className={labelCls}>{tr('Address (one line per row)', 'पत्ता (प्रत्येक ओळ स्वतंत्र)')}</label>
            <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
          </div>
        )}

        {has('subject') && (
          <div>
            <label className={labelCls}>{tr('Subject', 'विषय')}</label>
            <textarea rows={2} value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} />
          </div>
        )}

        {has('projectTitle') && (
          <div>
            <label className={labelCls}>{tr('Project Title', 'प्रकल्पाचे नाव')}</label>
            <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className={inputCls} />
          </div>
        )}

        {has('heading') && (
          <div>
            <label className={labelCls}>{tr('List Heading', 'यादीचे शीर्षक')}</label>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="REQUIREMENTS LIST / MONTHLY REQUIREMENTS LIST"
              className={inputCls}
            />
          </div>
        )}

        {has('amount') && (
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls}>{tr('Contribution Received (₹)', 'प्राप्त योगदान (₹)')}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={`${inputCls} font-mono font-bold`}
              />
            </div>
            <div>
              <label className={labelCls}>{tr('Place', 'ठिकाण')}</label>
              <input value={place} onChange={(e) => setPlace(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {has('body') && (
          <div>
            <label className={labelCls}>
              {formatId === 'thankYou'
                ? tr('What was donated & its use', 'काय देणगी दिली व तिचा उपयोग')
                : tr('Need / background paragraph', 'गरज / पार्श्वभूमी परिच्छेद')}
            </label>
            <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} className={inputCls} />
            <p className="text-[10px] text-slate-400 mt-1">{tr('{company} is replaced with the company name.', '{company} च्या जागी कंपनीचे नाव येईल.')}</p>
          </div>
        )}

        {has('items') && fmt.itemLabels && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 font-bold">
                {formatId === 'utilisation'
                  ? tr('Other contributors (leave empty for NIL)', 'इतर योगदानकर्ते (नसल्यास रिकामे ठेवा)')
                  : tr('Line items', 'बाबी')}
              </label>
              <button
                type="button"
                onClick={() => setItems([...items, item('')])}
                className="text-[#039583] font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                {tr('Add', 'जोडा')}
              </button>
            </div>
            {items.map((it, i) => (
              <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex gap-1.5">
                  <input
                    value={it.particulars}
                    onChange={(e) => updateItem(i, { particulars: e.target.value })}
                    placeholder={fmt.itemLabels!.particulars}
                    className="flex-1 bg-white border border-slate-200 rounded-md p-1.5 focus:outline-none focus:border-[#039583]"
                  />
                  <button
                    type="button"
                    onClick={() => setItems(items.filter((_, j) => j !== i))}
                    className="text-slate-400 hover:text-red-600 px-1"
                    title={tr('Remove', 'काढा')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {fmt.itemLabels!.details !== undefined && (
                  <textarea
                    rows={2}
                    value={it.details}
                    onChange={(e) => updateItem(i, { details: e.target.value })}
                    placeholder={fmt.itemLabels!.details}
                    className="w-full bg-white border border-slate-200 rounded-md p-1.5 focus:outline-none focus:border-[#039583]"
                  />
                )}
                {(fmt.itemLabels!.qty !== undefined || fmt.itemLabels!.amount !== undefined) && (
                  <div className="flex gap-1.5">
                    {fmt.itemLabels!.qty !== undefined && (
                      <input
                        value={it.qty}
                        onChange={(e) => updateItem(i, { qty: e.target.value })}
                        placeholder={fmt.itemLabels!.qty}
                        className="flex-1 bg-white border border-slate-200 rounded-md p-1.5 focus:outline-none focus:border-[#039583]"
                      />
                    )}
                    {fmt.itemLabels!.amount !== undefined && (
                      <input
                        value={it.amount}
                        onChange={(e) => updateItem(i, { amount: e.target.value })}
                        placeholder={fmt.itemLabels!.amount}
                        className="flex-1 bg-white border border-slate-200 rounded-md p-1.5 font-mono focus:outline-none focus:border-[#039583]"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            {formatId === 'covering' && (
              <p className="text-right font-bold text-[#023b77]">
                {tr('Total', 'एकूण')}: ₹{rupees(itemsTotal)}
              </p>
            )}
          </div>
        )}

        {has('points') && (
          <div>
            <label className={labelCls}>{tr('Purpose & expected impact (one per line)', 'उद्देश व अपेक्षित परिणाम (प्रत्येक ओळीत एक)')}</label>
            <textarea rows={5} value={points} onChange={(e) => setPoints(e.target.value)} className={inputCls} />
          </div>
        )}

        <button
          type="button"
          onClick={() => selectFormat(formatId)}
          className="text-[11px] text-slate-500 hover:text-slate-800 underline"
        >
          {tr('Reset this format to its sample text', 'हा नमुना मूळ मजकुरावर आणा')}
        </button>
      </div>

      {/* Preview */}
      <div className="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2 text-xs">
          <span className="font-bold text-slate-900">{language === 'mr' ? fmt.mr : fmt.en}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? tr('Copied!', 'कॉपी झाले!') : tr('Copy Text', 'मजकूर कॉपी करा')}</span>
            </button>
            <button
              onClick={() => printDocument(fileName)}
              className="px-3 py-1.5 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{tr('Print / PDF', 'प्रिंट / PDF')}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-slate-100 p-4 rounded-xl">
          <div id="palawi-format-doc" className="letter-sheet print-area">
            <OrgLetterhead />
            {renderDocument()}
          </div>
        </div>
      </div>
    </div>
  );
};
