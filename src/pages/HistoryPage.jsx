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
  Eye, Target, Trophy, Shield, History as HistoryIcon, 
  Plus, Edit, Trash2, TrendingUp, TrendingDown 
} from 'lucide-react';

import { useSeasonsData } from '@/hooks/seasons/useSeasonsData';
import SeasonModal from '@/components/stats/SeasonModal';

const History = () => {
  const {
    seasons,
    isModalOpen,
    setIsModalOpen,
    editingSeason,
    handleAddSeason,
    handleEditSeason,
    handleSaveSeason,
    deleteSeason,
    totalTitles,
    totalMatches,
    totalWins,
    totalGoals,
    goalsAgainst,
    topContributors,
    topScorers,
    topAssists,
    topAppearances,
    topBuys,
    topSales,
    formatCurrency
  } = useSeasonsData();

  const formatTransferFee = (value, originalFee) => {
    return value && value > 0 ? formatCurrency(value) : (originalFee || 'Gratuito');
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Títulos Conquistados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTitles}</div>
            <p className="text-xs text-muted-foreground">últimas {seasons.length} temporadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Total de Jogos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
            <p className="text-xs text-muted-foreground">
              {totalWins} vitórias ({totalMatches ? ((totalWins / totalMatches) * 100).toFixed(1) : 0}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Gols Marcados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGoals}</div>
            <p className="text-xs text-muted-foreground">
              {totalMatches ? (totalGoals / totalMatches).toFixed(1) : 0} por jogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Gols Sofridos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsAgainst}</div>
            <p className="text-xs text-muted-foreground">
              {totalMatches ? (goalsAgainst / totalMatches).toFixed(1) : 0} por jogo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings do Save */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Maiores Contribuidores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Maiores Contribuidores</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topContributors.slice(0, 5).map((p, index) => (
              <div
                key={`contributors-${p.id || p.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {p.position} {p.function && `• ${p.function}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{p.contributions} contribuições</div>
                  <div className="text-sm text-muted-foreground">
                    {p.stats.goals} gols • {p.stats.assists} assists
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Artilheiros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>Maiores Artilheiros do Save</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topScorers.slice(0, 5).map((p, index) => (
              <div
                key={`scorers-${p.id || p.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.position}</div>
                  </div>
                </div>
                <div className="text-right font-bold">{p.stats.goals} gols</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assistentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Maiores Assistentes do Save</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topAssists.slice(0, 5).map((p, index) => (
              <div
                key={`assists-${p.id || p.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.position}</div>
                  </div>
                </div>
                <div className="text-right font-bold">{p.stats.assists} assists</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Jogadores Mais Usados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>Jogadores Mais Usados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topAppearances.slice(0, 5).map((p, index) => (
              <div
                key={`appearances-${p.id || p.name}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.position}</div>
                  </div>
                </div>
                <div className="text-right font-bold">{p.stats.appearances} jogos</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Maiores Compras e Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Maiores Compras da Hisória</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topBuys.slice(0, 5).map((t, index) => (
              <div
                key={`buy-${t.player || index}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{t.player}</div>
                    <div className="text-sm text-muted-foreground">{t.type}</div>
                  </div>
                </div>
                <div className="text-right font-bold">{formatTransferFee(t.value, t.fee)}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              <span>Maiores Vendas da História</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSales.slice(0, 5).map((t, index) => (
              <div
                key={`sale-${t.player || index}-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{t.player}</div>
                    <div className="text-sm text-muted-foreground">{t.type}</div>
                  </div>
                </div>
                <div className="text-right font-bold">{formatTransferFee(t.value, t.fee)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Temporadas */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <HistoryIcon className="h-5 w-5" />
              <span>Histórico de Temporadas - Liga Nacional</span>
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
                      <Badge variant={season.position === 1 ? 'default' : 'secondary'}>
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
                        <Button variant="outline" size="sm" onClick={() => handleEditSeason(season)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmar Exclusão</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm">
                              Tem certeza que deseja excluir a temporada {season.season}? Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex justify-end space-x-2 mt-4">
                              <DialogTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                              </DialogTrigger>
                              <Button
                                variant="destructive"
                                onClick={() => deleteSeason(season.season)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
