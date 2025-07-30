import { transferHistory } from '../transfers/transferHistory';
import { squadPlayers2025_26} from '../players/squad2025-26';
import { squadPlayers2024_25} from '../players/squad2024-25';

// Mapeamento das squads por temporada
const squads = {
  '2024/25': squadPlayers2024_25,
  '2025/26': squadPlayers2025_26
};

/**
 * DADOS FINANCEIROS
 * 
 * Este arquivo contém todas as informações financeiras do clube.
 * Para editar valores financeiros, modifique as informações abaixo.
 * 
 * IMPORTANTE: Todos os valores devem estar em milhões de euros (M) ou milhares (K)
 */

/**
 * BALANÇO FINANCEIRO DA TEMPORADA ATUAL
 * Valores em euros (€)
 */
// Função utilitária para calcular folha salarial anual de um squad
function getAnnualWage(squad) {
  // Assume que cada jogador tem uma propriedade 'salary' em euros por semana
  return squad.reduce((sum, player) => sum + (player.salary || 0), 0) * 52;
}

// Busca receitas e gastos das temporadas em transferHistory
const transfer2024_25 = transferHistory.find(t => t.season === '2024/25');
const transfer2025_26 = transferHistory.find(t => t.season === '2025/26');
const squad2024_25 = squads['2024/25'] || [];
const squad2025_26 = squads['2025/26'] || [];

export const seasonBalance2024_25 = {
  receitas: transfer2024_25?.receitas || 0,
  gastos: transfer2024_25?.gastos || 0,
  saldoLiquido: (transfer2024_25?.receitas || 0) - (transfer2024_25?.gastos || 0),
  folhaSalarial: getAnnualWage(squad2024_25)
};

export const seasonBalance2025_26 = {
  receitas: transfer2025_26?.receitas || 0,
  gastos: transfer2025_26?.gastos || 0,
  saldoLiquido: (transfer2025_26?.receitas || 0) - (transfer2025_26?.gastos || 0),
  folhaSalarial: getAnnualWage(squad2025_26)
};

// Para manter compatibilidade com código existente
export const previousSeasonBalance = seasonBalance2024_25;
export const currentSeasonBalance = seasonBalance2025_26;

/**
 * DADOS DE TRANSFERÊNCIAS POR TEMPORADA
 * Para gráficos de movimentação financeira
 * Valores em milhões de euros
 */
/**
 * Gera dinamicamente os dados de transferências por temporada
 * usando o balanço financeiro da temporada atual.
 */
export const transfersBySeasonData = [
  {
    season: '2024/25',
    compras: previousSeasonBalance.gastos / 1e6, // milhões
    vendas: previousSeasonBalance.receitas / 1e6, // milhões
    saldo: (previousSeasonBalance.receitas - previousSeasonBalance.gastos) / 1e6 // milhões
  },
    {
    season: '2025/26',
    compras: currentSeasonBalance.gastos / 1e6, // milhões
    vendas: currentSeasonBalance.receitas / 1e6, // milhões
    saldo: (currentSeasonBalance.receitas - currentSeasonBalance.gastos) / 1e6 // milhões
  }
  // Adicione novas temporadas aqui seguindo o mesmo formato, se necessário
];

/**
 * Gera dinamicamente os gastos semanais da folha salarial por temporada
 * usando o balanço financeiro da temporada atual.
 */
export const weeklyWagesBySeasonData = [
  {
    season: '2024/25',
    gastoSemanal: currentSeasonBalance.folhaSalarial / 52 / 1e6 // milhões por semana
  },
    {
    season: '2025/26',
    gastoSemanal: currentSeasonBalance.folhaSalarial / 52 / 1e6 // milhões por semana
  }
  // Adicione novas temporadas aqui seguindo o mesmo formato, se necessário
];
/**
 * MAIORES VALORES DE MERCADO ATUAIS
 * Lista dos jogadores com maior valor de mercado no elenco atual
 * Valores em milhões de euros
 */
export const highestMarketValues = [
  { name: "Florian Wirtz", value: "€145M", position: "CAM", age: 22 },
  { name: "Jonathan Tah", value: "€67.5M", position: "CB", age: 29 },
  { name: "Jonathan David", value: "€56.5M", position: "ST", age: 25 },
  { name: "Alejandro Grimaldo", value: "€53M", position: "LB", age: 29 },
  { name: "Jeremie Frimpong", value: "€52M", position: "RB", age: 24 }
];
/**
 * MAIORES COMPRAS DA HISTÓRIA
 * Lista das maiores aquisições do clube
 * Valores em milhões de euros
 */
export const biggestPurchases = [
  { name: "Andrey Santos", value: "€50M", season: "25/26", from: "Chelsea" },
  { name: "Jonathan David", value: "€40M", season: "25/26", from: "Losc Lille" },
  { name: "Andriy Lunin", value: "€40M", season: "25/26", from: "Real Madrid" },
  { name: "Kenan Yildiz", value: "€35M", season: "25/26", from: "Juventus" },
  { name: "Kerem Demirbay", value: "€32M", season: "19/20", from: "Hoffenheim" }
];

/**
 * MAIORES VENDAS DA HISTÓRIA
 * Lista das maiores vendas do clube
 * Valores em milhões de euros
 */
export const biggestSales = [
  { name: "Kai Havertz", value: "€80M", season: "20/21", to: "Chelsea" },
  { name: "Exequiel Palacios", value: "€75M", season: "25/26", to: "Manchester United" },
  { name: "Victor Boniface", value: "€60M", season: "25/26", to: "Tottenham" },
  { name: "Patrick Schick", value: "€58M", season: "25/26", to: "Juventus" },
  { name: "Moussa Diaby", value: "€55M", season: "23/24", to: "Aston Villa" }
];



