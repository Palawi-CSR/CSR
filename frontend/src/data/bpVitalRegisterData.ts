export interface BPVitalEntry {
  id: string;
  srNo: number;
  date: string; // e.g. "19/07/2026", "26/07/2026", "08/11/2026"
  nameMr: string;
  nameEn: string;
  bp: string; // e.g. "121/70 mmHg"
  spo2: string; // e.g. "98%"
  prBpm: string; // e.g. "73/min"
  weight: string; // e.g. "57.9 kg"
}

export const AUTHENTIC_BP_VITAL_REGISTER: BPVitalEntry[] = [
  // 19/07/2026 Entries
  { id: 'bp_1', srNo: 1, date: '19/07/2026', nameMr: 'सारिका', nameEn: 'Sarika', bp: '121/70 mmHg', spo2: '98%', prBpm: '73/min', weight: '57.9 kg' },
  { id: 'bp_2', srNo: 2, date: '19/07/2026', nameMr: 'अनिता केंद्रे', nameEn: 'Anita Kendre', bp: '115/72 mmHg', spo2: '99%', prBpm: '75/min', weight: '50.3 kg' },
  { id: 'bp_3', srNo: 3, date: '19/07/2026', nameMr: 'तुलसी', nameEn: 'Tulsi', bp: '126/76 mmHg', spo2: '96%', prBpm: '96/min', weight: '55.0 kg' },
  { id: 'bp_4', srNo: 4, date: '19/07/2026', nameMr: 'सुप्रिया जाधव', nameEn: 'Supriya Jadhav', bp: '91/64 mmHg', spo2: '98%', prBpm: '91/min', weight: '66.5 kg' },
  { id: 'bp_5', srNo: 5, date: '19/07/2026', nameMr: 'देवता भिसे', nameEn: 'Devta Bhise', bp: '128/71 mmHg', spo2: '97%', prBpm: '77/min', weight: '47.4 kg' },
  { id: 'bp_6', srNo: 6, date: '19/07/2026', nameMr: 'स्वाती पोतदार', nameEn: 'Swati Potdar', bp: '104/62 mmHg', spo2: '90%', prBpm: '98/min', weight: '44.0 kg' },
  { id: 'bp_7', srNo: 7, date: '19/07/2026', nameMr: 'देवई लवटे', nameEn: 'Dewai Lawte', bp: '118/78 mmHg', spo2: '95%', prBpm: '74/min', weight: '52.4 kg' },
  { id: 'bp_8', srNo: 8, date: '19/07/2026', nameMr: 'सिमा सुरते', nameEn: 'Seema Surte', bp: '178/77 mmHg', spo2: '98%', prBpm: '76/min', weight: '49.3 kg' },
  { id: 'bp_9', srNo: 9, date: '19/07/2026', nameMr: 'मीरा ताई', nameEn: 'Meera Tai', bp: '99/60 mmHg', spo2: '98%', prBpm: '70/min', weight: '38.6 kg' },
  { id: 'bp_10', srNo: 10, date: '19/07/2026', nameMr: 'प्राजक्ता शहा', nameEn: 'Prajakta Shah', bp: '91/58 mmHg', spo2: '84%', prBpm: '100/min', weight: '46.5 kg' },

  // 26/07/2026 Entries
  { id: 'bp_11', srNo: 1, date: '26/07/2026', nameMr: 'सारिका', nameEn: 'Sarika', bp: '103/74 mmHg', spo2: '89%', prBpm: '84/min', weight: '57.4 kg' },
  { id: 'bp_12', srNo: 2, date: '26/07/2026', nameMr: 'अनिता केंद्रे', nameEn: 'Anita Kendre', bp: '100/71 mmHg', spo2: '97%', prBpm: '81/min', weight: '49.7 kg' },
  { id: 'bp_13', srNo: 3, date: '26/07/2026', nameMr: 'तुलसी', nameEn: 'Tulsi', bp: '112/71 mmHg', spo2: '98%', prBpm: '91/min', weight: '55.1 kg' },
  { id: 'bp_14', srNo: 4, date: '26/07/2026', nameMr: 'सुप्रिया जाधव', nameEn: 'Supriya Jadhav', bp: '89/53 mmHg', spo2: '98%', prBpm: '85/min', weight: '66.6 kg' },
  { id: 'bp_15', srNo: 5, date: '26/07/2026', nameMr: 'देवता भिसे', nameEn: 'Devta Bhise', bp: '107/64 mmHg', spo2: '95%', prBpm: '76/min', weight: '47.4 kg' },

  // 08/11/2026 Entries (Recent)
  { id: 'bp_16', srNo: 1, date: '08/11/2026', nameMr: 'सुप्रिया जाधव', nameEn: 'Supriya Jadhav', bp: '109/72 mmHg', spo2: '90%', prBpm: '91/min', weight: '66.5 kg' },
  { id: 'bp_17', srNo: 2, date: '08/11/2026', nameMr: 'सुगंधा', nameEn: 'Sugandha', bp: '96/53 mmHg', spo2: '98%', prBpm: '104/min', weight: '46.2 kg' },
  { id: 'bp_18', srNo: 3, date: '08/11/2026', nameMr: 'तुलसी', nameEn: 'Tulsi', bp: '74/55 mmHg', spo2: '99%', prBpm: '103/min', weight: '54.1 kg' },
  { id: 'bp_19', srNo: 4, date: '08/11/2026', nameMr: 'वर्षा', nameEn: 'Varsha', bp: '106/74 mmHg', spo2: '98%', prBpm: '111/min', weight: '59.8 kg' },
  { id: 'bp_20', srNo: 5, date: '08/11/2026', nameMr: 'सुमन जाधव', nameEn: 'Suman Jadhav', bp: '131/82 mmHg', spo2: '98%', prBpm: '85/min', weight: '63.2 kg' }
];
