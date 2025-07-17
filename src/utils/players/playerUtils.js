export const getSector = (position) => {
  if (position === 'GK') return 'Goleiro';
  if (['CB', 'RB', 'LB'].includes(position)) return 'Defesa';
  if (['CDM', 'CM', 'CAM', 'RM', 'LM'].includes(position)) return 'Meio';
  if (['RW', 'LW', 'ST'].includes(position)) return 'Ataque';
  return 'Outro';
};

export const getPotentialIndicator = (potential) => {
  if (potential >= 90) return '⭐⭐⭐⭐⭐';
  if (potential >= 85) return '⭐⭐⭐⭐';
  if (potential >= 80) return '⭐⭐⭐';
  if (potential >= 75) return '⭐⭐';
  return '⭐';
};

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


export function getTopRated(players) {
  return players
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);
}