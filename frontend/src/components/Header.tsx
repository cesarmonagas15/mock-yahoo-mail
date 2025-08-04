import React from 'react';
import {
  Menu,
  Search,
  Settings,
  Smartphone,
} from 'lucide-react';

interface HeaderProps {
  onClassifyEmails: () => void;
  onClearLabels: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClassifyEmails, onClearLabels }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="top-bar-icon" title="Menú">
          <Menu size={24} />
        </div>

        <div className="top-bar-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Busca en tu buzón de correo"
            aria-label="Buscar correos"
          />
        </div>
      </div>

      <div className="top-bar-right">
        <button className="classify-button" onClick={onClassifyEmails}>
          🧠 Clasificar
        </button>
        <button className="clear-button" onClick={onClearLabels}>
          🧹 Borrar etiquetas
        </button>


        <div className="top-bar-icon" title="Búsqueda avanzada">
          <Search size={20} />
        </div>

        <div className="top-bar-icon" title="Configuración">
          <Settings size={20} />
        </div>

        <div className="top-bar-icon" title="Aplicación móvil">
          <Smartphone size={20} />
        </div>

        <div className="user-avatar" title="Perfil">
          C
        </div>
      </div>
    </div>
  );
};

export default Header;
