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
export const currentSeasonBalance = {
  receitas: 171400000,      // €171.4M em vendas
  gastos: 41500000,        // €41.5M em compras
  saldoLiquido: 129900000,  // €129.9M positivo
  folhaSalarial: 109200000 // €2.1M/semana * 52 semanas
};

/**
 * DADOS DE TRANSFERÊNCIAS POR TEMPORADA
 * Para gráficos de movimentação financeira
 * Valores em milhões de euros
 */
export const transfersBySeasonData = [
  { 
    season: '2024/25',
    compras: 41.5,    // €41.5M gastos em compras
    vendas: 171.4,     // €171.4M recebidos em vendas
    saldo: 171.4 - 41.5 // €129.9M saldo positivo
  }
  // Adicione novas temporadas aqui seguindo o mesmo formato
  // Exemplo:
  // { 
  //   season: '2025/26', 
  //   compras: 25, 
  //   vendas: 50, 
  //   saldo: 25 
  // }
];

/**
 * GASTOS SEMANAIS DA FOLHA SALARIAL POR TEMPORADA
 * Para gráfico de evolução dos gastos com salários
 * Valores em milhões de euros por semana
 */
export const weeklyWagesBySeasonData = [
  { 
    season: '2024/25', 
    gastoSemanal: 2.1  // €2.1M por semana
  }
  // Adicione novas temporadas aqui seguindo o mesmo formato
  // Exemplo:
  // { 
  //   season: '2025/26', 
  //   gastoSemanal: 2.3 
  // }
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

