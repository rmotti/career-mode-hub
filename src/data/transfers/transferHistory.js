/**
 * HISTÓRICO DE TRANSFERÊNCIAS POR TEMPORADA
 *
 * Cada chave do objeto representa uma temporada no formato "YYYY/YY"
 * e contém um array de transferências dessa temporada.
 */

export const transferHistory = {
"2024/25": [
  // Saídas
  { id: 1, playerName: "Adam Hlozek", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Hoffenheim", fee: "€18M", date: "2024-07-01", season: "2024/25" },
  { id: 3, playerName: "Sardar Azmoun", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Shabab Ah-Ahli", fee: "€5M", date: "2024-07-01", season: "2024/25" },
  { id: 4, playerName: "Patrick Pentz", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Brondby FC", fee: "€2.5M", date: "2024-07-01", season: "2024/25" },
  { id: 5, playerName: "Iker Bravo", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Udinese", fee: "€0.6M", date: "2024-07-01", season: "2024/25" },

  // Saídas por empréstimo
  { id: 2, playerName: "Odilon Kossounou", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Atalanta", fee: "€5M", date: "2024-07-01", season: "2024/25" },
  { id: 6, playerName: "Gustavo Puerta", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Hull City", fee: "Gratuito", date: "2024-07-01", season: "2024/25" },
  { id: 7, playerName: "Noah Mbamba", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "FCV Dender", fee: "Gratuito", date: "2024-07-01", season: "2024/25" },

  // Entradas
  { id: 8, playerName: "Martin Terrier", type: "Entrada", fromClub: "Stade Rennais", toClub: "Bayer Leverkusen", fee: "€20M", date: "2024-07-01", season: "2024/25" },
  { id: 9, playerName: "Aleix García", type: "Entrada", fromClub: "Girona", toClub: "Bayer Leverkusen", fee: "€18M", date: "2024-07-01", season: "2024/25" },
  { id: 10, playerName: "Jeanuel Belocian", type: "Entrada", fromClub: "Stade Rennais", toClub: "Bayer Leverkusen", fee: "€15M", date: "2024-07-01", season: "2024/25" },
  { id: 11, playerName: "Alejo Sarco", type: "Entrada", fromClub: "Vélez Sarsfield", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2024-07-01", season: "2024/25" },

  // Entradas por empréstimo
  { id: 12, playerName: "Emiliano Buendía", type: "Empréstimo (Entrada)", fromClub: "Aston Villa", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2024-07-01", season: "2024/25" },
  { id: 13, playerName: "Mario Hermoso", type: "Empréstimo (Entrada)", fromClub: "Roma", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2024-07-01", season: "2024/25" },
  { id: 14, playerName: "Nordi Mukiele", type: "Empréstimo (Entrada)", fromClub: "PSG", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2024-07-01", season: "2024/25" }
],


"2025/26": [
  // Retornos de empréstimo
  { id: 15, playerName: "Odilon Kossounou", type: "Retorno de Empréstimo", fromClub: "Atalanta", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 16, playerName: "Gustavo Puerta", type: "Retorno de Empréstimo", fromClub: "Hull City", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 17, playerName: "Noah Mbamba", type: "Retorno de Empréstimo", fromClub: "FCV Dender", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },

  // Renovações
  { id: 18, playerName: "Jonathan Tah", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "1.2M", date: "2025-07-01", season: "2025/26" },
  { id: 19, playerName: "Florian Wirtz", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 40, playerName: "Jeremie Frimpong", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 41, playerName: "Odilon Kossounou", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },

  // Entradas
  { id: 20, playerName: "Kenan Yildiz", type: "Entrada", fromClub: "Juventus", toClub: "Bayer Leverkusen", fee: "€35M", date: "2025-07-01", season: "2025/26" },
  { id: 25, playerName: "Jonathan David", type: "Entrada", fromClub: "Losc Lille", toClub: "Bayer Leverkusen", fee: "€40M", date: "2025-07-01", season: "2025/26" },
  { id: 28, playerName: "Andriy Lunin", type: "Entrada", fromClub: "Real Madrid", toClub: "Bayer Leverkusen", fee: "€40M", date: "2025-07-01", season: "2025/26" },
  { id: 34, playerName: "Juan Nardoni", type: "Entrada", fromClub: "Racing Club", toClub: "Bayer Leverkusen", fee: "€17M", date: "2025-07-01", season: "2025/26" },
  { id: 39, playerName: "Andrey Santos", type: "Entrada", fromClub: "Chelsea", toClub: "Bayer Leverkusen", fee: "€50M", date: "2025-07-01", season: "2025/26" },
  { id: 43, playerName: "Kevin", type: "Entrada", fromClub: "Shaktar Donetsk", toClub: "Bayer Leverkusen", fee: "€21M", date: "2026-01-31", season: "2025/26" },

  // Entradas por empréstimo
  { id: 26, playerName: "Gabriel Jesus", type: "Empréstimo (Entrada)", fromClub: "Arsenal", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 27, playerName: "Lucas Beraldo", type: "Empréstimo (Entrada)", fromClub: "PSG", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },

  // Saídas
  { id: 21, playerName: "Victor Boniface", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Tottenham", fee: "€60M", date: "2025-07-01", season: "2025/26" },
  { id: 22, playerName: "Patrick Schick", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Juventus", fee: "€58M", date: "2025-07-01", season: "2025/26" },
  { id: 23, playerName: "Aleix García", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "FC Bayern", fee: "€52M", date: "2025-07-01", season: "2025/26" },
  { id: 24, playerName: "Amine Adli", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Losc Lille", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 38, playerName: "Exequiel Palacios", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Manchester United", fee: "€75M", date: "2025-07-01", season: "2025/26" },
  { id: 44, playerName: "Kovar", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "West Ham", fee: "€8M", date: "2026-06-30", season: "2025/26" },

  // Saídas por empréstimo
  { id: 29, playerName: "Simeon Rapsch", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Stevenage", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 30, playerName: "Matej Kovar", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "West Ham United", fee: "€9M", date: "2025-07-01", season: "2025/26" },
  { id: 31, playerName: "Ben Hawighorst", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "FC Petrolul", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 32, playerName: "Andrea Natali", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "FC Annecy", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 33, playerName: "Kerim Alajbegovic", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Pau FC", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 35, playerName: "Francis Onyeka", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Eintracht Braunschweig", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 36, playerName: "Alejo Sarco", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "VfL Bochum", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 37, playerName: "Artem Stepanov", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "OH Leuven", fee: "Gratuito", date: "2025-07-01", season: "2025/26" },
  { id: 42, playerName: "Jeanuel Belocian", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Braga", fee: "Gratuito", date: "2025-01-31", season: "2025/26" }
],

"2026/27": [
  { id: 45, playerName: "Alejo Sarco", type: "Retorno de Empréstimo", fromClub: "Vfl Bochum", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 46, playerName: "Ben Hawighorst", type: "Retorno de Empréstimo", fromClub: "FC Petrolul", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 47, playerName: "Andrea Natali", type: "Retorno de Empréstimo", fromClub: "FC Annecy", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 48, playerName: "Kerim Alajbegovic", type: "Retorno de Empréstimo", fromClub: "Pau FC", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 49, playerName: "Artem Stepanov", type: "Retorno de Empréstimo", fromClub: "OH Leuven", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-01-31", season: "2026/27" },
  { id: 50, playerName: "Francis Onyeka", type: "Retorno de Empréstimo", fromClub: "Eintracht Braunschweig", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 51, playerName: "Jeanuel Belocian", type: "Retorno de Empréstimo", fromClub: "Braga", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },

  // Renovações
  { id: 67, playerName: "Andrey Santos", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 68, playerName: "Kenan Yildiz", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 69, playerName: "Jonathan David", type: "Renovação", fromClub: "Bayer Leverkusen", toClub: "Bayer Leverkusen", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  
  // Entradas
  { id: 52, playerName: "Dennis Seimen", type: "Entrada", fromClub: "Ipswich Town", toClub: "Bayer Leverkusen", fee: "€12M", date: "2026-07-01", season: "2026/27" },
  { id: 53, playerName: "Jarell Quansah", type: "Entrada", fromClub: "Liverpool", toClub: "Bayer Leverkusen", fee: "€22M", date: "2026-07-01", season: "2026/27" },
  { id: 54, playerName: "Maxim De Cuyper", type: "Entrada", fromClub: "Club Brugge", toClub: "Bayer Leverkusen", fee: "€32M", date: "2026-07-01", season: "2026/27" },
  { id: 55, playerName: "Yaimar Medina", type: "Entrada", fromClub: "Genk", toClub: "Bayer Leverkusen", fee: "€12M", date: "2026-07-01", season: "2026/27" },
  { id: 56, playerName: "Franco Mastantuono", type: "Entrada", fromClub: "River Plate", toClub: "Bayer Leverkusen", fee: "€48M", date: "2026-07-01", season: "2026/27" },
  { id: 57, playerName: "Ardon Jashari", type: "Entrada", fromClub: "Club Brugge", toClub: "Bayer Leverkusen", fee: "€40M", date: "2026-07-01", season: "2026/27" },
  { id: 70, playerName: "Mikkel Damsgaard", type: "Entrada", fromClub: "Brentford", toClub: "Bayer Leverkusen", fee: "€20M", date: "2027-01-01", season: "2026/27" },

  // Saídas
  { id: 59, playerName: "Gabriel Jesus", type: "Fim de Empréstimo", fromClub: "Bayer Leverkusen", toClub: "Arsenal", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 60, playerName: "Lucas Beraldo", type: "Fim de Empréstimo", fromClub: "Bayer Leverkusen", toClub: "Paris Saint-Germain", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 61, playerName: "Jonathan Tah", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Chelsea", fee: "€67.5M", date: "2026-07-01", season: "2026/27" },
  { id: 62, playerName: "Alejandro Grimaldo", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Juventus", fee: "€56M", date: "2026-07-01", season: "2026/27" },
  { id: 63, playerName: "Jeremie Frimpong", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Manchester United", fee: "€117M", date: "2026-07-01", season: "2026/27" },
  { id: 64, playerName: "Juan Nardoni", type: "Empréstimo (Saída)", fromClub: "Bayer Leverkusen", toClub: "Nottingham Forest", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 65, playerName: "Noah Mbamba", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Club Brugge", fee: "Gratuito", date: "2026-07-01", season: "2026/27" },
  { id: 71, playerName: "Edmond Tapsoba", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "AS Roma", fee: "37M", date: "2027-01-01", season: "2026/27" },
  { id: 72, playerName: "Nathan Tella", type: "Saída", fromClub: "Bayer Leverkusen", toClub: "Brentford", fee: "Gratuito", date: "2027-01-01", season: "2026/27" }
]

};
