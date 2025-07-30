import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Users, TrendingUp, History, DollarSign, ArrowLeftRight, LogOut } from 'lucide-react';
import { clubInfo } from '../../data/club/clubInfo.js';
import clubLogo from '../../assets/bayer-04-leverkusen-logo.svg';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/common/dialog';
import { Button } from '@/components/ui/common/button';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const tabs = [
    { id: '/dashboard', label: 'Visão Geral', icon: Trophy },
    { id: '/players', label: 'Elenco', icon: Users },
    { id: '/stats', label: 'Estatísticas', icon: TrendingUp },
    { id: '/financial', label: 'Financeiro', icon: DollarSign },
    { id: '/transfers', label: 'Transferências', icon: ArrowLeftRight },
    { id: '/history', label: 'História', icon: History },
  ];

  const handleLogout = () => {
    // Remove dados do localStorage
    localStorage.removeItem('selectedTeam');
    // Futuro: remover token de autenticação
    navigate('/');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Logo e Título */}
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
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

          {/* Navegação + Sair */}
          <div className="flex items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.id;

                return (
                  <NavLink
                    key={tab.id}
                    to={tab.id}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Botão de Sair */}
                  <Button
                    className="flex items-center gap-2 bg-transparent border border-white text-white hover:bg-red-600 hover:border-red-600 hover:text-white transition"
                    onClick={() => setIsLogoutOpen(true)}
                  >
                    <LogOut size={18} />
                    Sair
                  </Button>
          </div>
        </div>
      </div>

{/* Modal de Confirmação */}
<Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
  <DialogContent
    className="w-[420px] text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               p-6 rounded-xl shadow-xl animate-in fade-in zoom-in-95"
  >
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">
        Deseja realmente sair?
      </DialogTitle>
    </DialogHeader>

    <p className="text-gray-600 mt-2">
      Você perderá o progresso não salvo.
    </p>

    <div className="flex justify-center gap-3 mt-6">
      <Button
        variant="outline"
        onClick={() => setIsLogoutOpen(false)}
      >
        Cancelar
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={handleLogout}
      >
        Sair
      </Button>
    </div>
  </DialogContent>
</Dialog>

    </header>
  );
}
