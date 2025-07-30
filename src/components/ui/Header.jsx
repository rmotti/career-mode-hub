import { Trophy, Users, TrendingUp, History, DollarSign, ArrowLeftRight } from 'lucide-react';
import { clubInfo } from '../../data/club/clubInfo.js';
import clubLogo from '../../assets/bayer-04-leverkusen-logo.svg'; // Importe o logo do clube

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Visão Geral', icon: Trophy },
    { id: 'players', label: 'Elenco', icon: Users },
    { id: 'stats', label: 'Estatísticas', icon: TrendingUp },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'transfers', label: 'Transferências', icon: ArrowLeftRight },
    { id: 'history', label: 'História', icon: History },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Logo e Título */}
          <div className="flex items-center space-x-4">
            <img
              src={clubLogo}
              alt={`Logo do ${clubInfo?.name || 'clube'}`}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">{clubInfo?.name || 'Nome do Clube'}</h1>
              <p className="text-sm opacity-90">Temporada {clubInfo?.season || '20XX/YY'}</p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-primary-foreground/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
