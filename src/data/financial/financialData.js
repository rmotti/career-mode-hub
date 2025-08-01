import { transferHistory } from '../transfers/transferHistory';
import { squadPlayers2025_26 } from '../players/squad2025-26';
import { squadPlayers2024_25 } from '../players/squad2024-25';

// Mapeamento das squads por temporada
const squads = {
  '2024/25': squadPlayers2024_25,
  '2025/26': squadPlayers2025_26
};

/**
 * Função utilitária para calcular a folha salarial anual de um elenco
 * - Assume que cada jogador tem `salary` em euros por semana
 */
function getAnnualWage(squad = []) {
  return squad.reduce((sum, player) => sum + (player.salary || 0), 0) * 52;
}

/**
 * Função para converter valores de transferências em euros
 * Aceita formatos "€40M", "€500K", "Gratuito"
 */
function parseTransferFee(fee) {
  if (!fee || typeof fee !== 'string') return 0;
  const clean = fee.replace(/[^\d.,]/g, '').replace(',', '.');
  if (fee.toLowerCase().includes('gratuito')) return 0;
  if (fee.toLowerCase().includes('m')) return parseFloat(clean) * 1e6;
  if (fee.toLowerCase().includes('k')) return parseFloat(clean) * 1e3;
  return parseFloat(clean) || 0;
}

/**
 * Calcula receitas e gastos de uma temporada
 */
function calculateSeasonFinancials(transfers = []) {
  const receitas = transfers
    .filter(t => t.type.includes('Saída'))
    .reduce((sum, t) => sum + parseTransferFee(t.fee), 0);

  const gastos = transfers
    .filter(t => t.type.includes('Entrada'))
    .reduce((sum, t) => sum + parseTransferFee(t.fee), 0);

  return { receitas, gastos };
}

// Transferências por temporada
const transfers2024 = transferHistory['2024/25'] || [];
const transfers2025 = transferHistory['2025/26'] || [];

// Cálculo financeiro por temporada
const { receitas: receitas2024, gastos: gastos2024 } = calculateSeasonFinancials(transfers2024);
const { receitas: receitas2025, gastos: gastos2025 } = calculateSeasonFinancials(transfers2025);

const squad2024 = squads['2024/25'] || [];
const squad2025 = squads['2025/26'] || [];

/**
 * BALANÇO FINANCEIRO POR TEMPORADA
 */
export const seasonBalance2024_25 = {
  receitas: receitas2024,
  gastos: gastos2024,
  saldoLiquido: receitas2024 - gastos2024,
  folhaSalarial: getAnnualWage(squad2024)
};

export const seasonBalance2025_26 = {
  receitas: receitas2025,
  gastos: gastos2025,
  saldoLiquido: receitas2025 - gastos2025,
  folhaSalarial: getAnnualWage(squad2025)
};

// Para compatibilidade com código existente
export const previousSeasonBalance = seasonBalance2024_25;
export const currentSeasonBalance = seasonBalance2025_26;

/**
 * DADOS DE TRANSFERÊNCIAS POR TEMPORADA
 * Para gráficos de movimentação financeira
 * Valores em milhões de euros
 */
export const transfersBySeasonData = [
  {
    season: '2024/25',
    compras: previousSeasonBalance.gastos / 1e6,
    vendas: previousSeasonBalance.receitas / 1e6,
    saldo: (previousSeasonBalance.receitas - previousSeasonBalance.gastos) / 1e6
  },
  {
    season: '2025/26',
    compras: currentSeasonBalance.gastos / 1e6,
    vendas: currentSeasonBalance.receitas / 1e6,
    saldo: (currentSeasonBalance.receitas - currentSeasonBalance.gastos) / 1e6
  }
];

/**
 * Gera dinamicamente os gastos semanais da folha salarial por temporada
 */
export const weeklyWagesBySeasonData = [
  {
    season: '2024/25',
    gastoSemanal: previousSeasonBalance.folhaSalarial / 52 / 1e6
  },
  {
    season: '2025/26',
    gastoSemanal: currentSeasonBalance.folhaSalarial / 52 / 1e6
  }
];

/**
 * MAIORES VALORES DE MERCADO ATUAIS
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
 */
export const biggestSales = [
  { name: "Kai Havertz", value: "€80M", season: "20/21", to: "Chelsea" },
  { name: "Exequiel Palacios", value: "€75M", season: "25/26", to: "Manchester United" },
  { name: "Victor Boniface", value: "€60M", season: "25/26", to: "Tottenham" },
  { name: "Patrick Schick", value: "€58M", season: "25/26", to: "Juventus" },
  { name: "Moussa Diaby", value: "€55M", season: "23/24", to: "Aston Villa" }
];
