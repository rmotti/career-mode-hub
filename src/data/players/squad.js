/**
 * DADOS DO ELENCO FC PORTO - TEMPORADA 2024/25
 * 
 * Este arquivo contém todos os dados dos jogadores do elenco principal.
 * Para editar os dados dos jogadores, modifique as informações abaixo.
 * 
 * Estrutura de cada jogador:
 * - id: Identificador único do jogador
 * - name: Nome completo do jogador
 * - position: Posição no campo (GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST)
 * - function: Importância no elenco (Crucial, Importante, Rodizio, Promessa, Esporadico)
 * - age: Idade atual
 * - nationality: Nacionalidade
 * - overall: Nota atual (0-99)
 * - potential: Potencial máximo (0-99)
 * - salary: Salário semanal (formato: "€X,XXX")
 * - marketValue: Valor de mercado (formato: "€XM" ou "€X.XM")
 * - contract: Ano de término do contrato
 * - stats: Estatísticas da temporada atual
 */

export const fcPortoPlayers = [
  // ==================== GOLEIROS ====================
  {
    id: 1,
    name: "Cláudio Ramos",
    position: "GK",
    function: "Esporadico",
    age: 33,
    nationality: "Portugal",
    overall: 73,
    potential: 73,
    salary: "€8,400",
    marketValue: "€1M",
    contract: "2026",
    stats: { appearances: 1, goals: 0, assists: 0, cleanSheets: 0, rating: 6.2 }
  },
  {
    id: 2,
    name: "Diogo Costa",
    position: "GK",
    function: "Crucial",
    age: 25,
    nationality: "Portugal",
    overall: 84,
    potential: 89,
    salary: "€20,000",
    marketValue: "€52M",
    contract: "2027",
    stats: { appearances: 12, goals: 0, assists: 0, cleanSheets: 7, rating: 7.8 }
  },
  {
    id: 3,
    name: "Samuel Portugal",
    position: "GK",
    function: "Esporadico",
    age: 31,
    nationality: "Brasil",
    overall: 71,
    potential: 71,
    salary: "€8,000",
    marketValue: "€1M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },

  // ==================== ZAGUEIROS ====================
  {
    id: 4,
    name: "Iván Marcano",
    position: "CB",
    function: "Importante",
    age: 37,
    nationality: "Espanha",
    overall: 74,
    potential: 74,
    salary: "€10,500",
    marketValue: "€0.8M",
    contract: "2025",
    stats: { appearances: 16, goals: 1, assists: 0, cleanSheets: 7, rating: 6.83 }
  },
  {
    id: 5,
    name: "Nehuén Pérez",
    position: "CB",
    function: "Importante",
    age: 24,
    nationality: "Argentina",
    overall: 76,
    potential: 80,
    salary: "€13,000",
    marketValue: "€10M",
    contract: "2025",
    stats: { appearances: 38, goals: 1, assists: 2, cleanSheets: 14, rating: 7 }
  },
  {
    id: 6,
    name: "Otávio",
    position: "CB",
    function: "Importante",
    age: 23,
    nationality: "Brasil",
    overall: 76,
    potential: 80,
    salary: "€13,000",
    marketValue: "€15.5M",
    contract: "2026",
    stats: { appearances: 25, goals: 2, assists: 0, cleanSheets: 12, rating: 6.87 }
  },
  {
    id: 7,
    name: "Tiago Djaló",
    position: "CB",
    function: "Importante",
    age: 25,
    nationality: "Portugal",
    overall: 76,
    potential: 79,
    salary: "€13,000",
    marketValue: "€10M",
    contract: "2025",
    stats: { appearances: 25, goals: 2, assists: 0, cleanSheets: 9, rating: 6.66 }
  },
  {
    id: 8,
    name: "Zé Pedro",
    position: "CB",
    function: "Importante",
    age: 27,
    nationality: "Portugal",
    overall: 74,
    potential: 76,
    salary: "€13,500",
    marketValue: "€4.5M",
    contract: "2026",
    stats: { appearances: 25, goals: 1, assists: 1, cleanSheets: 10, rating: 6.71 }
  },
  
  // ==================== LATERAIS ====================
  {
    id: 9,
    name: "Francisco Moura",
    position: "LB",
    function: "Importante",
    age: 25,
    nationality: "Portugal",
    overall: 76,
    potential: 79,
    salary: "€13,000",
    marketValue: "€9.5M",
    contract: "2029",
    stats: { appearances: 41, goals: 4, assists: 10, cleanSheets: 13, rating: 7.11 }
  },
  {
    id: 10,
    name: "Zaidu",
    position: "LB",
    function: "Importante",
    age: 27,
    nationality: "Nigéria",
    overall: 73,
    potential: 75,
    salary: "€12,500",
    marketValue: "€3.2M",
    contract: "2027",
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 0, rating: 5.9 }
  },
  {
    id: 11,
    name: "João Mário",
    position: "RB",
    function: "Importante",
    age: 24,
    nationality: "Portugal",
    overall: 77,
    potential: 81,
    salary: "€14,000",
    marketValue: "€13.5M",
    contract: "2027",
    stats: { appearances: 40, goals: 0, assists: 5, cleanSheets: 15, rating: 7.04 }
  },
  {
    id: 12,
    name: "Martim Fernandes",
    position: "RB",
    function: "Importante",
    age: 19,
    nationality: "Portugal",
    overall: 74,
    potential: 84,
    salary: "€8,500",
    marketValue: "€9.5M",
    contract: "2028",
    stats: { appearances: 30, goals: 0, assists: 6, cleanSheets: 11, rating: 6.88 }
  },

  // ==================== VOLANTES E MEIAS ====================
  {
    id: 13,
    name: "Alan Varela",
    position: "CDM",
    function: "Crucial",
    age: 23,
    nationality: "Argentina",
    overall: 77,
    potential: 85,
    salary: "€17,000",
    marketValue: "€25.5M",
    contract: "2027",
    stats: { appearances: 44, goals: 0, assists: 2, cleanSheets: 22, rating: 7.23 }
  },
  {
    id: 14,
    name: "Tomás Pérez",
    position: "CDM",
    function: "Promessa",
    age: 19,
    nationality: "Argentina",
    overall: 62,
    potential: 78,
    salary: "€5,000",
    marketValue: "€1.2M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 15,
    name: "Eustáquio",
    position: "CM",
    function: "Importante",
    age: 28,
    nationality: "Canadá",
    overall: 77,
    potential: 78,
    salary: "€16,000",
    marketValue: "€12M",
    contract: "2027",
    stats: { appearances: 35, goals: 1, assists: 1, cleanSheets: 15, rating: 6.9 }
  },
  {
    id: 16,
    name: "Nico González",
    position: "CM",
    function: "Importante",
    age: 22,
    nationality: "Espanha",
    overall: 75,
    potential: 82,
    salary: "€14,500",
    marketValue: "€18M",
    contract: "2029",
    stats: { appearances: 42, goals: 2, assists: 2, cleanSheets: 18, rating: 6.95 }
  },
  {
    id: 17,
    name: "Vasco Sousa",
    position: "CM",
    function: "Promessa",
    age: 20,
    nationality: "Portugal",
    overall: 65,
    potential: 79,
    salary: "€6,000",
    marketValue: "€2.8M",
    contract: "2028",
    stats: { appearances: 15, goals: 0, assists: 1, cleanSheets: 6, rating: 6.2 }
  },
  {
    id: 18,
    name: "Fábio Vieira",
    position: "CAM",
    function: "Importante",
    age: 24,
    nationality: "Portugal",
    overall: 78,
    potential: 83,
    salary: "€16,500",
    marketValue: "€22M",
    contract: "2028",
    stats: { appearances: 28, goals: 1, assists: 2, cleanSheets: 12, rating: 6.8 }
  },

  // ==================== EXTREMOS ====================
  {
    id: 19,
    name: "Galeno",
    position: "LW",
    function: "Crucial",
    age: 27,
    nationality: "Brasil",
    overall: 80,
    potential: 82,
    salary: "€18,500",
    marketValue: "€28M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 20,
    name: "Iván Jaime",
    position: "LW",
    function: "Rodizio",
    age: 23,
    nationality: "Espanha",
    overall: 71,
    potential: 76,
    salary: "€11,500",
    marketValue: "€6.5M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 21,
    name: "William Gomes",
    position: "LW",
    function: "Promessa",
    age: 19,
    nationality: "Brasil",
    overall: 69,
    potential: 82,
    salary: "€7,500",
    marketValue: "€2.4M",
    contract: "2029",
    stats: { appearances: 9, goals: 0, assists: 0, cleanSheets: 0, rating: 5.7 }
  },
  {
    id: 22,
    name: "André Franco",
    position: "RW",
    function: "Rodizio",
    age: 27,
    nationality: "Portugal",
    overall: 73,
    potential: 73,
    salary: "€13,000",
    marketValue: "€3.2M",
    contract: "2027",
    stats: { appearances: 21, goals: 2, assists: 0, cleanSheets: 7, rating: 6.5 }
  },
  {
    id: 23,
    name: "Francisco Conceição",
    position: "RW",
    function: "Crucial",
    age: 22,
    nationality: "Portugal",
    overall: 79,
    potential: 85,
    salary: "€15,000",
    marketValue: "€35.5M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 24,
    name: "Gonçalo Borges",
    position: "RW",
    function: "Rodizio",
    age: 24,
    nationality: "Portugal",
    overall: 72,
    potential: 74,
    salary: "€11,000",
    marketValue: "€3.5M",
    contract: "2027",
    stats: { appearances: 35, goals: 3, assists: 3, cleanSheets: 8, rating: 6.5 }
  },
  {
    id: 25,
    name: "Pepê",
    position: "RW",
    function: "Importante",
    age: 28,
    nationality: "Brasil",
    overall: 80,
    potential: 84,
    salary: "€18,000",
    marketValue: "€21M",
    contract: "2026",
    stats: { appearances: 46, goals: 7, assists: 4, cleanSheets: 18, rating: 7.1 }
  },

  // ==================== ATACANTES ====================
  {
    id: 26,
    name: "Danny Namaso",
    position: "ST",
    function: "Rodizio",
    age: 24,
    nationality: "Camarões",
    overall: 73,
    potential: 76,
    salary: "€12,500",
    marketValue: "€4.9M",
    contract: "2028",
    stats: { appearances: 34, goals: 4, assists: 1, cleanSheets: 8, rating: 6.3 }
  },
  {
    id: 27,
    name: "Deniz Gul",
    position: "ST",
    function: "Promessa",
    age: 20,
    nationality: "Turquia",
    overall: 66,
    potential: 80,
    salary: "€8,000",
    marketValue: "€2.1M",
    contract: "2029",
    stats: { appearances: 18, goals: 2, assists: 0, cleanSheets: 4, rating: 6.44 }
  },
  {
    id: 28,
    name: "Fran Navarro",
    position: "ST",
    function: "Importante",
    age: 27,
    nationality: "Espanha",
    overall: 75,
    potential: 77,
    salary: "€16,500",
    marketValue: "€6M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 29,
    name: "Samu",
    position: "ST",
    function: "Crucial",
    age: 21,
    nationality: "Espanha",
    overall: 78,
    potential: 87,
    salary: "€15,000",
    marketValue: "€32M",
    contract: "2029",
    stats: { appearances: 12, goals: 8, assists: 2, cleanSheets: 6, rating: 8.1 }
  },
  {
    id: 30,
    name: "Wendel Silva",
    position: "ST",
    function: "Esporadico",
    age: 24,
    nationality: "Brasil",
    overall: 67,
    potential: 70,
    salary: "€9,900",
    marketValue: "€1.6M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  }
];

