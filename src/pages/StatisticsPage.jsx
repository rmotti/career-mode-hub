import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { TrendingUp, Trophy, Target, Shield, Eye } from 'lucide-react';

import { squadPlayers } from '@/data';
import { useSeasonStatistics } from '@/hooks/useSeasonStatistics';
import { calculatePositionStats } from '@/utils/statisticsUtils';

const Statistics = () => {
  const {
    currentSeason,
    winPercentage,
    avgGoalsPerGame,
    avgGoalsAgainstPerGame,
    topScorers,
    topAssists,
    mostGames,
    bestRated,
    bestAverageRating,
    topPurchases,
    topSales
  } = useSeasonStatistics();

  const positionData = calculatePositionStats(squadPlayers);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% de Vitórias</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {currentSeason.wins} vitórias em {currentSeason.matches} jogos
            </p>
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
            <div className="text-2xl font-bold">{avgGoalsAgainstPerGame}</div>
            <p className="text-xs text-muted-foreground">por jogo esta temporada</p>
          </CardContent>
        </Card>
      </div>

    {/* MAIORES ARTILHEIROS */}
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
                    {squadPlayers
                      .filter(player => player.stats.goals > 0)
                      .sort((a, b) => b.stats.goals - a.stats.goals)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? 'default' : 'secondary'}>{index + 1}</Badge>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {player.position} • {player.function}
                              </div>
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
              {topScorers.slice(0, 5).map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>{index + 1}</Badge>
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
        {/* MAIORES ASSISTENTES */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Top Assistentes</span>
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
                    {squadPlayers
                      .filter(player => player.stats.assists > 0)
                      .sort((a, b) => b.stats.assists - a.stats.assists)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge variant={index === 0 ? 'default' : 'secondary'}>{index + 1}</Badge>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {player.position} • {player.function}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{player.stats.assists} assistências</div>
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
              {topAssists.slice(0, 5).map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>{index + 1}</Badge>
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
        
      </div>
    </div>
  );
};

export default Statistics;
