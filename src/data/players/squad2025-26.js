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
 * - function: Importância no elenco (Crucial, Importante, Rodízio, Promessa, Esporadico)
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
    id: 33,
    name: "Andriy Lunin",
    position: "GK",
    function: "Importante",
    age: 26,
    nationality: "Ucrania",
    overall: 82,
    potential: 86,
    salary: "€100,000",
    marketValue: "€31M",
    contract: "2028",
    stats: { appearances: 7, goals: 0, assists: 1, cleanSheets: 1, rating: 7.54 }
  },
  {
    id: 2,
    name: "Lukás Hrádecky",
    position: "GK",
    function: "Importante",
    age: 35,
    nationality: "Finlândia",
    overall: 82,
    potential: 82,
    salary: "€65,000",
    marketValue: "€5M",
    contract: "2026",
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 1, rating: 7.38 }
  },
  {
    id: 3,
    name: "Niklas Lomb",
    position: "GK",
    function: "Esporádico",
    age: 31,
    nationality: "Alemanha",
    overall: 66,
    potential: 66,
    salary: "€24,500",
    marketValue: "€0.45M",
    contract: "2027",
    stats: { appearances: 1, goals: 0, assists: 0, cleanSheets: 0, rating: 6.9 }
  },

  // ==================== ZAGUEIROS ====================
  {
    id: 34,
    name: "Lucas Beraldo",
    position: "CB",
    function: "Esporádico",
    age: 21,
    nationality: "Brasil",
    overall: 78,
    potential: 84,
    salary: "€49,000",
    marketValue: "€20.5M",
    contract: "2026",
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 0, rating: 6.56 }
  },
  {
    id: 7,
    name: "Jonathan Tah",
    position: "CB",
    function: "Crucial",
    age: 29,
    nationality: "Alemanha",
    overall: 87,
    potential: 87,
    salary: "€130,000",
    marketValue: "€66.5M",
    contract: "2027",
    stats: { appearances: 12, goals: 0, assists: 0, cleanSheets: 2, rating: 7.13 }
  },
  {
    id: 9,
    name: "Edmond Tapsoba",
    position: "CB",
    function: "Importante",
    age: 26,
    nationality: "Burkina Faso",
    overall: 82,
    potential: 84,
    salary: "€82,000",
    marketValue: "€31.5M",
    contract: "2028",
    stats: { appearances: 5, goals: 0, assists: 0, cleanSheets: 0, rating: 6.9 }
  },
   {
    id: 10,
    name: "Piero Hincapié",
    position: "CB",
    function: "Importante",
    age: 23,
    nationality: "Equador",
    overall: 83,
    potential: 87,
    salary: "€81,000",
    marketValue: "€39.0M",
    contract: "2029",
    stats: { appearances: 12, goals: 0, assists: 0, cleanSheets: 2, rating: 6.86 }
  },
   {
    id: 11,
    name: "Jeanuel Belocian",
    position: "CB",
    function: "Promessa",
    age: 20,
    nationality: "França",
    overall: 70,
    potential: 82,
    salary: "€27,000",
    marketValue: "€2.2M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
 {
    id: 35,
    name: "Odilon Kossounou",
    position: "CB",
    function: "Rodízio",
    age: 24,
    nationality: "Costa do Marfim",
    overall: 82,
    potential: 85,
    salary: "€80,000",
    marketValue: "€41.5M",
    contract: "2026",
    stats: { appearances: 13, goals: 0, assists: 0, cleanSheets: 1, rating: 6.88 }
  },
  
  // ==================== LATERAIS ====================
  {
    id: 14,
    name: "Arthur",
    position: "RB",
    function: "Promessa",
    age: 22,
    nationality: "Brasil",
    overall: 71,
    potential: 81,
    salary: "€31,000",
    marketValue: "€3M",
    contract: "2028",
    stats: { appearances: 3, goals: 0, assists: 0, cleanSheets: 0, rating: 6.6 }
  },
  {
    id: 15,
    name: "Alejandro Grimaldo",
    position: "LB",
    function: "Crucial",
    age: 29,
    nationality: "Espanha",
    overall: 85,
    potential: 85,
    salary: "€120,000",
    marketValue: "€52M",
    contract: "2027",
    stats: { appearances: 13, goals: 3, assists: 2, cleanSheets: 2, rating: 7.62 }
  },
    {
    id: 16,
    name: "Jeremie Frimpong",
    position: "RB",
    function: "Crucial",
    age: 24,
    nationality: "Holanda",
    overall: 84,
    potential: 86,
    salary: "€120,000",
    marketValue: "€52M",
    contract: "2028",
    stats: { appearances: 12, goals: 4, assists: 6, cleanSheets: 2, rating: 7.74 }
  },

  // ==================== VOLANTES E MEIAS ====================
  {
    id: 17,
    name: "Granit Xhaka",
    position: "CDM",
    function: "Crucial",
    age: 32,
    nationality: "Suíca",
    overall: 86,
    potential: 86,
    salary: "€130,000",
    marketValue: "€42.0M",
    contract: "2028",
    stats: { appearances: 12, goals: 2, assists: 3, cleanSheets: 2, rating: 7.61 }
  },
  {
    id: 18,
    name: "Robert Andrich",
    position: "CDM",
    function: "Importante",
    age: 30,
    nationality: "Alemanha",
    overall: 83,
    potential: 83,
    salary: "€98,000",
    marketValue: "€25M",
    contract: "2028",
    stats: { appearances: 8, goals: 1, assists: 0, cleanSheets: 1, rating: 7.1 }
  },
  {
    id: 36,
    name: "Andrey Santos",
    position: "CM",
    function: "Rodízio",
    age: 21,
    nationality: "Brasil",
    overall: 80,
    potential: 87,
    salary: "€80,000",
    marketValue: "€30.5M",
    contract: "2030",
    stats: { appearances: 9, goals: 1, assists: 3, cleanSheets: 1, rating: 7.31 }
  },
  {
    id: 37,
    name: "Juan Nardoni",
    position: "CM",
    function: "Esporádico",
    age: 23,
    nationality: "Argentina",
    overall: 77,
    potential: 80,
    salary: "€45,000",
    marketValue: "€13M",
    contract: "2028",
    stats: { appearances: 7, goals: 0, assists: 1, cleanSheets: 0, rating: 6.77 }
  },
  {
    id: 38,
    name: "Gustavo Puerta",
    position: "CM",
    function: "Promessa",
    age: 22,
    nationality: "Colombia",
    overall: 70,
    potential: 81,
    salary: "€28,000",
    marketValue: "€3.7M",
    contract: "2029",
    stats: { appearances: 2, goals: 0, assists: 0, cleanSheets: 0, rating: 6.75 }
  },
  {
    id: 22,
    name: "Jonas Hofmann",
    position: "CAM",
    function: "Rodízio",
    age: 32,
    nationality: "Alemanha",
    overall: 79,
    potential: 79,
    salary: "€78,000",
    marketValue: "€10M",
    contract: "2027",
    stats: { appearances: 7, goals: 4, assists: 1, cleanSheets: 0, rating: 7.9 }
  },
  {
    id: 23,
    name: "Florian Wirtz",
    position: "CAM",
    function: "Crucial",
    age: 22,
    nationality: "Alemanha",
    overall: 90,
    potential: 92,
    salary: "€150,000",
    marketValue: "€141M",
    contract: "2029",
    stats: { appearances: 12, goals: 11, assists: 11, cleanSheets: 1, rating: 8.87 }
  },
  {
    id: 39,
    name: "Kenan Yildiz",
    position: "CAM",
    function: "Rodízio",
    age: 20,
    nationality: "Turquia",
    overall: 80,
    potential: 86,
    salary: "€80,000",
    marketValue: "€46.5M",
    contract: "2029",
    stats: { appearances: 12, goals: 3, assists: 2, cleanSheets: 3, rating: 7.61 }
  },

  // ==================== EXTREMOS ====================
  {
    id: 26,
    name: "Nathan Tella",
    position: "RW",
    function: "Esporádico",
    age: 25,
    nationality: "Nigeria",
    overall: 78,
    potential: 81,
    salary: "€58,000",
    marketValue: "€16.5M",
    contract: "2028",
    stats: { appearances: 8, goals: 0, assists: 1, cleanSheets: 0, rating: 6.5 }
  },
  // ==================== ATACANTES ====================
  {
    id: 40,
    name: "Jonathan David",
    position: "ST",
    function: "Importante",
    age: 25,
    nationality: "Canadá",
    overall: 84,
    potential: 85,
    salary: "€71,500",
    marketValue: "€56.5M",
    contract: "2029",
    stats: { appearances: 10, goals: 9, assists: 4, cleanSheets: 2, rating: 8.72 }
  },
  {
    id: 41,
    name: "Gabriel Jesus",
    position: "ST",
    function: "Rodízio",
    age: 28,
    nationality: "Brasil",
    overall: 81,
    potential: 82,
    salary: "€65,000",
    marketValue: "€26M",
    contract: "2026",
    stats: { appearances: 11, goals: 7, assists: 4, cleanSheets: 0, rating: 7.66 }
  },
  {
    id: 30,
    name: "Martin Terrier",
    position: "ST",
    function: "Rodízio",
    age: 28,
    nationality: "França",
    overall: 78,
    potential: 80,
    salary: "€79,000",
    marketValue: "€18M",
    contract: "2029",
    stats: { appearances: 5, goals: 3, assists: 2, cleanSheets: 0, rating: 7.74 }
  }
]
