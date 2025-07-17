export function getSeasonEvolution(seasons) {
  return seasons.map(season => ({
    season: season.season,
    points: season.points,
    goals: season.goalsFor,
    position: season.position
  })).reverse();
}

export function getHistoricalStats(seasons) {
  const totalTitles = seasons.filter(s => s.position === 1).length;
  const totalMatches = seasons.reduce((sum, s) => sum + s.matches, 0);
  const totalWins = seasons.reduce((sum, s) => sum + s.wins, 0);
  const totalGoals = seasons.reduce((sum, s) => sum + s.goalsFor, 0);
  const avgPosition = (seasons.reduce((sum, s) => sum + s.position, 0) / seasons.length).toFixed(1);
  const goalsAgainst = seasons.reduce((sum, s) => sum + s.goalsAgainst, 0);

  return {
    totalTitles,
    totalMatches,
    totalWins,
    totalGoals,
    avgPosition,
    goalsAgainst
  };
}

export function getHistoricalPlayerStats(seasons) {
  const playerMap = {};

  seasons.forEach(season => {
    if (!season.players) return;

    season.players.forEach(player => {
      const key = player.name; // Se tiver player.id, use isso no lugar

      if (!playerMap[key]) {
        playerMap[key] = {
          name: player.name,
          position: player.position,
          stats: {
            goals: 0,
            assists: 0,
            appearances: 0
          }
        };
      }

      playerMap[key].stats.goals += player.stats?.goals || 0;
      playerMap[key].stats.assists += player.stats?.assists || 0;
      playerMap[key].stats.appearances += player.stats?.appearances || 0;
    });
  });

  return Object.values(playerMap);
}

export function getTopStats(players) {
  const sortByKey = (key) =>
    [...players]
      .filter(p => p?.stats?.[key] !== undefined) // filtra inválidos
      .sort((a, b) => (b.stats[key] || 0) - (a.stats[key] || 0))
      .slice(0, 5)
      .map(p => ({
        name: p.name,
        position: p.position,
        seasons: p.stats?.appearances || 0,
        [key]: p.stats?.[key] || 0
      }));

  return {
    topScorers: sortByKey('goals'),
    topAssists: sortByKey('assists'),
    topAppearances: sortByKey('appearances')
  };
}

