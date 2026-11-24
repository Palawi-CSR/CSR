import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Dictionary lookup by key. */
  t: (key: string) => string;
  /** Inline translation: tr('Save', 'जतन करा'). */
  tr: (en: string, mr: string) => string;
  /** Data value in the current language (status, stage, bilingual record field, ...). */
  tv: (value: string | null | undefined) => string;
  /** Record field in the current language, preferring `<field>Mr` in Marathi. */
  tf: (record: Record<string, any> | null | undefined, field: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    'nav.dashboard': 'Dashboard',
    'nav.gateRegister': 'Register Log',
    'nav.database': 'Database',
    'nav.donorCrm': 'Donor CRM',
    'nav.donorRecords': 'Centralised Donor Records',
    'nav.whatsapp': 'WhatsApp Outreach',
    'nav.proposalCreator': 'Proposal Creator',
    'nav.reportGenerator': 'Report Generator',
    'nav.receiptGenerator': 'Donation Receipt',
    'nav.productsRevenue': 'Products & Revenue',
    'nav.employees': 'Employees',
    'nav.myDashboard': 'My Dashboard',
    'nav.archives': 'Palawi Archives (Drive)',
    'nav.workspace': 'Palawi Workspace',
    'nav.addCsr': 'Add CSR Opportunity',
    'nav.howItWorks': 'How it works',
    'nav.signIn': 'Sign in',
    'nav.getStarted': 'Get started',

    // Language
    'lang.select': 'Language',
    'lang.english': 'English',
    'lang.marathi': 'मराठी',

    // Dashboard Header & Stats
    'dash.title': 'Dashboard',
    'dash.csrGrantsReceived': 'CSR Grants Received',
    'dash.activePipeline': 'Active Pipeline',
    'dash.prospectivePartners': 'Prospective Partners',
    'dash.whatsappDelivery': 'WhatsApp Delivery',
    'dash.pledged': 'Pledged',
    'dash.proposalsInReview': 'Proposals in Review',
    'dash.highEngagement': 'High Response Engagement',

    // Monthly Funding Chart
    'chart.monthlyFundingTitle': 'Monthly CSR Funding Received vs Target & Required (₹)',
    'chart.received': 'Received (₹)',
    'chart.target': 'Target (₹)',
    'chart.requiredLine': 'Required Funds Line (₹)',
    'chart.pipelineStageTitle': 'CSR Pipeline Stage Value',

    // NGO Compliance Section
    'compliance.title': 'NGO Statutory Compliance & Certifications',
    'compliance.subtitle': 'Verified statutory, tax, and CSR accreditation for Palawi NGO',
    'compliance.12a.title': '12A Income Tax Exemption',
    'compliance.12a.reg': 'Reg: AACTP1234F20214',
    'compliance.12a.validity': 'Valid till 2028 (AY 2026-27 Active)',
    'compliance.80g.title': '80G Tax Exemption (Donors)',
    'compliance.80g.reg': 'Reg: AACTP1234F80G01',
    'compliance.80g.validity': '100% Tax deduction benefit for donors',
    'compliance.csr1.title': 'CSR-1 MCA Registration',
    'compliance.csr1.reg': 'Reg: CSR00034982',
    'compliance.csr1.validity': 'Eligible for Corporate CSR Fund Deployment',
    'compliance.fcra.title': 'FCRA Foreign Clearance',
    'compliance.fcra.reg': 'Reg: 083780512',
    'compliance.fcra.validity': 'Approved for International Donations',
    'compliance.darpan.title': 'NITI Aayog Darpan Portal',
    'compliance.darpan.reg': 'ID: MH/2018/0192834',
    'compliance.darpan.validity': 'Government Verified NGO Partner',
    'compliance.statusActive': 'Active & Valid',
    'compliance.statusVerified': 'Verified',
    'compliance.statusApproved': 'Approved',

    // Operational Sections
    'dash.tasksTitle': 'Operational Tasks & Donor Follow-Ups',
    'dash.inventoryTitle': 'Inventory & Stock',
    'dash.recentInteractions': 'Recent WhatsApp & Donor Interactions',
    'dash.viewAll': 'View All',
    'dash.openWhatsapp': 'Open WhatsApp Outreach →',

    // Gate Register
    'gate.title': 'Gate Register Log',
    'gate.subtitle': 'Real-time visitor, donation & vehicle entry log at Palawi Center (01-Jan-26 to 30-Sep-26)',
    'gate.searchPlaceholder': 'Search visitor name, address, or mobile...',
    'gate.date': 'Date',
    'gate.visitorName': 'Visitor Name',
    'gate.mobileNo': 'Mobile No',
    'gate.address': 'Address',
    'gate.remarks': 'Purpose / Remarks',
    'gate.extraRemark': 'Donation Details / Items',
    'gate.createBtn': '+ Create Gate Log',
    'gate.voiceTitle': 'Volunteer Voice Assistant (Marathi / English)',
    'gate.voiceDesc': 'Speak notes in Marathi or English to auto-record visitor details or donation items',
    'gate.startVoice': 'Start Voice Assistant 🎙️',
    'gate.stopVoice': 'Stop Voice Assistant ⏹️',
    'gate.listeningMarathi': 'Listening in Marathi... Speak now',
    'gate.listeningEnglish': 'Listening in English... Speak now',
    'gate.applyVoiceText': 'Apply Voice Transcript',

    // Database & CRM
    'db.title': 'Database',
    'crm.title': 'Donor CRM',
    'records.title': 'Centralised Donor Records',
    'wa.title': 'WhatsApp Outreach',
  },
  mr: {
    // Nav & General
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.gateRegister': 'रजिस्टर लॉग',
    'nav.database': 'डेटाबेस',
    'nav.donorCrm': 'दाता नोंदणी',
    'nav.donorRecords': 'मध्यवर्ती दाता रेकॉर्ड',
    'nav.whatsapp': 'व्हॉट्सॲप संपर्क',
    'nav.proposalCreator': 'प्रस्ताव निर्मिती',
    'nav.reportGenerator': 'अहवाल जनरेटर',
    'nav.receiptGenerator': 'देणगी पावती',
    'nav.productsRevenue': 'उत्पादने व महसूल',
    'nav.employees': 'कर्मचारी',
    'nav.myDashboard': 'माझा डॅशबोर्ड',
    'nav.archives': 'पालवी अभिलेख (ड्राईव्ह)',
    'nav.workspace': 'पालवी कार्यक्षेत्र',
    'nav.addCsr': 'सीएसआर संधी जोडा',
    'nav.howItWorks': 'हे कसे कार्य करते',
    'nav.signIn': 'साइन इन',
    'nav.getStarted': 'सुरुवात करा',

    // Language
    'lang.select': 'भाषा',
    'lang.english': 'English',
    'lang.marathi': 'मराठी',

    // Dashboard Header & Stats
    'dash.title': 'डॅशबोर्ड',
    'dash.csrGrantsReceived': 'प्राप्त सीएसआर अनुदान',
    'dash.activePipeline': 'सक्रिय पाइपलाइन',
    'dash.prospectivePartners': 'संभाव्य सीएसआर भागीदार',
    'dash.whatsappDelivery': 'व्हॉट्सॲप प्रतिसाद दर',
    'dash.pledged': 'वचनबद्ध निधी',
    'dash.proposalsInReview': 'पुनरावलोकनातील प्रस्ताव',
    'dash.highEngagement': 'उच्च प्रतिसाद सहभाग',

    // Monthly Funding Chart
    'chart.monthlyFundingTitle': 'मासिक सीएसआर निधी: प्राप्त, उद्दिष्ट व आवश्यक निधी (₹)',
    'chart.received': 'प्राप्त निधी (₹)',
    'chart.target': 'उद्दिष्ट (₹)',
    'chart.requiredLine': 'आवश्यक निधी ओळ (₹)',
    'chart.pipelineStageTitle': 'सीएसआर पाइपलाइन टप्पा मूल्य',

    // NGO Compliance Section
    'compliance.title': 'स्वयंसेवी संस्था वैधानिक पालन व प्रमाणपत्रे',
    'compliance.subtitle': 'पालवी संस्थेची वैधानिक, कर व सीएसआर प्रमाणपत्रे',
    'compliance.12a.title': '१२A आयकर सवलत प्रमाणपत्र',
    'compliance.12a.reg': 'नोंदणी: AACTP1234F20214',
    'compliance.12a.validity': '२०२८ पर्यंत वैध (कर निर्धारण वर्ष २०२६-२७ सक्रिय)',
    'compliance.80g.title': '८०G कर सवलत (दात्यांसाठी)',
    'compliance.80g.reg': 'नोंदणी: AACTP1234F80G01',
    'compliance.80g.validity': 'दात्यांसाठी १००% कर सवलत लाभ',
    'compliance.csr1.title': 'CSR-1 MCA कॉर्पोरेट नोंदणी',
    'compliance.csr1.reg': 'नोंदणी: CSR00034982',
    'compliance.csr1.validity': 'कॉर्पोरेट सीएसआर निधीसाठी पात्र',
    'compliance.fcra.title': 'FCRA परदेशी अनुदान मंजुरी',
    'compliance.fcra.reg': 'नोंदणी: 083780512',
    'compliance.fcra.validity': 'आंतरराष्ट्रीय देणग्यांसाठी मंजूर',
    'compliance.darpan.title': 'नीती आयोग दर्पण नोंदणी',
    'compliance.darpan.reg': 'आयडी: MH/2018/0192834',
    'compliance.darpan.validity': 'शासकीय प्रमाणित एनजीओ भागीदार',
    'compliance.statusActive': 'सक्रिय व वैध',
    'compliance.statusVerified': 'प्रमाणित',
    'compliance.statusApproved': 'मंजूर',

    // Operational Sections
    'dash.tasksTitle': 'कार्यप्रणाली व दाता पाठपुरावा',
    'dash.inventoryTitle': 'वस्तू व साठा',
    'dash.recentInteractions': 'अलिकडील व्हॉट्सॲप व संवाद',
    'dash.viewAll': 'सर्व पहा',
    'dash.openWhatsapp': 'व्हॉट्सॲप संपर्क उघडा →',

    // Gate Register
    'gate.title': 'गेट रजिस्टर नोंद',
    'gate.subtitle': 'पालवी केंद्र येथील प्रत्यक्ष भेट, देणगी व साहित्य नोंद (०१-जानेवारी-२६ ते ३०-सप्टेंबर-२६)',
    'gate.searchPlaceholder': 'भेट देणाऱ्याचे नाव, पत्ता किंवा मोबाईल शोधा...',
    'gate.date': 'दिनांक',
    'gate.visitorName': 'भेट देणाऱ्याचे नाव',
    'gate.mobileNo': 'मोबाईल नंबर',
    'gate.address': 'पत्ता',
    'gate.remarks': 'भेट कारण / शेरा',
    'gate.extraRemark': 'प्राप्त साहित्य / विशेष तपशील',
    'gate.createBtn': '+ नवीन गेट नोंद करा',
    'gate.voiceTitle': 'स्वयंसेवक व्हॉइस असिस्टंट (मराठी / इंग्रजी)',
    'gate.voiceDesc': 'भेट देणाऱ्याची माहिती किंवा देणगी साहित्य मराठी किंवा इंग्रजीत बोलून नोंदवा',
    'gate.startVoice': 'व्हॉइस असिस्टंट सुरू करा 🎙️',
    'gate.stopVoice': 'व्हॉइस थांबवा ⏹️',
    'gate.listeningMarathi': 'मराठीत ऐकत आहे... आता बोला',
    'gate.listeningEnglish': 'इंग्रजीत ऐकत आहे... आता बोला',
    'gate.applyVoiceText': 'व्हॉइस मजकूर फॉर्ममध्ये जोडा',

    // Database & CRM
    'db.title': 'डेटाबेस',
    'crm.title': 'दाता नोंदणी',
    'records.title': 'मध्यवर्ती दाता रेकॉर्ड',
    'wa.title': 'व्हॉट्सॲप संपर्क',
  },
};

/**
 * Marathi labels for data values (statuses, stages, categories, ...) that are
 * stored in English. Values not listed here are shown as stored.
 */
const VALUE_MR: Record<string, string> = {
  // Generic statuses
  'Active': 'सक्रिय',
  'Inactive': 'निष्क्रिय',
  'Verified': 'प्रमाणित',
  'Pending': 'प्रलंबित',
  'Approved': 'मंजूर',
  'Rejected': 'नामंजूर',
  'Completed': 'पूर्ण',
  'In Progress': 'प्रगतीपथावर',
  'Present': 'उपस्थित',
  'On Leave': 'रजेवर',
  'Received': 'प्राप्त',
  'Delivered': 'पोहोचला',
  'Sent': 'पाठवला',
  'Read': 'वाचला',
  'Failed': 'अयशस्वी',
  'Queued': 'रांगेत',
  'delivered': 'पोहोचला',
  'sent': 'पाठवला',
  'read': 'वाचला',
  'failed': 'अयशस्वी',
  'queued': 'रांगेत',
  'outbound': 'पाठवलेला',
  'inbound': 'आलेला',
  'All': 'सर्व',
  'Yes': 'होय',
  'No': 'नाही',

  // CSR partner status / priority
  'Prospective': 'संभाव्य',
  'Contacted': 'संपर्क साधला',
  'Proposal Submitted': 'प्रस्ताव सादर',
  'Proposal Sent': 'प्रस्ताव पाठवला',
  'Eligible': 'पात्र',
  'Pledged': 'वचनबद्ध',
  'Partnered': 'भागीदार',
  'Closed': 'बंद',
  'High': 'उच्च',
  'Medium': 'मध्यम',
  'Low': 'कमी',
  'Urgent': 'तातडीचे',
  'Normal': 'सामान्य',

  // Focus areas
  'Education': 'शिक्षण',
  'Environmental Sustainability': 'पर्यावरण संवर्धन',
  'Healthcare & Sanitation': 'आरोग्य व स्वच्छता',
  'Skill Development': 'कौशल्य विकास',
  'Rural Infrastructure': 'ग्रामीण पायाभूत सुविधा',
  'Disaster Relief': 'आपत्ती निवारण',
  'Women Empowerment': 'महिला सक्षमीकरण',
  'Education & Child Care': 'शिक्षण व बालसंगोपन',
  'Healthcare & Rations': 'आरोग्य व शिधा',
  'General Support': 'सर्वसाधारण सहाय्य',
  'Healthcare & Nutrition': 'आरोग्य व पोषण',

  // Pipeline stages
  'Prospecting': 'संभाव्य शोध',
  'Initial Contact': 'प्राथमिक संपर्क',
  'Meeting Scheduled': 'बैठक निश्चित',
  'Negotiation': 'वाटाघाटी',
  'Funded': 'निधी प्राप्त',
  'Declined': 'नाकारले',
  'Won': 'यशस्वी',
  'Lost': 'अयशस्वी',

  // Interaction channels
  'WhatsApp': 'व्हॉट्सॲप',
  'Email': 'ईमेल',
  'Phone Call': 'फोन कॉल',
  'Call': 'फोन कॉल',
  'In-Person Meeting': 'प्रत्यक्ष भेट',
  'Proposal Delivery': 'प्रस्ताव सुपूर्द',

  // Donor types / compliance / health
  'Individual': 'वैयक्तिक',
  'Corporate': 'कॉर्पोरेट',
  'Corporate CSR': 'कॉर्पोरेट सीएसआर',
  'Private Foundation': 'खाजगी प्रतिष्ठान',
  'HNWI': 'उच्च उत्पन्न दाता',
  'Government Grant': 'शासकीय अनुदान',
  'Trust': 'ट्रस्ट',
  'Verified (12A/80G)': 'प्रमाणित (12A/80G)',
  'Pending Verification': 'पडताळणी प्रलंबित',
  'FCRA Approved': 'FCRA मंजूर',
  'Requires Review': 'पुनरावलोकन आवश्यक',
  'Excellent': 'उत्कृष्ट',
  'Good': 'चांगले',
  'Needs Attention': 'लक्ष देणे आवश्यक',
  'At Risk': 'धोक्यात',
  'Pending Bank Clearance': 'बँक मंजुरी प्रलंबित',

  // Payment modes
  'Bank Transfer': 'बँक हस्तांतरण',
  'Cash': 'रोख',
  'Cheque': 'धनादेश',
  'UPI': 'यूपीआय',
  'Online': 'ऑनलाइन',
  'NEFT': 'NEFT',

  // Inventory
  'Food Grains': 'अन्नधान्य',
  'Grocery': 'किराणा',
  'Clothing': 'कपडे',
  'Kg': 'किलो',
  'Litres': 'लिटर',
  'Sets': 'संच',
  'Units': 'नग',
  'In Stock': 'उपलब्ध',
  'Low Stock': 'कमी साठा',
  'Fully Dispatched': 'पूर्ण वाटप',

  // Tasks
  'CSR Proposal': 'सीएसआर प्रस्ताव',
  'Donor Follow-Up': 'दाता पाठपुरावा',
  'Compliance Audit': 'अनुपालन लेखापरीक्षण',
  'Impact Report': 'प्रभाव अहवाल',
  'WhatsApp Outreach': 'व्हॉट्सॲप संपर्क',

  // Gate register purposes
  'Visit': 'भेट',
  'Donation': 'देणगी',
  'Maintenance': 'देखभाल',
  'Operations': 'कामकाज',
  'Birthday': 'वाढदिवस',
  'Food Donation': 'अन्नदान',
  'Meeting': 'बैठक',
  'Delivery': 'साहित्य पुरवठा',
  'Medical': 'वैद्यकीय',
  'Medical Visit': 'वैद्यकीय भेट',
  'Vehicle': 'वाहन',
  'Other': 'इतर',

  // Months
  'January': 'जानेवारी',
  'February': 'फेब्रुवारी',
  'March': 'मार्च',
  'April': 'एप्रिल',
  'May': 'मे',
  'June': 'जून',
  'July': 'जुलै',
  'August': 'ऑगस्ट',
  'September': 'सप्टेंबर',
  'October': 'ऑक्टोबर',
  'November': 'नोव्हेंबर',
  'December': 'डिसेंबर',
  'Jan': 'जाने',
  'Feb': 'फेब्रु',
  'Mar': 'मार्च',
  'Apr': 'एप्रि',
  'Jun': 'जून',
  'Jul': 'जुलै',
  'Aug': 'ऑग',
  'Sep': 'सप्टें',
  'Oct': 'ऑक्टो',
  'Nov': 'नोव्हें',
  'Dec': 'डिसें',

  // Roles
  'Admin': 'प्रशासक',
  'CSR Admin': 'सीएसआर प्रशासक',
  'Employee': 'कर्मचारी',
  'Operations Head': 'कामकाज प्रमुख',

  // Gate register purposes as recorded (spellings kept as in the paper register)
  'visit': 'भेट',
  'Accompany Visitor': 'अभ्यागतासोबत',
  'School/College Visit': 'शाळा/महाविद्यालय भेट',
  'School/Collage Visit': 'शाळा/महाविद्यालय भेट',
  'school/Collage Visit': 'शाळा/महाविद्यालय भेट',
  'Birthday Celebration': 'वाढदिवस साजरा',
  'New Palawi Admission': 'पालवी नवीन प्रवेश',
  'New Admission': 'नवीन प्रवेश',
  'Job/Internship': 'नोकरी/इंटर्नशिप',
  'Field Work': 'क्षेत्रकार्य',
  'Student Reletive': 'विद्यार्थ्याचे नातेवाईक',
  'Student/staff Reletive': 'विद्यार्थी/कर्मचारी नातेवाईक',
  'Food Meal Donation': 'भोजन देणगी',
  'Children Meet': 'मुलांची भेट',
  'Payment/Check Receive': 'रक्कम/धनादेश स्वीकृती',
  'Meet colleagues from Palawi': 'पालवीतील सहकाऱ्यांची भेट',

  // Gate register categories (normalised from the Jan–Sep 2026 register)
  'Regular Visitor': 'नियमित अभ्यागत',
  'Reference': 'संदर्भ',
  'Social Media': 'सोशल मीडिया',
  'Payment / Cheque Received': 'रक्कम/धनादेश स्वीकृती',
  'Children / Relative Meet': 'मुले/नातेवाईक भेट',
  'Staff Meet': 'सहकाऱ्यांची भेट',
  'Marriage Enquiry': 'विवाह चौकशी',
  'Other Organisation': 'इतर संस्था',
  'Inspection': 'तपासणी',
  'Activity / Guidance': 'उपक्रम / मार्गदर्शन',
  'Media / Photography': 'माध्यम / छायाचित्रण',
  'Event / Award': 'कार्यक्रम / पुरस्कार',
  'Delivery / Service': 'पुरवठा / सेवा',
  'Not Specified': 'नमूद नाही',

  // Source register categories
  'OPD & Treatment': 'ओपीडी व उपचार',
  'Medicines & Stock': 'औषधे व साठा',
  'Health Monitoring': 'आरोग्य तपासणी',
  'Hygiene & Child Care': 'स्वच्छता व बालसंगोपन',
  'Assets': 'उपकरणे व मालमत्ता',
  'Attendance & Stores': 'हजेरी व भांडार',

  // Places
  'Pandharpur': 'पंढरपूर',
  'Akluj': 'अकलूज',
  'Mahud': 'महूद',
  'Umbare': 'उंबरे',
  'Solapur': 'सोलापूर',
  'Karkamb': 'करकंब',
  'Korti': 'कोर्टी',
  'Gopalpur': 'गोपाळपूर',
  'Pune': 'पुणे',
  'Mumbai': 'मुंबई',

  // Medical monitoring
  'CD4 Count': 'सीडी४ काउंट',
  'HB (Hemoglobin)': 'एचबी (हिमोग्लोबिन)',
  'CBC': 'सीबीसी',
  'Viral Load (VL)': 'व्हायरल लोड',
  'Suppressed / Stable': 'नियंत्रित / स्थिर',
  'Stable': 'स्थिर',
  'Requires Iron Supplement': 'लोह पूरक आवश्यक',
  'Monitor Diet': 'आहारावर लक्ष ठेवा',
  'Iron therapy active': 'लोह उपचार सुरू',
  'Good Immunity': 'चांगली रोगप्रतिकारशक्ती',

  // Sample people and organisations in the seed data
  'Shital Wagh': 'शीतल वाघ',
  'Shital Tai': 'शीतल ताई',
  'Tukaram Belkar': 'तुकाराम बेलकर',
  'Archana Dudam': 'अर्चना दुदाम',
  'Aarohi Shinde': 'आरोही शिंदे',
  'Shri Ramesh Kothari': 'श्री. रमेश कोठारी',
  'Smt. Sunita Doshi': 'सौ. सुनीता दोशी',
  'Rahul Deshmukh': 'राहुल देशमुख',
  'Anjali Kulkarni': 'अंजली कुलकर्णी',
  'Solapur Social Welfare Foundation': 'सोलापूर समाज कल्याण फाउंडेशन',
  'Pandharpur Seva Trust': 'पंढरपूर सेवा ट्रस्ट',
  'Solapur Industries Association': 'सोलापूर उद्योग संघटना',
  'Pandharpur Sugar Mills CSR': 'पंढरपूर साखर कारखाना सीएसआर',
  'Bank Of India Pandharpur': 'बँक ऑफ इंडिया, पंढरपूर',
  'Bank Of India (Pandharpur Main)': 'बँक ऑफ इंडिया, पंढरपूर मुख्य शाखा',
  'Palawi Admin': 'पालवी प्रशासक',
  'Child Education Sponsor': 'बाल शिक्षण प्रायोजकत्व',
  'Phenyl & Soap': 'फिनाईल व साबण',
  'TND': 'विषाणू आढळला नाही',
  'TND (Target Not Detected)': 'विषाणू आढळला नाही (TND)',
  '8453 (ART No)': '8453 (एआरटी क्रमांक)',
  'सर्वानी गोळ्या घेतल्या (Pinky).': 'सर्वानी गोळ्या घेतल्या (पिंकी).',

  // Products & sales
  'Handicrafts': 'हस्तकला',
  'Apparel & Bags': 'कपडे व पिशव्या',
  'Food & Grains': 'अन्न व धान्य',
  'Health & Wellness': 'आरोग्य व निरोगीपणा',
  'Educational': 'शैक्षणिक',
  'Out of Stock': 'साठा संपला',
  'UPI / Online Transfer': 'यूपीआय / ऑनलाइन हस्तांतरण',
  'Bank Transfer / NEFT': 'बँक हस्तांतरण / NEFT',

  // Templates
  'APPROVED': 'मंजूर',
  'PENDING': 'प्रलंबित',
  'REJECTED': 'नामंजूर',
};

const MONTH_YEAR = /^([A-Za-z]+) (\d{4})$/;
const MARATHI_DIGITS = '०१२३४५६७८९';
const toMarathiDigits = (text: string) => text.replace(/[0-9]/g, (d) => MARATHI_DIGITS[Number(d)]);

const DEVANAGARI = /[ऀ-ॿ]/;
const LATIN = /[A-Za-z]/;
const BILINGUAL = /^(.*\S)\s*\(([^()]*)\)\s*$/;

/**
 * Data recorded in both languages, e.g. "Given (दिले)" or "शीतल वाघ (Shital Wagh)":
 * returns only the half written in the requested language. Any other text is
 * returned unchanged.
 */
export function pickLanguage(value: string, language: Language): string {
  const match = BILINGUAL.exec(value);
  if (!match) return value;
  const [, outside, inside] = match;
  const outsideIsMr = DEVANAGARI.test(outside) && !LATIN.test(outside);
  const insideIsMr = DEVANAGARI.test(inside) && !LATIN.test(inside);
  const outsideIsEn = LATIN.test(outside) && !DEVANAGARI.test(outside);
  const insideIsEn = LATIN.test(inside) && !DEVANAGARI.test(inside);
  if (outsideIsEn && insideIsMr) return language === 'mr' ? inside.trim() : outside.trim();
  if (outsideIsMr && insideIsEn) return language === 'mr' ? outside.trim() : inside.trim();
  return value;
}

/** English labels for values that are recorded only in Marathi. */
const VALUE_EN: Record<string, string> = {
  'नाही': 'No',
  'होय': 'Yes',
  // ART tablet register notes
  'सर्वानी गोळ्या घेतल्या.': 'Everyone took their tablets.',
  'सर्वानी गोळ्या घेतल्या (Pinky).': 'Everyone took their tablets (Pinky).',
  'शिल्पा, दिपीका गोळ्या घेतल्या नाही.': 'Shilpa and Dipika did not take their tablets.',
  'दिपीका, ऋतुजा यांनी गोळ्या घेतल्या नाही.': 'Dipika and Rutuja did not take their tablets.',
  'गीता, दिपीका, शिल्पा, ऋतुजा यांनी गोळ्या घेतल्या नाही.': 'Geeta, Dipika, Shilpa and Rutuja did not take their tablets.',
  'विठाई, अनन्या, आलिशा, मुक्ता, श्रद्धा यांनी गोळ्या घेतल्या नाही.': 'Vithai, Ananya, Alisha, Mukta and Shraddha did not take their tablets.',
};

// "05-Nov-2026", "30-Sep-26"
const DAY_MON_YEAR = /^(\d{1,2})-([A-Z][a-z]{2})-(\d{2}|\d{4})$/;

/** A stored data value shown in the given language (see VALUE_MR and pickLanguage). */
export function translateValue(value: string | null | undefined, language: Language): string {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (language === 'mr') {
    if (VALUE_MR[text]) return VALUE_MR[text];
    // "August 2026" -> "ऑगस्ट २०२६"
    const monthYear = MONTH_YEAR.exec(text);
    if (monthYear && VALUE_MR[monthYear[1]]) return `${VALUE_MR[monthYear[1]]} ${toMarathiDigits(monthYear[2])}`;
    // "05-Nov-2026" -> "०५-नोव्हें-२०२६"
    const date = DAY_MON_YEAR.exec(text);
    if (date && VALUE_MR[date[2]]) return toMarathiDigits(`${date[1]}-`) + VALUE_MR[date[2]] + toMarathiDigits(`-${date[3]}`);
  } else if (VALUE_EN[text]) {
    return VALUE_EN[text];
  }
  return pickLanguage(text, language);
}

/**
 * A record field in the current language: uses `<field>Mr` (e.g. titleMr) when
 * Marathi is selected and the record has one, otherwise the field itself run
 * through translateValue.
 */
export function translateField(record: Record<string, any> | null | undefined, field: string, language: Language): string {
  if (!record) return '';
  if (language === 'mr' && typeof record[`${field}Mr`] === 'string' && record[`${field}Mr`]) return record[`${field}Mr`];
  return translateValue(record[field], language);
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return localStorage.getItem('palawi_app_lang') === 'mr' ? 'mr' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('palawi_app_lang', lang);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this session only.
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
  }, [language]);

  const t = (key: string): string => translations[language][key] || translations['en'][key] || key;

  const tr = (en: string, mr: string): string => (language === 'mr' ? mr : en);

  const tv = (value: string | null | undefined): string => translateValue(value, language);

  const tf = (record: Record<string, any> | null | undefined, field: string): string =>
    translateField(record, field, language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr, tv, tf }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
