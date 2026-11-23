import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  MessageSquare, 
  ShieldCheck,
  ChevronDown,
  LogOut,
  Plus,
  Globe,
  Check,
  Repeat
} from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onSelectRole?: (role: UserRole) => void;
  onOpenQuickOutreach: () => void;
  onOpenAddPartner: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onSelectRole,
  onOpenQuickOutreach,
  onOpenAddPartner,
  onOpenLogin,
  onLogout,
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const demoRoles: UserRole[] = ['Admin', 'Employee'];
  const { language, setLanguage, t, tr, tv } = useLanguage();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-b border-slate-200 text-slate-900 shadow-xs">
      {/* Brand Logo & Wordmark "Palawi CSR" */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 p-0.5 shadow-xs overflow-hidden flex items-center justify-center shrink-0">
          <img 
            src="/logo.png" 
            alt={tr('Palawi Logo', 'पालवी लोगो')} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-[#023b77] whitespace-nowrap leading-tight">
            {tr('Palawi CSR', 'पालवी सीएसआर')}
          </span>
          <span className="text-[10px] text-[#039583] font-semibold leading-none">
            {tr('Pandharpur Center • A Touch of Life', 'पंढरपूर केंद्र • जीवनाचा स्पर्श')}
          </span>
        </div>
      </div>

      {/* Navigation Links, Language Switcher & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowAccountMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
            title={tr('Switch language', 'भाषा बदला')}
          >
            <Globe className="w-3.5 h-3.5 text-[#039583]" />
            <span className="hidden xs:inline">{language === 'mr' ? 'मराठी' : 'English'}</span>
            <span className="xs:hidden">{language === 'mr' ? 'MR' : 'EN'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('lang.select')}
                </p>
              </div>
              <button
                onClick={() => {
                  setLanguage('en');
                  setShowLangMenu(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  language === 'en' ? 'font-bold text-[#039583] bg-slate-50' : 'text-slate-700'
                }`}
              >
                <span>English</span>
                {language === 'en' && <Check className="w-3.5 h-3.5 text-[#039583]" />}
              </button>
              <button
                onClick={() => {
                  setLanguage('mr');
                  setShowLangMenu(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                  language === 'mr' ? 'font-bold text-[#039583] bg-slate-50' : 'text-slate-700'
                }`}
              >
                <span>मराठी</span>
                {language === 'mr' && <Check className="w-3.5 h-3.5 text-[#039583]" />}
              </button>
            </div>
          )}
        </div>

        {!user && (
          <button 
            onClick={scrollToHowItWorks}
            className="text-xs font-medium text-slate-600 hover:text-[#023b77] transition-colors hidden md:block"
          >
            {t('nav.howItWorks')}
          </button>
        )}

        {user ? (
          <>
            {user.role !== 'Employee' && (
              <>
                <button
                  onClick={onOpenAddPartner}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#039583]" />
                  <span>{t('nav.addCsr')}</span>
                </button>

                <button
                  onClick={onOpenQuickOutreach}
                  className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-90 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>{t('nav.whatsapp')}</span>
                </button>
              </>
            )}

            <div className="relative">
              <button
                onClick={() => {
                  setShowAccountMenu(!showAccountMenu);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 transition-colors cursor-pointer"
              >
                <div className={`p-1 rounded text-white ${user.role === 'Employee' ? 'bg-[#039583]' : 'bg-[#023b77]'}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {tv(user.name || user.role)}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      user.role === 'Employee'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#023b77]/10 text-[#023b77]'
                    }`}>
                      {tv(user.role)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold leading-tight font-mono">
                    {user.email}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {tr('Active Account', 'सक्रिय खाते')}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-xs text-slate-900 font-bold truncate">
                        {tv(user.name || user.role)}
                      </p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        user.role === 'Employee'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#023b77]/10 text-[#023b77]'
                      }`}>
                        {tv(user.role)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{user.email}</p>
                  </div>

                  {onSelectRole && (
                    <div className="py-1 border-b border-slate-100">
                      <p className="px-3 pt-1 pb-1 flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Repeat className="w-3 h-3" />
                        {tr('Switch Role (Demo)', 'भूमिका बदला (डेमो)')}
                      </p>
                      {demoRoles.map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setShowAccountMenu(false);
                            onSelectRole(role);
                          }}
                          className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                            user.role === role ? 'font-bold text-[#039583] bg-slate-50' : 'text-slate-700'
                          }`}
                        >
                          <span>{tv(role)}</span>
                          {user.role === role && <Check className="w-3.5 h-3.5 text-[#039583]" />}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3.5 py-2 flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{tr('Sign Out', 'बाहेर पडा')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold text-slate-700 hover:text-[#023b77] transition-colors"
            >
              {t('nav.signIn')}
            </button>

            <button
              onClick={onOpenLogin}
              className="px-4 py-2 text-xs font-bold text-white bg-[#039583] hover:bg-[#039583]/90 rounded-lg transition-colors shadow-2xs"
            >
              {t('nav.getStarted')}
            </button>
          </>
        )}
      </div>
    </header>
  );
};
