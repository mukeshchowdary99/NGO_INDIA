import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DonatePage } from './components/pages/DonatePage';
import { EnquiryPage } from './components/pages/EnquiryPage';
import { JoinPage } from './components/pages/JoinPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { Chatbot } from './components/Chatbot';
import { useChatbot } from './hooks/useChatbot';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const { isOpen, toggleChatbot } = useChatbot();

  // Simple routing based on pathname
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route rendering
  if (currentPage === '/donate') {
    return <DonatePage />;
  }
  
  if (currentPage === '/join') {
    return <JoinPage />;
  }

  if (currentPage === '/enquiry') {
    return <EnquiryPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      ) : (
        <LandingPage />
      )}
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;