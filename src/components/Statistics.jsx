import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Trophy, Target, Shield, Plus, Edit, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seasonStats, fcPortoPlayers } from '../data/mockData';
import SeasonModal from './SeasonModal';

const Statistics = () => {
  const [seasons, setSeasons] = useLocalStorage('fc-porto-seasons', seasonStats);
  const [players] = useLocalStorage('fc-porto-players', fcPortoPlayers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);

  // Dados para gráfico de evolução por temporada
  const seasonEvolution = seasons.map(season => ({
    season: season.season,
    points: season.points,
    goals: season.goalsFor,
    position: season.position
  })).reverse();

  // Estatísticas por posição
  const positionStats = players.reduce((acc, player) => {
    const pos = player.position;
    if (!acc[pos]) {
      acc[pos] = { position: pos, count: 0, avgOverall: 0, avgAge: 0, totalValue: 0 };
    }
    acc[pos].count++;
    acc[pos].avgOverall += player.overall;
    acc[pos].avgAge += player.age;
    
    // Converter valor de mercado para número (simplificado)
    const value = parseFloat(player.marketValue.replace('€', '').replace('M', ''));
    acc[pos].totalValue += value;
    
    return acc;
  }, {});

  const positionData = Object.values(positionStats).map(stat => ({
    ...stat,
    avgOverall: Math.round(stat.avgOverall / stat.count),
    avgAge: Math.round(stat.avgAge / stat.count),
    totalValue: Math.round(stat.totalValue)
  }));

  // Top performers por estatística
  const topScorers = players
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 5);

  const topAssists = players
    .filter(p => p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists)
    .slice(0, 5);

  const bestRated = players
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);

  // Calcular estatísticas gerais
  const currentSeason = seasons[0];
  const totalTitles = seasons.filter(s => s.position === 1).length;
  const avgGoalsPerGame = currentSeason ? (currentSeason.goalsFor / currentSeason.matches).toFixed(1) : 0;
  const avgGoalsAgainstPerGame = currentSeason ? (currentSeason.goalsAgainst / currentSeason.matches).toFixed(1) : 0;
  const pointsImprovement = seasons.length > 1 ? seasons[0].points - seasons[1].points : 0;

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
      // Editar temporada existente
      setSeasons(prev => prev.map(s => s.season === editingSeason.season ? seasonData : s));
    } else {
      // Adicionar nova temporada
      setSeasons(prev => [seasonData, ...prev]);
    }
  };

  const handleDeleteSeason = (seasonToDelete) => {
    setSeasons(prev => prev.filter(s => s.season !== seasonToDelete));
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
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
            <CardTitle className="text-sm font-medium">Média de Gols</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGoalsPerGame}</div>
            <p className="text-xs text-muted-foreground">por jogo esta temporada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defesa Sólida</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGoalsAgainstPerGame}</div>
            <p className="text-xs text-muted-foreground">gols sofridos por jogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evolução</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${pointsImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {pointsImprovement >= 0 ? '+' : ''}{pointsImprovement}
            </div>
            <p className="text-xs text-muted-foreground">pontos vs temporada passada</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Evolução */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução por Temporada</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={seasonEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#003366" 
                  strokeWidth={2}
                  name="Pontos"
                />
                <Line 
                  type="monotone" 
                  dataKey="goals" 
                  stroke="#FFD700" 
                  strokeWidth={2}
                  name="Gols Marcados"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Posição</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#003366" name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rankings de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Top Artilheiros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topScorers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.position}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.stats.goals}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Top Assistências</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAssists.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.position}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.stats.assists}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Melhores Notas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestRated.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.position}</div>
                    </div>
                  </div>
                  <div className="font-bold">{player.stats.rating}</div>
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
            <CardTitle>Histórico de Temporadas</CardTitle>
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

export default Statistics;

