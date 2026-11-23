export interface IPDEntry {
  id: string;
  srNo: number;
  date: string;
  time: string;
  patientName: string;
  ageSex: string; // e.g. "23 / F" or "26 / M"
  symptoms: string;
  doctorName: string;
  givenTreatment: string;
}

export const AUTHENTIC_IPD_REGISTER: IPDEntry[] = [
  {
    id: 'ipd_1',
    srNo: 1,
    date: '15/07/2025',
    time: '—',
    patientName: 'Piyush',
    ageSex: '15 / M',
    symptoms: 'Fever, Body Pain',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Multivitamin 2ml'
  },
  {
    id: 'ipd_2',
    srNo: 2,
    date: '15/07/2025',
    time: '—',
    patientName: 'Raju',
    ageSex: '29 / M',
    symptoms: 'Body Pain',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'DNS - 500ml, Inj. Monocef 1gm'
  },
  {
    id: 'ipd_3',
    srNo: 3,
    date: '15/07/2025',
    time: '—',
    patientName: 'Mayuri',
    ageSex: '23 / F',
    symptoms: 'Fever & Body ache',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'DNS - 500ml, Inj. Monocef 1gm'
  },
  {
    id: 'ipd_4',
    srNo: 4,
    date: '15/07/2025',
    time: '—',
    patientName: 'Sunita',
    ageSex: '23 / F',
    symptoms: 'Fever',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'DNS - 500ml, Inj. Monocef 1gm'
  },
  {
    id: 'ipd_5',
    srNo: 5,
    date: '15/07/2025',
    time: '—',
    patientName: 'Kavita',
    ageSex: '27 / F',
    symptoms: 'Fever & Body ache',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Monocef 1gm, Pantaprazole'
  },
  {
    id: 'ipd_6',
    srNo: 6,
    date: '15/07/2025',
    time: '—',
    patientName: 'Shital Kaku',
    ageSex: '34 / F',
    symptoms: 'Gastritis, Headache',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Multivitamin, Pantaprazole'
  },
  {
    id: 'ipd_7',
    srNo: 7,
    date: '15/07/2025',
    time: '—',
    patientName: 'Vaibhav Dada',
    ageSex: '26 / M',
    symptoms: 'Fever',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'NS - 100ml, Inj. Multivitamin, DNS - 500ml, Inj. Monocef'
  },
  {
    id: 'ipd_8',
    srNo: 8,
    date: '20/07/2025',
    time: '—',
    patientName: 'Jayshri Kaku',
    ageSex: '24 / F',
    symptoms: 'Body Pain',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_9',
    srNo: 9,
    date: '20/07/2025',
    time: '—',
    patientName: 'Shweta',
    ageSex: '20 / F',
    symptoms: 'Body Pain',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_10',
    srNo: 10,
    date: '22/07/2025',
    time: '—',
    patientName: 'Swarupa',
    ageSex: '29 / F',
    symptoms: 'Loose Motion',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'DNS - 500ml, Inj. Ceftriaxone - 1000'
  },
  {
    id: 'ipd_11',
    srNo: 11,
    date: '24/11/2025',
    time: '—',
    patientName: 'Shital Wagh',
    ageSex: '34 / F',
    symptoms: 'Gastritis, Headache',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'DNS - 500ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_12',
    srNo: 12,
    date: '30/01/2026',
    time: 'Evening',
    patientName: 'Shraddha',
    ageSex: '22 / F',
    symptoms: 'Fever & Weakness',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'RL - 500ml, NS - 100ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_13',
    srNo: 13,
    date: '30/01/2026',
    time: 'Evening',
    patientName: 'Vedika',
    ageSex: '15 / F',
    symptoms: 'Fever & Weakness',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'RL - 500ml, NS - 100ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_14',
    srNo: 14,
    date: '30/01/2026',
    time: 'Evening',
    patientName: 'Rupali',
    ageSex: '17 / F',
    symptoms: 'Fever & Weakness',
    doctorName: 'Dr. Leena Madam',
    givenTreatment: 'RL - 500ml, NS - 100ml, Inj. Multivitamin'
  },
  {
    id: 'ipd_15',
    srNo: 15,
    date: '07/02/2026',
    time: '02:00 PM',
    patientName: 'Shraddha',
    ageSex: '22 / F',
    symptoms: 'Infection / Fever',
    doctorName: 'Dr. Vishal Phade',
    givenTreatment: 'Inj. Emset, Inj. Pan 40mg, 100ml NS + Inj. Tazmac'
  },
  {
    id: 'ipd_16',
    srNo: 16,
    date: '01/03/2026',
    time: '08:00 AM',
    patientName: 'Rutuja',
    ageSex: '20 / F',
    symptoms: 'Fever & Fatigue',
    doctorName: 'Dr. Vishal Phade',
    givenTreatment: 'DNS - 500ml, Inj. Pan-40, Inj. Emset, NS - 100ml, Inj. Merotec'
  },
  {
    id: 'ipd_17',
    srNo: 17,
    date: '27/03/2026',
    time: '06:00 PM',
    patientName: 'Mukta (Monika Ranadive)',
    ageSex: '17 / F',
    symptoms: 'Mouth Ulcer',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'NS - 100ml, Inj. Eldervit'
  },
  {
    id: 'ipd_18',
    srNo: 18,
    date: '27/03/2026',
    time: '06:05 PM',
    patientName: 'Meera Johre',
    ageSex: '38 / F',
    symptoms: 'Mouth Ulcer',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'NS - 100ml, Inj. Eldervit'
  },
  {
    id: 'ipd_19',
    srNo: 19,
    date: '18/04/2026',
    time: '09:45 PM',
    patientName: 'Shital Wagh',
    ageSex: '35 / F',
    symptoms: 'Weakness',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'DNS - 500ml, Inj. Eldervit'
  },
  {
    id: 'ipd_20',
    srNo: 20,
    date: '11/05/2026',
    time: '01:30 PM',
    patientName: 'Prerna Vinod Kasbe',
    ageSex: '21 / F',
    symptoms: 'Weakness',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'NS - 100ml, Inj. B-Complex / Eldervit'
  },
  {
    id: 'ipd_21',
    srNo: 21,
    date: '06/07/2026',
    time: '09:55 PM',
    patientName: 'Vijaya Dabade',
    ageSex: '38 / F',
    symptoms: 'Fever & Infection',
    doctorName: 'Dr. Bagal Sir',
    givenTreatment: 'DNS - 500ml, Inj. Monocef, Inj. Betnesol'
  },
  {
    id: 'ipd_22',
    srNo: 22,
    date: '11/08/2026',
    time: '11:30 AM',
    patientName: 'Vidya Patil',
    ageSex: '40 / F',
    symptoms: 'Weakness',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'Inj. Pantoprazole, DNS - 250ml, Inj. Eldervit'
  },
  {
    id: 'ipd_23',
    srNo: 23,
    date: '17/08/2026',
    time: '09:15 AM',
    patientName: 'Mayuri (Sonali Bisnal)',
    ageSex: '23 / F',
    symptoms: 'Infection / Fever',
    doctorName: 'Dr. Vishal Phade / Dr. Bagal',
    givenTreatment: 'DNS - 500ml, Inj. Pantoprazole, Inj. Ondestron'
  },
  {
    id: 'ipd_24',
    srNo: 24,
    date: '18/09/2026',
    time: '04:20 PM',
    patientName: 'Swati Mane',
    ageSex: '30 / F',
    symptoms: 'Fever & Pain',
    doctorName: 'Dr. V. Phade Sir',
    givenTreatment: 'NS - 100ml, Inj. Febrinil, Inj. Ondestron, DNS - 500ml, Inj. Monocef'
  },
  {
    id: 'ipd_25',
    srNo: 25,
    date: '18/10/2026',
    time: '11:40 PM',
    patientName: 'Mangal Shah (Bhai)',
    ageSex: '74 / F',
    symptoms: 'General Weakness',
    doctorName: 'Dr. Leena Ghadge',
    givenTreatment: 'DNS - 250ml, NS - 100ml, Inj. Pan-40, Inj. Emset, Inj. Monocef-SB'
  },
  {
    id: 'ipd_26',
    srNo: 26,
    date: '31/10/2026',
    time: '07:10 PM',
    patientName: 'Dondabai Edake (Nursing)',
    ageSex: '35 / F',
    symptoms: 'Infection / Admission',
    doctorName: 'Cottage Hospital / Sanjeevani',
    givenTreatment: 'NS - 100ml, Inj. Taxim - 2ml, Inj. Genta, Metro, Pantaprazole'
  },
  {
    id: 'ipd_27',
    srNo: 27,
    date: '01/11/2026',
    time: '09:10 AM',
    patientName: 'Dondabai Edake (Nursing)',
    ageSex: '35 / F',
    symptoms: 'Post-Treatment Recovery',
    doctorName: 'Cottage Hospital / Sanjeevani',
    givenTreatment: 'NS - 100ml, Inj. Taxim, Inj. Genta, Pantaprazole, Metro'
  }
];
