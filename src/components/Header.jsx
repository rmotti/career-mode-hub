import { Trophy, Users, TrendingUp, ArrowLeftRight } from 'lucide-react';
import fcPortoLogo from '../assets/fc-porto-logo.png';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Trophy },
    { id: 'players', label: 'Jogadores', icon: Users },
    { id: 'stats', label: 'Estatísticas', icon: TrendingUp },
    { id: 'transfers', label: 'Transferências', icon: ArrowLeftRight }
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo e Título */}
          <div className="flex items-center space-x-4">
            <img 
              src={fcPortoLogo} 
              alt="FC Porto" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">FC Porto Career Hub</h1>
              <p className="text-sm opacity-90">Temporada 2024/25</p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="flex space-x-1">
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

