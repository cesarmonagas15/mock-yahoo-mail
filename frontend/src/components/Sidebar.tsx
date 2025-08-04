import React, { useState } from 'react';
import { 
  Mail, 
  Star, 
  Send, 
  FileText, 
  Folder, 
  Plus, 
  MoreHorizontal,
  Pencil
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [foldersExpanded, setFoldersExpanded] = useState(true);

  const menuItems = [
    { id: 'inbox', icon: Mail, label: 'Buzón' },
    { id: 'starred', icon: Star, label: 'Destacados' },
    { id: 'sent', icon: Send, label: 'Enviados' },
    { id: 'drafts', icon: FileText, label: 'Borradores' },
    { id: 'folders', icon: Folder, label: 'Carpetas', hasExpand: true },
    { id: 'new-folder', icon: Plus, label: 'Nueva carpeta', isSubItem: true },
    { id: 'more', icon: MoreHorizontal, label: 'Más' }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleFolders = () => {
    setFoldersExpanded(!foldersExpanded);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="yahoo-logo">
          {isCollapsed ? (
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 8L16 14L30 8L16 2Z" fill="#7D2EFF"/>
              <path d="M2 8V24L16 30L30 24V8L16 14L2 8Z" fill="var(--yb-logo-property, #232A31)"/>
            </svg>
          ) : (
            'yahoo!mail'
          )}
        </div>
        
        <button className="compose-button" title={isCollapsed ? "Escribir" : undefined}>
          {isCollapsed ? (
            <Pencil size={20} />
          ) : (
            <>
              <Pencil size={16} />
              Escribir
            </>
          )}
        </button>
      </div>
      
      <ul className="sidebar-nav">
        {menuItems.map((item) => {
          // Skip sub-items when folders are collapsed
          if (item.isSubItem && !foldersExpanded) {
            return null;
          }
          
          const IconComponent = item.icon;
          
          return (
            <li key={item.id}>
              <button
                className={`sidebar-nav-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === 'folders') {
                    toggleFolders();
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                title={isCollapsed ? item.label : undefined}
                style={{ 
                  paddingLeft: item.isSubItem ? '48px' : '20px',
                  opacity: item.isSubItem ? 0.8 : 1
                }}
              >
                <span className="sidebar-icon">
                  <IconComponent size={isCollapsed ? 20 : 16} />
                </span>
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && item.hasExpand && (
                  <span className="folder-expand">
                    {foldersExpanded ? '▲' : '▼'}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      
      {/* Toggle button for sidebar collapse/expand */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: '-12px',
          transform: 'translateY(-50%)',
          width: '24px',
          height: '24px',
          backgroundColor: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onClick={toggleSidebar}
        title={isCollapsed ? "Expandir" : "Contraer"}
      >
        {isCollapsed ? '▶' : '◀'}
      </div>
    </div>
  );
};

export default Sidebar; 