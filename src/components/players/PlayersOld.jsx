import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/common/card';
import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/common/select';
import { Search, Filter, Edit, Eye, Star } from 'lucide-react';
import { squadPlayers } from '../../data/mockData';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const positions = ['all', 'GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];

  const filteredPlayers = squadPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const getPositionColor = (position) => {
    const colors = {
      'GK': 'bg-yellow-100 text-yellow-800',
      'CB': 'bg-blue-100 text-blue-800',
      'LB': 'bg-blue-100 text-blue-800',
      'RB': 'bg-blue-100 text-blue-800',
      'CDM': 'bg-green-100 text-green-800',
      'CM': 'bg-green-100 text-green-800',
      'CAM': 'bg-green-100 text-green-800',
      'LW': 'bg-purple-100 text-purple-800',
      'RW': 'bg-purple-100 text-purple-800',
      'ST': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  const getPotentialIndicator = ( potential) => {
    if (potential >= 90) return { color: 'text-green-600', icon: '⭐⭐⭐⭐⭐' };
    if (potential >= 85) return { color: 'text-yellow-600', icon: '⭐⭐⭐⭐' };
    if (potential >= 80) return { color: 'text-blue-600', icon: '⭐⭐⭐' };
    if (potential >= 75) return { color: 'text-blue-600', icon: '⭐⭐' };
    if (potential >= 70) return { color: 'text-blue-600', icon: '⭐' };
    return { color: 'text-gray-600', icon: '' };
  };


  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar jogador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as posições</SelectItem>
                  {positions.slice(1).map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Jogadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => {
          const potentialIndicator = getPotentialIndicator(player.overall, player.potential);
          
          return (
            <Card key={player.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{player.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getPositionColor(player.position)}>
                        {player.position}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {player.age} anos • {player.nationality}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{player.overall}</div>
                    <div className={`text-sm ${potentialIndicator.color}`}>
                      {player.potential} {potentialIndicator.icon}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium">{player.marketValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salário:</span>
                    <span className="font-medium">{player.salary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Contrato:</span>
                    <span className="font-medium">até {player.contract}</span>
                  </div>
                  
                  {/* Estatísticas da Temporada */}
                  <div className="border-t pt-3">
                    <div className="text-sm font-medium mb-2">Temporada 2024/25</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Jogos:</span>
                        <span className="ml-1 font-medium">{player.stats.appearances}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nota:</span>
                        <span className="ml-1 font-medium">{player.stats.rating}</span>
                      </div>
                      {player.position !== 'GK' ? (
                        <>
                          <div>
                            <span className="text-muted-foreground">Gols:</span>
                            <span className="ml-1 font-medium">{player.stats.goals}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assists:</span>
                            <span className="ml-1 font-medium">{player.stats.assists}</span>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Clean Sheets:</span>
                          <span className="ml-1 font-medium">{player.stats.cleanSheets}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPlayers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Nenhum jogador encontrado com os filtros aplicados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Players;

