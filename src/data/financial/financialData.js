import { transferHistory } from '../transfers/transferHistory';
import { fcPortoPlayers2025_26} from '../players/squad2025-26';
import { fcPortoPlayers2024_25} from '../players/squad2024-25';

// Mapeamento das squads por temporada
const squads = {
  '2024/25': fcPortoPlayers2024_25,
  '2025/26': fcPortoPlayers2025_26
};

/**
 * DADOS FINANCEIROS FC PORTO
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
  { name: "Diogo Costa", value: "€52M", position: "GK", age: 25 },
  { name: "Francisco Conceição", value: "€35.5M", position: "RW", age: 22 },
  { name: "Samu", value: "€32M", position: "ST", age: 21 },
  { name: "Galeno", value: "€28M", position: "LW", age: 27 },
  { name: "Alan Varela", value: "€25.5M", position: "CDM", age: 23 }
];
/**
 * MAIORES COMPRAS DA HISTÓRIA
 * Lista das maiores aquisições do clube
 * Valores em milhões de euros
 */
export const biggestPurchases = [
  { name: "Nico González", value: "€21.20M", season: "23/24", from: "Barcelona" },
  { name: "David Carmo", value: "€20.28M", season: "22/23", from: "Braga" },
  { name: "Samu Aghehowa", value: "€20.00M", season: "24/25", from: "Atlético Madrid" },
  { name: "Óliver Torres", value: "€20.00M", season: "17/18", from: "Atlético Madrid" },
  { name: "Giannelli Imbula", value: "€20.00M", season: "15/16", from: "Marseille" }
];

/**
 * MAIORES VENDAS DA HISTÓRIA
 * Lista das maiores vendas do clube
 * Valores em milhões de euros
 */
export const biggestSales = [
  { name: "Otávio", value: "€60M", season: "23/24", to: "Al-Nassr" },
  { name: "Nico González", value: "€60M", season: "24/25", to: "Man City" },
  { name: "Luis Díaz", value: "€54M", season: "21/22", to: "Liverpool" },
  { name: "Éder Militão", value: "€50M", season: "19/20", to: "Real Madrid" },
  { name: "Galeno", value: "€50M", season: "24/25", to: "Al-Ahli" }
];



