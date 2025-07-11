/**
 * DADOS DO ELENCO FC PORTO - TEMPORADA 2025/26
 * 
 * Este arquivo contém todos os dados dos jogadores do elenco da temporada 2025/26.
 * Para editar os dados dos jogadores desta temporada, modifique as informações abaixo.
 * 
 * IMPORTANTE: As estatísticas desta temporada começam zeradas e devem ser atualizadas
 * conforme o progresso da temporada atual.
 * 
 * Estrutura de cada jogador:
 * - id: Identificador único do jogador
 * - name: Nome completo do jogador
 * - position: Posição no campo (GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST)
 * - function: Importância no elenco (Crucial, Importante, Rodizio, Promessa, Esporadico)
 * - age: Idade na temporada 2025/26 (idade anterior + 1)
 * - nationality: Nacionalidade
 * - overall: Nota atual (0-99)
 * - potential: Potencial máximo (0-99)
 * - salary: Salário semanal (formato: "€X,XXX")
 * - marketValue: Valor de mercado (formato: "€XM" ou "€X.XM")
 * - contract: Ano de término do contrato
 * - stats: Estatísticas da temporada 2025/26 (ZERADAS)
 */

export const fcPortoPlayers2025_26 = [
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
    marketValue: "€1.0M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 2,
    name: "Diogo Costa",
    position: "GK",
    function: "Crucial",
    age: 25,
    nationality: "Portugal",
    overall: 84,
    potential: 90,
    salary: "€20,000",
    marketValue: "€52.0M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    marketValue: "€1.0M",
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 5,
    name: "Nehuén Pérez",
    position: "CB",
    function: "Importante",
    age: 24,
    nationality: "Argentina",
    overall: 76,
    potential: 81,
    salary: "€13,000",
    marketValue: "€10.0M",
    contract: "2025",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 6,
    name: "Otávio",
    position: "CB",
    function: "Importante",
    age: 23,
    nationality: "Brasil",
    overall: 76,
    potential: 84,
    salary: "€13,000",
    marketValue: "€15.5M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 7,
    name: "Tiago Djaló",
    position: "CB",
    function: "Importante",
    age: 25,
    nationality: "Portugal",
    overall: 76,
    potential: 81,
    salary: "€13,000",
    marketValue: "€10.0M",
    contract: "2025",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    potential: 80,
    salary: "€13,000",
    marketValue: "€9.5M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 10,
    name: "Zaidu",
    position: "LB",
    function: "Importante",
    age: 27,
    nationality: "Nigéria",
    overall: 73,
    potential: 74,
    salary: "€12,000",
    marketValue: "€3.2M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 12,
    name: "Martim Fernandes",
    position: "RB",
    function: "Importante",
    age: 19,
    nationality: "Portugal",
    overall: 74,
    potential: 86,
    salary: "€8,500",
    marketValue: "€9.5M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    salary: "€5,700",
    marketValue: "€1.2M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 15,
    name: "Stephen Eustáquio",
    position: "CM",
    function: "Importante",
    age: 28,
    nationality: "Canadá",
    overall: 77,
    potential: 78,
    salary: "€16,000",
    marketValue: "€10.0M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 16,
    name: "Fábio Vieira",
    position: "CM",
    function: "Importante",
    age: 24,
    nationality: "Portugal",
    overall: 77,
    potential: 80,
    salary: "€14,500",
    marketValue: "€15.0M",
    contract: "2025",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 17,
    name: "Romário Baró",
    position: "CM",
    function: "Esporadico",
    age: 24,
    nationality: "Portugal",
    overall: 70,
    potential: 75,
    salary: "€9,800",
    marketValue: "€2.3M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 18,
    name: "Marko Grujić",
    position: "CM",
    function: "Importante",
    age: 29,
    nationality: "Sérvia",
    overall: 74,
    potential: 74,
    salary: "€14,500",
    marketValue: "€4.1M",
    contract: "2026",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 19,
    name: "Vasco Sousa",
    position: "CAM",
    function: "Esporadico",
    age: 22,
    nationality: "Portugal",
    overall: 69,
    potential: 80,
    salary: "€8,100",
    marketValue: "€3.1M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 20,
    name: "Rodrigo Mora",
    position: "CAM",
    function: "Rodizio",
    age: 18,
    nationality: "Portugal",
    overall: 72,
    potential: 88,
    salary: "€10,000",
    marketValue: "€10.0M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },

  // ==================== EXTREMOS ====================
  {
    id: 21,
    name: "Ivan Jaime",
    position: "LW",
    function: "Rodízio",
    age: 19,
    nationality: "Brasil",
    overall: 74,
    potential: 77,
    salary: "€12,000",
    marketValue: "€6.5M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 22,
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 23,
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 25,
    name: "Pepê",
    position: "RW",
    function: "Importante",
    age: 28,
    nationality: "Brasil",
    overall: 80,
    potential: 80,
    salary: "€18,000",
    marketValue: "€21.0M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 26,
    name: "Francisco Conceição",
    position: "RW",
    function: "Crucial",
    age: 22,
    nationality: "Portugal",
    overall: 79,
    potential: 86,
    salary: "€15,000",
    marketValue: "€35.5M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },

  // ==================== ATACANTES ====================
  {
    id: 27,
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 28,
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 29,
    name: "Fran Navarro",
    position: "ST",
    function: "Importante",
    age: 27,
    nationality: "Espanha",
    overall: 75,
    potential: 78,
    salary: "€16,500",
    marketValue: "€6.0M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 30,
    name: "Samu",
    position: "ST",
    function: "Crucial",
    age: 21,
    nationality: "Espanha",
    overall: 78,
    potential: 87,
    salary: "€15,000",
    marketValue: "€32.0M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 31,
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
]