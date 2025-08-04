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
import { Email, useEmailStore } from './store/emailStore';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('inbox');
  const { emails, markAsRead, setEmails } = useEmailStore();

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
  const handleClassifyEmails = async () => {
    try {
      const classified: Email[] = [];

      for (const email of emails) {
        try {
          const response = await fetch('http://localhost:4000/api/classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailText: email.body }),
          });

          const data = await response.json();
          const label = data.label;
          classified.push({ ...email, newLabel: label });

          // Wait 250ms between requests to avoid rate limit
          await delay(250);
        } catch (err) {
          console.error(`❌ Error classifying email ${email.id}:`, err);
          classified.push(email); // fallback to original if error
        }
      }

      setEmails(classified);
      console.log('✅ Emails classified and updated');
    } catch (err) {
      console.error('❌ Error in classification process:', err);
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
          <Header onClassifyEmails={handleClassifyEmails} />
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
