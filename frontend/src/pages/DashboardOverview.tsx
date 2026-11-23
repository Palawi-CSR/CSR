import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { OperationalTask, InventoryItem, InteractionHistory } from '../types';
import { 
  IndianRupee, 
  TrendingUp, 
  Building, 
  CheckCircle2, 
  Clock, 
  PackageCheck, 
  MessageSquare, 
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell } from 'recharts';

const pipelineStageColors = ['#6366f1', '#0ea5e9', '#14b8a6', '#f59e0b', '#f43f5e'];

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenQuickOutreach: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateTab,
  onOpenQuickOutreach,
}) => {
  const { t, tr, tv, tf, language } = useLanguage();
  const locale = language === 'mr' ? 'mr-IN' : 'en-IN';
  const [metrics, setMetrics] = useState<any>(null);
  const [tasks, setTasks] = useState<OperationalTask[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [interactions, setInteractions] = useState<InteractionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [m, tData, inv, ints] = await Promise.all([
        api.getDashboardMetrics(),
        api.getTasks(),
        api.getInventory(),
        api.getInteractions(),
      ]);
      setMetrics(m);
      setTasks(tData);
      setInventory(inv);
      setInteractions(ints);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleToggleTask = async (id: string) => {
    try {
      const updated = await api.toggleTask(id);
      setTasks(tasks.map((tItem) => (tItem.id === id ? updated : tItem)));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  if (loading && !metrics) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[500px]">
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          <span>{tr('Loading dashboard data...', 'डॅशबोर्ड माहिती लोड होत आहे...')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {t('dash.title')}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {tr('Palawi CSR & Operations Management Console', 'पालवी सीएसआर व गेट नोंदणी मुख्य डॅशबोर्ड')}
          </p>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total CSR Funds Raised */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">{t('dash.csrGrantsReceived')}</span>
            <div className="p-2 rounded-xl bg-[#023b77]/10 text-[#023b77]">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              ₹{(metrics?.totalFundsRaised || 0).toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#039583] font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{tr('+28% vs quarterly target', 'तिमाही उद्दिष्टापेक्षा +२८%')}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Pipeline Value */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">{t('dash.activePipeline')}</span>
            <div className="p-2 rounded-xl bg-[#039583]/15 text-[#039583]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              ₹{(metrics?.activePipelineValue || 0).toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t('dash.pledged')}: <span className="text-slate-800 font-bold font-mono">₹{(metrics?.totalCommitted || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Card 3: CSR Partner Opportunities */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">{t('dash.prospectivePartners')}</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              {metrics?.totalCsrPartners || 0}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t('dash.proposalsInReview')}: <span className="text-slate-800 font-bold">{metrics?.proposalsInReview || 0}</span>
            </div>
          </div>
        </div>

        {/* Card 4: WhatsApp Engagement Rate */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">{t('dash.whatsappDelivery')}</span>
            <div className="p-2 rounded-xl bg-[#039583]/15 text-[#039583]">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
              {metrics?.whatsappDeliveryRate || 98.4}%
            </div>
            <div className="text-xs text-[#039583] font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('dash.highEngagement')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Monthly CSR Funding Received vs Target & Required Funds Line */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {t('chart.monthlyFundingTitle')}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#039583] inline-block"></span>
                <span className="text-slate-700 font-medium">{t('chart.received')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span>
                <span className="text-slate-500">{t('chart.target')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-b-2 border-dashed border-rose-600 inline-block"></span>
                <span className="text-rose-700 font-bold">{t('chart.requiredLine')}</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.monthlyFundraising || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPalawi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#039583" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#023b77" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(m) => tv(m)} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(val) => tr(`₹${val / 1000}k`, `₹${val / 1000} हजार`)} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val: any, name: any) => [
                    `₹${val.toLocaleString('en-IN')}`, 
                    name === 'received' 
                      ? t('chart.received') 
                      : name === 'target' 
                      ? t('chart.target') 
                      : name === 'required'
                      ? t('chart.requiredLine')
                      : name
                  ]}
                  labelFormatter={(m: any) => tv(m)}
                />
                <Area type="monotone" dataKey="received" stroke="#039583" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPalawi)" />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                {/* Required Funds Line */}
                <Line 
                  type="monotone" 
                  dataKey="required" 
                  name="required"
                  stroke="#e11d48" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4" 
                  dot={{ r: 4, fill: '#e11d48', strokeWidth: 1.5, stroke: '#ffffff' }} 
                  activeDot={{ r: 6, fill: '#e11d48' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Pipeline Stage Distribution */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {t('chart.pipelineStageTitle')}
            </h2>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.pipelineByStage || []} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickFormatter={(val) => tr(`₹${val / 1000}k`, `₹${val / 1000} हजार`)} />
                <YAxis type="category" dataKey="stage" stroke="#475569" fontSize={11} tickLine={false} width={110} tickFormatter={(s) => tv(s)} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, tr('Pipeline Value', 'पाइपलाइन मूल्य')]}
                  labelFormatter={(s: any) => tv(s)}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {(metrics?.pipelineByStage || []).map((stage: { stage: string }, index: number) => (
                    <Cell key={stage.stage} fill={pipelineStageColors[index % pipelineStageColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two-Column Operational Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Operational Task Status & Follow-ups */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#039583]" />
              <span>{t('dash.tasksTitle')}</span>
            </h2>
            <button 
              onClick={() => onNavigateTab('donor-pipeline')}
              className="text-xs text-[#039583] hover:underline font-bold flex items-center gap-1"
            >
              <span>{t('dash.viewAll')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-[#039583] text-white' : 'border border-slate-300 hover:border-[#039583]'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                  <div className="space-y-1">
                    <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {tf(task, 'title')}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{task.donorName ?? tv(task.category)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tr('Assigned:', 'जबाबदारी:')} <strong className="text-slate-700">{tv(task.assignedTo)}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 text-right space-y-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    task.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tv(task.priority ?? 'Normal')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {tr('Due:', 'अंतिम तारीख:')} {task.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inventory & Relief Item Dispatch */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#039583]" />
              <span>{t('dash.inventoryTitle')}</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {tr('580 Units Dispatched', '५८० नग वितरित')}
            </span>
          </div>

          <div className="space-y-3">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {tf(item, 'itemName')}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.status === 'In Stock'
                      ? 'bg-[#039583]/15 text-[#039583] border border-[#039583]/30'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {tv(item.status ?? 'In Stock')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>{tr('Project:', 'प्रकल्प:')} <strong className="text-slate-800">{item.allocatedProject ?? tv((item as any).category)}</strong></span>
                  <span className="font-mono text-slate-700 font-bold">
                    {tr('Stock:', 'साठा:')} {item.quantityInStock ?? (item as any).quantity} {tv((item as any).unit ?? tr('units', 'नग'))}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.status === 'In Stock' ? 'bg-[#039583]' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min(((item.quantityInStock ?? (item as any).quantity ?? 0) / 250) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ticker: Recent Communications Activity Stream */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <MessageSquare className="w-4 h-4 text-[#039583]" />
            <span>{t('dash.recentInteractions')}</span>
          </div>
          <button
            onClick={() => onNavigateTab('whatsapp-suite')}
            className="text-xs text-[#039583] hover:underline font-bold"
          >
            {t('dash.openWhatsapp')}
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {interactions.map((int) => (
            <div key={int.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  int.type === 'WhatsApp' ? 'bg-[#039583]/15 text-[#039583]' : 'bg-slate-100 text-slate-700'
                }`}>
                  {tv(int.type ?? (int as any).channel)}
                </span>
                <div>
                  <span className="font-bold text-slate-900">{tv(int.donorName)}</span>
                  <span className="text-slate-600 font-normal ml-2">{tf(int, 'summary')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-slate-500 text-[11px]">
                <span className="font-mono text-slate-400">
                  {new Date(int.date).toLocaleDateString(locale)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
