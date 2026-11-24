import { Employee, GateBirthday, GateVisitStats, GateVisitorHistory, CSRPartner, DonorRecord, DonorPipelineItem, InteractionHistory, Contribution, InventoryItem, OperationalTask, WhatsAppMessage, WhatsAppTemplate, SystemMetric, GateRegisterEntry, MaterialDistributionEntry, StaffAttendanceEntry, RegisterDocument, RegisterEntries, GateRegisterEntryInput } from '../types';

// Empty in development: Vite proxies /api to the FastAPI server (see vite.config.ts).
// Set VITE_API_BASE_URL (e.g. https://api.example.org) when the API lives on another origin.
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export const api = {
  // Auth
  async login(email: string) {
    const res = await fetch(API_BASE_URL + '/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(API_BASE_URL + '/api/v1/auth/me');
    return res.json();
  },

  // Employees (managed by admins)
  async getEmployees() {
    const res = await fetch(API_BASE_URL + '/api/v1/employees');
    if (!res.ok) throw new Error(`Could not load employees (${res.status})`);
    return (await res.json()) as Employee[];
  },

  async addEmployee(employee: { name: string; email: string; phone?: string; designation?: string }) {
    const res = await fetch(API_BASE_URL + '/api/v1/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const detail = body?.detail;
      const message = typeof detail === 'string' ? detail : Array.isArray(detail) ? detail.map((d: any) => String(d.msg).replace(/^Value error, /, '')).join('; ') : '';
      throw new Error(message || `Could not add the employee (${res.status})`);
    }
    return body as Employee;
  },

  async deleteEmployee(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/employees/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Could not remove the employee (${res.status})`);
    return res.json();
  },

  // CSR Database
  async getCsrPartners(params?: { search?: string; priority?: string; status?: string; focusArea?: string }) {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.priority) query.set('priority', params.priority);
    if (params?.status) query.set('status', params.status);
    if (params?.focusArea) query.set('focusArea', params.focusArea);

    const res = await fetch(`${API_BASE_URL}/api/v1/csr-partners?${query.toString()}`);
    return (await res.json()) as CSRPartner[];
  },

  async addCsrPartner(partner: Partial<CSRPartner>) {
    const res = await fetch(API_BASE_URL + '/api/v1/csr-partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    return (await res.json()) as CSRPartner;
  },

  async updateCsrPartner(id: string, updates: Partial<CSRPartner>) {
    const res = await fetch(`${API_BASE_URL}/api/v1/csr-partners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return (await res.json()) as CSRPartner;
  },

  async deleteCsrPartner(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/csr-partners/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Donor Records
  async getDonors() {
    const res = await fetch(API_BASE_URL + '/api/v1/donors');
    return (await res.json()) as DonorRecord[];
  },

  async addDonor(donor: Partial<DonorRecord>) {
    const res = await fetch(API_BASE_URL + '/api/v1/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donor),
    });
    return (await res.json()) as DonorRecord;
  },

  // Pipeline
  async getPipeline() {
    const res = await fetch(API_BASE_URL + '/api/v1/pipeline');
    return (await res.json()) as DonorPipelineItem[];
  },

  async addPipelineItem(item: Partial<DonorPipelineItem>) {
    const res = await fetch(API_BASE_URL + '/api/v1/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return (await res.json()) as DonorPipelineItem;
  },

  async updatePipelineItem(id: string, updates: Partial<DonorPipelineItem>) {
    const res = await fetch(`${API_BASE_URL}/api/v1/pipeline/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return (await res.json()) as DonorPipelineItem;
  },

  // Interactions
  async getInteractions() {
    const res = await fetch(API_BASE_URL + '/api/v1/interactions');
    return (await res.json()) as InteractionHistory[];
  },

  async addInteraction(interaction: Partial<InteractionHistory>) {
    const res = await fetch(API_BASE_URL + '/api/v1/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interaction),
    });
    return (await res.json()) as InteractionHistory;
  },

  // Contributions & Inventory & Tasks
  async getContributions() {
    const res = await fetch(API_BASE_URL + '/api/v1/contributions');
    return (await res.json()) as Contribution[];
  },

  async getInventory() {
    const res = await fetch(API_BASE_URL + '/api/v1/inventory');
    return (await res.json()) as InventoryItem[];
  },

  async getTasks() {
    const res = await fetch(API_BASE_URL + '/api/v1/tasks');
    return (await res.json()) as OperationalTask[];
  },

  async toggleTask(id: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}/toggle`, { method: 'PUT' });
    return (await res.json()) as OperationalTask;
  },

  async getMaterialDistribution() {
    const res = await fetch(API_BASE_URL + '/api/v1/material-distribution');
    return (await res.json()) as MaterialDistributionEntry[];
  },

  async getStaffAttendance() {
    const res = await fetch(API_BASE_URL + '/api/v1/staff-attendance');
    return (await res.json()) as StaffAttendanceEntry[];
  },

  // WhatsApp
  async getWhatsAppMessages() {
    const res = await fetch(API_BASE_URL + '/api/v1/whatsapp/messages');
    return (await res.json()) as WhatsAppMessage[];
  },

  async getWhatsAppTemplates() {
    const res = await fetch(API_BASE_URL + '/api/v1/whatsapp/templates');
    return (await res.json()) as WhatsAppTemplate[];
  },

  async sendWhatsAppMessage(data: { toPhone: string; toName: string; content: string; templateName?: string; donorId?: string }) {
    const res = await fetch(API_BASE_URL + '/api/v1/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return (await res.json()) as WhatsAppMessage;
  },

  async simulateIncomingWhatsApp(data: { fromPhone: string; fromName: string; messageText: string; donorId?: string }) {
    const res = await fetch(API_BASE_URL + '/api/v1/whatsapp/simulate-incoming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Dashboard Metrics
  async getDashboardMetrics() {
    const res = await fetch(API_BASE_URL + '/api/v1/dashboard/metrics');
    return (await res.json()) as {
      totalCsrPartners: number;
      totalDonors: number;
      totalFundsRaised: number;
      totalCommitted: number;
      activePipelineValue: number;
      proposalsInReview: number;
      whatsappDeliveryRate: number;
      pendingTasksCount: number;
      inventoryUnitsDispatched: number;
      recentInteractions: InteractionHistory[];
      pipelineByStage: { stage: string; count: number; value: number }[];
      monthlyFundraising: { month: string; received: number; target: number; required: number }[];
    };
  },

  // Gate Register Log
  async getGateRegisterEntries(params?: { search?: string; remark?: string; startDate?: string }) {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.remark) query.set('remark', params.remark);
    if (params?.startDate) query.set('startDate', params.startDate);

    const res = await fetch(`${API_BASE_URL}/api/v1/gate-register?${query.toString()}`);
    const entries = (await res.json()) as GateRegisterEntry[];
    return entries.map((e) => (e.photoUrl ? { ...e, photoUrl: API_BASE_URL + e.photoUrl } : e));
  },

  async getGateVisitStats(on: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/gate-register/visit-stats?on=${encodeURIComponent(on)}`);
    if (!res.ok) throw new Error(`Could not load visit counts (${res.status})`);
    return (await res.json()) as GateVisitStats;
  },

  async getGateBirthdays(on: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/gate-register/birthdays?on=${encodeURIComponent(on)}`);
    if (!res.ok) throw new Error(`Could not load birthdays (${res.status})`);
    return (await res.json()) as GateBirthday[];
  },

  async getGateVisitorHistory(name: string, mobile?: string) {
    const query = new URLSearchParams({ name });
    if (mobile) query.set('mobile', mobile);
    const res = await fetch(`${API_BASE_URL}/api/v1/gate-register/visitor-history?${query.toString()}`);
    if (!res.ok) throw new Error(`Could not load the visit history (${res.status})`);
    const history = (await res.json()) as GateVisitorHistory;
    return {
      ...history,
      visits: history.visits.map((e) => (e.photoUrl ? { ...e, photoUrl: API_BASE_URL + e.photoUrl } : e)),
    };
  },

  // Original scanned registers (PDFs served by the backend)
  async getRegisterDocuments() {
    const res = await fetch(API_BASE_URL + '/api/v1/register-documents');
    const docs = (await res.json()) as RegisterDocument[];
    return docs.map((d) => ({ ...d, url: API_BASE_URL + d.url }));
  },

  async getRegisterEntries(docId: string) {
    const res = await fetch(`${API_BASE_URL}/api/v1/register-documents/${encodeURIComponent(docId)}/entries`);
    if (!res.ok) throw new Error(`No entries for ${docId}`);
    return (await res.json()) as RegisterEntries;
  },

  async addGateRegisterEntry(entry: GateRegisterEntryInput) {
    const res = await fetch(API_BASE_URL + '/api/v1/gate-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const detail = body?.detail;
      const message = typeof detail === 'string' ? detail : Array.isArray(detail) ? detail.map((d: any) => d.msg).join('; ') : '';
      throw new Error(message || `Could not save the entry (${res.status})`);
    }
    const created = body as GateRegisterEntry;
    return created.photoUrl ? { ...created, photoUrl: API_BASE_URL + created.photoUrl } : created;
  },

  // MongoDB Inspector Query
  async queryMongoDb(collection: string, findQuery?: Record<string, any>) {
    const res = await fetch(API_BASE_URL + '/api/v1/mongodb/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, findQuery }),
    });
    return res.json();
  },
};
