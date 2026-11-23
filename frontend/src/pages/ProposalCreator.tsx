import React, { useState, useEffect } from 'react';
import { useLanguage, translateValue } from '../context/LanguageContext';
import { 
  FileText, 
  Plus, 
  Download, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Building2, 
  Award, 
  Trash2, 
  Eye, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProposalTemplate {
  id: string;
  title: string;
  focusArea: string;
  defaultBudget: number;
  executiveSummary: string;
  objectives: string[];
  budgetItems: { item: string; qty: string; unitCost: number; totalCost: number }[];
  deliverables: string;
  /** Marathi text for the template; anything missing falls back to English. */
  mr?: {
    title?: string;
    executiveSummary?: string;
    objectives?: string[];
    budgetItems?: { item: string; qty: string }[];
    deliverables?: string;
  };
}

type DocLang = 'en' | 'mr';

const localizeTemplate = (tpl: ProposalTemplate, lang: DocLang) => {
  const mr = lang === 'mr' ? tpl.mr : undefined;
  return {
    title: mr?.title ?? tpl.title,
    executiveSummary: mr?.executiveSummary ?? tpl.executiveSummary,
    objectives: mr?.objectives ?? tpl.objectives,
    budgetItems: tpl.budgetItems.map((b, i) => ({
      ...b,
      item: mr?.budgetItems?.[i]?.item ?? b.item,
      qty: mr?.budgetItems?.[i]?.qty ?? b.qty,
    })),
    deliverables: mr?.deliverables ?? tpl.deliverables,
  };
};

const autoTitle = (tpl: ProposalTemplate, lang: DocLang) =>
  lang === 'mr'
    ? `सीएसआर अनुदान प्रस्ताव: ${localizeTemplate(tpl, 'mr').title}`
    : `CSR Grant Proposal: ${tpl.title}`;

interface ProposalCreatorProps {
  onOpenWhatsAppOutreach?: (phone: string, name: string, defaultText?: string) => void;
}

export const ProposalCreator: React.FC<ProposalCreatorProps> = ({
  onOpenWhatsAppOutreach,
}) => {
  const { t, tr, tv, language } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'templates'>('create');

  // Pre-loaded Templates
  const [templates, setTemplates] = useState<ProposalTemplate[]>([
    {
      id: 'tpl_1',
      title: 'Student Grain & Daily Ration Support Drive',
      focusArea: 'Healthcare & Nutrition',
      defaultBudget: 350000,
      executiveSummary: 'Palawi NGO provides full shelter, nutrition, and healthcare to orphaned children in Pandharpur. This grant supports the procurement of essential grains (Wheat, Rice, Sorghum/Jwari), cooking oil, and pulses for 120 resident children over a 6-month period.',
      objectives: [
        'Provide 100% nutritional security for 120 resident children',
        'Distribute monthly balanced food rations (Jwari 30kg, Gahu 30kg, Rice 30kg packs)',
        'Improve physical health, immunity, and school attendance rates',
      ],
      budgetItems: [
        { item: 'Wheat (Gahu) & Sorghum (Jwari) Grains (3,000 kg)', qty: '6 Months', unitCost: 40, totalCost: 120000 },
        { item: 'Rice & Pulses (Dal) Procurement (1,500 kg)', qty: '6 Months', unitCost: 80, totalCost: 120000 },
        { item: 'Refined Oil & Essential Spices', qty: '6 Months', unitCost: 120, totalCost: 60000 },
        { item: 'Logistics, Storage & Quality Audits', qty: 'Lump sum', unitCost: 50000, totalCost: 50000 },
      ],
      deliverables: 'Bi-monthly audited ration dispatch receipts, nutritional health tracking reports, and quarterly photo documentation.',
      mr: {
        title: 'विद्यार्थी धान्य व दैनंदिन शिधा सहाय्य मोहीम',
        executiveSummary: 'पालवी संस्था पंढरपूर येथील अनाथ मुलांना संपूर्ण निवारा, पोषण व आरोग्यसेवा पुरवते. हे अनुदान १२० निवासी मुलांसाठी ६ महिन्यांच्या कालावधीत आवश्यक धान्य (गहू, तांदूळ, ज्वारी), खाद्यतेल व डाळी खरेदीसाठी सहाय्य करते.',
        objectives: [
          '१२० निवासी मुलांसाठी १००% पोषण सुरक्षा पुरवणे',
          'दरमहा संतुलित शिधा वाटप (ज्वारी ३० किलो, गहू ३० किलो, तांदूळ ३० किलो)',
          'शारीरिक आरोग्य, रोगप्रतिकारशक्ती व शाळेतील उपस्थिती सुधारणे',
        ],
        budgetItems: [
          { item: 'गहू व ज्वारी धान्य (३,००० किलो)', qty: '६ महिने' },
          { item: 'तांदूळ व डाळ खरेदी (१,५०० किलो)', qty: '६ महिने' },
          { item: 'खाद्यतेल व आवश्यक मसाले', qty: '६ महिने' },
          { item: 'वाहतूक, साठवण व गुणवत्ता तपासणी', qty: 'एकरकमी' },
        ],
        deliverables: 'दर दोन महिन्यांनी लेखापरीक्षित शिधा वितरण पावत्या, पोषण व आरोग्य अहवाल आणि तिमाही छायाचित्र दस्तऐवज.',
      },
    },
    {
      id: 'tpl_2',
      title: 'Child Education Kits & STEM Learning Materials',
      focusArea: 'Education',
      defaultBudget: 250000,
      executiveSummary: 'To support academic excellence among resident students in Pandharpur schools, this CSR proposal covers notebook reams, school uniforms, footwear, educational activity kits, and digital literacy tools.',
      objectives: [
        'Equip 150 school-going children with complete annual stationery kits',
        'Provide 2 sets of durable school uniforms and footwear per child',
        'Establish an interactive activity and STEM storybook library at Palawi center',
      ],
      budgetItems: [
        { item: 'A4 Printing Paper & School Notebook Reams (150 sets)', qty: '150 Kits', unitCost: 600, totalCost: 90000 },
        { item: 'School Uniforms & Footwear (2 pairs/child)', qty: '150 Kits', unitCost: 700, totalCost: 105000 },
        { item: 'Storybooks, Activity Games & Craft Materials', qty: '1 Set', unitCost: 35000, totalCost: 35000 },
        { item: 'Distribution Event & Documentation', qty: 'Lump sum', unitCost: 20000, totalCost: 20000 },
      ],
      deliverables: 'Individual student kit receipt acknowledgements, school academic progress cards, and donor plaque unveiling.',
      mr: {
        title: 'बाल शिक्षण संच व STEM अध्ययन साहित्य',
        executiveSummary: 'पंढरपूरमधील शाळांत शिकणाऱ्या निवासी विद्यार्थ्यांच्या शैक्षणिक प्रगतीसाठी हा सीएसआर प्रस्ताव वह्या, शालेय गणवेश, पादत्राणे, शैक्षणिक उपक्रम संच व डिजिटल साक्षरता साधनांचा खर्च समाविष्ट करतो.',
        objectives: [
          'शाळेत जाणाऱ्या १५० मुलांना वर्षभराचा संपूर्ण स्टेशनरी संच देणे',
          'प्रत्येक मुलाला टिकाऊ शालेय गणवेशाचे २ संच व पादत्राणे देणे',
          'पालवी केंद्रात उपक्रम व STEM गोष्टींच्या पुस्तकांचे वाचनालय सुरू करणे',
        ],
        budgetItems: [
          { item: 'A4 छपाई कागद व शालेय वह्या (१५० संच)', qty: '१५० संच' },
          { item: 'शालेय गणवेश व पादत्राणे (प्रति मूल २ जोड)', qty: '१५० संच' },
          { item: 'गोष्टींची पुस्तके, उपक्रम खेळ व हस्तकला साहित्य', qty: '१ संच' },
          { item: 'वितरण कार्यक्रम व दस्तऐवजीकरण', qty: 'एकरकमी' },
        ],
        deliverables: 'प्रत्येक विद्यार्थ्याची संच पोच पावती, शालेय प्रगतीपत्रके आणि दाता फलकाचे अनावरण.',
      },
    },
    {
      id: 'tpl_3',
      title: 'Sanitary Supplies & Adolescent Girls Hygiene Campaign',
      focusArea: 'Healthcare & Sanitation',
      defaultBudget: 180000,
      executiveSummary: 'This initiative funds annual personal hygiene kits, eco-friendly sanitary napkin distribution, washing soaps, and health awareness sessions for young girls and resident women at Palawi.',
      objectives: [
        'Ensure uninterrupted access to high-quality sanitary hygiene products',
        'Conduct monthly health, sanitation, and medical checkups',
        'Reduce waterborne infections through structured sanitation supplies',
      ],
      budgetItems: [
        { item: 'Sanitary Napkin Bundles & Hygiene Kits (Annual)', qty: '12 Months', unitCost: 8000, totalCost: 96000 },
        { item: 'Washing Soaps, Bath Soaps & Detergents', qty: '12 Months', unitCost: 4000, totalCost: 48000 },
        { item: 'Doctor Health Workshops & Medical Supplies', qty: '4 Sessions', unitCost: 9000, totalCost: 36000 },
      ],
      deliverables: 'Monthly stock consumption logs, medical health index records, and compliance certificates.',
      mr: {
        title: 'सॅनिटरी साहित्य व किशोरवयीन मुलींची स्वच्छता मोहीम',
        executiveSummary: 'हा उपक्रम पालवीतील मुली व निवासी महिलांसाठी वार्षिक वैयक्तिक स्वच्छता संच, पर्यावरणपूरक सॅनिटरी नॅपकिन वाटप, कपडे धुण्याचे साबण आणि आरोग्य जागृती सत्रांसाठी निधी पुरवतो.',
        objectives: [
          'उच्च दर्जाची सॅनिटरी स्वच्छता उत्पादने सतत उपलब्ध करून देणे',
          'दरमहा आरोग्य, स्वच्छता व वैद्यकीय तपासणी करणे',
          'नियोजित स्वच्छता साहित्याद्वारे पाण्यामुळे होणारे संसर्ग कमी करणे',
        ],
        budgetItems: [
          { item: 'सॅनिटरी नॅपकिन गठ्ठे व स्वच्छता संच (वार्षिक)', qty: '१२ महिने' },
          { item: 'कपडे धुण्याचे साबण, अंघोळीचे साबण व डिटर्जंट', qty: '१२ महिने' },
          { item: 'डॉक्टरांच्या आरोग्य कार्यशाळा व वैद्यकीय साहित्य', qty: '४ सत्रे' },
        ],
        deliverables: 'मासिक साठा वापर नोंदी, वैद्यकीय आरोग्य निर्देशांक नोंदी व अनुपालन प्रमाणपत्रे.',
      },
    },
  ]);

  // Form State for Proposal Creator
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl_1');
  const [partnerName, setPartnerName] = useState(() =>
    language === 'mr' ? 'बँक ऑफ इंडिया, पंढरपूर मुख्य शाखा' : 'Bank Of India (Pandharpur Main)'
  );
  const [contactPerson, setContactPerson] = useState(() =>
    language === 'mr' ? 'वरिष्ठ सीएसआर अधिकारी' : 'Senior CSR Officer'
  );
  const [contactPhone, setContactPhone] = useState('+918179308777');
  const [customProposalTitle, setCustomProposalTitle] = useState(() => autoTitle(templates[0], language));
  const [grantAmount, setGrantAmount] = useState<number>(350000);
  // The proposal document has its own language, defaulting to (and following) the app language.
  const [proposalLanguage, setProposalLanguage] = useState<DocLang>(language);
  useEffect(() => setProposalLanguage(language), [language]);
  const [customNotes, setCustomNotes] = useState(() =>
    language === 'mr'
      ? 'पालवी पंढरपूर केंद्रात २०२६ च्या पहिल्या तिमाहीपासून अंमलबजावणी अपेक्षित.'
      : 'Target deployment starting Q1 2026 at Palawi Pandharpur center.'
  );

  // Keep an untouched auto-generated title in the document language.
  useEffect(() => {
    const tpl = templates.find((x) => x.id === selectedTemplateId);
    if (!tpl) return;
    setCustomProposalTitle((current) =>
      current === autoTitle(tpl, 'en') || current === autoTitle(tpl, 'mr') ? autoTitle(tpl, proposalLanguage) : current
    );
  }, [proposalLanguage]);

  const D = (en: string, mr: string) => (proposalLanguage === 'mr' ? mr : en);

  // Generated Proposal Output State
  const [generatedProposal, setGeneratedProposal] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedToPipeline, setSavedToPipeline] = useState(false);

  // Template Modal State
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [newTplTitle, setNewTplTitle] = useState('');
  const [newTplFocus, setNewTplFocus] = useState('Education');
  const [newTplBudget, setNewTplBudget] = useState(200000);
  const [newTplSummary, setNewTplSummary] = useState('');
  const [newTplDeliverables, setNewTplDeliverables] = useState('');

  // Select template handler
  const handleSelectTemplate = (tplId: string) => {
    setSelectedTemplateId(tplId);
    const tpl = templates.find((t) => t.id === tplId);
    if (tpl) {
      setCustomProposalTitle(autoTitle(tpl, proposalLanguage));
      setGrantAmount(tpl.defaultBudget);
    }
  };

  // Generate Proposal handler
  const handleGenerateProposal = () => {
    const tpl = templates.find((t) => t.id === selectedTemplateId) || templates[0];
    
    const propDoc = {
      refNumber: `PLW/CSR-PROP/2026/${Math.floor(100 + Math.random() * 900)}`,
      date: new Date(),
      templateId: tpl.id,
      partnerName,
      contactPerson,
      contactPhone,
      proposalTitle: customProposalTitle || tpl.title,
      grantAmount,
      focusArea: tpl.focusArea,
      customNotes,
    };

    setGeneratedProposal(propDoc);
    setSavedToPipeline(false);
  };

  // Document text in the selected document language.
  const docTemplate = generatedProposal
    ? templates.find((x) => x.id === generatedProposal.templateId) || templates[0]
    : null;
  const doc = docTemplate ? localizeTemplate(docTemplate, proposalLanguage) : null;
  const statutory = {
    location: D('Pandharpur, District Solapur, Maharashtra - 413304', 'पंढरपूर, जिल्हा सोलापूर, महाराष्ट्र - ४१३३०४'),
    pan12a: D('AACTP1234F20214 (AY 2026-27)', 'AACTP1234F20214 (कर निर्धारण वर्ष २०२६-२७)'),
    pan80g: D('AACTP1234F80G01 (100% Tax Exemption)', 'AACTP1234F80G01 (१००% कर सवलत)'),
    mcaCsr1: 'CSR00034982',
  };
  const docDate = generatedProposal
    ? generatedProposal.date.toLocaleDateString(proposalLanguage === 'mr' ? 'mr-IN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  const handleCopyText = () => {
    if (!generatedProposal || !doc) return;
    const text = `
${D('PALAWI FOUNDATION - CSR GRANT PROPOSAL', 'पालवी फाउंडेशन - सीएसआर अनुदान प्रस्ताव')}
${D('Ref', 'संदर्भ')}: ${generatedProposal.refNumber} | ${D('Date', 'दिनांक')}: ${docDate}
${D('To', 'प्रति')}: ${generatedProposal.partnerName} (${generatedProposal.contactPerson})

${D('Project Title', 'प्रकल्पाचे नाव')}: ${generatedProposal.proposalTitle}
${D('Requested Grant Amount', 'मागणी केलेली अनुदान रक्कम')}: ₹${generatedProposal.grantAmount.toLocaleString('en-IN')}
${D('Focus Area', 'कार्यक्षेत्र')}: ${translateValue(generatedProposal.focusArea, proposalLanguage)}

${D('EXECUTIVE SUMMARY', 'कार्यकारी सारांश')}:
${doc.executiveSummary}

${D('OBJECTIVES', 'उद्दिष्टे')}:
${doc.objectives.map((o: string, idx: number) => `${idx + 1}. ${o}`).join('\n')}

${D('DELIVERABLES & REPORTING', 'अपेक्षित फलनिष्पत्ती व अहवाल')}:
${doc.deliverables}

${D('STATUTORY COMPLIANCE', 'वैधानिक अनुपालन')}:
• ${D('12A Exemption Reg', '12A सवलत नोंदणी')}: ${statutory.pan12a}
• ${D('80G Tax Exemption Reg', '80G कर सवलत नोंदणी')}: ${statutory.pan80g}
• ${D('MCA CSR-1 Reg', 'MCA CSR-1 नोंदणी')}: ${statutory.mcaCsr1}

${D('Thank you for partnering with Palawi for social impact.', 'सामाजिक कार्यात पालवीसोबत भागीदारी केल्याबद्दल धन्यवाद.')}
${D('Contact', 'संपर्क')}: admin@palawi.org | +91 8179308777
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTplTitle) return;

    const newTpl: ProposalTemplate = {
      id: `tpl_${Date.now()}`,
      title: newTplTitle,
      focusArea: newTplFocus,
      defaultBudget: Number(newTplBudget),
      executiveSummary: newTplSummary || tr('Custom corporate CSR initiative supporting community development at Palawi Pandharpur.', 'पालवी पंढरपूर येथे समुदाय विकासास सहाय्य करणारा कॉर्पोरेट सीएसआर उपक्रम.'),
      objectives: [
        'Direct beneficiary outreach and baseline assessment',
        'Structured item distribution and project execution',
        'Formal reporting and quarterly audit compliance',
      ],
      budgetItems: [
        { item: 'Primary Project Materials & Procurement', qty: 'Lump Sum', unitCost: Number(newTplBudget) * 0.7, totalCost: Number(newTplBudget) * 0.7 },
        { item: 'Logistics, On-Ground Coordination & Audits', qty: 'Lump Sum', unitCost: Number(newTplBudget) * 0.3, totalCost: Number(newTplBudget) * 0.3 },
      ],
      deliverables: newTplDeliverables || tr('Comprehensive impact report with utilization certificate and photo proof.', 'वापर प्रमाणपत्र व छायाचित्र पुराव्यासह सविस्तर प्रभाव अहवाल.'),
      mr: {
        objectives: [
          'थेट लाभार्थी संपर्क व प्राथमिक मूल्यमापन',
          'नियोजित साहित्य वाटप व प्रकल्प अंमलबजावणी',
          'औपचारिक अहवाल व तिमाही लेखापरीक्षण अनुपालन',
        ],
        budgetItems: [
          { item: 'मुख्य प्रकल्प साहित्य व खरेदी', qty: 'एकरकमी' },
          { item: 'वाहतूक, प्रत्यक्ष समन्वय व लेखापरीक्षण', qty: 'एकरकमी' },
        ],
      },
    };

    setTemplates([newTpl, ...templates]);
    setShowAddTemplateModal(false);
    setNewTplTitle('');
    setNewTplSummary('');
    setNewTplDeliverables('');
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'स्मार्ट सीएसआर प्रस्ताव जनरेटर' : 'Palawi Smart CSR Proposal Studio'}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {tr('CSR Proposal Creator', 'सीएसआर प्रस्ताव निर्माता')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {tr('Select a template, customize corporate CSR grant terms, and export tailored proposal documents.', 'साचा निवडून किंवा स्वतःचा तपशील भरून कॉर्पोरेट सीएसआर अनुदान प्रस्ताव तयार करा')}
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <button
            onClick={() => setActiveSubTab('create')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'create'
                ? 'bg-[#023b77] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'प्रस्ताव तयार करा' : 'Create & Generate'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('templates')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'templates'
                ? 'bg-[#023b77] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{tr('Proposal Templates', 'प्रस्ताव साचे')} ({templates.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CREATE & GENERATE PROPOSAL */}
      {activeSubTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Controls: Configurator Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
              <span>{tr('Proposal Parameters', 'प्रस्तावाचा तपशील')}</span>
              <span className="text-[10px] font-bold text-[#039583] bg-[#039583]/10 px-2 py-0.5 rounded">
                {tr('Step 1 of 2', 'टप्पा १ पैकी २')}
              </span>
            </h2>

            <div className="space-y-3.5 text-xs">
              {/* Select Template */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('1. Select CSR Project Template', '१. सीएसआर प्रकल्प साचा निवडा')}
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleSelectTemplate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {localizeTemplate(tpl, language).title} (₹{tr(`${(tpl.defaultBudget / 1000).toFixed(0)}k`, `${(tpl.defaultBudget / 1000).toFixed(0)} हजार`)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Partner */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('2. Target Corporate / CSR Partner Name', '२. कॉर्पोरेट / सीएसआर भागीदाराचे नाव')}
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder={tr('e.g. Bank Of India (Pandharpur Main) / Sweri Trust', 'उदा. बँक ऑफ इंडिया, पंढरपूर / स्वेरी ट्रस्ट')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {tr('Contact Officer', 'संपर्क अधिकारी')}
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {tr('Mobile / WhatsApp', 'मोबाईल / व्हॉट्सॲप')}
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              {/* Custom Proposal Title */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('3. Proposal Document Title', '३. प्रस्तावाचे शीर्षक')}
                </label>
                <input
                  type="text"
                  value={customProposalTitle}
                  onChange={(e) => setCustomProposalTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              {/* Requested Grant Amount & Language */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {tr('Grant Amount (₹)', 'अनुदान रक्कम (₹)')}
                  </label>
                  <input
                    type="number"
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {tr('Document Language', 'प्रस्तावाची भाषा')}
                  </label>
                  <select
                    value={proposalLanguage}
                    onChange={(e) => setProposalLanguage(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="en">English</option>
                    <option value="mr">मराठी</option>
                  </select>
                </div>
              </div>

              {/* Custom Notes */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {tr('4. Additional Implementation Notes', '४. अंमलबजावणीबाबत अतिरिक्त टिपा')}
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder={tr('e.g. Special deployment requirements, timeline notes...', 'उदा. विशेष गरजा, कालमर्यादेबाबत टिपा...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                ></textarea>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateProposal}
                className="w-full py-3 bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-90 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>{tr('Generate CSR Proposal', 'प्रस्ताव तयार करा')}</span>
              </button>
            </div>
          </div>

          {/* Right Preview Canvas: Document Display ("Get the Proposal") */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 min-h-[550px]">
            {generatedProposal && doc ? (
              <div className="space-y-5 print:p-0">
                {/* Proposal Action Toolbar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#039583]" />
                    <span>{tr('Generated Proposal Preview', 'तयार प्रस्तावाचे पूर्वावलोकन')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                      title={tr('Print / Save PDF', 'प्रिंट / PDF जतन करा')}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{tr('Print / PDF', 'प्रिंट / PDF')}</span>
                    </button>

                    <button
                      onClick={handleCopyText}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? tr('Copied!', 'कॉपी झाले!') : tr('Copy', 'कॉपी करा')}</span>
                    </button>

                    {onOpenWhatsAppOutreach && (
                      <button
                        onClick={() => 
                          onOpenWhatsAppOutreach(
                            generatedProposal.contactPhone, 
                            generatedProposal.partnerName,
                            D(`Namaste! Please find attached our formal CSR Grant Proposal: ${generatedProposal.proposalTitle} (Amount: ₹${generatedProposal.grantAmount.toLocaleString('en-IN')}). Reg Ref: ${generatedProposal.refNumber}`, `नमस्कार! आमचा औपचारिक सीएसआर अनुदान प्रस्ताव सोबत जोडला आहे: ${generatedProposal.proposalTitle} (रक्कम: ₹${generatedProposal.grantAmount.toLocaleString('en-IN')}). संदर्भ: ${generatedProposal.refNumber}`)
                          )
                        }
                        className="px-3 py-1.5 bg-[#039583] hover:bg-[#039583]/90 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{tr('Send via WhatsApp', 'व्हॉट्सॲपने पाठवा')}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Printable Document Paper Sheet */}
                <div id="printable-proposal-document" className="p-6 bg-slate-50/50 border border-slate-200 rounded-xl space-y-5 text-slate-800 text-xs font-sans leading-relaxed">
                  {/* Official Letterhead Header */}
                  <div className="border-b-2 border-[#023b77] pb-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[#023b77]">
                        <Building2 className="w-5 h-5 text-[#039583]" />
                        <span className="text-base font-extrabold tracking-tight">{D('PALAWI FOUNDATION', 'पालवी फाउंडेशन')}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {statutory.location}
                      </p>
                      <p className="text-[10px] text-[#039583] font-bold font-mono">
                        12A: {statutory.pan12a} | 80G: {statutory.pan80g} | MCA CSR-1: {statutory.mcaCsr1}
                      </p>
                    </div>

                    <div className="text-right font-mono text-[11px] text-slate-600 space-y-0.5">
                      <p className="font-bold text-slate-900">{generatedProposal.refNumber}</p>
                      <p>{docDate}</p>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{D('Addressed To:', 'प्रति:')}</p>
                    <p className="font-bold text-slate-900 text-sm">{generatedProposal.partnerName}</p>
                    <p className="text-slate-600 font-medium">{generatedProposal.contactPerson}</p>
                  </div>

                  {/* Title & Amount Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#023b77]/10 to-[#039583]/10 border border-[#039583]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#039583] block">
                        {D('Project Grant Proposal', 'प्रकल्प अनुदान प्रस्ताव')}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                        {generatedProposal.proposalTitle}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">{D('Proposed Grant Value', 'प्रस्तावित अनुदान रक्कम')}</span>
                      <span className="text-lg font-extrabold font-mono text-[#023b77]">
                        ₹{generatedProposal.grantAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77]">
                      {D('1. Executive Summary & Context', '१. कार्यकारी सारांश व पार्श्वभूमी')}
                    </h4>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                      {doc.executiveSummary}
                    </p>
                  </div>

                  {/* Objectives */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77]">
                      {D('2. Project Key Objectives', '२. प्रकल्पाची प्रमुख उद्दिष्टे')}
                    </h4>
                    <ul className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                      {doc.objectives.map((obj: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="w-4 h-4 rounded-full bg-[#039583]/15 text-[#039583] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Budget Table */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77]">
                      {D('3. Budget Breakdown & Cost Estimates', '३. अंदाजपत्रक व खर्चाचा तपशील')}
                    </h4>
                    <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-2.5">{D('Item Description', 'बाबीचे वर्णन')}</th>
                            <th className="p-2.5">{D('Unit / Period', 'नग / कालावधी')}</th>
                            <th className="p-2.5 text-right">{D('Total (₹)', 'एकूण (₹)')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {doc.budgetItems.map((b: any, idx: number) => (
                            <tr key={idx}>
                              <td className="p-2.5 font-medium text-slate-800">{b.item}</td>
                              <td className="p-2.5 text-slate-500">{b.qty}</td>
                              <td className="p-2.5 text-right font-mono font-bold text-slate-900">₹{b.totalCost.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50/80 font-bold">
                            <td colSpan={2} className="p-2.5 text-right uppercase text-slate-700">{D('Total Requested CSR Grant:', 'एकूण मागणी केलेले सीएसआर अनुदान:')}</td>
                            <td className="p-2.5 text-right font-mono text-sm text-[#023b77]">₹{generatedProposal.grantAmount.toLocaleString('en-IN')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[#023b77]">
                      {D('4. Expected Deliverables & Audit Compliance', '४. अपेक्षित फलनिष्पत्ती व लेखापरीक्षण अनुपालन')}
                    </h4>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                      {doc.deliverables}
                    </p>
                  </div>

                  {/* Signatory Block */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{D('Project Director & CSR Trustee', 'प्रकल्प संचालक व सीएसआर विश्वस्त')}</p>
                      <p className="text-slate-500">{D('Palawi Foundation, Pandharpur', 'पालवी फाउंडेशन, पंढरपूर')}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{D('Statutory 80G Tax Exemption Certified', 'वैधानिक 80G कर सवलत प्रमाणित')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#039583]/10 text-[#039583] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-sm font-bold text-slate-900">{tr('Ready to Generate Your CSR Proposal', 'सीएसआर प्रस्ताव तयार करण्यासाठी सज्ज')}</h3>
                  <p className="text-xs text-slate-500">
                    {tr('Select a project template on the left, customize partner terms, and click "Generate CSR Proposal" to preview the formal document here.', 'डावीकडे प्रकल्प साचा निवडा, भागीदाराचा तपशील भरा आणि औपचारिक प्रस्ताव येथे पाहण्यासाठी "प्रस्ताव तयार करा" वर क्लिक करा.')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: TEMPLATE MANAGEMENT */}
      {activeSubTab === 'templates' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {tr('CSR Proposal Templates Library', 'सीएसआर प्रस्ताव साचे संग्रह')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {tr('Manage reusable grant proposal structures for quick generation', 'जलद प्रस्ताव तयार करण्यासाठी पुन्हा वापरता येणारे साचे व्यवस्थापित करा')}
              </p>
            </div>

            <button
              onClick={() => setShowAddTemplateModal(true)}
              className="px-3.5 py-2 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{tr('Add New Template', 'नवीन साचा जोडा')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3.5 flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#039583] bg-[#039583]/10 px-2 py-0.5 rounded">
                      {tv(tpl.focusArea)}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#023b77]">
                      ₹{tpl.defaultBudget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {localizeTemplate(tpl, language).title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {localizeTemplate(tpl, language).executiveSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {tpl.objectives.length} {tr('Key Objectives', 'प्रमुख उद्दिष्टे')}
                  </span>

                  <button
                    onClick={() => {
                      handleSelectTemplate(tpl.id);
                      setActiveSubTab('create');
                    }}
                    className="text-[#039583] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>{tr('Use Template', 'साचा वापरा')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW PROPOSAL TEMPLATE */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {tr('Add New CSR Proposal Template', 'नवीन सीएसआर प्रस्ताव साचा जोडा')}
              </h3>
              <button
                onClick={() => setShowAddTemplateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddTemplate} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Template Title', 'साच्याचे शीर्षक')}</label>
                <input
                  type="text"
                  required
                  placeholder={tr('e.g. Solar Panel Energy & Water Purification CSR Grant', 'उदा. सौर ऊर्जा व जलशुद्धीकरण सीएसआर अनुदान')}
                  value={newTplTitle}
                  onChange={(e) => setNewTplTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Focus Area', 'कार्यक्षेत्र')}</label>
                  <select
                    value={newTplFocus}
                    onChange={(e) => setNewTplFocus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="Education">{tv('Education')}</option>
                    <option value="Healthcare & Nutrition">{tv('Healthcare & Nutrition')}</option>
                    <option value="Environmental Sustainability">{tv('Environmental Sustainability')}</option>
                    <option value="Skill Development">{tv('Skill Development')}</option>
                    <option value="Women Empowerment">{tv('Women Empowerment')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Default Budget (₹)', 'मूळ अंदाजपत्रक (₹)')}</label>
                  <input
                    type="number"
                    value={newTplBudget}
                    onChange={(e) => setNewTplBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium font-mono font-bold focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Executive Summary', 'कार्यकारी सारांश')}</label>
                <textarea
                  rows={3}
                  value={newTplSummary}
                  onChange={(e) => setNewTplSummary(e.target.value)}
                  placeholder={tr('Brief context and impact overview of this project template...', 'या प्रकल्प साच्याची थोडक्यात पार्श्वभूमी व परिणाम...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Deliverables & Reporting', 'फलनिष्पत्ती व अहवाल')}</label>
                <input
                  type="text"
                  value={newTplDeliverables}
                  onChange={(e) => setNewTplDeliverables(e.target.value)}
                  placeholder={tr('e.g. Quarterly audit reports, beneficiary receipts...', 'उदा. तिमाही लेखापरीक्षण अहवाल, लाभार्थी पावत्या...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg transition-colors shadow-2xs"
                >
                  {tr('Save Template', 'साचा जतन करा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
