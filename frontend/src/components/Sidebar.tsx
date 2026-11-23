import React from 'react';
import { User } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home,
  LayoutDashboard, 
  Building, 
  MessageSquareCode,
  ClipboardList,
  Sparkles,
  FileSpreadsheet,
  FileCheck2,
  ShoppingBag
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
}) => {
  const { t, tr } = useLanguage();

  const allNavItems = [
    {
      id: 'home',
      label: t('nav.howItWorks'),
      icon: Home,
      publicOnly: true, // Only show when signed out
    },
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
    },
    {
      id: 'gate-register',
      label: t('nav.gateRegister'),
      icon: ClipboardList,
    },
    {
      id: 'csr-database',
      label: t('nav.database'),
      icon: Building,
    },
    {
      id: 'proposal-creator',
      label: t('nav.proposalCreator'),
      icon: Sparkles,
    },
    {
      id: 'report-generator',
      label: t('nav.reportGenerator'),
      icon: FileSpreadsheet,
    },
    {
      id: 'receipt-generator',
      label: t('nav.receiptGenerator'),
      icon: FileCheck2,
    },
    {
      id: 'products-revenue',
      label: t('nav.productsRevenue'),
      icon: ShoppingBag,
    },
    {
      id: 'whatsapp-suite',
      label: t('nav.whatsapp'),
      icon: MessageSquareCode,
      highlight: true,
    },
  ];

  // Filter items based on user role and auth state
  const navItems = allNavItems.filter((item) => {
    // When signed out, hide internal tabs, show publicOnly
    if (!user && !item.publicOnly && item.id !== 'dashboard') return false;
    if (user && item.publicOnly) return false;

    // For Employee: ONLY show Gate Register Log
    if (user && user.role === 'Employee') {
      return item.id === 'gate-register';
    }

    return true;
  });

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between text-slate-700 min-h-[calc(100vh-61px)] font-sans">
      <div className="p-3 space-y-1">
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {t('nav.workspace')}
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#023b77]/10 to-[#039583]/15 text-[#023b77] border border-[#039583]/30 font-bold shadow-2xs'
                  : 'hover:bg-slate-100/80 text-slate-700'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#023b77] to-[#039583] text-white shadow-xs'
                    : item.highlight
                    ? 'bg-[#039583]/15 text-[#039583]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold tracking-tight truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
        <img 
          src="/logo.png" 
          alt={tr('Palawi', 'पालवी')} 
          className="w-5 h-5 object-contain rounded-full border border-slate-200"
        />
        <span>{tr('Palawi CSR • A Touch of Life', 'पालवी सीएसआर • जीवनाचा स्पर्श')}</span>
      </div>
    </aside>
  );
};
