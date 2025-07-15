/**
 * DADOS DO ELENCO - TEMPORADA 2025/26
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

export const squadPlayers2025_26 = [
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
    marketValue: "€40M",
    contract: "2027",
    stats: { appearances: 8, goals: 0, assists: 0, cleanSheets: 3, rating: 7.3 }
  },
  {
    id: 3,
    name: "Lucas França",
    position: "GK",
    function: "Esporadico",
    age: 29,
    nationality: "Brasil",
    overall: 74,
    potential: 76,
    salary: "€10,000",
    marketValue: "€3.2M",
    contract: "2028",
    stats: { appearances: 2, goals: 0, assists: 0, cleanSheets: 1, rating: 6 }
  },

  // ==================== ZAGUEIROS ====================
  {
    id: 5,
    name: "Nehuén Pérez",
    position: "CB",
    function: "Importante",
    age: 24,
    nationality: "Argentina",
    overall: 76,
    potential: 81,
    salary: "€16,000",
    marketValue: "€9M",
    contract: "2029",
    stats: { appearances: 7, goals: 0, assists: 0, cleanSheets: 3, rating: 7.25 }
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
    contract: "2029",
    stats: { appearances: 6, goals: 0, assists: 0, cleanSheets: 0, rating: 6.65 }
  },
    {
    id: 7,
    name: "Valentín Gómez",
    position: "CB",
    function: "Importante",
    age: 22,
    nationality: "Argentina",
    overall: 77,
    potential: 84,
    salary: "€15,000",
    marketValue: "€14M",
    contract: "2030",
    stats: { appearances: 6, goals: 0, assists: 0, cleanSheets: 3, rating: 7.07 }
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
    stats: { appearances: 1, goals: 0, assists: 0, cleanSheets: 0, rating: 6.3 }
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
    marketValue: "€8.5M",
    contract: "2029",
    stats: { appearances: 3, goals: 0, assists: 0, cleanSheets: 0, rating: 6.8 }
  },
  {
    id: 10,
    name: "Renan Lodi",
    position: "LB",
    function: "Crucial",
    age: 27,
    nationality: "Brasil",
    overall: 79,
    potential: 81,
    salary: "€19,000",
    marketValue: "€17M",
    contract: "2028",
    stats: { appearances: 6, goals: 0, assists: 3, cleanSheets: 3, rating: 7.45 }
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
    marketValue: "€12M",
    contract: "2027",
    stats: { appearances: 6, goals: 0, assists: 0, cleanSheets: 3, rating: 7.12 }
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
    marketValue: "€6M",
    contract: "2028",
    stats: { appearances: 4, goals: 0, assists: 0, cleanSheets: 1, rating: 6.68 }
  },

  // ==================== VOLANTES E MEIAS ====================
  {
    id: 13,
    name: "Alan Varela",
    position: "CDM",
    function: "Crucial",
    age: 23,
    nationality: "Argentina",
    overall: 79,
    potential: 85,
    salary: "€17,000",
    marketValue: "€23M",
    contract: "2028",
    stats: { appearances: 7, goals: 0, assists: 2, cleanSheets: 3, rating: 8.27 }
  },
  {
    id: 14,
    name: "Tomás Pérez",
    position: "CDM",
    function: "Promessa",
    age: 20,
    nationality: "Argentina",
    overall: 62,
    potential: 78,
    salary: "€5,700",
    marketValue: "€0.8M",
    contract: "2027",
    stats: { appearances: 1, goals: 0, assists: 0, cleanSheets: 0, rating: 6.2 }
  },
  {
    id: 15,
    name: "Stephen Eustáquio",
    position: "CDM",
    function: "Importante",
    age: 28,
    nationality: "Canadá",
    overall: 77,
    potential: 78,
    salary: "€16,000",
    marketValue: "9.5M",
    contract: "2027",
    stats: { appearances: 7, goals: 0, assists: 0, cleanSheets: 3, rating: 7.4 }
  },
  {
    id: 17,
    name: "Adriano Firmino",
    position: "CDM",
    function: "Esporadico",
    age: 25,
    nationality: "Brasil",
    overall: 70,
    potential: 74,
    salary: "€9,100",
    marketValue: "€1.9M",
    contract: "2028",
    stats: { appearances: 2, goals: 0, assists: 0, cleanSheets: 0, rating: 7.2 }
  },
  {
    id: 18,
    name: "Gabri Veiga",
    position: "CAM",
    function: "Crucial",
    age: 23,
    nationality: "Espanha",
    overall: 80,
    potential: 86,
    salary: "€20,000",
    marketValue: "€27.5M",
    contract: "2026",
    stats: { appearances: 7, goals: 3, assists: 2, cleanSheets: 4, rating: 8.13 }
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
    marketValue: "€2.8M",
    contract: "2027",
    stats: { appearances: 1, goals: 0, assists: 1, cleanSheets: 0, rating: 7.9 }
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
    marketValue: "€4.9M",
    contract: "2031",
    stats: { appearances: 8, goals: 1, assists: 5, cleanSheets: 3, rating: 8.22 }
  },

  // ==================== EXTREMOS ====================
  {
    id: 21,
    name: "Ivan Jaime",
    position: "LW",
    function: "Importante",
    age: 24,
    nationality: "Espanha",
    overall: 76,
    potential: 80,
    salary: "€12,000",
    marketValue: "€9.5M",
    contract: "2028",
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 1, rating: 6.84 }
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
    marketValue: "€2.2M",
    contract: "2029",
    stats: { appearances: 4, goals: 0, assists: 0, cleanSheets: 0, rating: 5.82 }
  },
  {
    id: 23,
    name: "Borja Sainz",
    position: "LW",
    function: "Importante",
    age: 24,
    nationality: "Espanha",
    overall: 77,
    potential: 81,
    salary: "€18,000",
    marketValue: "€16.5M",
    contract: "2027",
    stats: { appearances: 8, goals: 2, assists: 2, cleanSheets: 1, rating: 7.21 }
  },
  {
    id: 25,
    name: "Pepê",
    position: "RW",
    function: "Importante",
    age: 28,
    nationality: "Brasil",
    overall: 81,
    potential: 81,
    salary: "€18,000",
    marketValue: "€26.0M",
    contract: "2027",
    stats: { appearances: 7, goals: 4, assists: 4, cleanSheets: 4, rating: 7.85 }
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
    marketValue: "€4.2M",
    contract: "2028",
    stats: { appearances: 3, goals: 0, assists: 0, cleanSheets: 0, rating: 6.3 }
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
    marketValue: "€1.3M",
    contract: "2029",
    stats: { appearances: 1, goals: 1, assists: 0, cleanSheets: 0, rating: 7.7 }
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
    stats: { appearances: 7, goals: 11, assists: 3, cleanSheets: 2, rating: 9 }
  }
]