import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  oldLabel: string;
  newLabel: string; // Will be updated dynamically after classification
  isRead: boolean;
}

interface EmailStore {
  emails: Email[];
  markAsRead: (emailId: string) => void;
  markAsUnread: (emailId: string) => void;
  getEmail: (emailId: string) => Email | undefined;
  setEmails: (emails: Email[]) => void;
  setLabel: (emailId: string, label: string) => void; 
  clearLabels: () => void;
}

export const useEmailStore = create<EmailStore>()(
  persist(
    (set, get) => ({
      emails: [], // fetched from backend

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
      },

      setEmails: (updatedEmails: Email[]) => {
        set((state) => {
          return {
            emails: state.emails.map((email) => {
              const updated = updatedEmails.find((e) => e.id === email.id);
              return updated ? { ...email, ...updated } : email;
            }),
          };
        });
      },
      clearLabels: () => {
        set((state) => ({
          emails: state.emails.map(email => ({ ...email, newLabel: '' }))
        }));
      },
      setLabel: (emailId: string, label: string) => {
        set((state) => ({
          emails: state.emails.map(email =>
            email.id === emailId ? { ...email, newLabel: label } : email
          )
        }));
      }
    }),
    {
      name: 'yahoo-mail-storage',
      partialize: (state) => ({ emails: state.emails }),
    }
  )
);
