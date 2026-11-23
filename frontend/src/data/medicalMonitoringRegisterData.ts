export interface MedicalMonitoringEntry {
  id: string;
  srNo: number;
  date: string;
  nameMr: string;
  nameEn: string;
  testType: 'CD4 Count' | 'HB (Hemoglobin)' | 'CBC' | 'Viral Load (VL)';
  resultValue: string;
  remarks: string;
}

export const AUTHENTIC_MEDICAL_MONITORING_REGISTER: MedicalMonitoringEntry[] = [
  { id: 'med_1', srNo: 1, date: '10/06/2026', nameMr: 'शीतल मोहन वाघ', nameEn: 'Shital Mohan Wagh', testType: 'HB (Hemoglobin)', resultValue: '7.70 g/dl', remarks: 'Requires Iron Supplement' },
  { id: 'med_2', srNo: 2, date: '10/06/2026', nameMr: 'श्रद्धा दयाानंद कुंभार', nameEn: 'Shraddha Dayanand Kumbhar', testType: 'HB (Hemoglobin)', resultValue: '9.20 g/dl', remarks: 'Stable' },
  { id: 'med_3', srNo: 3, date: '10/06/2026', nameMr: 'प्रिती पंढरीनाथ खांडेकर', nameEn: 'Priti Pandharinath Khandekar', testType: 'HB (Hemoglobin)', resultValue: '9.50 g/dl', remarks: 'Monitor Diet' },
  { id: 'med_4', srNo: 4, date: '10/06/2026', nameMr: 'धनश्री (सोनू) रोकडे', nameEn: 'Dhanashree (Sonu) Rokade', testType: 'HB (Hemoglobin)', resultValue: '12.5 g/dl', remarks: 'Normal' },
  { id: 'med_5', srNo: 5, date: '10/06/2026', nameMr: 'साक्षी हिरालाल', nameEn: 'Sakshi Hiralal', testType: 'HB (Hemoglobin)', resultValue: '9.10 g/dl', remarks: 'Stable' },
  { id: 'med_6', srNo: 6, date: '01/08/2026', nameMr: 'विशाल म्हाळुंगे गेद', nameEn: 'Vishal Mhalunge Ged', testType: 'Viral Load (VL)', resultValue: 'TND (Target Not Detected)', remarks: 'Suppressed / Stable' },
  { id: 'med_7', srNo: 7, date: '01/08/2026', nameMr: 'शिल्पा पोपट कोदग', nameEn: 'Shilpa Popat Kodag', testType: 'Viral Load (VL)', resultValue: 'TND', remarks: 'Suppressed / Stable' },
  { id: 'med_8', srNo: 8, date: '01/08/2026', nameMr: 'विद्या किरण पाटील', nameEn: 'Vidya Kiran Patil', testType: 'Viral Load (VL)', resultValue: 'TND', remarks: 'Suppressed / Stable' },
  { id: 'med_9', srNo: 9, date: '01/08/2026', nameMr: 'रूपाली दिप्पु वारुसे', nameEn: 'Rupali Dippu Waruse', testType: 'Viral Load (VL)', resultValue: 'TND', remarks: 'Suppressed / Stable' },
  { id: 'med_10', srNo: 10, date: '16/07/2026', nameMr: 'संस्कृती विकास येवले', nameEn: 'Sanskruti Vikas Yevale', testType: 'CD4 Count', resultValue: '1150', remarks: 'Good Immunity' },
  { id: 'med_11', srNo: 11, date: '13/04/2026', nameMr: 'लक्ष्मी ईरणा माई', nameEn: 'Laxmi Irna Mai', testType: 'CD4 Count', resultValue: '8453 (ART No)', remarks: 'Stable' },
  { id: 'med_12', srNo: 12, date: '15/09/2026', nameMr: 'ज्योत्स्ना (पुजा) ज्ञानेभा शिंदे', nameEn: 'Jyotsna (Pooja) Dnyanebha Shinde', testType: 'HB (Hemoglobin)', resultValue: '7.4 g/dl', remarks: 'Iron therapy active' },
  { id: 'med_13', srNo: 13, date: '01/09/2026', nameMr: 'सुदिक्षा विष्णु लाड', nameEn: 'Sudiksha Vishnu Lad', testType: 'HB (Hemoglobin)', resultValue: '12.7 g/dl', remarks: 'Normal' },
  { id: 'med_14', srNo: 14, date: '01/09/2026', nameMr: 'चंदानी शेख', nameEn: 'Chandani Shaikh', testType: 'HB (Hemoglobin)', resultValue: '9.8 g/dl', remarks: 'Stable' }
];
