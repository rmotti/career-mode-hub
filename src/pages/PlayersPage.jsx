import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common/card';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/common/dialog';
import { Users, Star, Calendar, DollarSign } from 'lucide-react';

import { usePlayerFilter } from '@/hooks/players/usePlayerFilter';
import { getPotentialIndicator } from '@/utils/players/playerUtils';
import { getSectorName } from '@/data';

// 🔹 Nova versão do getSectorColor para duas cores (card e círculo)
function getSectorColor(position) {
  switch (position) {
    case 'GK':
      return { cardBg: 'bg-yellow-50', circleBg: 'bg-yellow-200 text-yellow-900' };
    case 'CB':
    case 'LB':
    case 'RB':
      return { cardBg: 'bg-blue-50', circleBg: 'bg-blue-200 text-blue-900' };
    case 'CDM':
    case 'CM':
    case 'CAM':
    case 'LM':
    case 'RM':
      return { cardBg: 'bg-green-50', circleBg: 'bg-green-200 text-green-900' };
    default: // atacantes
      return { cardBg: 'bg-red-50', circleBg: 'bg-red-200 text-red-900' };
  }
}

const Players = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { filterPosition, setFilterPosition, filteredAndSortedPlayers, sectors } = usePlayerFilter();

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Elenco Completo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {sectors.map(sector => (
              <Button
                key={sector}
                variant={filterPosition === sector ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPosition(sector)}
              >
                {sector === 'all' ? 'Todos' : sector}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Jogadores */}
      <div className="space-y-3">
        {filteredAndSortedPlayers.map((player) => {
          const potentialIndicator = getPotentialIndicator(player.potential);
          const { cardBg, circleBg } = getSectorColor(player.position);

          return (
            <Card
              key={player.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${cardBg}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${circleBg}`}>
                      {player.overall}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">{player.name}</h3>
                        <Badge variant="secondary">{player.position}</Badge>
                        <Badge variant="outline">{getSectorName(player.position)}</Badge>
                        <Badge variant="outline">{player.function}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>{player.age} anos</span></span>
                        <span className="flex items-center space-x-1"><Star className="h-4 w-4" /><span>{potentialIndicator}</span></span>
                        <span className="flex items-center space-x-1"><DollarSign className="h-4 w-4" /><span>{player.marketValue}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center"><div className="font-bold">{player.stats.appearances}</div><div className="text-muted-foreground">Jogos</div></div>
                    <div className="text-center"><div className="font-bold">{player.stats.goals}</div><div className="text-muted-foreground">Gols</div></div>
                    <div className="text-center"><div className="font-bold">{player.stats.assists}</div><div className="text-muted-foreground">Assists</div></div>
                    {['GK', 'CB', 'RB', 'LB'].includes(player.position) && (
                      <div className="text-center"><div className="font-bold">{player.stats.cleanSheets}</div><div className="text-muted-foreground">Clean Sheets</div></div>
                    )}
                    <div className="text-center"><div className="font-bold">{player.stats.rating}</div><div className="text-muted-foreground">Nota</div></div>
                  </div>

                  <Button variant="outline" size="sm" onClick={() => setSelectedPlayer(player)}>
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal de Detalhes */}
      {selectedPlayer && (
        <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getSectorColor(selectedPlayer.position).circleBg}`}>
                    {selectedPlayer.overall}
                  </div>
                  <div>
                    <div className="text-xl font-bold">{selectedPlayer.name}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{selectedPlayer.position}</Badge>
                      <Badge variant="outline">{getSectorName(selectedPlayer.position)}</Badge>
                      <Badge variant="outline">{selectedPlayer.function}</Badge>
                    </div>
                  </div>
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><div className="text-sm text-muted-foreground">Idade</div><div className="font-medium">{selectedPlayer.age} anos</div></div>
                <div><div className="text-sm text-muted-foreground">Potencial</div><div className="font-medium">{selectedPlayer.potential} {getPotentialIndicator(selectedPlayer.potential)}</div></div>
                <div><div className="text-sm text-muted-foreground">Valor de Mercado</div><div className="font-medium">{selectedPlayer.marketValue}</div></div>
                <div><div className="text-sm text-muted-foreground">Salário</div><div className="font-medium">{selectedPlayer.salary}/semana</div></div>
                <div><div className="text-sm text-muted-foreground">Contrato até</div><div className="font-medium">{selectedPlayer.contract}</div></div>
                <div><div className="text-sm text-muted-foreground">Função</div><div className="font-medium">{selectedPlayer.function}</div></div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Estatísticas da Temporada 2025/26</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>Jogos: <span className="font-bold">{selectedPlayer.stats.appearances}</span></div>
                  <div>Gols: <span className="font-bold">{selectedPlayer.stats.goals}</span></div>
                  <div>Assistências: <span className="font-bold">{selectedPlayer.stats.assists}</span></div>
                  {['GK', 'CB', 'RB', 'LB'].includes(selectedPlayer.position) && (
                    <div>Clean Sheets: <span className="font-bold">{selectedPlayer.stats.cleanSheets}</span></div>
                  )}
                  <div>Nota Média: <span className="font-bold">{selectedPlayer.stats.rating}</span></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Players;
