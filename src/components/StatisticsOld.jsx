import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Trophy, Target, Shield } from 'lucide-react';
import { seasonStats, squadPlayers } from '../data/mockData';

const Statistics = () => {
  // Dados para gráfico de evolução por temporada
  const seasonEvolution = seasonStats.map(season => ({
    season: season.season,
    points: season.points,
    goals: season.goalsFor,
    position: season.position
  })).reverse();

  // Estatísticas por posição
  const positionStats = squadPlayers.reduce((acc, player) => {
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
  const topScorers = squadPlayers
    .filter(p => p.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 5);

  const topAssists = squadPlayers
    .filter(p => p.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists)
    .slice(0, 5);

  const bestRated = squadPlayers
    .sort((a, b) => b.stats.rating - a.stats.rating)
    .slice(0, 5);

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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">últimas 3 temporadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Gols</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <p className="text-xs text-muted-foreground">por jogo esta temporada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defesa Sólida</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.9</div>
            <p className="text-xs text-muted-foreground">gols sofridos por jogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evolução</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+5</div>
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

      {/* Análise por Posição */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada por Posição</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Posição</th>
                  <th className="text-center py-2">Jogadores</th>
                  <th className="text-center py-2">Overall Médio</th>
                  <th className="text-center py-2">Idade Média</th>
                  <th className="text-center py-2">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {positionData.map((stat) => (
                  <tr key={stat.position} className="border-b">
                    <td className="py-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {stat.position}
                      </Badge>
                    </td>
                    <td className="text-center py-2">{stat.count}</td>
                    <td className="text-center py-2">{stat.avgOverall}</td>
                    <td className="text-center py-2">{stat.avgAge} anos</td>
                    <td className="text-center py-2">€{stat.totalValue}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;

