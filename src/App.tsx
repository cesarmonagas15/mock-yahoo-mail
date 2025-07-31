import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import { useEmailStore } from './store/emailStore';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('inbox');
  const { emails, markAsRead } = useEmailStore();

  return (
    <Router>
      <div className="app">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/inbox" replace />} />
            <Route 
              path="/inbox" 
              element={
                <InboxPage 
                  emails={emails}
                  onMarkAsRead={markAsRead}
                />
              } 
            />
            <Route 
              path="/email/:emailId" 
              element={
                <EmailDetailPage 
                  onMarkAsRead={markAsRead}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Separate component for inbox page
function InboxPage({ emails, onMarkAsRead }: { emails: any[], onMarkAsRead: (emailId: string) => void }) {
  const navigate = useNavigate();

  const handleEmailClick = (email: any) => {
    // Navigate to email detail page in the same tab
    navigate(`/email/${email.id}`);
  };

  return (
    <div className="content-area">
      <EmailList 
        emails={emails} 
        onEmailClick={handleEmailClick}
      />
    </div>
  );
}

// Separate component for email detail page
function EmailDetailPage({ onMarkAsRead }: { onMarkAsRead: (emailId: string) => void }) {
  const { emailId } = useParams<{ emailId: string }>();
  const navigate = useNavigate();
  const { getEmail } = useEmailStore();
  
  const email = emailId ? getEmail(emailId) : undefined;

  if (!email) {
    return (
      <div className="email-detail">
        <div className="email-detail-content">
          <h2>Email no encontrado</h2>
          <button onClick={() => navigate('/inbox')}>Volver al buzón</button>
        </div>
      </div>
    );
  }

  return (
    <EmailDetail 
      email={email}
      onClose={() => navigate('/inbox')}
      onMarkAsRead={onMarkAsRead}
    />
  );
}

export default App; 