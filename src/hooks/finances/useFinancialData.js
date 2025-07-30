import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/storage/useLocalStorage';
import { transferHistory, squadPlayers, transfersBySeasonData, weeklyWagesBySeasonData } from '@/data';
import { calculateSalary, parseCurrency, formatCurrency } from '@/utils/finances/financialUtils';

/**
 * Hook unificado do módulo financeiro:
 * - Gerencia transferências (CRUD, filtros e estatísticas)
 * - Calcula folha salarial e valores de mercado do elenco
 */
export function useFinancialData() {
  /* ----------------------------
   * 1️⃣ ESTADO DE TRANSFERÊNCIAS
   * ---------------------------- */
  const [transfers, setTransfers] = useLocalStorage('fc-bayer-transfers', transferHistory || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);

  // Temporada selecionada (default = última temporada disponível)
  const [selectedSeason, setSelectedSeason] = useState(
    transfersBySeasonData[transfersBySeasonData.length - 1].season
  );

  // Filtro e ordenação de transferências
  const filteredTransfers = useMemo(() => {
    return (transfers || [])
      .filter((transfer) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          transfer.playerName.toLowerCase().includes(search) ||
          transfer.fromClub?.toLowerCase().includes(search) ||
          transfer.toClub?.toLowerCase().includes(search);

        const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
        const matchesSeason =
          seasonFilter === 'all' || transfer.season === seasonFilter;

        return matchesSearch && matchesType && matchesSeason;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transfers, searchTerm, typeFilter, seasonFilter]);

  // Estatísticas financeiras de transferências baseadas na temporada selecionada
  const financialStatsTransfers = useMemo(() => {
    const currentSeasonTransfers = (transfers || []).filter(
      (t) => t.season === selectedSeason
    );

    let totalInvested = 0;
    let totalReceived = 0;

    currentSeasonTransfers.forEach((transfer) => {
      const fee = transfer.fee;
      if (fee && fee !== 'Livre' && fee !== 'Empréstimo') {
        const value = parseFloat(fee.replace('€', '').replace('M', ''));
        if (!isNaN(value)) {
          if (['Entrada', 'Empréstimo (Entrada)'].includes(transfer.type)) {
            totalInvested += value;
          } else if (['Saída', 'Empréstimo (Saída)'].includes(transfer.type)) {
            totalReceived += value;
          }
        }
      }
    });

    return {
      totalInvested,
      totalReceived,
      netBalance: totalReceived - totalInvested,
      totalTransfers: currentSeasonTransfers.length
    };
  }, [transfers, selectedSeason]);

  // CRUD de transferências
  const handleAdd = () => {
    setEditingTransfer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer);
    setIsModalOpen(true);
  };

  const handleSave = (transferData) => {
    if (editingTransfer) {
      setTransfers((prev) =>
        prev.map((t) => (t.id === editingTransfer.id ? transferData : t))
      );
    } else {
      setTransfers((prev) => [transferData, ...prev]);
    }
  };

  const handleDelete = (id) => {
    setTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  /* ----------------------------
   * 2️⃣ ESTADO FINANCEIRO (SALÁRIOS)
   * ---------------------------- */
  const [salaryView, setSalaryView] = useState('weekly'); // 'weekly', 'monthly', 'annual'

  // Salário total do elenco em milhões por semana
  const totalSalaryWeekly = useMemo(() => {
    const total = (squadPlayers || []).reduce(
      (sum, p) => sum + parseCurrency(p.salary, salaryView),
      0
    );
    const totalInMillions = total / 1_000_000;
    return `€${totalInMillions.toFixed(2)}M`;
  }, [salaryView, squadPlayers]);

  // Salário total do elenco em milhões por mês
  const totalSalaryMonthly = useMemo(() => {
    const total = (squadPlayers || []).reduce(
      (sum, p) => sum + parseCurrency(p.salary, salaryView),
      0
    );
    const monthlyTotal = total * 4.33; // Aproximadamente 52/12 semanas
    const totalInMillions = monthlyTotal / 1_000_000;
    return `€${totalInMillions.toFixed(2)}M`;
  }, [salaryView, squadPlayers]);

  // Salário total do elenco em milhões por ano
  const totalSalaryYearly = useMemo(() => {
    const total = (squadPlayers || []).reduce(
      (sum, p) => sum + parseCurrency(p.salary, salaryView),
      0
    );
    const yearlyTotal = total * 52;
    const totalInMillions = yearlyTotal / 1_000_000;
    return `€${totalInMillions.toFixed(2)}M`;
  }, [salaryView, squadPlayers]);

  // Salário agrupado por função no elenco
  const salaryByFunction = useMemo(() => {
    const grouped = (squadPlayers || []).reduce((acc, player) => {
      const func = player.function;
      const salary = calculateSalary(player.salary, salaryView);
      if (!acc[func]) acc[func] = { function: func, total: 0, count: 0 };
      acc[func].total += salary;
      acc[func].count++;
      return acc;
    }, {});

    return Object.values(grouped)
      .map(f => ({ ...f, average: f.total / f.count }))
      .sort((a, b) => b.total - a.total);
  }, [salaryView]);

  // Top 10 maiores salários
  const topSalaries = useMemo(() =>
    (squadPlayers || [])
      .map(p => ({ ...p, calculatedSalary: calculateSalary(p.salary, salaryView) }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary)
      .slice(0, 10),
    [salaryView]
  );

  // Lista completa de salários (para modal)
  const allSalaries = useMemo(() =>
    (squadPlayers || [])
      .map(p => ({ ...p, calculatedSalary: calculateSalary(p.salary, salaryView) }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary),
    [salaryView]
  );

  // Top 5 maiores valores de mercado
  const topMarketValues = useMemo(() =>
    (squadPlayers || [])
      .filter(p => p.marketValue)
      .map(player => ({
        ...player,
        parsedMarketValue: parseCurrency(player.marketValue)
      }))
      .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue)
      .slice(0, 5),
    []
  );

  const allMarketValues = useMemo(() =>
    (squadPlayers || [])
      .filter(p => p.marketValue)
      .map(player => ({
        ...player,
        parsedMarketValue: parseCurrency(player.marketValue)
      }))
      .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue),
    []
  );

  // Valor total do elenco no mercado
  const totalSquadValue = useMemo(() => {
    const total = (squadPlayers || []).reduce(
      (sum, p) => sum + (p.marketValue ? parseCurrency(p.marketValue) : 0),
      0
    );
    return formatCurrency(total, 'annual'); 
  }, []);

  // Dados da temporada selecionada (para gráficos)
  const selectedSeasonData = transfersBySeasonData.find(s => s.season === selectedSeason);

  /* ----------------------------
   * 3️⃣ RETORNO DO HOOK UNIFICADO
   * ---------------------------- */
  return {
    // Transferências
    transfers,
    setTransfers,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    seasonFilter,
    setSeasonFilter,
    isModalOpen,
    setIsModalOpen,
    editingTransfer,
    filteredTransfers,
    financialStatsTransfers,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,

    // Financeiro (salários e mercado)
    squadPlayers,
    salaryView,
    setSalaryView,
    selectedSeason,
    setSelectedSeason,
    totalSalaryWeekly,
    totalSalaryMonthly,
    totalSalaryYearly,
    salaryByFunction,
    topSalaries,
    allSalaries,
    topMarketValues,
    allMarketValues,
    totalSquadValue,
    weeklyWagesBySeasonData,
    transfersBySeasonData,
    selectedSeasonData,
  };
}
