import { useState } from 'react';

export function useNavigation() {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedTeam, setSelectedTeam] = useState(() => {
    // Se tiver time salvo no localStorage, carrega
    const saved = localStorage.getItem('selectedTeam');
    return saved ? JSON.parse(saved) : null;
  });

  // Funções de navegação
  const goToLogin = () => setActiveTab('login');
  const goToSelectTeam = () => setActiveTab('select-team');
  const goToDashboard = () => setActiveTab('dashboard');

  // Funções de fluxo
  const handleLogin = () => {
    goToSelectTeam();
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    localStorage.setItem('selectedTeam', JSON.stringify(team));
    goToDashboard();
  };

  return {
    activeTab,
    setActiveTab,
    selectedTeam,
    handleLogin,
    handleTeamSelect,
    goToLogin,
    goToSelectTeam,
    goToDashboard,
  };
}
