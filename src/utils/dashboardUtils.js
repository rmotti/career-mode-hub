export function getTopContribuitors(players) {
  return players
    .filter(p => (p.stats.goals + p.stats.assists) > 0)
    .sort((a, b) =>
      (b.stats.goals + b.stats.assists) -
      (a.stats.goals + a.stats.assists)
    )
    .slice(0, 5);
}

export function getAllScorers(players) {
  return players
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals);
}

export function getAllAssists(players) {
  return players
    .filter(p => p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists);
}

export function getAllContribuitors(players) {
  return players
    .filter(p => (p.stats.goals + p.stats.assists) > 0)
    .sort((a, b) =>
      (b.stats.goals + b.stats.assists) -
      (a.stats.goals + a.stats.assists)
    );
}

export function getAllRated(players) {
  return players
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating);
}

export function getYoungTalents(players) {
  return players
    .filter(p => p.age <= 23 && p.potential >= 85)
    .sort((a, b) => b.potential - a.potential);
}


