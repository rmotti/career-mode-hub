/**
 * DADOS DAS TEMPORADAS
 * 
 * Este arquivo contém as estatísticas de todas as temporadas do clube.
 * Para adicionar uma nova temporada ou editar dados existentes, modifique as informações abaixo.
 * 
 * Estrutura de cada temporada:
 * - season: Nome da temporada (formato: "YYYY/YY")
 * - matches: Total de jogos disputados
 * - wins: Número de vitórias
 * - draws: Número de empates
 * - losses: Número de derrotas
 * - goalsFor: Gols marcados
 * - goalsAgainst: Gols sofridos
 * - points: Pontos conquistados
 * - position: Posição final na liga
 */

export const seasonStats = [
  {
    season: "2024/25",
    matches: 34,
    wins: 19,
    draws: 12,
    losses: 3,
    goalsFor: 72,
    goalsAgainst: 43,
    points: 69,
    position: 2
  },
  {
    season: "2025/26",
    matches: 8,
    wins: 6,
    draws: 1,
    losses: 1,
    goalsFor: 24,
    goalsAgainst: 11,
    points: 19,
    position: 3
  }
  // Adicione novas temporadas aqui seguindo o mesmo formato
  // Exemplo:
  // {
  //   season: "2025/26",
  //   matches: 34,
  //   wins: 25,
  //   draws: 6,
  //   losses: 3,
  //   goalsFor: 78,
  //   goalsAgainst: 25,
  //   points: 81,
  //   position: 1
  // }
];

