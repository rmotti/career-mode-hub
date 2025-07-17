import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common/card';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/common/dialog';
import {
  Users,
  Trophy,
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Eye
} from 'lucide-react';

import { usePlayersData } from '../hooks/players/usePlayersData';
import { useFinancialData } from '../hooks/finances/useFinancialData';

const Dashboard = () => {
  const {
    currentSeason,
    youngTalents,
    squadSize,
    squadPlayers,
    allContribuitors
  } = usePlayersData();

  const {
    topMarketValues,
    allMarketValues,
    totalSquadValue
  } = useFinancialData();

  return (
    <div className="space-y-6">

      {/* ESTATÍSTICAS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Elenco Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{squadSize}</div>
            <p className="text-xs text-muted-foreground">jogadores registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Idade</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(squadPlayers.reduce((sum, p) => sum + p.age, 0) / squadPlayers.length)}
            </div>
            <p className="text-xs text-muted-foreground">anos</p>
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
            <div className="text-2xl font-bold">{totalSquadValue}</div>
            <p className="text-xs text-muted-foreground">valor total estimado</p>
          </CardContent>
        </Card>
      </div>

      {/* MAIORES CONTRIBUIDORES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Maiores Contribuidores</span>
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
                    <DialogTitle>Todos os Maiores Contribuidores</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {allContribuitors.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">{player.position} • {player.function}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{player.stats.goals + player.stats.assists} contribuições</div>
                          <div className="text-sm text-muted-foreground">{player.stats.goals} gols • {player.stats.assists} assists</div>
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
              {allContribuitors.slice(0, 5).map((player, index) => (
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
                    <div className="font-bold">{player.stats.goals + player.stats.assists} contribuições</div>
                    <div className="text-sm text-muted-foreground">{player.stats.goals} gols • {player.stats.assists} assists</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DESTAQUES DO ELENCO */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Destaques</span>
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
                    <DialogTitle>Todos os Destaques</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {allMarketValues.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.age} anos • {player.position} • {player.function}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {player.overall}
                          </Badge>
                          <div className="text-sm text-muted-foreground">{player.marketValue}</div>
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
              {topMarketValues.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.age} anos • {player.position}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {player.overall}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{player.marketValue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* JOVENS TALENTOS */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Jovens Talentos</span>
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
                    <DialogTitle>Todos os Jovens Talentos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {youngTalents.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.age} anos • {player.position} • {player.function}
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
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {youngTalents.slice(0, 4).map((player) => (
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
