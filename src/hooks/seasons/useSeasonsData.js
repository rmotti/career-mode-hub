import { useState, useMemo } from 'react';
import { useLocalStorage } from '../storage/useLocalStorage';
import { seasonStats } from '../../data';
import {
  getHistoricalStats,
  getAllHistoricalRankings,
  getTransfersRankings,
  formatCurrency
} from '@/utils/seasons/historyStatsUtils';

/**
 * Hook unificado para gerenciamento de temporadas e estatísticas históricas
 * - Persistência no localStorage
 * - CRUD de temporadas
 * - Controle do modal de criação/edição
 * - Estatísticas agregadas e rankings de jogadores e transferências
 */
export function useSeasonsData() {
  /* -----------------------------
   * 1️⃣ ESTADO DE TEMPORADAS
   * ----------------------------- */
  const [seasons, setSeasons] = useLocalStorage(
    'career-mode-seasons',
    seasonStats || []
  );

  // 🔹 Hidratação: garante que temporadas sem players ou transfers usem os mocks
  const hydratedSeasons = useMemo(() => {
    return (seasons || []).map((s) => {
      const base = seasonStats.find((mock) => mock.season === s.season);
      return {
        ...s,
        players: Array.isArray(s.players) && s.players.length
          ? s.players
          : base?.players || [],
        transfers: Array.isArray(s.transfers) && s.transfers.length
          ? s.transfers
          : base?.transfers || []
      };
    });
  }, [seasons]);

  // Estado do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);

  /* -----------------------------
   * 2️⃣ CRUD DE TEMPORADAS
   * ----------------------------- */
  const addSeason = (newSeason) => {
    if (!newSeason?.season) return;
    setSeasons((prev) => [newSeason, ...prev]);
  };

  const updateSeason = (updatedSeason) => {
    if (!updatedSeason?.season) return;
    setSeasons((prev) =>
      prev.map((s) =>
        s.season === updatedSeason.season ? updatedSeason : s
      )
    );
  };

  const deleteSeason = (seasonId) => {
    if (!seasonId) return;
    setSeasons((prev) => prev.filter((s) => s.season !== seasonId));
  };

  /* -----------------------------
   * 3️⃣ HANDLERS DO MODAL
   * ----------------------------- */
  const handleAddSeason = () => {
    setEditingSeason(null);
    setIsModalOpen(true);
  };

  const handleEditSeason = (season) => {
    setEditingSeason(season);
    setIsModalOpen(true);
  };

  const handleSaveSeason = (seasonData) => {
    if (!seasonData?.season) return;
    editingSeason ? updateSeason(seasonData) : addSeason(seasonData);
    setIsModalOpen(false);
  };

  /* -----------------------------
   * 4️⃣ ESTATÍSTICAS E RANKINGS
   * ----------------------------- */
  const stats = useMemo(
    () => getHistoricalStats(hydratedSeasons),
    [hydratedSeasons]
  );

  const playerRankings = useMemo(
    () => getAllHistoricalRankings(hydratedSeasons),
    [hydratedSeasons]
  );

  const transferRankings = useMemo(
    () => getTransfersRankings(hydratedSeasons),
    [hydratedSeasons]
  );

  /* -----------------------------
   * 5️⃣ EXPORTAÇÃO UNIFICADA
   * ----------------------------- */
  return {
    // Dados principais
    seasons: hydratedSeasons,
    setSeasons,

    // CRUD
    addSeason,
    updateSeason,
    deleteSeason,

    // Modal e edição
    isModalOpen,
    setIsModalOpen,
    editingSeason,
    handleAddSeason,
    handleEditSeason,
    handleSaveSeason,

    // Estatísticas agregadas
    ...stats, // totalTitles, totalMatches, totalWins, totalDraws, totalLosses, totalGoals, goalsAgainst

    // Rankings históricos de jogadores
    ...playerRankings, // topContributors, topScorers, topAssists, topAppearances, bestAverageRating

    // Rankings de transferências
    ...transferRankings, // topBuys, topSales

    // Utilitário
    formatCurrency
  };
}
