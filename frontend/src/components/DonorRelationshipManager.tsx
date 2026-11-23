import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DonorPipelineItem, InteractionHistory, PipelineStage, InteractionType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Plus, 
  CheckCircle2
} from 'lucide-react';

interface DonorRelationshipManagerProps {
  onOpenWhatsAppOutreach: (phone: string, name: string) => void;
}

export const DonorRelationshipManager: React.FC<DonorRelationshipManagerProps> = ({
  onOpenWhatsAppOutreach,
}) => {
  const { tr, tv, tf, language } = useLanguage();
  const [pipeline, setPipeline] = useState<DonorPipelineItem[]>([]);
  const [interactions, setInteractions] = useState<InteractionHistory[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'pipeline' | 'interactions'>('pipeline');
  const [loading, setLoading] = useState(true);

  // Modal State for New Interaction
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [donorName, setDonorName] = useState('Bank Of India (Pandharpur Main)');
  const [donorId, setDonorId] = useState('dnr_301');
  const [interactionType, setInteractionType] = useState<InteractionType>('WhatsApp');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [outcome, setOutcome] = useState('Action Logged');

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, i] = await Promise.all([api.getPipeline(), api.getInteractions()]);
      setPipeline(p);
      setInteractions(i);
    } catch (err) {
      console.error('Error loading CRM data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const pipelineStages: PipelineStage[] = [
    'Prospecting',
    'Initial Contact',
    'Meeting Scheduled',
    'Proposal Submitted',
    'Pledged',
    'Funded',
  ];

  const handleStageChange = async (itemId: string, newStage: PipelineStage) => {
    try {
      const updated = await api.updatePipelineItem(itemId, { stage: newStage });
      setPipeline(pipeline.map((p) => (p.id === itemId ? updated : p)));
    } catch (err) {
      console.error('Error updating stage:', err);
    }
  };

  const handleSaveInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addInteraction({
      donorId,
      donorName,
      type: interactionType,
      summary,
      details,
      outcome,
      loggedBy: 'Admin',
    });
    setShowInteractionModal(false);
    setSummary('');
    setDetails('');
    loadData();
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Title & View Switcher Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {tr('Donor CRM', 'दाता नोंदणी')}
        </h1>

        <div className="flex items-center gap-3">
          {/* Sub Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              onClick={() => setActiveSubTab('pipeline')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'pipeline'
                  ? 'bg-gradient-to-r from-[#023b77] to-[#039583] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr('Pipeline', 'पाइपलाइन')}
            </button>
            <button
              onClick={() => setActiveSubTab('interactions')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'interactions'
                  ? 'bg-gradient-to-r from-[#023b77] to-[#039583] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr('Interactions', 'संवाद')} ({interactions.length})
            </button>
          </div>

          <button
            onClick={() => setShowInteractionModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shrink-0 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#039583]" />
            <span>{tr('Log Interaction', 'संवाद नोंदवा')}</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'pipeline' ? (
        /* KANBAN PIPELINE VIEW */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
            {pipelineStages.map((stage) => {
              const stageItems = pipeline.filter((p) => p.stage === stage);
              const totalVal = stageItems.reduce((acc, i) => acc + (i.targetAmount ?? (i as any).expectedAmount ?? 0), 0);

              return (
                <div
                  key={stage}
                  className="bg-slate-100/80 border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between min-h-[480px] space-y-3"
                >
                  {/* Stage Column Header */}
                  <div className="border-b border-slate-200/90 pb-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{tv(stage)}</span>
                      <span className="text-[10px] font-mono bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full font-bold">
                        {stageItems.length}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#039583] font-extrabold mt-1">
                      ₹{totalVal.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Stage Cards List */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {stageItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#039583]/50 transition-all space-y-2.5 text-xs"
                      >
                        <div>
                          <p className="text-[10px] text-[#039583] font-bold uppercase tracking-wider">
                            {tv(item.donorName)}
                          </p>
                          <h4 className="font-bold text-slate-900 leading-snug mt-0.5">
                            {item.title}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-600">
                          <span>{tr('Target:', 'उद्दिष्ट:')}</span>
                          <span className="font-mono font-bold text-slate-900">
                            ₹{(item.targetAmount ?? (item as any).expectedAmount ?? 0).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {item.committedAmount > 0 && (
                          <div className="flex items-center justify-between text-[11px] text-[#039583] font-bold">
                            <span>{tr('Committed:', 'वचनबद्ध:')}</span>
                            <span className="font-mono">
                              ₹{item.committedAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}

                        {/* Next Action Box */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                          <p className="text-slate-600 leading-snug">
                            <strong className="text-slate-800">{tr('Next Action:', 'पुढील कृती:')}</strong> {item.nextAction ?? tf(item, 'notes')}
                          </p>
                          <p className="text-[10px] text-amber-700 font-mono font-bold">
                            {tr('Due:', 'अंतिम तारीख:')} {item.nextActionDueDate ?? (item as any).expectedDate}
                          </p>
                        </div>

                        {/* Move Stage Selector */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                          <select
                            value={item.stage}
                            onChange={(e) => handleStageChange(item.id, e.target.value as PipelineStage)}
                            className="bg-slate-50 border border-slate-200 text-[10px] rounded px-1.5 py-1 text-slate-700 font-medium focus:outline-none"
                          >
                            {pipelineStages.map((s) => (
                              <option key={s} value={s}>
                                {tv(s)}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() =>
                              onOpenWhatsAppOutreach(
                                '+918179308777',
                                item.donorName
                              )
                            }
                            className="p-1 text-[#039583] hover:text-[#023b77]"
                            title={tr('Send WhatsApp', 'व्हॉट्सॲप पाठवा')}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* INTERACTION HISTORY TIMELINE VIEW */
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {tr('Interaction Log', 'संवाद नोंदवही')}
            </h3>

            <div className="divide-y divide-slate-100">
              {interactions.map((int) => (
                <div key={int.id} className="py-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                          int.type === 'WhatsApp'
                            ? 'bg-[#039583]/15 text-[#039583] border border-[#039583]/30'
                            : int.type === 'In-Person Meeting'
                            ? 'bg-[#023b77]/10 text-[#023b77] border border-[#023b77]/30'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tv(int.type ?? (int as any).channel)}
                      </span>
                      <strong className="text-slate-900 text-sm">{tv(int.donorName)}</strong>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                      <span>{tr('Logged by:', 'नोंद करणारे:')} <strong className="text-slate-800">{tv(int.loggedBy)}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-400">
                        {new Date(int.date).toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-[#039583] pl-2 border-l-2 border-[#039583]">
                    {tf(int, 'summary')}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {int.details}
                  </p>

                  {int.outcome && (
                    <div className="flex items-center gap-2 text-[11px] text-[#039583] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#039583]" />
                      <span>{tr('Outcome:', 'परिणाम:')} {int.outcome}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Log Interaction Modal */}
      {showInteractionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl text-slate-900">
            <h2 className="text-base font-bold text-slate-900">{tr('Log Interaction', 'संवाद नोंदवा')}</h2>

            <form onSubmit={handleSaveInteraction} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">{tr('Donor / Partner', 'दाता / भागीदार')}</label>
                <select
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                >
                  <option value="Bank Of India (Pandharpur Main)">{tr('Bank Of India (Pandharpur Main)', 'बँक ऑफ इंडिया, पंढरपूर मुख्य शाखा')}</option>
                  <option value="Sweri Educational Trust">{tr('Sweri Educational Trust', 'स्वेरी शैक्षणिक ट्रस्ट')}</option>
                  <option value="Kidverse Trata Foundation">{tr('Kidverse Trata Foundation', 'किडव्हर्स त्राता फाउंडेशन')}</option>
                  <option value="Ved Prasad Social Foundation">{tr('Ved Prasad Social Foundation', 'वेद प्रसाद सामाजिक प्रतिष्ठान')}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">{tr('Channel', 'माध्यम')}</label>
                <select
                  value={interactionType}
                  onChange={(e) => setInteractionType(e.target.value as InteractionType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                >
                  <option value="WhatsApp">{tr('WhatsApp Message', 'व्हॉट्सॲप संदेश')}</option>
                  <option value="In-Person Meeting">{tv('In-Person Meeting')}</option>
                  <option value="Phone Call">{tv('Phone Call')}</option>
                  <option value="Email">{tr('Email Communication', 'ईमेल संवाद')}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">{tr('Summary Title', 'सारांश शीर्षक')}</label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder={tr('e.g. Paper Bundle Dispatch Confirmation', 'उदा. कागद गठ्ठे पाठवल्याची खात्री')}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">{tr('Notes', 'टिपा')}</label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowInteractionModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#023b77] to-[#039583] text-white font-bold rounded-lg shadow-xs"
                >
                  {tr('Save', 'जतन करा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
