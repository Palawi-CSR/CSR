export interface MenstrualHygieneEntry {
  id: string;
  srNo: number;
  monthYear: string; // e.g. "October 2021"
  monthYearMr: string; // "ऑक्टोबर २०२१"
  residentNameMr: string;
  residentNameEn: string;
  age: number;
  sanitaryPadsCount: number;
  distributionDate: string;
  healthNotesMr: string;
  healthNotesEn: string;
  signedBy: string;
}

export const AUTHENTIC_MENSTRUAL_HYGIENE_REGISTER: MenstrualHygieneEntry[] = [
  // 2026 Entries (Recent)
  {
    id: 'mhr_26_11',
    srNo: 1,
    monthYear: 'November 2026',
    monthYearMr: 'नोव्हेंबर २०२६',
    residentNameMr: 'आरती संतोष शिंदे',
    residentNameEn: 'Aarohi Santosh Shinde',
    age: 16,
    sanitaryPadsCount: 12,
    distributionDate: '05-Nov-2026',
    healthNotesMr: 'नियमित व सुरक्षित स्वच्छता राखली जात आहे. पौष्टिक आहार व सेंद्रिय आयर्न गोळ्या सुरू आहेत.',
    healthNotesEn: 'Maintaining regular and safe hygiene. Nutritious diet and organic iron supplements ongoing.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_26_10',
    srNo: 2,
    monthYear: 'October 2026',
    monthYearMr: 'ऑक्टोबर २०२६',
    residentNameMr: 'प्रियांका सुनील कांबळे',
    residentNameEn: 'Priyanka Sunil Kamble',
    age: 17,
    sanitaryPadsCount: 12,
    distributionDate: '04-Oct-2026',
    healthNotesMr: 'आरोग्य उत्तम असून योग व व्यायामाचे सत्र नियमित चालू आहे.',
    healthNotesEn: 'Good health status, regular yoga and exercise sessions active.',
    signedBy: 'अर्चना दुदाम (Archana Dudam)'
  },
  {
    id: 'mhr_26_09',
    srNo: 3,
    monthYear: 'September 2026',
    monthYearMr: 'सप्टेंबर २०२६',
    residentNameMr: 'वैशाली बाळू जाधव',
    residentNameEn: 'Vaishali Balu Jadhav',
    age: 15,
    sanitaryPadsCount: 10,
    distributionDate: '03-Sep-2026',
    healthNotesMr: 'वैयक्तिक स्वच्छतेबाबत विशेष समुपदेशन पूर्ण झाले.',
    healthNotesEn: 'Special counseling regarding personal hygiene completed successfully.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_26_08',
    srNo: 4,
    monthYear: 'August 2026',
    monthYearMr: 'ऑगस्ट २०२६',
    residentNameMr: 'पूजा गणेश मोरे',
    residentNameEn: 'Pooja Ganesh More',
    age: 16,
    sanitaryPadsCount: 12,
    distributionDate: '02-Aug-2026',
    healthNotesMr: 'सर्व निवासिनींची आरोग्य तपासणी डॉ. कुलकर्णी यांच्यामार्फत करण्यात आली.',
    healthNotesEn: 'Health checkup for all residents conducted by Dr. Kulkarni.',
    signedBy: 'तुकाराम बेलकर (Tukaram Belkar)'
  },
  {
    id: 'mhr_26_07',
    srNo: 5,
    monthYear: 'July 2026',
    monthYearMr: 'जुलै २०२६',
    residentNameMr: 'नेहा संजय गायकवाड',
    residentNameEn: 'Neha Sanjay Gaikwad',
    age: 14,
    sanitaryPadsCount: 10,
    distributionDate: '01-Jul-2026',
    healthNotesMr: 'पावसाळ्याच्या पार्श्वभूमीवर जंतूनाशक व स्वच्छतेचे वाटप.',
    healthNotesEn: 'Disinfectant and hygiene kit distribution in view of monsoon season.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_26_06',
    srNo: 6,
    monthYear: 'June 2026',
    monthYearMr: 'जून २०२६',
    residentNameMr: 'दीपा रमेश थोरात',
    residentNameEn: 'Deepa Ramesh Thorat',
    age: 17,
    sanitaryPadsCount: 12,
    distributionDate: '03-Jun-2026',
    healthNotesMr: 'शालेय सत्र सुरू झाल्यामुळे आरोग्य व स्वच्छता किट वितरित.',
    healthNotesEn: 'Health and hygiene kits distributed upon commencement of school term.',
    signedBy: 'अर्चना दुदाम (Archana Dudam)'
  },
  {
    id: 'mhr_26_05',
    srNo: 7,
    monthYear: 'May 2026',
    monthYearMr: 'मे २०२६',
    residentNameMr: 'कविता अशोक पवार',
    residentNameEn: 'Kavita Ashok Pawar',
    age: 15,
    sanitaryPadsCount: 12,
    distributionDate: '04-May-2026',
    healthNotesMr: 'उन्हाळी शिबीर व पौष्टिक आहार मार्गदर्शक सत्र संपन्न.',
    healthNotesEn: 'Summer camp and nutritious diet guidance session completed.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_26_04',
    srNo: 8,
    monthYear: 'April 2026',
    monthYearMr: 'एप्रिल २०२६',
    residentNameMr: 'सविता अनंतराव देशमुख',
    residentNameEn: 'Savita Anandrao Deshmukh',
    age: 16,
    sanitaryPadsCount: 10,
    distributionDate: '02-Apr-2026',
    healthNotesMr: 'मासिक पाळी व्यवस्थापन कार्यशाळा आयोजित.',
    healthNotesEn: 'Menstrual hygiene management workshop organized.',
    signedBy: 'तुकाराम बेलकर (Tukaram Belkar)'
  },
  {
    id: 'mhr_26_03',
    srNo: 9,
    monthYear: 'March 2026',
    monthYearMr: 'मार्च २०२६',
    residentNameMr: 'सुवर्णा बाबासाहेब जगताप',
    residentNameEn: 'Suvarna Babasaheb Jagtap',
    age: 17,
    sanitaryPadsCount: 12,
    distributionDate: '03-Mar-2026',
    healthNotesMr: 'महिला दिन विशेष आरोग्य शिबीर व स्रेहसंमेलन.',
    healthNotesEn: 'Women\'s Day special health camp and gathering.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_26_02',
    srNo: 10,
    monthYear: 'February 2026',
    monthYearMr: 'फेब्रुवारी २०२६',
    residentNameMr: 'रुपाली विठ्ठल सातपुते',
    residentNameEn: 'Rupali Vitthal Satpute',
    age: 15,
    sanitaryPadsCount: 10,
    distributionDate: '02-Feb-2026',
    healthNotesMr: 'नियमित हीमोग्लोबिन तपासणी व योग्य आहार मार्गदर्शन.',
    healthNotesEn: 'Regular hemoglobin checkup and proper diet guidance.',
    signedBy: 'अर्चना दुदाम (Archana Dudam)'
  },
  {
    id: 'mhr_26_01',
    srNo: 11,
    monthYear: 'January 2026',
    monthYearMr: 'जानेवारी २०२६',
    residentNameMr: 'मनिषा दत्तात्रय लोखंडे',
    residentNameEn: 'Manisha Dattatray Lokhande',
    age: 16,
    sanitaryPadsCount: 12,
    distributionDate: '04-Jan-2026',
    healthNotesMr: 'नवीन वर्षाची सुरुवात आरोग्य व योग शिबिराने.',
    healthNotesEn: 'New Year commenced with health and yoga camp.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },

  // 2025 Entries
  {
    id: 'mhr_25_12',
    srNo: 12,
    monthYear: 'December 2025',
    monthYearMr: 'डिसेंबर २०२५',
    residentNameMr: 'आरती संतोष शिंदे',
    residentNameEn: 'Aarohi Santosh Shinde',
    age: 15,
    sanitaryPadsCount: 12,
    distributionDate: '03-Dec-2025',
    healthNotesMr: 'हिवाळी ऋतूसाठी विशेष पौष्टिक लाडू व स्वच्छता वाटप.',
    healthNotesEn: 'Special nutritious laddoos and hygiene kit distribution for winter season.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },
  {
    id: 'mhr_25_06',
    srNo: 13,
    monthYear: 'June 2025',
    monthYearMr: 'जून २०२५',
    residentNameMr: 'प्रियांका सुनील कांबळे',
    residentNameEn: 'Priyanka Sunil Kamble',
    age: 16,
    sanitaryPadsCount: 12,
    distributionDate: '02-Jun-2025',
    healthNotesMr: 'शाळेच्या पहिल्या दिवशी स्वच्छता किटचे वाटप.',
    healthNotesEn: 'Hygiene kits distributed on the first day of school.',
    signedBy: 'अर्चना दुदाम (Archana Dudam)'
  },

  // 2024 Entries
  {
    id: 'mhr_24_12',
    srNo: 14,
    monthYear: 'December 2024',
    monthYearMr: 'डिसेंबर २०२४',
    residentNameMr: 'वैशाली बाळू जाधव',
    residentNameEn: 'Vaishali Balu Jadhav',
    age: 14,
    sanitaryPadsCount: 10,
    distributionDate: '04-Dec-2024',
    healthNotesMr: 'वैयक्तिक आरोग्य व स्वच्छतेवर विशेष व्याख्यान.',
    healthNotesEn: 'Special lecture on personal health and hygiene.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  },

  // 2021 Entries (Earliest from register start)
  {
    id: 'mhr_21_10',
    srNo: 15,
    monthYear: 'October 2021',
    monthYearMr: 'ऑक्टोबर २०२१',
    residentNameMr: 'आरती संतोष शिंदे',
    residentNameEn: 'Aarohi Santosh Shinde',
    age: 13,
    sanitaryPadsCount: 10,
    distributionDate: '05-Oct-2021',
    healthNotesMr: 'पालवी संस्थेमार्फत मासिक पाळी स्वच्छता रजिस्टरची अधिकृत सुरुवात.',
    healthNotesEn: 'Official commencement of Menstrual Hygiene Register by Palawi Foundation.',
    signedBy: 'शीतल वाघ (Shital Wagh)'
  }
];
