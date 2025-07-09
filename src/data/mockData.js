// Dados mock do FC Porto para demonstração
export const fcPortoPlayers = [
  {
    id: 1,
    name: "Diogo Costa",
    position: "GK",
    age: 24,
    nationality: "Portugal",
    overall: 84,
    potential: 89,
    salary: "€45,000",
    marketValue: "€35M",
    contract: "2027",
    stats: {
      appearances: 28,
      goals: 0,
      assists: 2,
      cleanSheets: 15,
      rating: 7.8
    }
  },
  {
    id: 2,
    name: "Pepê",
    position: "RW",
    age: 27,
    nationality: "Brasil",
    overall: 82,
    potential: 84,
    salary: "€38,000",
    marketValue: "€28M",
    contract: "2026",
    stats: {
      appearances: 32,
      goals: 8,
      assists: 12,
      cleanSheets: 0,
      rating: 7.6
    }
  },
  {
    id: 3,
    name: "Galeno",
    position: "LW",
    age: 26,
    nationality: "Brasil",
    overall: 80,
    potential: 83,
    salary: "€35,000",
    marketValue: "€25M",
    contract: "2027",
    stats: {
      appearances: 30,
      goals: 11,
      assists: 7,
      cleanSheets: 0,
      rating: 7.4
    }
  },
  {
    id: 4,
    name: "Alan Varela",
    position: "CDM",
    age: 23,
    nationality: "Argentina",
    overall: 77,
    potential: 85,
    salary: "€25,000",
    marketValue: "€18M",
    contract: "2029",
    stats: {
      appearances: 25,
      goals: 2,
      assists: 4,
      cleanSheets: 0,
      rating: 7.2
    }
  },
  {
    id: 5,
    name: "João Mário",
    position: "RB",
    age: 31,
    nationality: "Portugal",
    overall: 77,
    potential: 77,
    salary: "€30,000",
    marketValue: "€8M",
    contract: "2025",
    stats: {
      appearances: 29,
      goals: 1,
      assists: 5,
      cleanSheets: 0,
      rating: 7.1
    }
  },
  {
    id: 6,
    name: "Samu",
    position: "ST",
    age: 20,
    nationality: "Espanha",
    overall: 78,
    potential: 87,
    salary: "€15,000",
    marketValue: "€22M",
    contract: "2029",
    stats: {
      appearances: 26,
      goals: 14,
      assists: 3,
      cleanSheets: 0,
      rating: 7.5
    }
  },
  {
    id: 7,
    name: "Nico González",
    position: "CAM",
    age: 22,
    nationality: "Espanha",
    overall: 78,
    potential: 86,
    salary: "€20,000",
    marketValue: "€20M",
    contract: "2028",
    stats: {
      appearances: 24,
      goals: 6,
      assists: 8,
      cleanSheets: 0,
      rating: 7.3
    }
  },
  {
    id: 8,
    name: "Stephen Eustáquio",
    position: "CM",
    age: 27,
    nationality: "Canadá",
    overall: 77,
    potential: 79,
    salary: "€28,000",
    marketValue: "€15M",
    contract: "2026",
    stats: {
      appearances: 22,
      goals: 3,
      assists: 6,
      cleanSheets: 0,
      rating: 7.0
    }
  },
  {
    id: 9,
    name: "Otávio",
    position: "CM",
    age: 29,
    nationality: "Brasil",
    overall: 79,
    potential: 79,
    salary: "€32,000",
    marketValue: "€12M",
    contract: "2025",
    stats: {
      appearances: 27,
      goals: 4,
      assists: 9,
      cleanSheets: 0,
      rating: 7.2
    }
  },
  {
    id: 10,
    name: "Pepe",
    position: "CB",
    age: 41,
    nationality: "Portugal",
    overall: 78,
    potential: 78,
    salary: "€25,000",
    marketValue: "€2M",
    contract: "2025",
    stats: {
      appearances: 20,
      goals: 2,
      assists: 1,
      cleanSheets: 0,
      rating: 7.4
    }
  }
];

export const transferHistory = [
  {
    id: 1,
    player: "Alan Varela",
    type: "Entrada",
    from: "Boca Juniors",
    to: "FC Porto",
    value: "€7M",
    date: "2024-07-15",
    season: "2024/25"
  },
  {
    id: 2,
    player: "Samu",
    type: "Entrada",
    from: "Real Madrid",
    to: "FC Porto",
    value: "€15M",
    date: "2024-07-20",
    season: "2024/25"
  },
  {
    id: 3,
    player: "Nico González",
    type: "Entrada",
    from: "Barcelona B",
    to: "FC Porto",
    value: "€8M",
    date: "2024-08-01",
    season: "2024/25"
  },
  {
    id: 4,
    player: "Mehdi Taremi",
    type: "Saída",
    from: "FC Porto",
    to: "Inter Milan",
    value: "€0M",
    date: "2024-06-30",
    season: "2024/25"
  },
  {
    id: 5,
    player: "Evanilson",
    type: "Saída",
    from: "FC Porto",
    to: "Bournemouth",
    value: "€47M",
    date: "2024-08-15",
    season: "2024/25"
  }
];

export const seasonStats = [
  {
    season: "2024/25",
    matches: 32,
    wins: 22,
    draws: 6,
    losses: 4,
    goalsFor: 68,
    goalsAgainst: 28,
    points: 72,
    position: 2
  },
  {
    season: "2023/24",
    matches: 34,
    wins: 27,
    draws: 5,
    losses: 2,
    goalsFor: 91,
    goalsAgainst: 23,
    points: 86,
    position: 1
  },
  {
    season: "2022/23",
    matches: 34,
    wins: 25,
    draws: 6,
    losses: 3,
    goalsFor: 78,
    goalsAgainst: 31,
    points: 81,
    position: 1
  }
];

export const clubInfo = {
  name: "FC Porto",
  founded: 1893,
  stadium: "Estádio do Dragão",
  capacity: 50033,
  manager: "Sérgio Conceição",
  league: "Liga Portugal",
  budget: "€45M",
  wage: "€2.1M/week"
};

