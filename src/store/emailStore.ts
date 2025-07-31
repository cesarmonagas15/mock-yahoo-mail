import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sampleEmails, Email } from '../data/emails';

interface EmailStore {
  emails: Email[];
  markAsRead: (emailId: string) => void;
  markAsUnread: (emailId: string) => void;
  getEmail: (emailId: string) => Email | undefined;
}

export const useEmailStore = create<EmailStore>()(
  persist(
    (set, get) => ({
      emails: sampleEmails,
      
      markAsRead: (emailId: string) => {
        set((state) => ({
          emails: state.emails.map(email => 
            email.id === emailId ? { ...email, isRead: true } : email
          )
        }));
      },
      
      markAsUnread: (emailId: string) => {
        set((state) => ({
          emails: state.emails.map(email => 
            email.id === emailId ? { ...email, isRead: false } : email
          )
        }));
      },
      
      getEmail: (emailId: string) => {
        return get().emails.find(email => email.id === emailId);
      }
    }),
    {
      name: 'yahoo-mail-storage',
      partialize: (state) => ({ emails: state.emails }),
    }
  )
); 