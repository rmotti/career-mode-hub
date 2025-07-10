import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, Trophy, Target, Shield, Eye } from 'lucide-react';
import { seasonStats, fcPortoPlayers } from '../data/mockData';

const Statistics = () => {
  const currentSeason = seasonStats[0]; // Apenas temporada atual
  const players = fcPortoPlayers;

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
    .filter(p => p.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);

  // Calcular estatísticas gerais da temporada atual
  const avgGoalsPerGame = currentSeason ? (currentSeason.goalsFor / currentSeason.matches).toFixed(1) : 0;
  const avgGoalsAgainstPerGame = currentSeason ? (currentSeason.goalsAgainst / currentSeason.matches).toFixed(1) : 0;
  const winPercentage = currentSeason ? ((currentSeason.wins / currentSeason.matches) * 100).toFixed(1) : 0;
  const cleanSheets = players.reduce((sum, p) => sum + (p.stats.cleanSheets || 0), 0);

  return (
    <div className="space-y-6">
      {/* Resumo da Temporada Atual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% de Vitórias</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winPercentage}%</div>
            <p className="text-xs text-muted-foreground">{currentSeason.wins} vitórias em {currentSeason.matches} jogos</p>
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
            <CardTitle className="text-sm font-medium">Gols Sofridos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSeason.goalsAgainst}</div>
            <p className="text-xs text-muted-foreground">total na temporada</p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings de Performance da Temporada */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Top Artilheiros</span>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Todos os Artilheiros da Temporada</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {fcPortoPlayers
                      .filter(player => player.stats.goals > 0)
                      .sort((a, b) => b.stats.goals - a.stats.goals)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.position} • {player.function}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{player.stats.goals} gols</div>
                            <div className="text-sm text-muted-foreground">{player.stats.assists} assists</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topScorers.slice(0, 3).map((player, index) => (
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Top Assistências</span>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Todos os Assistentes da Temporada</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {fcPortoPlayers
                      .filter(player => player.stats.assists > 0)
                      .sort((a, b) => b.stats.assists - a.stats.assists)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.position} • {player.function}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{player.stats.assists} assists</div>
                            <div className="text-sm text-muted-foreground">{player.stats.goals} gols</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAssists.slice(0, 3).map((player, index) => (
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Melhores Notas</span>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Melhores Notas da Temporada</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {fcPortoPlayers
                      .filter(player => player.stats.rating > 0)
                      .sort((a, b) => b.stats.rating - a.stats.rating)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">{player.position} • {player.function}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{player.stats.rating}</div>
                            <div className="text-sm text-muted-foreground">{player.stats.goals}G {player.stats.assists}A</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestRated.slice(0, 3).map((player, index) => (
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

      {/* Resumo da Temporada Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Temporada {currentSeason.season}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentSeason.position}º</div>
              <div className="text-sm text-muted-foreground">Posição</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentSeason.wins}</div>
              <div className="text-sm text-muted-foreground">Vitórias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{currentSeason.draws}</div>
              <div className="text-sm text-muted-foreground">Empates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{currentSeason.losses}</div>
              <div className="text-sm text-muted-foreground">Derrotas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentSeason.goalsFor}</div>
              <div className="text-sm text-muted-foreground">Gols Marcados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentSeason.goalsAgainst}</div>
              <div className="text-sm text-muted-foreground">Gols Sofridos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;

