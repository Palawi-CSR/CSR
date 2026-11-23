import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { DashboardOverview } from './pages/DashboardOverview';
import { UnifiedDatabaseHub } from './pages/UnifiedDatabaseHub';
import { GateRegisterLog } from './pages/GateRegisterLog';
import { ProposalCreator } from './pages/ProposalCreator';
import { ReportGenerator } from './pages/ReportGenerator';
import { DonationReceiptGenerator } from './pages/DonationReceiptGenerator';
import { ProductsAndRevenue } from './pages/ProductsAndRevenue';
import { WhatsappIntegrationSuite } from './pages/WhatsappIntegrationSuite';
import { LoginPage } from './pages/LoginPage';
import { api } from './services/api';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { tr } = useLanguage();
  const [user, setUser] = useState<User | null>({
    id: 'usr_1',
    name: 'Admin',
    email: 'admin@palawi.org',
    role: 'Admin',
    organization: 'Palawi Foundation',
    createdAt: '2025-01-10T08:00:00Z',
  });

  // Default to Dashboard when logged in
  const [activeTab, setActiveTab] = useState(user ? 'dashboard' : 'home');
  const [metrics, setMetrics] = useState<any>(null);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  // Pre-filled WhatsApp state when triggered from other views
  const [whatsappPhone, setWhatsappPhone] = useState('+918179308777');
  const [whatsappName, setWhatsappName] = useState(() => tr('Bank Of India Pandharpur', 'बँक ऑफ इंडिया, पंढरपूर'));
  const [whatsappDefaultText, setWhatsappDefaultText] = useState('');

  useEffect(() => {
    api.getDashboardMetrics().then(setMetrics).catch(console.error);
  }, []);

  // Demo-only role switch: swap to the matching demo profile and land on that role's home tab.
  const handleSelectRole = (newRole: UserRole) => {
    if (!user || user.role === newRole) return;
    const isEmployee = newRole === 'Employee';
    setUser({
      ...user,
      id: isEmployee ? 'usr_2' : 'usr_1',
      name: newRole,
      email: isEmployee ? 'employee@palawi.org' : 'admin@palawi.org',
      role: newRole,
    });
    setActiveTab(isEmployee ? 'gate-register' : 'dashboard');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setShowLoginScreen(false);
    if (loggedInUser.role === 'Employee') {
      setActiveTab('gate-register');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleOpenWhatsAppForContact = (phone: string, name: string, defaultText?: string) => {
    setWhatsappPhone(phone);
    setWhatsappName(name);
    setWhatsappDefaultText(defaultText || '');
    setActiveTab('whatsapp-suite');
  };

  if (showLoginScreen) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={() => {
          setShowLoginScreen(false);
          if (!user) setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#039583] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        user={user}
        onSelectRole={handleSelectRole}
        onOpenQuickOutreach={() => setActiveTab('whatsapp-suite')}
        onOpenAddPartner={() => setActiveTab('csr-database')}
        onOpenLogin={() => setShowLoginScreen(true)}
        onLogout={handleLogout}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Workspace Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
        />

        {/* Viewport Workspace Canvas */}
        <main className="flex-1 overflow-x-hidden">
          {/* Public Home Page - Only rendered when signed out */}
          {!user && activeTab === 'home' && (
            <HomePage
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenQuickOutreach={() => setActiveTab('whatsapp-suite')}
              metrics={metrics}
            />
          )}

          {/* Gate Register - available to both Employee & Admin */}
          {activeTab === 'gate-register' && (
            <GateRegisterLog />
          )}

          {/* Admin-only features: Only rendered if user is Admin / CSR Admin */}
          {user?.role !== 'Employee' && (
            <>
              {/* Dashboard Overview */}
              {activeTab === 'dashboard' && (
                <DashboardOverview
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenQuickOutreach={() => setActiveTab('whatsapp-suite')}
                />
              )}

              {/* Merged Database Hub (CSR Database, Donor CRM, Centralised Records) */}
              {(activeTab === 'csr-database' || activeTab === 'donor-pipeline' || activeTab === 'donor-records') && (
                <UnifiedDatabaseHub
                  onOpenWhatsAppOutreach={handleOpenWhatsAppForContact}
                  initialSubTab={
                    activeTab === 'donor-pipeline' 
                      ? 'pipeline' 
                      : activeTab === 'donor-records' 
                      ? 'records' 
                      : 'csr'
                  }
                />
              )}

              {/* Proposal Creator */}
              {activeTab === 'proposal-creator' && (
                <ProposalCreator
                  onOpenWhatsAppOutreach={handleOpenWhatsAppForContact}
                />
              )}

              {/* Report Generator */}
              {activeTab === 'report-generator' && (
                <ReportGenerator />
              )}

              {/* Donation Receipt Generator */}
              {activeTab === 'receipt-generator' && (
                <DonationReceiptGenerator
                  onOpenWhatsAppOutreach={handleOpenWhatsAppForContact}
                />
              )}

              {/* Products & Revenue */}
              {activeTab === 'products-revenue' && (
                <ProductsAndRevenue />
              )}

              {activeTab === 'whatsapp-suite' && (
                <WhatsappIntegrationSuite
                  initialPhone={whatsappPhone}
                  initialName={whatsappName}
                  initialText={whatsappDefaultText}
                />
              )}
            </>
          )}

          {/* Fallback for Employee if accidentally switched to another tab */}
          {user?.role === 'Employee' && activeTab !== 'gate-register' && (
            <div className="p-12 text-center space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-amber-900">
                <p className="font-bold text-sm">{tr('Gate Register Access Only', 'फक्त गेट रजिस्टर प्रवेश')}</p>
                <p className="text-xs text-amber-700 mt-1">
                  {tr('Employee account has operational access to the Gate Register. Admin management features are restricted to Admin accounts.', 'कर्मचारी खात्याला फक्त गेट रजिस्टरचा प्रवेश आहे. व्यवस्थापनाची इतर वैशिष्ट्ये फक्त प्रशासक खात्यांसाठी आहेत.')}
                </p>
                <button
                  onClick={() => setActiveTab('gate-register')}
                  className="mt-3 px-4 py-2 bg-[#039583] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {tr('Return to Gate Register', 'गेट रजिस्टरकडे परत जा')}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
