/**
 * ARQUIVO PRINCIPAL DE DADOS CAREER HUB
 * 
 * Este arquivo centraliza todas as importações de dados do sistema.
 * Todos os componentes devem importar dados deste arquivo.
 * 
 * ESTRUTURA DE ARQUIVOS:
 * - /players/squad.js - Dados do elenco
 * - /seasons/seasonStats.js - Estatísticas das temporadas
 * - /transfers/transferHistory.js - Histórico de transferências
 * - /financial/financialData.js - Dados financeiros
 * - /club/clubInfo.js - Informações do clube
 */

// ==================== IMPORTAÇÕES ====================
import { squadPlayers2024_25 } from './players/squad2024-25.js';
import { squadPlayers2025_26 } from './players/squad2025-26.js';
import { seasonStats } from './seasons/seasonStats.js';
import { transferHistory } from './transfers/transferHistory.js';
import { 
  currentSeasonBalance,
  transfersBySeasonData,
  weeklyWagesBySeasonData,
  biggestPurchases,
  biggestSales,
  highestMarketValues
} from './financial/financialData.js';
import { 
  clubInfo,
  sectorColors,
  positionToSector,
  sectorNames
} from './club/clubInfo.js';

// ==================== EXPORTAÇÕES ====================

// Dados dos jogadores por temporada
export { squadPlayers2024_25, squadPlayers2025_26 };

// Elenco atual (temporada vigente - 2025/26)
export const squadPlayers = squadPlayers2025_26;

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

// ==================== DADOS DERIVADOS ====================

/**
 * FUNÇÕES UTILITÁRIAS PARA MANIPULAÇÃO DE DADOS
 */

/**
 * Obtém a cor do setor baseada na posição do jogador
 * @param {string} position - Posição do jogador (GK, CB, LB, etc.)
 * @returns {object} Objeto com classes CSS de cor
 */
export const getSectorColor = (position) => {
  const sector = positionToSector[position] || 'meio';
  return sectorColors[sector];
};

/**
 * Obtém o nome do setor baseado na posição do jogador
 * @param {string} position - Posição do jogador (GK, CB, LB, etc.)
 * @returns {string} Nome do setor em português
 */
export const getSectorName = (position) => {
  const sector = positionToSector[position] || 'meio';
  return sectorNames[sector];
};

/**
 * Filtra jogadores por setor
 * @param {string} sector - Nome do setor ('goleiro', 'defesa', 'meio', 'ataque')
 * @returns {Array} Array de jogadores do setor especificado
 */
export const getPlayersBySector = (sector) => {
  return squadPlayers.filter(player => {
    const playerSector = positionToSector[player.position];
    return playerSector === sector;
  });
};

/**
 * Obtém elenco de uma temporada específica
 * @param {string} season - Temporada desejada ('2024/25' ou '2025/26')
 * @returns {Array} Array de jogadores da temporada especificada
 */
export const getPlayersBySeason = (season) => {
  switch (season) {
    case '2024/25':
      return squadPlayers2024_25;
    case '2025/26':
      return squadPlayers2025_26;
    default:
      return squadPlayers; // Temporada atual por padrão
  }
};

/**
 * Calcula estatísticas do elenco
 * @returns {object} Objeto com estatísticas gerais do elenco
 */
export const getSquadStats = () => {
  const totalPlayers = squadPlayers.length;
  const averageAge = totalPlayers > 0
    ? parseFloat((squadPlayers.reduce((sum, p) => sum + p.age, 0) / totalPlayers).toFixed(1))
    : 0;
  // Supondo que todos os valores de mercado estão em milhões (ex: "€10M")
  // Se houver outros formatos, ajuste o parsing conforme necessário.
  const totalMarketValue = squadPlayers.reduce((sum, p) => {
    let value = 0;
    if (typeof p.marketValue === 'string') {
      if (p.marketValue.includes('M')) {
        value = parseFloat(p.marketValue.replace('€', '').replace('M', ''));
      } else if (p.marketValue.includes('K')) {
        value = parseFloat(p.marketValue.replace('€', '').replace('K', '')) / 1000;
      }
    }
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return {
    totalPlayers,
    averageAge,
    totalMarketValue: `€${totalMarketValue.toFixed(2)}M`
  };
};

/**
 * Obtém estatísticas históricas combinadas de todas as temporadas
 * Soma as estatísticas dos jogadores que aparecem em múltiplas temporadas
 * @returns {Array} Array de jogadores com estatísticas históricas
 */
export const getHistoricalPlayerStats = () => {
  const allPlayers = [...squadPlayers2024_25, ...squadPlayers2025_26];
  const playerStatsMap = new Map();

  allPlayers.forEach(player => {
    if (playerStatsMap.has(player.name)) {
      // Jogador já existe, somar estatísticas
      const existing = playerStatsMap.get(player.name);
      existing.stats.appearances += player.stats.appearances;
      existing.stats.goals += player.stats.goals;
      existing.stats.assists += player.stats.assists;
      existing.stats.cleanSheets += player.stats.cleanSheets;
      
      // Calcular nova média de rating (ponderada por jogos)
      const totalGames = existing.stats.appearances;
      if (totalGames > 0) {
        existing.stats.rating = ((existing.stats.rating * (totalGames - player.stats.appearances)) + 
                                (player.stats.rating * player.stats.appearances)) / totalGames;
      }
    } else {
      // Novo jogador, adicionar ao mapa
      playerStatsMap.set(player.name, { ...player });
    }
  });

  return Array.from(playerStatsMap.values());
};

