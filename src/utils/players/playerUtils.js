/**
 * UTILITÁRIOS DE JOGADORES
 * 
 * Funções puras para manipulação de jogadores e estatísticas.
 * Este arquivo não deve importar nada de data/index.js para evitar ciclos.
 */

// Retorna o setor do campo baseado na posição
export const getSector = (position) => {
  if (position === 'GK') return 'Goleiro';
  if (['CB', 'RB', 'LB'].includes(position)) return 'Defesa';
  if (['CDM', 'CM', 'CAM', 'RM', 'LM'].includes(position)) return 'Meio';
  if (['RW', 'LW', 'ST'].includes(position)) return 'Ataque';
  return 'Outro';
};

// Retorna indicador de estrelas baseado no potencial
export const getPotentialIndicator = (potential) => {
  if (potential >= 90) return '⭐⭐⭐⭐⭐';
  if (potential >= 85) return '⭐⭐⭐⭐';
  if (potential >= 80) return '⭐⭐⭐';
  if (potential >= 75) return '⭐⭐';
  return '⭐';
};

// Top 5 jogadores com mais contribuições (gols + assistências)
export function getTopContribuitors(players) {
  return players
    .filter(p => (p.stats.goals + p.stats.assists) > 0)
    .sort((a, b) =>
      (b.stats.goals + b.stats.assists) -
      (a.stats.goals + a.stats.assists)
    )
    .slice(0, 5);
}

// Todos os jogadores que marcaram gols, em ordem decrescente
export function getAllScorers(players) {
  return players
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals);
}

// Todos os jogadores com assistências, em ordem decrescente
export function getAllAssists(players) {
  return players
    .filter(p => p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists);
}

// Todos os jogadores com contribuições (gols + assistências)
export function getAllContribuitors(players) {
  return players
    .filter(p => (p.stats.goals + p.stats.assists) > 0)
    .sort((a, b) =>
      (b.stats.goals + b.stats.assists) -
      (a.stats.goals + a.stats.assists)
    );
}

// Todos os jogadores avaliados (com nota de rating > 0)
export function getAllRated(players) {
  return players
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating);
}

// Retorna jovens talentos (até 23 anos e potencial >= 80)
export function getYoungTalents(players) {
  return players
    .filter(p => p.age <= 23 && p.potential >= 80)
    .sort((a, b) => b.potential - a.potential);
}

// Top 5 jogadores com melhor rating
export function getTopRated(players) {
  return players
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);
}
