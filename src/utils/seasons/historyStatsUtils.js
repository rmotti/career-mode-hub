// 🔹 Debug: loga temporadas (apenas em dev)
export function debugSeasons(seasons) {
  if (process.env.NODE_ENV === 'production') return;

  console.log('=== DEBUG SEASONS ===');
  if (!Array.isArray(seasons)) {
    console.warn('Seasons não é um array!', seasons);
    return;
  }

  console.log(`Total de temporadas recebidas: ${seasons.length}`);
  seasons.forEach((season, i) => {
    console.log(`Temporada [${i}]:`, {
      season: season?.season,
      matches: season?.matches,
      wins: season?.wins,
      players: Array.isArray(season?.players) ? season.players.length : 0,
      transfers: Array.isArray(season?.transfers) ? season.transfers.length : 0
    });
  });
  console.log('=====================');
}

/* ------------------------------------------------------------------
 * 1️⃣ Estatísticas agregadas das temporadas
 * ------------------------------------------------------------------ */
export function getHistoricalStats(seasons = []) {
  if (!Array.isArray(seasons) || seasons.length === 0) {
    return {
      totalTitles: 0,
      totalMatches: 0,
      totalWins: 0,
      totalDraws: 0,
      totalLosses: 0,
      totalGoals: 0,
      goalsAgainst: 0
    };
  }

  const totalTitles = seasons.filter(s => s?.position === 1).length;
  const totalMatches = seasons.reduce((sum, s) => sum + (s?.matches || 0), 0);
  const totalWins = seasons.reduce((sum, s) => sum + (s?.wins || 0), 0);
  const totalDraws = seasons.reduce((sum, s) => sum + (s?.draws || 0), 0);
  const totalLosses = seasons.reduce((sum, s) => sum + (s?.losses || 0), 0);
  const totalGoals = seasons.reduce((sum, s) => sum + (s?.goalsFor || 0), 0);
  const goalsAgainst = seasons.reduce((sum, s) => sum + (s?.goalsAgainst || 0), 0);

  return {
    totalTitles,
    totalMatches,
    totalWins,
    totalDraws,
    totalLosses,
    totalGoals,
    goalsAgainst
  };
}

/* ------------------------------------------------------------------
 * 2️⃣ Consolida estatísticas de jogadores em todas as temporadas
 * ------------------------------------------------------------------ */
export function getHistoricalPlayerStats(seasons = []) {
  if (!Array.isArray(seasons) || seasons.length === 0) return [];

  const playerMap = new Map();

  seasons.forEach(season => {
    (season?.players || []).forEach(player => {
      if (!player?.id) return; // Ignora jogadores inválidos

      if (!playerMap.has(player.id)) {
        playerMap.set(player.id, {
          id: player.id,
          name: player.name || 'Desconhecido',
          position: player.position || '',
          function: player.function || '',
          stats: {
            goals: 0,
            assists: 0,
            appearances: 0,
            cleanSheets: 0,
            rating: 0,
            ratingSum: 0,
            ratingCount: 0
          }
        });
      }

      const accumulated = playerMap.get(player.id);
      const stats = player.stats || {};

      accumulated.stats.goals += stats.goals || 0;
      accumulated.stats.assists += stats.assists || 0;
      accumulated.stats.appearances += stats.appearances || 0;
      accumulated.stats.cleanSheets += stats.cleanSheets || 0;

      if (stats.rating) {
        accumulated.stats.ratingSum += stats.rating;
        accumulated.stats.ratingCount += 1;
      }
    });
  });

  // Calcula média de rating final e limpa campos auxiliares
  playerMap.forEach(p => {
    if (p.stats.ratingCount > 0) {
      p.stats.rating = parseFloat(
        (p.stats.ratingSum / p.stats.ratingCount).toFixed(2)
      );
    } else {
      p.stats.rating = 0;
    }
    delete p.stats.ratingSum;
    delete p.stats.ratingCount;
  });

  return Array.from(playerMap.values());
}

/* ------------------------------------------------------------------
 * 3️⃣ Rankings históricos de jogadores (Top 10)
 * ------------------------------------------------------------------ */
export function getAllHistoricalRankings(seasons = []) {
  const players = getHistoricalPlayerStats(seasons);

  const topContributors = [...players]
    .map(p => ({
      ...p,
      contributions: (p.stats.goals || 0) + (p.stats.assists || 0)
    }))
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 10);

  const topScorers = [...players]
    .sort((a, b) => (b.stats.goals || 0) - (a.stats.goals || 0))
    .slice(0, 10);

  const topAssists = [...players]
    .sort((a, b) => (b.stats.assists || 0) - (a.stats.assists || 0))
    .slice(0, 10);

  const topAppearances = [...players]
    .sort((a, b) => (b.stats.appearances || 0) - (a.stats.appearances || 0))
    .slice(0, 10);

  const bestAverageRating = [...players]
    .filter(p => p.stats.appearances >= 5 && p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);

  return {
    topContributors,
    topScorers,
    topAssists,
    topAppearances,
    bestAverageRating
  };
}

/* ------------------------------------------------------------------
 * 4️⃣ Rankings de transferências (Top 10)
 * ------------------------------------------------------------------ */
export function getTransfersRankings(seasons = []) {
  const parseFee = (fee) => {
    if (!fee || fee === 'Gratuito') return 0;
    const cleaned = fee.replace('€', '').replace('M', '').replace(',', '.').trim();
    return parseFloat(cleaned) * (fee.includes('M') ? 1_000_000 : 1);
  };

  const allBuys = [];
  const allSales = [];

  (seasons || []).forEach(season => {
    (season?.transfers || []).forEach(t => {
      const mapped = {
        ...t,
        player: t.playerName,
        value: parseFee(t.fee),
      };

      if (t.type.includes('Entrada')) allBuys.push(mapped);
      if (t.type.includes('Saída')) allSales.push(mapped);
    });
  });

  const topBuys = allBuys
    .sort((a, b) => (b.value || 0) - (a.value || 0))
    .slice(0, 10);

  const topSales = allSales
    .sort((a, b) => (b.value || 0) - (a.value || 0))
    .slice(0, 10);

  return { topBuys, topSales };
}


/* ------------------------------------------------------------------
 * 5️⃣ Formata valor monetário (€, K, M, B)
 * ------------------------------------------------------------------ */
export function formatCurrency(value) {
  if (value == null || isNaN(value)) return '€0';

  if (value >= 1_000_000_000) return `€${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}K`;
  return `€${value}`;
}
