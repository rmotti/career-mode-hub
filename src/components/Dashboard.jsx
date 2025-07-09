import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';
import { fcPortoPlayers, seasonStats, clubInfo } from '../data/mockData';

const Dashboard = () => {
  const currentSeason = seasonStats[0];
  const topScorers = fcPortoPlayers
    .filter(player => player.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 3);

  const youngTalents = fcPortoPlayers
    .filter(player => player.age <= 23 && player.potential >= 85)
    .sort((a, b) => b.potential - a.potential);

  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Elenco Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fcPortoPlayers.length}</div>
            <p className="text-xs text-muted-foreground">jogadores registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição Liga</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSeason.position}º</div>
            <p className="text-xs text-muted-foreground">{currentSeason.points} pontos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor do Elenco</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€248M</div>
            <p className="text-xs text-muted-foreground">valor total estimado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Idade</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(fcPortoPlayers.reduce((sum, p) => sum + p.age, 0) / fcPortoPlayers.length)}
            </div>
            <p className="text-xs text-muted-foreground">anos</p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo da Temporada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Temporada 2024/25</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Artilheiros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Artilheiros da Temporada</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topScorers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.position}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{player.stats.goals} gols</div>
                    <div className="text-sm text-muted-foreground">{player.stats.assists} assists</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jovens Talentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Jovens Talentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {youngTalents.map((player) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {player.age} anos • {player.position}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {player.overall} → {player.potential}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{player.marketValue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

