import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import LoadingModal from './components/LoadingModal';
import { Email, useEmailStore } from './store/emailStore';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('inbox');
  const { emails, markAsRead, setEmails, clearLabels } = useEmailStore();

  // Load emails on initial render
  useEffect(() => {
    fetch('http://localhost:4000/api/emails')
      .then((res) => res.json())
      .then((data) => setEmails(data))
      .catch((err) => console.error('❌ Failed to load emails:', err));
  }, [setEmails]);

  // Delay helper to avoid hitting OpenAI rate limits
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Trigger LLM-based classification and update state with throttling
  const [isLoading, setIsLoading] = useState(false);
  const handleClassifyEmails = async () => {
    setIsLoading(true);
    try {
      const classified = await Promise.all(
        emails.map(async (email) => {
          const response = await fetch('http://localhost:4000/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailText: email.body }),
          });

          const data = await response.json();
          return { ...email, newLabel: data.label };
        })
      );

      setEmails(classified);
      console.log('✅ Updated email list:', classified.map(e => [e.subject, e.newLabel]));

    } catch (err) {
      console.error('❌ Error classifying emails:', err);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <Router>
      <div className="app">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="main-content">
        {isLoading && <LoadingModal />}
          <Header 
            onClassifyEmails={handleClassifyEmails} 
            onClearLabels={clearLabels}
            />
          <Routes>
            <Route path="/" element={<Navigate to="/inbox" replace />} />
            <Route
              path="/inbox"
              element={
                <InboxPage emails={emails} onMarkAsRead={markAsRead} />
              }
            />
            <Route
              path="/email/:emailId"
              element={<EmailDetailPage onMarkAsRead={markAsRead} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function InboxPage({
  emails,
  onMarkAsRead,
}: {
  emails: any[];
  onMarkAsRead: (emailId: string) => void;
}) {
  const navigate = useNavigate();

  const handleEmailClick = (email: any) => {
    navigate(`/email/${email.id}`);
  };

  return (
    <div className="content-area">
      <EmailList emails={emails} onEmailClick={handleEmailClick} />
    </div>
  );
}

function EmailDetailPage({
  onMarkAsRead,
}: {
  onMarkAsRead: (emailId: string) => void;
}) {
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
