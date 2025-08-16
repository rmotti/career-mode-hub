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
 * - players: Lista de jogadores da temporada (com estatísticas)
 * - transfers: Lista de transferências da temporada
 */

import { squadPlayers2024_25 } from '../players/squad2024-25';
import { squadPlayers2025_26 } from '../players/squad2025-26';
import { squadPlayers2026_27 } from '../players/squad2026-27';

import { transferHistory } from '../transfers/transferHistory';

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
    position: 2,

    // 🔹 Jogadores desta temporada
    players: squadPlayers2024_25,

    // 🔹 Transferências desta temporada
    transfers: transferHistory["2024/25"] || []
  },
  {
    season: "2025/26",
    matches: 51,
    wins: 38,
    draws: 4,
    losses: 9,
    goalsFor: 132,
    goalsAgainst: 60,
    points: 83,
    position: 1,

    // 🔹 Jogadores desta temporada
    players: squadPlayers2025_26,

    // 🔹 Transferências desta temporada
    transfers: transferHistory["2025/26"] || []
  },

  // Para adicionar nova temporada:
   {
     season: "2026/27",
     matches: 24,
     wins: 15,
     draws: 6,
     losses: 3,
     goalsFor: 56,
     goalsAgainst: 29,
     points: 36,
     position: 0,
     players: squadPlayers2026_27,
     transfers: transferHistory["2026/27"] || []
   }
];
