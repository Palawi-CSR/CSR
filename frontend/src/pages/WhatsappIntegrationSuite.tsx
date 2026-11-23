import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { WhatsAppMessage, WhatsAppTemplate } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Send, 
  Sparkles, 
  CheckCheck, 
  Bot, 
  Smartphone,
  Zap,
  RefreshCw
} from 'lucide-react';

interface WhatsappIntegrationSuiteProps {
  initialPhone?: string;
  initialName?: string;
  initialText?: string;
}

export const WhatsappIntegrationSuite: React.FC<WhatsappIntegrationSuiteProps> = ({
  initialPhone = '+14155554311',
  initialName = 'Dr. Anita Desai (BioHealth)',
  initialText = '',
}) => {
  const { tr, tv, tf, language } = useLanguage();
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  // Seed templates use title/text; the UI type uses name/bodyText.
  const tplName = (t: WhatsAppTemplate) => t.name ?? tf(t, 'title');
  const tplBody = (t: WhatsAppTemplate) => t.bodyText ?? tf(t, 'text');
  const formatTime = (stamp: string) => {
    const d = new Date(stamp);
    return isNaN(d.getTime())
      ? stamp
      : d.toLocaleTimeString(language === 'mr' ? 'mr-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });
  };
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [toPhone, setToPhone] = useState(initialPhone);
  const [toName, setToName] = useState(initialName);
  const [outgoingText, setOutgoingText] = useState(initialText);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Incoming Simulator State
  const [incomingText, setIncomingText] = useState('');
  const [simulating, setSimulating] = useState(false);

  // Active Tab inside WhatsApp Suite
  const [suiteTab, setSuiteTab] = useState<'simulator' | 'templates' | 'config'>('simulator');

  const loadData = async () => {
    setLoading(true);
    try {
      const [msgs, tpls] = await Promise.all([
        api.getWhatsAppMessages(),
        api.getWhatsAppTemplates(),
      ]);
      setMessages(msgs);
      setTemplates(tpls);
    } catch (err) {
      console.error('Error loading WhatsApp data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outgoingText.trim() && !selectedTemplate) return;

    let contentToSend = outgoingText;
    if (selectedTemplate) {
      const tpl = templates.find((t) => t.id === selectedTemplate);
      if (tpl) {
        contentToSend = tplBody(tpl)
          .replace('{{1}}', toName)
          .replace('{{2}}', 'Global Impact Foundation')
          .replace('{{3}}', '₹1,50,000');
      }
    }

    await api.sendWhatsAppMessage({
      toPhone,
      toName,
      content: contentToSend,
      templateName: (templates.find((t) => t.id === selectedTemplate) && tplName(templates.find((t) => t.id === selectedTemplate)!)) || undefined,
    });

    setOutgoingText('');
    setSelectedTemplate('');
    loadData();
  };

  const handleSimulateIncoming = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomingText.trim()) return;

    setSimulating(true);
    try {
      await api.simulateIncomingWhatsApp({
        fromPhone: toPhone,
        fromName: toName,
        messageText: incomingText,
      });
      setIncomingText('');
      await loadData();
    } catch (err) {
      console.error('Error simulating incoming message:', err);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)]">
      {/* Title & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583]">
            {tr('Palawi Donor Messaging Channel', 'पालवी दाता संदेश माध्यम')}
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
            {tr('WhatsApp Communications & Outreach', 'व्हॉट्सॲप संवाद व संपर्क')}
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl text-xs shadow-2xs">
          <button
            onClick={() => setSuiteTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              suiteTab === 'simulator' ? 'bg-gradient-to-r from-[#023b77] to-[#039583] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tr('Chat Simulator', 'चॅट सराव')}
          </button>
          <button
            onClick={() => setSuiteTab('templates')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              suiteTab === 'templates' ? 'bg-gradient-to-r from-[#023b77] to-[#039583] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tr('Approved Templates', 'मंजूर साचे')}
          </button>
          <button
            onClick={() => setSuiteTab('config')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              suiteTab === 'config' ? 'bg-gradient-to-r from-[#023b77] to-[#039583] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tr('Credentials', 'प्रवेश तपशील')}
          </button>
        </div>
      </div>

      {suiteTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Direct Message Dispatcher (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#039583]" />
                <span>{tr('Send Direct WhatsApp Message', 'थेट व्हॉट्सॲप संदेश पाठवा')}</span>
              </h3>

              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">{tr('Recipient Name', 'प्राप्तकर्त्याचे नाव')}</label>
                    <input
                      type="text"
                      required
                      value={toName}
                      onChange={(e) => setToName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">{tr('WhatsApp Phone (+91...)', 'व्हॉट्सॲप फोन (+91...)')}</label>
                    <input
                      type="text"
                      required
                      value={toPhone}
                      onChange={(e) => setToPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#039583]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">
                    {tr('Use Pre-Approved Template (Optional)', 'मंजूर साचा वापरा (ऐच्छिक)')}
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                  >
                    <option value="">{tr('Custom Freeform Message', 'स्वतःचा संदेश')}</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {tplName(t)} ({tv(t.category)})
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedTemplate && (
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">{tr('Message Body', 'संदेश मजकूर')}</label>
                    <textarea
                      rows={4}
                      value={outgoingText}
                      onChange={(e) => setOutgoingText(e.target.value)}
                      placeholder={tr('Type your WhatsApp message for the CSR representative...', 'सीएसआर प्रतिनिधीसाठी व्हॉट्सॲप संदेश लिहा...')}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-95 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{tr('Send WhatsApp Message', 'व्हॉट्सॲप संदेश पाठवा')}</span>
                </button>
              </form>
            </div>

            {/* Simulated Incoming Message Trigger */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#039583]" />
                  <span>{tr('Simulate Incoming Donor WhatsApp Message', 'दात्याकडून येणाऱ्या संदेशाचा सराव')}</span>
                </h3>
                <span className="text-[10px] font-bold text-[#039583] bg-[#039583]/15 px-2 py-0.5 rounded">
                  {tr('AI Auto-Reply Active', 'एआय स्वयं-उत्तर सक्रिय')}
                </span>
              </div>

              <form onSubmit={handleSimulateIncoming} className="space-y-3 text-xs">
                <input
                  type="text"
                  value={incomingText}
                  onChange={(e) => setIncomingText(e.target.value)}
                  placeholder={tr('e.g. Can you send the updated proposal and 80G tax receipt?', 'उदा. सुधारित प्रस्ताव व 80G कर पावती पाठवू शकाल का?')}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                />

                <button
                  type="submit"
                  disabled={simulating}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#023b77] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-200"
                >
                  {simulating ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#039583]" />
                  ) : (
                    <Zap className="w-4 h-4 text-[#039583]" />
                  )}
                  <span>{tr('Test Incoming Trigger & AI Response', 'येणारा संदेश व एआय उत्तर तपासा')}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Smartphone Chat Preview (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-slate-900 border-4 border-slate-800 shadow-xl overflow-hidden flex flex-col h-[580px]">
              {/* Phone Header */}
              <div className="bg-gradient-to-r from-[#023b77] to-[#039583] px-4 py-3 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                    {toName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight truncate max-w-[170px]">{toName}</p>
                    <p className="text-[10px] text-teal-100 font-mono">{toPhone}</p>
                  </div>
                </div>
                <Smartphone className="w-4 h-4 text-teal-100" />
              </div>

              {/* Chat Feed */}
              <div className="flex-1 bg-slate-100 p-3 space-y-3 overflow-y-auto">
                <div className="text-center text-[10px] text-slate-500 my-2 font-mono font-bold">
                  {tr('── PALAWI CHAT STREAM ──', '── पालवी संवाद ──')}
                </div>

                {messages.map((m) => {
                  const isOutbound = m.direction === 'outbound';

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isOutbound ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[82%] p-2.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                          isOutbound
                            ? 'bg-gradient-to-tr from-[#023b77] to-[#039583] text-white rounded-br-none'
                            : 'bg-white text-slate-900 rounded-bl-none border border-slate-200'
                        }`}
                      >
                        {m.templateName && (
                          <div className="text-[9px] font-bold uppercase tracking-wider text-teal-100 bg-black/20 px-1.5 py-0.5 rounded inline-block">
                            {tr('Template:', 'साचा:')} {m.templateName}
                          </div>
                        )}
                        <p className="leading-snug">{m.content}</p>

                        {m.aiGenerated && (
                          <div className="text-[9px] font-bold text-teal-200 flex items-center gap-1 pt-1">
                            <Sparkles className="w-3 h-3 text-teal-200" />
                            <span>{tr('AI Auto-Reply', 'एआय स्वयं-उत्तर')}</span>
                          </div>
                        )}

                        <div
                          className={`flex items-center justify-end gap-1 text-[9px] font-mono ${
                            isOutbound ? 'text-teal-100' : 'text-slate-400'
                          }`}
                        >
                          <span>{formatTime(m.timestamp)}</span>
                          {isOutbound && <CheckCheck className="w-3 h-3 text-teal-100" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Phone Footer */}
              <div className="p-2.5 bg-slate-900 border-t border-slate-800 text-center text-[10px] text-slate-300 font-mono font-bold">
                {tr('Palawi Messaging Sandbox', 'पालवी संदेश सराव कक्ष')}
              </div>
            </div>
          </div>
        </div>
      )}

      {suiteTab === 'templates' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div key={tpl.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{tplName(tpl)}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#039583]/15 text-[#039583] border border-[#039583]/30">
                    {tv(tpl.status ?? 'Approved')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px]">
                  {tplBody(tpl)}
                </div>

                {tpl.buttons && (
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.buttons.map((b) => (
                      <span key={b} className="bg-slate-100 border border-slate-200 text-[#023b77] text-[10px] font-bold px-2 py-1 rounded">
                        {tr('Button:', 'बटण:')} {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {suiteTab === 'config' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-2xl space-y-4 text-xs text-slate-900">
          <h3 className="text-sm font-bold text-slate-900">{tr('WhatsApp Outreach Credentials', 'व्हॉट्सॲप संपर्क प्रवेश तपशील')}</h3>

          <div className="space-y-3 font-mono">
            <div>
              <label className="block text-slate-600 mb-1 font-semibold">{tr('Phone Number ID', 'फोन नंबर आयडी')}</label>
              <input
                type="text"
                readOnly
                value="109283749201948"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#039583] font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">{tr('Webhook Verify Token', 'वेबहुक पडताळणी टोकन')}</label>
              <input
                type="text"
                readOnly
                value="palawi_secret_verify_2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#023b77] font-bold"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
