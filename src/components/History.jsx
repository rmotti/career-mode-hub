import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Trophy, Target, Shield, Plus, Edit, Trash2, History as HistoryIcon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seasonStats, getHistoricalPlayerStats, biggestSales, biggestPurchases } from '../data/index.js';
import SeasonModal from './SeasonModal';

const History = () => {
  const [seasons, setSeasons] = useLocalStorage('fc-porto-seasons', seasonStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);

  // Obter estatísticas históricas combinadas
  const historicalPlayers = getHistoricalPlayerStats();

  // Dados para gráfico de evolução por temporada
  const seasonEvolution = seasons.map(season => ({
    season: season.season,
    points: season.points,
    goals: season.goalsFor,
    position: season.position
  })).reverse();

  // Estatísticas históricas
  const totalTitles = seasons.filter(s => s.position === 1).length;
  const totalMatches = seasons.reduce((sum, s) => sum + s.matches, 0);
  const totalWins = seasons.reduce((sum, s) => sum + s.wins, 0);
  const totalGoals = seasons.reduce((sum, s) => sum + s.goalsFor, 0);
  const avgPosition = (seasons.reduce((sum, s) => sum + s.position, 0) / seasons.length).toFixed(1);

  // Maiores artilheiros da história (baseado em estatísticas combinadas)
  const historicalTopScorers = historicalPlayers
    .filter(player => player.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 5)
    .map(player => ({
      name: player.name,
      goals: player.stats.goals,
      seasons: "2024/25 -",
      position: player.position
    }));

  // Maiores assistentes da história (baseado em estatísticas combinadas)
  const historicalTopAssists = historicalPlayers
    .filter(player => player.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists)
    .slice(0, 5)
    .map(player => ({
      name: player.name,
      assists: player.stats.assists,
      seasons: "2024/25 -",
      position: player.position
    }));

  // Maior número de jogos (substitui maior valor de mercado)
  const mostGamesPlayed = historicalPlayers
    .filter(player => player.stats.appearances > 0)
    .sort((a, b) => b.stats.appearances - a.stats.appearances)
    .slice(0, 5)
    .map(player => ({
      name: player.name,
      games: player.stats.appearances,
      seasons: "2024/25 -",
      position: player.position
    }));

  // Melhores notas da história (apenas temporada 24/25 em diante)
  const historicalBestRated = [
    { name: "Samu", rating: 8.1, seasons: "2024/25", position: "ST" },
    { name: "Diogo Costa", rating: 7.8, seasons: "2024/25", position: "GK" },
    { name: "Alan Varela", rating: 7.23, seasons: "2024/25", position: "CDM" },
    { name: "Francisco Moura", rating: 7.11, seasons: "2024/25", position: "LB" },
    { name: "Pepê", rating: 7.1, seasons: "2024/25", position: "RW" }
  ].sort((a, b) => b.rating - a.rating);

  const handleAddSeason = () => {
    setEditingSeason(null);
    setIsModalOpen(true);
  };

  const handleEditSeason = (season) => {
    setEditingSeason(season);
    setIsModalOpen(true);
  };

  const handleSaveSeason = (seasonData) => {
    if (editingSeason) {
      setSeasons(prev => prev.map(s => s.season === editingSeason.season ? seasonData : s));
    } else {
      setSeasons(prev => [seasonData, ...prev]);
    }
  };

  const handleDeleteSeason = (seasonToDelete) => {
    setSeasons(prev => prev.filter(s => s.season !== seasonToDelete));
  };

  return (
    <div className="space-y-6">
      {/* Resumo Histórico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Títulos Conquistados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTitles}</div>
            <p className="text-xs text-muted-foreground">últimas {seasons.length} temporadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Jogos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
            <p className="text-xs text-muted-foreground">{totalWins} vitórias ({((totalWins/totalMatches)*100).toFixed(1)}%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Gols</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGoals}</div>
            <p className="text-xs text-muted-foreground">{(totalGoals/totalMatches).toFixed(1)} por jogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gols Sofridos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seasons.reduce((sum, s) => sum + s.goalsAgainst, 0)}</div>
            <p className="text-xs text-muted-foreground">{(seasons.reduce((sum, s) => sum + s.goalsAgainst, 0)/totalMatches).toFixed(1)} por jogo</p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings Históricos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Maiores Artilheiros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historicalTopScorers.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.seasons}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.goals}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Maiores Assistentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historicalTopAssists.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.seasons}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.assists}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Novos Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Maior Número de Jogos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mostGamesPlayed.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.position} • {player.seasons}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.games} jogos</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Maiores Compras da História do Clube</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Nico González", value: "€21.20M", season: "23/24", from: "Barcelona" },
                { name: "David Carmo", value: "€20.28M", season: "22/23", from: "Braga" },
                { name: "Samu Aghehowa", value: "€20.00M", season: "24/25", from: "Atlético Madrid" },
                { name: "Óliver Torres", value: "€20.00M", season: "17/18", from: "Atlético Madrid" },
                { name: "Giannelli Imbula", value: "€20.00M", season: "15/16", from: "Marseille" }
              ].map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.from}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Maiores Vendas da História do Clube</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Otávio", value: "€60M", season: "23/24", to: "Al-Nassr" },
                { name: "Nico González", value: "€60M", season: "24/25", to: "Man City" },
                { name: "Luis Díaz", value: "€54M", season: "21/22", to: "Liverpool" },
                { name: "Éder Militão", value: "€50M", season: "19/20", to: "Real Madrid" },
                { name: "Galeno", value: "€50M", season: "24/25", to: "Al-Ahli" }
              ].sort((a, b) => {
                const valueA = parseFloat(a.value.replace('€', '').replace('M', '')) || 0;
                const valueB = parseFloat(b.value.replace('€', '').replace('M', '')) || 0;
                return valueB - valueA;
              }).map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.to}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Temporadas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <HistoryIcon className="h-5 w-5" />
              <span>Histórico de Temporadas</span>
            </CardTitle>
            <Button onClick={handleAddSeason} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Temporada</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Temporada</th>
                  <th className="text-center py-2">Posição</th>
                  <th className="text-center py-2">Jogos</th>
                  <th className="text-center py-2">V-E-D</th>
                  <th className="text-center py-2">Gols</th>
                  <th className="text-center py-2">Pontos</th>
                  <th className="text-center py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((season) => (
                  <tr key={season.season} className="border-b">
                    <td className="py-2 font-medium">{season.season}</td>
                    <td className="text-center py-2">
                      <Badge variant={season.position === 1 ? "default" : "secondary"}>
                        {season.position}º
                      </Badge>
                    </td>
                    <td className="text-center py-2">{season.matches}</td>
                    <td className="text-center py-2 text-sm">
                      <span className="text-green-600">{season.wins}</span>-
                      <span className="text-yellow-600">{season.draws}</span>-
                      <span className="text-red-600">{season.losses}</span>
                    </td>
                    <td className="text-center py-2">{season.goalsFor}:{season.goalsAgainst}</td>
                    <td className="text-center py-2 font-bold">{season.points}</td>
                    <td className="text-center py-2">
                      <div className="flex justify-center space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditSeason(season)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a temporada {season.season}? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteSeason(season.season)}>
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Temporada */}
      <SeasonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSeason}
        season={editingSeason}
      />
    </div>
  );
};

export default History;

