import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common/card';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/common/alert-dialog';
import { Trophy, Target, Shield, Plus, Edit, Trash2, History as HistoryIcon, Eye } from 'lucide-react';

import { useSeasons } from '@/hooks/seasons/useSeasons';
import { getHistoricalStats, getHistoricalPlayerStats, getTopStats } from '@/utils/seasons/historyStatsUtils';
import SeasonModal from '@/components/stats/SeasonModal';

const History = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);

  const {
    seasons,
    addSeason,
    updateSeason,
    deleteSeason
  } = useSeasons();

  const historicalPlayers = getHistoricalPlayerStats(seasons);

  const {
    totalTitles,
    totalMatches,
    totalWins,
    totalGoals,
    goalsAgainst
  } = getHistoricalStats(seasons);

  const {
    topScorers,
    topAssists,
    topAppearances
  } = getTopStats(historicalPlayers);

  const handleAddSeason = () => {
    setEditingSeason(null);
    setIsModalOpen(true);
  };

  const handleEditSeason = (season) => {
    setEditingSeason(season);
    setIsModalOpen(true);
  };

  const handleSaveSeason = (seasonData) => {
    editingSeason ? updateSeason(seasonData) : addSeason(seasonData);
  };

  // Card genérico para ranking de jogadores
  const RankingCard = ({ title, icon: Icon, players, labelFormatter }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{title}</span>
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver todos
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-3">
                {(players || []).map((player, index) => (
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
                    <div className="text-right font-bold">
                      {labelFormatter(player)}
                    </div>
                  </div>
                ))}
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {(players || []).slice(0, 5).map((player, index) => (
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
              <div className="text-right font-bold">
                {labelFormatter(player)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

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
            <p className="text-xs text-muted-foreground">{totalWins} vitórias ({((totalWins / totalMatches) * 100).toFixed(1)}%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Gols Marcados</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGoals}</div>
            <p className="text-xs text-muted-foreground">{(totalGoals / totalMatches).toFixed(1)} por jogo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Gols Sofridos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsAgainst}</div>
            <p className="text-xs text-muted-foreground">{(goalsAgainst / totalMatches).toFixed(1)} por jogo</p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RankingCard
          title="Mais Gols na História"
          icon={Target}
          players={topScorers}
          labelFormatter={(p) => `${p.stats.goals} gols`}
        />
        <RankingCard
          title="Mais Assistências na História"
          icon={Target}
          players={topAssists}
          labelFormatter={(p) => `${p.stats.assists} assists`}
        />
        <RankingCard
          title="Mais Partidas na História"
          icon={Target}
          players={topAppearances}
          labelFormatter={(p) => `${p.stats.appearances} jogos`}
        />
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
                        <Button variant="outline" size="sm" onClick={() => handleEditSeason(season)}>
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
                              <AlertDialogAction onClick={() => deleteSeason(season.season)}>
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

      {/* Modal da Temporada */}
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
