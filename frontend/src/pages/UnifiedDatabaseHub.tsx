import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CsrPartnerDatabase } from '../components/CsrPartnerDatabase';
import { DonorRelationshipManager } from '../components/DonorRelationshipManager';
import { CentralisedDonorRecords } from '../components/CentralisedDonorRecords';
import { Building, Users, FileCheck2 } from 'lucide-react';

interface UnifiedDatabaseHubProps {
  onOpenWhatsAppOutreach: (phone: string, name: string, defaultText?: string) => void;
  initialSubTab?: 'csr' | 'pipeline' | 'records';
}

export const UnifiedDatabaseHub: React.FC<UnifiedDatabaseHubProps> = ({
  onOpenWhatsAppOutreach,
  initialSubTab = 'csr',
}) => {
  const { t, tr } = useLanguage();
  const [subTab, setSubTab] = useState<'csr' | 'pipeline' | 'records'>(initialSubTab);

  return (
    <div className="min-h-[calc(100vh-61px)] bg-slate-50 font-sans">
      {/* Sub-Header Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-[61px] z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#023b77]/10 text-[#023b77]">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              {t('nav.database')}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {tr('Unified CSR Opportunities, Donor CRM Pipeline & Centralised Records Hub', 'सीएसआर भागीदार, दाता पाइपलाइन व मध्यवर्ती नोंदणी एकत्रित डॅशबोर्ड')}
            </p>
          </div>
        </div>

        {/* Sub-tab Navigation Pills */}
        <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl space-x-1 shrink-0 overflow-x-auto">
          <button
            onClick={() => setSubTab('csr')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              subTab === 'csr'
                ? 'bg-white text-[#023b77] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#039583]" />
            <span>{tr('CSR Opportunities', 'सीएसआर संधी')}</span>
          </button>

          <button
            onClick={() => setSubTab('pipeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              subTab === 'pipeline'
                ? 'bg-white text-[#023b77] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#039583]" />
            <span>{tr('Donor Pipeline CRM', 'दाता पाइपलाइन')}</span>
          </button>

          <button
            onClick={() => setSubTab('records')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              subTab === 'records'
                ? 'bg-white text-[#023b77] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#039583]" />
            <span>{tr('Centralised Donor Records', 'मध्यवर्ती दाता रेकॉर्ड')}</span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-View */}
      <div>
        {subTab === 'csr' && (
          <CsrPartnerDatabase onOpenWhatsAppOutreach={onOpenWhatsAppOutreach} />
        )}
        {subTab === 'pipeline' && (
          <DonorRelationshipManager onOpenWhatsAppOutreach={onOpenWhatsAppOutreach} />
        )}
        {subTab === 'records' && (
          <CentralisedDonorRecords onOpenWhatsAppOutreach={onOpenWhatsAppOutreach} />
        )}
      </div>
    </div>
  );
};
