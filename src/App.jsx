import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/ui/Header';
import Dashboard from './pages/DashboardPage';
import Players from './pages/PlayersPage';
import Statistics from './pages/StatsPage';
import History from './pages/HistoryPage';
import Financial from './pages/FinancesPage';
import Transfers from './pages/TransfersPage';
import Login from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SelectTeamPage from './pages/SelectTeamPage';
import SaveMenuPage from './pages/SaveMenuPage';
import LoadSavePage from './pages/LoadSavePage';
import './App.css';
import { Toaster } from "sonner";

function Layout() {
  const location = useLocation();

  // ✅ Agora o Header será ocultado também no /login
  const hideHeader = [
    '/login',
    '/register',
    '/select-team',
    '/saves',
    '/load-save',
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header />}
      <main className="container mx-auto px-4 py-6">
        <Routes>
          {/* ✅ Redireciona a raiz para /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/saves" element={<SaveMenuPage />} />
          <Route path="/load-save" element={<LoadSavePage />} />
          <Route path="/select-team" element={<SelectTeamPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/history" element={<History />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/transfers" element={<Transfers />} />

          {/* ✅ Caso acesse rota inexistente, redireciona para login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        <Toaster richColors /> {/* ✅ Exibe toasts globais */}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
