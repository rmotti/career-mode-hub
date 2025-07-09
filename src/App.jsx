import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Players from './components/Players';
import Statistics from './components/Statistics';
import Transfers from './components/Transfers';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'players':
        return <Players />;
      case 'stats':
        return <Statistics />;
      case 'transfers':
        return <Transfers />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
