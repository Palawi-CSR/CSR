export interface ARTTabletEntry {
  id: string;
  srNo: number;
  date: string; // e.g. "03/10/2025", "13/11/2026"
  sessionTime: 'Morning (सकाळी)' | 'Night (रात्री)';
  status: 'Given to All (सर्वांनी गोळ्या घेतल्या)' | 'Missed / Not Taken (काही जणांनी घेतल्या नाहीत)';
  details: string;
}

export const AUTHENTIC_ART_TABLET_REGISTER: ARTTabletEntry[] = [
  { id: 'art_1', srNo: 1, date: '03/10/2025', sessionTime: 'Morning (सकाळी)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या.' },
  { id: 'art_2', srNo: 2, date: '03/10/2025', sessionTime: 'Night (रात्री)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या.' },
  { id: 'art_3', srNo: 3, date: '04/10/2025', sessionTime: 'Morning (सकाळी)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या.' },
  { id: 'art_4', srNo: 4, date: '04/10/2025', sessionTime: 'Night (रात्री)', status: 'Missed / Not Taken (काही जणांनी घेतल्या नाहीत)', details: 'शिल्पा, दिपीका गोळ्या घेतल्या नाही.' },
  { id: 'art_5', srNo: 5, date: '05/10/2025', sessionTime: 'Morning (सकाळी)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या.' },
  { id: 'art_6', srNo: 6, date: '05/10/2025', sessionTime: 'Night (रात्री)', status: 'Missed / Not Taken (काही जणांनी घेतल्या नाहीत)', details: 'गीता, दिपीका, शिल्पा, ऋतुजा यांनी गोळ्या घेतल्या नाही.' },
  { id: 'art_7', srNo: 7, date: '06/10/2025', sessionTime: 'Morning (सकाळी)', status: 'Missed / Not Taken (काही जणांनी घेतल्या नाहीत)', details: 'विठाई, अनन्या, आलिशा, मुक्ता, श्रद्धा यांनी गोळ्या घेतल्या नाही.' },
  { id: 'art_8', srNo: 8, date: '06/10/2025', sessionTime: 'Night (रात्री)', status: 'Missed / Not Taken (काही जणांनी घेतल्या नाहीत)', details: 'दिपीका, ऋतुजा यांनी गोळ्या घेतल्या नाही.' },
  { id: 'art_9', srNo: 9, date: '13/11/2026', sessionTime: 'Morning (सकाळी)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या (Pinky).' },
  { id: 'art_10', srNo: 10, date: '13/11/2026', sessionTime: 'Night (रात्री)', status: 'Given to All (सर्वांनी गोळ्या घेतल्या)', details: 'सर्वानी गोळ्या घेतल्या (Pinky).' }
];
