import React, { useState } from 'react';
import { User } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  UserCheck 
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onContinueAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [email, setEmail] = useState('admin@palawi.org');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Employee'>('Admin');
  const { language, setLanguage, tr } = useLanguage();

  const handleAdminQuickLogin = () => {
    const loggedInUser: User = {
      id: 'usr_1',
      name: 'Admin',
      email: 'admin@palawi.org',
      role: 'Admin',
      organization: 'Palawi Foundation',
      createdAt: new Date().toISOString(),
    };
    onLoginSuccess(loggedInUser);
  };

  const handleEmployeeQuickLogin = () => {
    const loggedInUser: User = {
      id: 'usr_2',
      name: 'Employee',
      email: 'employee@palawi.org',
      role: 'Employee',
      organization: 'Palawi Foundation',
      createdAt: new Date().toISOString(),
    };
    onLoginSuccess(loggedInUser);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const isEmployee = selectedRole === 'Employee' || email.toLowerCase().includes('employee');
    const loggedInUser: User = {
      id: isEmployee ? 'usr_2' : `usr_${Date.now()}`,
      name: isEmployee ? 'Employee' : 'Admin',
      email,
      role: isEmployee ? 'Employee' : 'Admin',
      organization: 'Palawi Foundation',
      createdAt: new Date().toISOString(),
    };
    onLoginSuccess(loggedInUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-6 selection:bg-[#039583] selection:text-white">
      <div className="w-full max-w-2xl space-y-8">
        {/* Language toggle (the navbar is not shown on this screen) */}
        <div className="flex justify-end">
          <div className="inline-flex p-0.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md transition-colors ${language === 'en' ? 'bg-white text-[#039583] shadow-xs' : 'text-slate-500'}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-3 py-1 rounded-md transition-colors ${language === 'mr' ? 'bg-white text-[#039583] shadow-xs' : 'text-slate-500'}`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 p-1 shadow-md mb-2 overflow-hidden">
            <img 
              src="/logo.png" 
              alt={tr('Palawi Logo', 'पालवी लोगो')} 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#023b77] tracking-tight">
            {tr('Palawi CSR & Operations', 'पालवी सीएसआर व कामकाज')}
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            {tr('Centralized portal for CSR administration and ground operations gate register logging.', 'सीएसआर प्रशासन आणि प्रत्यक्ष कामकाजातील गेट रजिस्टर नोंदीसाठी मध्यवर्ती पोर्टल.')}
          </p>
        </div>

        {/* Login Container */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Quick Sign In Buttons for Admin and Employee */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#039583]" />
                <span>{tr('Select Sign-In Credentials', 'साइन इन खाते निवडा')}</span>
              </span>
              <span className="text-[11px] font-normal text-slate-400">{tr('1-Click Fast Access', 'एका क्लिकमध्ये प्रवेश')}</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Admin Quick Login Card */}
              <button
                type="button"
                onClick={handleAdminQuickLogin}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#023b77] hover:bg-slate-50/80 transition-all text-left flex flex-col justify-between group shadow-2xs cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between w-full mb-3">
                  <div className="p-2.5 rounded-xl bg-[#023b77] text-white shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#023b77]/10 text-[#023b77]">
                    {tr('Full Access', 'पूर्ण प्रवेश')}
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#023b77]">
                    {tr('Sign In as Admin', 'प्रशासक म्हणून साइन इन करा')}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">admin@palawi.org</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {tr('Dashboard, Database, CRM, Proposals & Gate Log', 'डॅशबोर्ड, डेटाबेस, दाता नोंदणी, प्रस्ताव व गेट नोंद')}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#023b77] mt-3 pt-2 border-t border-slate-100">
                  <span>{tr('Enter Admin Dashboard', 'प्रशासक डॅशबोर्ड उघडा')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Employee Quick Login Card */}
              <button
                type="button"
                onClick={handleEmployeeQuickLogin}
                className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 hover:border-[#039583] hover:bg-emerald-50/70 transition-all text-left flex flex-col justify-between group shadow-2xs cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between w-full mb-3">
                  <div className="p-2.5 rounded-xl bg-[#039583] text-white shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#039583]/15 text-[#039583]">
                    {tr('Gate Register', 'गेट रजिस्टर')}
                  </span>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#039583]">
                    {tr('Sign In as Employee', 'कर्मचारी म्हणून साइन इन करा')}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">employee@palawi.org</p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {tr('Direct access to Gate Register & Voice Log (No Admin tabs)', 'गेट रजिस्टर व व्हॉइस नोंदीचा थेट प्रवेश (प्रशासक विभाग नाहीत)')}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#039583] mt-3 pt-2 border-t border-emerald-100">
                  <span>{tr('Enter Gate Register', 'गेट रजिस्टर उघडा')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 absolute">{tr('OR', 'किंवा')}</span>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3 text-xs">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl mb-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('Admin');
                  setEmail('admin@palawi.org');
                }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  selectedRole === 'Admin'
                    ? 'bg-white text-[#023b77] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tr('Admin Credentials', 'प्रशासक खाते')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('Employee');
                  setEmail('employee@palawi.org');
                }}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                  selectedRole === 'Employee'
                    ? 'bg-[#039583] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tr('Employee Credentials', 'कर्मचारी खाते')}
              </button>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-medium">{tr('Email Address', 'ईमेल पत्ता')}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'Employee' ? 'employee@palawi.org' : 'admin@palawi.org'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-medium">{tr('Password', 'पासवर्ड')}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-[#039583]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#023b77] to-[#039583] hover:opacity-95 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>{selectedRole === 'Employee' ? tr('Sign In as Employee', 'कर्मचारी म्हणून साइन इन करा') : tr('Sign In with Password', 'पासवर्डने साइन इन करा')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {onContinueAsGuest && (
            <div className="pt-2 text-center">
              <button
                onClick={onContinueAsGuest}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium underline transition-colors"
              >
                {tr('Continue as Guest Visitor →', 'अतिथी म्हणून पुढे जा →')}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 font-medium">
          {tr('Palawi CSR Platform · Admin Encrypted Access', 'पालवी सीएसआर प्लॅटफॉर्म · सुरक्षित प्रशासक प्रवेश')}
        </div>
      </div>
    </div>
  );
};
