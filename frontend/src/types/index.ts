/**
 * Core Data Types for CSR & Donor Management Platform
 */

export type UserRole = 'Admin' | 'CSR Admin' | 'Employee';

export interface User {
  id: string;
  name: string; // "Admin"
  email: string;
  role: UserRole;
  organization: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  role: 'Employee';
  organization: string;
  createdAt: string;
}

export type CSRStatus = 'Prospective' | 'Contacted' | 'Proposal Submitted' | 'Eligible' | 'Pledged' | 'Partnered' | 'Closed';
export type CSRPriority = 'High' | 'Medium' | 'Low';
export type FocusArea = 'Education' | 'Environmental Sustainability' | 'Healthcare & Sanitation' | 'Skill Development' | 'Rural Infrastructure' | 'Disaster Relief' | 'Women Empowerment';

export interface CSRPartner {
  id: string;
  companyName: string;
  sector: string;
  annualCsrBudget: number; // in USD
  maxGrantAmount: number;
  focusAreas: FocusArea[];
  eligibilityNotes: string;
  priority: CSRPriority;
  status: CSRStatus;
  sourceLink: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string; // Used for WhatsApp outreach
  nextStep: string;
  nextStepDueDate: string;
  matchScore: number; // 0 - 100
  updatedAt: string;
}

export type PipelineStage = 'Prospecting' | 'Initial Contact' | 'Meeting Scheduled' | 'Proposal Submitted' | 'Pledged' | 'Funded' | 'Declined';

export interface DonorPipelineItem {
  id: string;
  donorId: string;
  donorName: string;
  csrPartnerId?: string;
  title: string; // e.g. "Clean Water CSR Grant 2026"
  stage: PipelineStage;
  targetAmount: number;
  committedAmount: number;
  probability: number; // %
  assignedOfficer: string;
  expectedClosureDate: string;
  lastInteractionDate: string;
  nextAction: string;
  nextActionDueDate: string;
}

export type InteractionType = 'WhatsApp' | 'Email' | 'Phone Call' | 'In-Person Meeting' | 'Proposal Delivery';

export interface InteractionHistory {
  id: string;
  donorId: string;
  donorName: string;
  type: InteractionType;
  summary: string;
  details: string;
  loggedBy: string;
  date: string;
  outcome?: string;
  whatsappMessageId?: string;
  attachments?: string[];
}

export type DonorType = 'Corporate CSR' | 'Private Foundation' | 'HNWI' | 'Government Grant';
export type ComplianceStatus = 'Verified (12A/80G)' | 'Pending Verification' | 'FCRA Approved' | 'Requires Review';

export interface DonorRecord {
  id: string;
  name: string;
  type: DonorType;
  taxId: string;
  complianceStatus: ComplianceStatus;
  primaryContact: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  totalContributed: number;
  activeCommitmentsCount: number;
  preferredProjects: string[];
  relationshipHealth: 'Excellent' | 'Good' | 'Needs Attention' | 'At Risk';
  address: string;
  joinedDate: string;
  notes: string;
}

export interface Contribution {
  id: string;
  donorId: string;
  donorName: string;
  amount: number;
  currency: string;
  date: string;
  projectName: string;
  receiptNumber: string;
  paymentMethod: string;
  status: 'Received' | 'Pending Bank Clearance' | 'Pledged';
  taxCertificateIssued: boolean;
}

export interface InventoryItem {
  id: string;
  itemName: string;
  category: 'Educational Kits' | 'Medical Supplies' | 'Solar Power Units' | 'Food Packages' | 'Sanitation Kits';
  quantityInStock: number;
  allocatedProject: string;
  unitValue: number;
  lastUpdated: string;
  status: 'In Stock' | 'Low Stock' | 'Fully Dispatched';
}

export interface OperationalTask {
  id: string;
  title: string;
  category: 'CSR Proposal' | 'Donor Follow-Up' | 'Compliance Audit' | 'Impact Report' | 'WhatsApp Outreach';
  priority: 'Urgent' | 'Normal' | 'Low';
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  donorName?: string;
}

export interface WhatsAppMessage {
  id: string;
  toPhone: string;
  toName: string;
  donorId?: string;
  direction: 'outbound' | 'inbound';
  messageType: 'text' | 'template' | 'interactive' | 'document';
  content: string;
  templateName?: string;
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  aiGenerated?: boolean;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'CSR_PROPOSAL' | 'MEETING_REMINDER' | 'GRANT_ACKNOWLEDGEMENT' | 'IMPACT_REPORT';
  language: string;
  headerText?: string;
  bodyText: string;
  buttons?: string[];
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

// A scanned source register (original PDF) and how much of it is typed into a tab.
export interface RegisterDocument {
  id: string;
  category: string;
  titleMr: string;
  titleEn: string;
  period: string;
  pages: number;
  status: 'scan' | 'partial' | 'complete';
  tab?: string; // register tab that holds its typed-in data
  fileName: string;
  url: string;
  available: boolean;
  sizeBytes: number;
  entryCount: number; // typed-in rows available from /register-documents/{id}/entries
}

export interface RegisterTable {
  title?: string;
  titleMr?: string;
  note?: string;
  columns: { key: string; en: string; mr: string }[];
  rows: Record<string, string | number>[];
}

export interface RegisterEntries {
  note?: string;
  tables: RegisterTable[];
}

export interface GateRegisterEntry {
  id: string;
  registrationId?: string; // unique per entry, e.g. "PLW-000042"; absent on entries copied from the paper register
  srNo?: number;
  date: string; // e.g. "01-Jan-26"
  time?: string;
  visitorName: string;
  dateOfBirth?: string; // e.g. "4/5/1990"
  mobileNo: string;
  address: string;
  state?: string;
  city?: string;
  remarks: string; // e.g. "Donation", "Visit", "Maintenance"
  extraRemark?: string; // donation / remarks, e.g. "Jwari- 30 kg, Gahu- 30 kg"
  photoUrl?: string | null;
  visitNo?: string | number;
}

/** Gate register visit counts for a day, its week (from Monday) and its month; dates are YYYY-MM-DD. */
export interface GateVisitStats {
  today: number;
  week: number;
  month: number;
  date: string;
  weekStart: string;
  monthStart: string;
}

/** A gate register visitor whose birthday is today. */
export interface GateBirthday {
  name: string;
  mobileNo: string;
  dateOfBirth: string;
  age: number | null;
  address: string;
  lastVisit: string;
  visits: number;
}

/** All visits by one gate register visitor, plus other names seen on the same mobile number. */
export interface GateVisitorHistory {
  visits: GateRegisterEntry[];
  sharedMobile: { name: string; visits: number }[];
}

/** New gate register entry: the entry fields plus an optional photo as a data URL. */
export type GateRegisterEntryInput = Partial<Omit<GateRegisterEntry, 'id' | 'registrationId' | 'photoUrl'>> & {
  photo?: string | null;
};

export interface MaterialDistributionEntry {
  id: string;
  month: string;
  residentName: string;
  uniforms?: number;
  shirts?: number;
  pants?: number;
  towels?: number;
  soaps?: number;
  footwear?: number;
  cleaningItem?: string;
  quantity?: string;
  signedBy: string;
}

export interface StaffAttendanceEntry {
  id: string;
  staffName: string;
  role: string;
  month: string;
  attendanceDays: number;
  status: 'Present' | 'On Leave' | 'Active';
}

export interface SystemMetric {
  totalCsrPartners: number;
  totalDonors: number;
  totalFundsRaised: number;
  activePipelineValue: number;
  proposalsInReview: number;
  whatsappDeliveryRate: number;
  pendingTasksCount: number;
  inventoryUnitsDispatched: number;
  totalGateVisits?: number;
}
