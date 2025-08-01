import { useMemo } from 'react';
import {
  squadPlayers,
  seasonStats,
  biggestPurchases,
  biggestSales,
  getPlayersBySeason
} from '@/data';

export const useSeasonStatistics = () => {
  const currentSeason = seasonStats[1]; // Temporada atual
  const players = squadPlayers;
  const currentSeasonPlayers = getPlayersBySeason('2025/26');

  const winPercentage = currentSeason
    ? ((currentSeason.wins / currentSeason.matches) * 100).toFixed(1)
    : 0;


  const avgGoalsPerGame = currentSeason
    ? (currentSeason.goalsFor / currentSeason.matches).toFixed(1)
    : 0;

  const avgGoalsAgainstPerGame = currentSeason
    ? (currentSeason.goalsAgainst / currentSeason.matches).toFixed(1)
    : 0;

  const cleanSheets = players.reduce((sum, p) => sum + (p.stats.cleanSheets || 0), 0);

  const topScorers = currentSeasonPlayers
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals);

  const topAssists = currentSeasonPlayers
    .filter(p => p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists);

  const mostGames = currentSeasonPlayers
    .filter(p => p.stats.appearances > 0)
    .sort((a, b) => b.stats.appearances - a.stats.appearances);

  const bestRated = currentSeasonPlayers
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating);

  const bestAverageRating = currentSeasonPlayers
    .filter(p => p.stats.rating > 0 && p.stats.appearances >= 5)
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);

  return {
    currentSeason,
    currentSeasonPlayers,
    winPercentage,
    avgGoalsPerGame,
    avgGoalsAgainstPerGame,
    cleanSheets,
    topScorers,
    topAssists,
    mostGames,
    bestRated,
    bestAverageRating,
    topPurchases: biggestPurchases.slice(0, 5),
    topSales: biggestSales.slice(0, 5),
  };
};
