import React, { useCallback, useState } from 'react';
import { Email } from '../data/emails';
import { 
  ArrowLeft, 
  Reply, 
  Forward, 
  Trash2 
} from 'lucide-react';

interface EmailDetailProps {
  email: Email | null;
  onClose: () => void;
  onMarkAsRead: (emailId: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onClose, onMarkAsRead }) => {
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);

  const handleOpen = useCallback(() => {
    if (email && !email.isRead) {
      setIsMarkingAsRead(true);
      onMarkAsRead(email.id);
      // Simulate a brief delay to show the marking as read state
      setTimeout(() => {
        setIsMarkingAsRead(false);
      }, 500);
    }
  }, [email, onMarkAsRead]);

  React.useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  if (!email) {
    return null;
  }

  return (
    <div className="email-detail-page">
      <div className="email-detail-header">
        <div className="email-detail-actions">
          <button 
            className="email-detail-action-btn"
            onClick={onClose}
            title="Cerrar"
          >
            <ArrowLeft size={16} />
            Volver al buzón
          </button>
          <div className="email-detail-action-buttons">
            <button className="email-detail-action-btn" title="Responder">
              <Reply size={16} />
              Responder
            </button>
            <button className="email-detail-action-btn" title="Reenviar">
              <Forward size={16} />
              Reenviar
            </button>
            <button className="email-detail-action-btn" title="Eliminar">
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        </div>
        {isMarkingAsRead && (
          <div className="email-status-indicator">
            <span>Marcando como leído...</span>
          </div>
        )}
      </div>
      
      <div className="email-detail-content">
        <div className="email-detail-subject">
          {email.subject}
        </div>
        
        <div className="email-detail-meta">
          <div className="email-detail-sender">
            <strong>De:</strong> {email.sender}
          </div>
          <div className="email-detail-timestamp">
            {email.timestamp}
          </div>
        </div>
        
        <div className="email-detail-body">
          {email.body}
        </div>
      </div>
    </div>
  );
};

export default EmailDetail; 