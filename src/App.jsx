import { useState } from 'react';
import Header from './components/ui/Header';
import Dashboard from './pages/DashboardPage';
import Players from './pages/PlayersPage';
import Statistics from './pages/StatsPage';
import History from './pages/HistoryPage';
import Financial from './pages/FinancesPage';
import Transfers from './pages/TransfersPage';
import Login from './pages/LoginPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login');

const renderContent = () => {
  switch (activeTab) {
    case 'login':
      return <Login onLogin={() => setActiveTab('dashboard')} />;
    case 'dashboard':
      return <Dashboard />;
    case 'players':
      return <Players />;
    case 'stats':
      return <Statistics />;
    case 'history':
      return <History />;
    case 'financial':
      return <Financial />;
    case 'transfers':
      return <Transfers />;
    default:
      return <Login onLogin={() => setActiveTab('dashboard')} />;
  }
};


  return (
    <div className="min-h-screen bg-background">
      {activeTab !== 'login' && (
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
