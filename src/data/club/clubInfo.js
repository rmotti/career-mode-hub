/**
 * INFORMAÇÕES DO CLUBE 
 * 
 * Este arquivo contém as informações básicas e configurações do clube.
 * Para editar informações do clube, modifique os dados abaixo.
 */

/**
 * INFORMAÇÕES BÁSICAS DO CLUBE
 */
export const clubInfo = {
  name: "Bayer Leverkusen",
  founded: 1904,
  stadium: "BayArena",
  capacity: 30210,
  manager: "Xabi Alonso",
  league: "Bundesliga",
  budget: "€60M",
  wage: "€2.1M/week",
  season: "2025/26"
};

/**
 * CONFIGURAÇÕES DE CORES POR SETOR
 * Usado para diferenciação visual dos jogadores por função
 */
export const sectorColors = {
  goleiro: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300"
  },
  defesa: {
    bg: "bg-blue-100", 
    text: "text-blue-800",
    border: "border-blue-300"
  },
  meio: {
    bg: "bg-green-100",
    text: "text-green-800", 
    border: "border-green-300"
  },
  ataque: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300"
  }
};

/**
 * MAPEAMENTO DE POSIÇÕES PARA SETORES
 * Define qual setor cada posição pertence
 */
export const positionToSector = {
  'GK': 'goleiro',
  'CB': 'defesa',
  'LB': 'defesa', 
  'RB': 'defesa',
  'CDM': 'meio',
  'CM': 'meio',
  'CAM': 'meio',
  'LW': 'ataque',
  'RW': 'ataque',
  'ST': 'ataque'
};

/**
 * NOMES DOS SETORES EM PORTUGUÊS
 */
export const sectorNames = {
  'goleiro': 'Goleiro',
  'defesa': 'Defesa', 
  'meio': 'Meio-campo',
  'ataque': 'Ataque'
};

