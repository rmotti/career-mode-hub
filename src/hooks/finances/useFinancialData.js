import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/storage/useLocalStorage';
import {
  transferHistory,
  transfersBySeasonData,
  squadPlayers2024_25,
  squadPlayers2025_26,
  squadPlayers2026_27
} from '@/data';
import { calculateSalary, parseCurrency, formatCurrency } from '@/utils/finances/financialUtils';

export function useFinancialData() {
  /* ---------------------------- ⚙️ Normalizador de histórico ---------------------------- */
  // Garante que o estado inicial de transferências seja um ARRAY (flatten),
  // mesmo que transferHistory seja um objeto { "YYYY/YY": [...] }.
  const initialTransfers = useMemo(() => {
    if (Array.isArray(transferHistory)) return transferHistory;
    if (transferHistory && typeof transferHistory === 'object') {
      return Object.values(transferHistory).flat();
    }
    return [];
  }, []);

  /* ---------------------------- 0️⃣ MOCK DINÂMICO (SALÁRIOS) ---------------------------- */
  const weeklyWagesBySeasonData = useMemo(
    () => [
      {
        season: '2024/25',
        players: squadPlayers2024_25,
        weeklyExpense: squadPlayers2024_25.reduce(
          (sum, p) => sum + parseCurrency(p.salary, 'weekly'),
          0
        )
      },
      {
        season: '2025/26',
        players: squadPlayers2025_26,
        weeklyExpense: squadPlayers2025_26.reduce(
          (sum, p) => sum + parseCurrency(p.salary, 'weekly'),
          0
        )
      },
      {
        season: '2026/27',
        players: squadPlayers2026_27,
        weeklyExpense: squadPlayers2026_27.reduce(
          (sum, p) => sum + parseCurrency(p.salary, 'weekly'),
          0
        )
      }
    ],
    []
  );

  /* ---------------------------- 1️⃣ ESTADO DE TRANSFERÊNCIAS ---------------------------- */
  // Usa initialTransfers (array) como default do localStorage.
  const [transfers, setTransfers] = useLocalStorage('fc-bayer-transfers', initialTransfers);

  // Migração/robustez: se o localStorage tiver objeto por temporada, flattens em runtime.
  const safeTransfers = useMemo(() => {
    if (Array.isArray(transfers)) return transfers;
    if (transfers && typeof transfers === 'object') {
      return Object.values(transfers).flat();
    }
    return [];
  }, [transfers]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);

  const [selectedSeason, setSelectedSeason] = useState(
    transfersBySeasonData[transfersBySeasonData.length - 1].season
  );

  /* 🔹 CRUD de transferências */
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

  /* 🔹 Lista filtrada */
  const filteredTransfers = useMemo(() => {
    return safeTransfers
      .filter((transfer) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          transfer.playerName.toLowerCase().includes(search) ||
          transfer.fromClub?.toLowerCase().includes(search) ||
          transfer.toClub?.toLowerCase().includes(search);

        const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
        const matchesSeason = seasonFilter === 'all' || transfer.season === seasonFilter;

        return matchesSearch && matchesType && matchesSeason;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [safeTransfers, searchTerm, typeFilter, seasonFilter]);

  /* 🔹 Estatísticas da temporada selecionada */
  const financialStatsTransfers = useMemo(() => {
    const currentSeasonTransfers = safeTransfers.filter(
      (t) => t.season === selectedSeason
    );

    let totalInvested = 0;
    let totalReceived = 0;

    currentSeasonTransfers.forEach((transfer) => {
      const fee = transfer.fee;
      if (fee && fee !== 'Livre' && fee !== 'Empréstimo') {
        // Nota: se possível, prefira um helper parseFeeToNumber aqui.
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
  }, [safeTransfers, selectedSeason]);

  /* ✅ Estatísticas por temporada (gráfico Receitas x Despesas) */
  const getFinancialStatsBySeason = () => {
    return (transfersBySeasonData || []).map((seasonData) => {
      const season = seasonData.season;
      const seasonTransfers = safeTransfers.filter(t => t.season === season);

      let totalInvested = 0;
      let totalReceived = 0;

      seasonTransfers.forEach((transfer) => {
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

      return { season, totalInvested, totalReceived };
    });
  };

  /* ---------------------------- 2️⃣ ESTADO FINANCEIRO (SALÁRIOS) ---------------------------- */
  const [salaryView, setSalaryView] = useState('weekly');

  const selectedSeasonPlayers = useMemo(() => {
    const seasonData = weeklyWagesBySeasonData.find(d => d.season === selectedSeason);
    return seasonData?.players || [];
  }, [selectedSeason, weeklyWagesBySeasonData]);

  const totalSalaryWeekly = useMemo(() => {
    const total = selectedSeasonPlayers.reduce(
      (sum, p) => sum + parseCurrency(p.salary, 'weekly'), 0
    );
    return `€${(total / 1_000_000).toFixed(2)}M`;
  }, [selectedSeasonPlayers]);

  const totalSalaryMonthly = useMemo(() => {
    const total = selectedSeasonPlayers.reduce(
      (sum, p) => sum + parseCurrency(p.salary, 'weekly'), 0
    );
    return `€${((total * 4.33) / 1_000_000).toFixed(2)}M`;
  }, [selectedSeasonPlayers]);

  const totalSalaryYearly = useMemo(() => {
    const total = selectedSeasonPlayers.reduce(
      (sum, p) => sum + parseCurrency(p.salary, 'weekly'), 0
    );
    return `€${((total * 52) / 1_000_000).toFixed(2)}M`;
  }, [selectedSeasonPlayers]);

  const salaryByFunction = useMemo(() => {
    const grouped = selectedSeasonPlayers.reduce((acc, player) => {
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
  }, [salaryView, selectedSeasonPlayers]);

  const topSalaries = useMemo(() =>
    selectedSeasonPlayers
      .map(p => ({ ...p, calculatedSalary: calculateSalary(p.salary, salaryView) }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary)
      .slice(0, 10),
    [salaryView, selectedSeasonPlayers]
  );

  const allSalaries = useMemo(() =>
    selectedSeasonPlayers
      .map(p => ({ ...p, calculatedSalary: calculateSalary(p.salary, salaryView) }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary),
    [salaryView, selectedSeasonPlayers]
  );

  const topMarketValues = useMemo(() =>
    selectedSeasonPlayers
      .filter(p => p.marketValue)
      .map(player => ({ ...player, parsedMarketValue: parseCurrency(player.marketValue) }))
      .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue)
      .slice(0, 5),
    [selectedSeasonPlayers]
  );

  const allMarketValues = useMemo(() =>
    selectedSeasonPlayers
      .filter(p => p.marketValue)
      .map(player => ({ ...player, parsedMarketValue: parseCurrency(player.marketValue) }))
      .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue),
    [selectedSeasonPlayers]
  );

  const totalSquadValue = useMemo(() => {
    const total = selectedSeasonPlayers.reduce(
      (sum, p) => sum + (p.marketValue ? parseCurrency(p.marketValue) : 0), 0
    );
    return formatCurrency(total, 'annual');
  }, [selectedSeasonPlayers]);

  const selectedSeasonData = transfersBySeasonData.find(s => s.season === selectedSeason);

  /* ---------------------------- 3️⃣ RETORNO ---------------------------- */
  return {
    // Transferências e CRUD
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
    getFinancialStatsBySeason,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,

    // Financeiro
    squadPlayers: selectedSeasonPlayers,
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
