import React, { useState, useEffect, useRef } from 'react';
import { useEmailStore } from '../store/emailStore';

interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  oldLabel: string;
  newLabel?: string; // may be undefined by default
  isRead: boolean;
}

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
}

const validLabels = ['Prioridad', 'Ofertas', 'Actualizaciones', 'Boletines', 'Social', 'Noticias'];


const EmailList: React.FC<EmailListProps> = ({ emails, onEmailClick }) => {
  const [markingAsRead, setMarkingAsRead] = useState<string | null>(null);
  const { markAsRead, markAsUnread } = useEmailStore();

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    emailId: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    emailId: null,
  });

  const contextRef = useRef<HTMLDivElement | null>(null);

  const handleEmailClick = (email: Email) => {
    if (!email.isRead) {
      setMarkingAsRead(email.id);
      markAsRead(email.id);
      setTimeout(() => {
        setMarkingAsRead(null);
      }, 500);
    }
    onEmailClick(email);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLLIElement>,
    emailId: string
  ) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      emailId,
    });
  };

  const handleMarkAsUnread = () => {
    if (contextMenu.emailId) {
      markAsUnread(contextMenu.emailId);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      contextRef.current &&
      !contextRef.current.contains(e.target as Node)
    ) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);
  console.log('📬 Rendering EmailList with:', emails.map(e => [e.subject, e.newLabel]));

  return (
    <div className="email-list">
      <ul>
        {emails.map((email) => (
          <li
            key={email.id}
            onClick={() => handleEmailClick(email)}
            onContextMenu={(e) => handleRightClick(e, email.id)}
            className={`${!email.isRead ? 'unread' : ''} ${
              markingAsRead === email.id ? 'marking-as-read' : ''
            }`}
          >
            <div className="email-checkbox">
              <input type="checkbox" />
            </div>

            <div className="email-sender">{email.sender}</div>

            <div className="email-content">
              <div className="email-subject">
                {email.subject}
                {/* Only show label after classification */}
                {validLabels.includes(email.newLabel || '') && (
                  <span className="label-tag">{email.newLabel}</span>
                )}
              </div>
              <div className="email-snippet">{email.snippet}</div>
            </div>

            <div className="email-timestamp">{email.timestamp}</div>
          </li>
        ))}
      </ul>

      {/* Custom Context Menu */}
      {contextMenu.visible && (
        <div
          ref={contextRef}
          className="custom-context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
            padding: '8px 12px',
            zIndex: 1000,
            cursor: 'pointer',
          }}
          onClick={handleMarkAsUnread}
        >
          📩 Marcar como no leído
        </div>
      )}
    </div>
  );
};

export default EmailList;
