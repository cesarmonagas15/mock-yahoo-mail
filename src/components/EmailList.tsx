import React, { useEffect, useState } from 'react';
import { Email } from '../data/emails';
import { useEmailStore } from '../store/emailStore';

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onEmailClick }) => {
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);
  const { markAsRead } = useEmailStore();

  // Listen for changes in email read status
  useEffect(() => {
    const unreadEmails = emails.filter(email => !email.isRead);
    if (unreadEmails.length > 0) {
      // Show a subtle indicator that there are unread emails
      console.log(`${unreadEmails.length} unread emails`);
    }
  }, [emails]);

  const handleEmailClick = (email: Email) => {
    if (!email.isRead) {
      setMarkingAsRead(email.id);
      // Mark as read immediately when clicked
      markAsRead(email.id);
      setTimeout(() => {
        setMarkingAsRead(null);
      }, 1000);
    }
    onEmailClick(email);
  };

  return (
    <div className="email-list">
      <ul>
        {emails.map((email) => (
          <li
            key={email.id}
            className={`${!email.isRead ? 'unread' : ''} ${markingAsRead === email.id ? 'marking-as-read' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="email-checkbox">
              <input type="checkbox" />
            </div>
            
            <div className="email-sender">
              {email.sender}
            </div>
            
            <div className="email-content">
              <div className="email-subject">
                {email.subject}
              </div>
              <div className="email-snippet">
                {email.snippet}
              </div>
            </div>
            
            <div className="email-timestamp">
              {email.timestamp}
            </div>
            
            {markingAsRead === email.id && (
              <div className="email-read-indicator">
                <span>Marcando como leído...</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList; 