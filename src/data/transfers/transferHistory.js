/**
 * HISTÓRICO DE TRANSFERÊNCIAS FC PORTO
 * 
 * Este arquivo contém todas as transferências do clube (entradas, saídas, empréstimos, renovações).
 * Para adicionar uma nova transferência, adicione um novo objeto ao array seguindo a estrutura.
 * 
 * Tipos de transferência:
 * - "Entrada": Jogador chegou ao clube
 * - "Saída": Jogador saiu do clube
 * - "Empréstimo (Entrada)": Jogador chegou emprestado
 * - "Empréstimo (Saída)": Jogador saiu emprestado
 * - "Renovação": Renovação de contrato
 * 
 * Estrutura de cada transferência:
 * - id: Identificador único da transferência
 * - playerName: Nome do jogador
 * - type: Tipo da transferência (ver tipos acima)
 * - fromClub: Clube de origem (null para renovações)
 * - toClub: Clube de destino
 * - fee: Valor da transferência ("€XM", "Livre", "Empréstimo", "Renovação")
 * - date: Data da transferência (formato: "YYYY-MM-DD")
 * - season: Temporada da transferência (formato: "YYYY/YY")
 */

export const transferHistory = [
  // ENTRADAS (coluna da esquerda)
  {
    id: 1,
    playerName: "Samu Aghehowa",
    type: "Entrada",
    fromClub: "Atlético Madrid",
    toClub: "FC Porto",
    fee: "€20M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 2,
    playerName: "Francisco Conceição",
    type: "Retorno de empréstimo",
    fromClub: "Ajax",
    toClub: "FC Porto",
    fee: "€10.24M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 3,
    playerName: "William Gomes",
    type: "Entrada",
    fromClub: "São Paulo",
    toClub: "FC Porto",
    fee: "€9M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 4,
    playerName: "Francisco Moura",
    type: "Entrada",
    fromClub: "Famalicão",
    toClub: "FC Porto",
    fee: "€5M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 5,
    playerName: "Deniz Gül",
    type: "Entrada",
    fromClub: "Hammarby",
    toClub: "FC Porto",
    fee: "€4.5M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 6,
    playerName: "Nehuén Pérez",
    type: "Empréstimo (Entrada)",
    fromClub: "Udinese",
    toClub: "FC Porto",
    fee: "Valor de empréstimo: €4.08M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 7,
    playerName: "Tomás Pérez",
    type: "Entrada",
    fromClub: "Newell's",
    toClub: "FC Porto",
    fee: "€3M",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 8,
    playerName: "Fábio Vieira",
    type: "Empréstimo (Entrada)",
    fromClub: "Arsenal",
    toClub: "FC Porto",
    fee: "Valor de empréstimo: €890 mil",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 9,
    playerName: "Tiago Djaló",
    type: "Empréstimo (Entrada)",
    fromClub: "Juventus",
    toClub: "FC Porto",
    fee: "Empréstimo",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 10,
    playerName: "Vasco Sousa",
    type: "Retorno de empréstimo",
    fromClub: "FC Porto B",
    toClub: "FC Porto",
    fee: "-",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 11,
    playerName: "Francisco Conceição",
    type: "Retorno de empréstimo",
    fromClub: "Juventus",
    toClub: "FC Porto",
    fee: "Fim do empréstimo",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 12,
    playerName: "Rodrigo Mora",
    type: "Retorno de empréstimo",
    fromClub: "FC Porto B",
    toClub: "FC Porto",
    fee: "-",
    date: "2024-07-01",
    season: "2024/25"
  },
  {
    id: 13,
    playerName: "Gabriel Veron",
    type: "Retorno de empréstimo",
    fromClub: "Cruzeiro",
    toClub: "FC Porto",
    fee: "Fim do empréstimo",
    date: "2024-07-01",
    season: "2024/25"
  },

  // SAÍDAS (coluna da direita)
  {
    id: 14,
    playerName: "Nico González",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Manchester City",
    fee: "€60M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 15,
    playerName: "Galeno",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Al-Ahli",
    fee: "€50M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 16,
    playerName: "Evanilson",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Bournemouth",
    fee: "€37M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 17,
    playerName: "David Carmo",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Nottingham Forest",
    fee: "€11M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 18,
    playerName: "Francisco Conceição",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "Juventus",
    fee: "€10M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 19,
    playerName: "Toni Martínez",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Alavés",
    fee: "€2M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 20,
    playerName: "Fábio Cardoso",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "Al-Ain",
    fee: "€1M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 21,
    playerName: "Fran Navarro",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "Braga",
    fee: "€0.3M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 22,
    playerName: "Romário Baró",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "FC Basel",
    fee: "€0.1M",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 23,
    playerName: "Wendell",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "São Paulo",
    fee: "Livre",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 24,
    playerName: "Mehdi Taremi",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Inter",
    fee: "Livre",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 25,
    playerName: "Mamadou Loum",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Arouca",
    fee: "Livre",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 26,
    playerName: "Iván Jaime",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "Valencia",
    fee: "Empréstimo",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 27,
    playerName: "Gabriel Veron",
    type: "Empréstimo (Saída)",
    fromClub: "FC Porto",
    toClub: "Santos",
    fee: "Empréstimo",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 28,
    playerName: "Sidnei Tavares",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: "Moreirense",
    fee: "Livre",
    date: "2024-07-10",
    season: "2024/25"
  },
  {
    id: 29,
    playerName: "Pepe",
    type: "Saída",
    fromClub: "FC Porto",
    toClub: null,
    fee: "Aposentadoria",
    date: "2024-06-30",
    season: "2024/25"
  }
];
