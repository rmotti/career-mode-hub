/**
 * DADOS DO ELENCO - TEMPORADA 2024/25
 * 
 * Este arquivo contém todos os dados dos jogadores do elenco da temporada 2024/25.
 * Para editar os dados dos jogadores desta temporada, modifique as informações abaixo.
 * 
 * Estrutura de cada jogador:
 * - id: Identificador único do jogador
 * - name: Nome completo do jogador
 * - position: Posição no campo (GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST)
 * - function: Importância no elenco (Crucial, Importante, Rodizio, Promessa, Esporadico)
 * - age: Idade na temporada 2024/25
 * - nationality: Nacionalidade
 * - overall: Nota atual (0-99)
 * - potential: Potencial máximo (0-99)
 * - salary: Salário semanal (formato: "€X,XXX")
 * - marketValue: Valor de mercado (formato: "€XM" ou "€X.XM")
 * - contract: Ano de término do contrato
 * - stats: Estatísticas da temporada 2024/25
 */

export const squadPlayers2024_25 = [
  // ==================== GOLEIROS ====================
  {
    id: 1,
    name: "Simeon Rapsch",
    position: "GK",
    function: "Promessa",
    age: 17,
    nationality: "Alemanha",
    overall: 57,
    potential: 76,
    salary: "€4,300",
    marketValue: "€0.35M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 2,
    name: "Lukás Hrádecky",
    position: "GK",
    function: "Importante",
    age: 35,
    nationality: "Finlândia",
    overall: 83,
    potential: 83,
    salary: "€65,000",
    marketValue: "€4M",
    contract: "2026",
    stats: { appearances: 35, goals: 0, assists: 0, cleanSheets: 21, rating: 7.5 }
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
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
    {
    id: 4,
    name: "Matej Kovar",
    position: "GK",
    function: "Esporádico",
    age: 25,
    nationality: "República Tcheca",
    overall: 76,
    potential: 81,
    salary: "€27,500",
    marketValue: "€9M",
    contract: "2027",
    stats: { appearances: 14, goals: 0, assists: 0, cleanSheets: 8, rating: 7.2 }
  },

  // ==================== ZAGUEIROS ====================
  {
    id: 5,
    name: "Ben Hawighorst",
    position: "CB",
    function: "Promessa",
    age: 17,
    nationality: "Alemanha",
    overall: 57,
    potential: 81,
    salary: "€16,000",
    marketValue: "€0.5M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 6,
    name: "Andrea Natali",
    position: "CB",
    function: "Promessa",
    age: 17,
    nationality: "Itália",
    overall: 58,
    potential: 83,
    salary: "€16,000",
    marketValue: "€0.6M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
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
    salary: "€140,000",
    marketValue: "€66.5M",
    contract: "2025",
    stats: { appearances: 48, goals: 4, assists: 0, cleanSheets: 22, rating: 7.97 }
  },
  {
    id: 8,
    name: "Mario Hermoso",
    position: "CB",
    function: "Rodízio",
    age: 29,
    nationality: "Espanha",
    overall: 80,
    potential: 80,
    salary: "€77,000",
    marketValue: "€19.5M",
    contract: "2025",
    stats: { appearances: 11, goals: 1, assists: 0, cleanSheets: 6, rating: 6.66 }
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
    marketValue: "€33.5M",
    contract: "2028",
    stats: { appearances: 42, goals: 0, assists: 1, cleanSheets: 20, rating: 6.71 }
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
    marketValue: "€47.0M",
    contract: "2029",
    stats: { appearances: 42, goals: 3, assists: 2, cleanSheets: 20, rating: 7.44 }
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
    marketValue: "€3.5M",
    contract: "2029",
    stats: { appearances: 6, goals: 0, assists: 0, cleanSheets: 0, rating: 6.41 }
  },
  
  // ==================== LATERAIS ====================
  {
    id: 12,
    name: "Othniel Raterink",
    position: "RB",
    function: "Promessa",
    age: 19,
    nationality: "Holanda",
    overall: 59,
    potential: 75,
    salary: "€20,000",
    marketValue: "€0.5M",
    contract: "2027",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 13,
    name: "Nordi Mukiele",
    position: "RB",
    function: "Rodízio",
    age: 27,
    nationality: "França",
    overall: 79,
    potential: 80,
    salary: "€70,000",
    marketValue: "€18.5M",
    contract: "2025",
    stats: { appearances: 24, goals: 2, assists: 1, cleanSheets: 10, rating: 6.9 }
  },
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
    marketValue: "€4M",
    contract: "2028",
    stats: { appearances: 26, goals: 0, assists: 1, cleanSheets: 5, rating: 6.34 }
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
    marketValue: "€53M",
    contract: "2027",
    stats: { appearances: 47, goals: 4, assists: 11, cleanSheets: 21, rating: 7.68 }
  },
    {
    id: 16,
    name: "Jeremie Frimpong",
    position: "RB",
    function: "Importante",
    age: 24,
    nationality: "Holanda",
    overall: 84,
    potential: 86,
    salary: "€94,000",
    marketValue: "€54.5M",
    contract: "2028",
    stats: { appearances: 47, goals: 5, assists: 9, cleanSheets: 19, rating: 7.88 }
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
    marketValue: "€45.0M",
    contract: "2028",
    stats: { appearances: 48, goals: 2, assists: 7, cleanSheets: 22, rating: 7.23 }
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
    marketValue: "€30.7M",
    contract: "2028",
    stats: { appearances: 32, goals: 2, assists: 2, cleanSheets: 10, rating: 6.8 }
  },
  {
    id: 19,
    name: "Aleix Garcia",
    position: "CM",
    function: "Importante",
    age: 27,
    nationality: "Espanha",
    overall: 83,
    potential: 84,
    salary: "€98,000",
    marketValue: "€41.5M",
    contract: "2029",
    stats: { appearances: 43, goals: 5, assists: 4, cleanSheets: 15, rating: 6.9 }
  },
  {
    id: 20,
    name: "Exequiel Palacios",
    position: "CM",
    function: "Importante",
    age: 26,
    nationality: "Argentina",
    overall: 84,
    potential: 87,
    salary: "€105,000",
    marketValue: "€54.5M",
    contract: "2028",
    stats: { appearances: 37, goals: 1, assists: 6, cleanSheets: 16, rating: 6.99 }
  },
  {
    id: 21,
    name: "Francis Onyeka",
    position: "CAM",
    function: "Promessa",
    age: 18,
    nationality: "Alemanha",
    overall: 60,
    potential: 83,
    salary: "€18,000",
    marketValue: "€0.7M",
    contract: "2027",
    stats: { appearances: 4, goals: 0, assists: 0, cleanSheets: 0, rating: 6 }
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
    marketValue: "€14M",
    contract: "2027",
    stats: { appearances: 15, goals: 2, assists: 2, cleanSheets: 2, rating: 6.1 }
  },
  {
    id: 23,
    name: "Florian Wirtz",
    position: "CAM",
    function: "Crucial",
    age: 22,
    nationality: "Alemanha",
    overall: 89,
    potential: 92,
    salary: "€125,000",
    marketValue: "€145M",
    contract: "2027",
    stats: { appearances: 44, goals: 16, assists: 14, cleanSheets: 12, rating: 8.15 }
  },

  // ==================== EXTREMOS ====================
  {
    id: 24,
    name: "Kerim Alajbegovic",
    position: "LW",
    function: "Promessa",
    age: 17,
    nationality: "Bosnia e Herzegovina",
    overall: 58,
    potential: 78,
    salary: "€17,500",
    marketValue: "€0.5M",
    contract: "2028",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 25,
    name: "Emiliano Buendía",
    position: "RW",
    function: "Esporádico",
    age: 28,
    nationality: "Argentina",
    overall: 77,
    potential: 80,
    salary: "€62,000",
    marketValue: "€10.5M",
    contract: "2025",
    stats: { appearances: 14, goals: 2, assists: 0, cleanSheets: 2, rating: 6.5 }
  },
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
    marketValue: "€18.5M",
    contract: "2028",
    stats: { appearances: 39, goals: 4, assists: 5, cleanSheets: 8, rating: 6.7 }
  },
  // ==================== ATACANTES ====================
  {
    id: 27,
    name: "Alejo Sarco",
    position: "ST",
    function: "Promessa",
    age: 19,
    nationality: "Argentina",
    overall: 64,
    potential: 81,
    salary: "€26,500",
    marketValue: "€1.5M",
    contract: "2029",
    stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }
  },
  {
    id: 28,
    name: "Artem Stepanov",
    position: "ST",
    function: "Promessa",
    age: 17,
    nationality: "Ucrania",
    overall: 62,
    potential: 82,
    salary: "€21,000",
    marketValue: "€1.1M",
    contract: "2027",
    stats: { appearances: 1, goals: 0, assists: 0, cleanSheets: 0, rating: 6.44 }
  },
  {
    id: 29,
    name: "Patrick Schick",
    position: "ST",
    function: "Importante",
    age: 29,
    nationality: "República Tcheca",
    overall: 84,
    potential: 84,
    salary: "€120,000",
    marketValue: "€42M",
    contract: "2027",
    stats: { appearances: 43, goals: 27, assists: 0, cleanSheets: 17, rating: 7.44 }
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
    stats: { appearances: 20, goals: 2, assists: 2, cleanSheets: 4, rating: 6.44 }
  },
{
    id: 31,
    name: "Victor Boniface",
    position: "ST",
    function: "Importante",
    age: 24,
    nationality: "Nigeria",
    overall: 82,
    potential: 87,
    salary: "€86,000",
    marketValue: "€46.5M",
    contract: "2028",
    stats: { appearances: 27, goals:11, assists: 0, cleanSheets: 4, rating: 6.94 }
  },
  {
    id: 32,
    name: "Amine Adli",
    position: "ST",
    function: "Esporádico",
    age: 25,
    nationality: "Marrocos",
    overall: 78,
    potential: 82,
    salary: "€65,000",
    marketValue: "€20M",
    contract: "2028",
    stats: { appearances: 27, goals: 2, assists: 1, cleanSheets: 6, rating: 6.18 }
  }
];

