/**
 * ARQUIVO PRINCIPAL DE DADOS CAREER HUB
 * 
 * Centraliza todas as importações de dados do sistema.
 * Nenhum cálculo complexo ou função que dependa de dados dinâmicos deve ficar aqui
 * para evitar ciclos de importação.
 *
 * ESTRUTURA DE ARQUIVOS:
 * - /players/squad2024-25.js e squad2025-26.js
 * - /seasons/seasonStats.js
 * - /transfers/transferHistory.js
 * - /financial/financialData.js
 * - /club/clubInfo.js
 */

// ==================== IMPORTAÇÕES ====================

// Players
import { squadPlayers2024_25 } from './players/squad2024-25.js';
import { squadPlayers2025_26 } from './players/squad2025-26.js';
import { squadPlayers2026_27 } from './players/squad2026-27.js';
// Temporadas e transferências
import { seasonStats } from './seasons/seasonStats.js';
import { transferHistory } from './transfers/transferHistory.js';

// Dados financeiros
import { 
  currentSeasonBalance,
  transfersBySeasonData,
  weeklyWagesBySeasonData,
  biggestPurchases,
  biggestSales,
  highestMarketValues
} from './financial/financialData.js';

// Informações do clube
import { 
  clubInfo,
  sectorColors,
  positionToSector,
  sectorNames
} from './club/clubInfo.js';

// ==================== EXPORTAÇÕES PRINCIPAIS ====================

// Dados dos jogadores por temporada
export { squadPlayers2024_25, squadPlayers2025_26, squadPlayers2026_27 };

// Elenco atual (temporada vigente - 2025/26)
export const squadPlayers = squadPlayers2026_27;

// Dados das temporadas
export { seasonStats };

// Dados de transferências
export { transferHistory };

// Dados financeiros
export { 
  currentSeasonBalance,
  transfersBySeasonData,
  weeklyWagesBySeasonData,
  biggestPurchases,
  biggestSales,
  highestMarketValues
};

// Informações do clube
export { 
  clubInfo,
  sectorColors,
  positionToSector,
  sectorNames
};

// ==================== FUNÇÕES UTILITÁRIAS SIMPLES ====================

/**
 * Retorna a cor do setor baseada na posição do jogador
 */
export const getSectorColor = (position) => {
  const sector = positionToSector[position] || 'meio';
  return sectorColors[sector];
};

/**
 * Retorna o nome do setor em português
 */
export const getSectorName = (position) => {
  const sector = positionToSector[position] || 'meio';
  return sectorNames[sector];
};

/**
 * Filtra jogadores do elenco atual por setor
 */
export const getPlayersBySector = (sector) => {
  return squadPlayers.filter(player => {
    const playerSector = positionToSector[player.position];
    return playerSector === sector;
  });
};

/**
 * Retorna o elenco de uma temporada específica
 */
export const getPlayersBySeason = (season) => {
  switch (season) {
    case '2024/25':
      return squadPlayers2024_25;
    case '2025/26':
      return squadPlayers2025_26;
    case '2026/27':
      return squadPlayers2026_27;
    default:
      return squadPlayers; // Temporada atual
  }
};
