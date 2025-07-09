import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Filter, Edit, Eye, Star, Plus, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fcPortoPlayers } from '../data/mockData';
import PlayerModal from './PlayerModal';

const Players = () => {
  const [players, setPlayers] = useLocalStorage('fc-porto-players', fcPortoPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const positions = ['all', 'GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];

  // Ordenação por posição e filtros
  const positionOrder = { 'GK': 1, 'RB': 2, 'CB': 3, 'LB': 4, 'CDM': 5, 'CM': 6, 'CAM': 7, 'LW': 8, 'RW': 9, 'ST': 10 };

  const filteredAndSortedPlayers = useMemo(() => {
    return players
      .filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
        return matchesSearch && matchesPosition;
      })
      .sort((a, b) => {
        const posA = positionOrder[a.position] || 99;
        const posB = positionOrder[b.position] || 99;
        if (posA !== posB) return posA - posB;
        return a.name.localeCompare(b.name);
      });
  }, [players, searchTerm, positionFilter]);

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

  const handleAddPlayer = () => {
    setEditingPlayer(null);
    setIsModalOpen(true);
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
    setIsModalOpen(true);
  };

  const handleSavePlayer = (playerData) => {
    if (editingPlayer) {
      // Editar jogador existente
      setPlayers(prev => prev.map(p => p.id === editingPlayer.id ? playerData : p));
    } else {
      // Adicionar novo jogador
      const newId = Math.max(...players.map(p => p.id), 0) + 1;
      setPlayers(prev => [...prev, { ...playerData, id: newId }]);
    }
  };

  const handleDeletePlayer = (playerId) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  return (
    <div className="space-y-6">
      {/* Filtros e Botão Adicionar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </CardTitle>
            <Button onClick={handleAddPlayer} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Adicionar Jogador</span>
            </Button>
          </div>
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

      {/* Lista de Jogadores - Cards Menores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredAndSortedPlayers.map((player) => {
          const potentialIndicator = getPotentialIndicator(player.overall, player.potential);
          
          return (
            <Card key={player.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{player.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getPositionColor(player.position)} text-xs`}>
                        {player.position}
                      </Badge>
                      <span className="text-xs text-muted-foreground truncate">
                        {player.age}a • {player.nationality}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-lg font-bold">{player.overall}</div>
                    <div className={`text-xs ${potentialIndicator.color}`}>
                      {player.potential} {potentialIndicator.icon}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Valor:</span>
                      <div className="font-medium truncate">{player.marketValue}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contrato:</span>
                      <div className="font-medium">{player.contract}</div>
                    </div>
                  </div>
                  
                  {/* Estatísticas Resumidas */}
                  <div className="border-t pt-2">
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div className="text-center">
                        <div className="font-medium">{player.stats.appearances}</div>
                        <div className="text-muted-foreground">Jogos</div>
                      </div>
                      {player.position !== 'GK' ? (
                        <>
                          <div className="text-center">
                            <div className="font-medium">{player.stats.goals}</div>
                            <div className="text-muted-foreground">Gols</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{player.stats.assists}</div>
                            <div className="text-muted-foreground">Assists</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center">
                            <div className="font-medium">{player.stats.cleanSheets}</div>
                            <div className="text-muted-foreground">Defesas</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{player.stats.rating}</div>
                            <div className="text-muted-foreground">Nota</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-1 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPlayer(player)}
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
                            Tem certeza que deseja excluir {player.name}? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeletePlayer(player.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedPlayers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Nenhum jogador encontrado com os filtros aplicados.</p>
          </CardContent>
        </Card>
      )}

      {/* Modal de Adicionar/Editar Jogador */}
      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlayer}
        player={editingPlayer}
      />

      {/* Modal de Detalhes do Jogador */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
              <Button variant="outline" size="sm" onClick={() => setSelectedPlayer(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Posição:</span>
                  <div className="font-medium">{selectedPlayer.position}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Idade:</span>
                  <div className="font-medium">{selectedPlayer.age} anos</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Nacionalidade:</span>
                  <div className="font-medium">{selectedPlayer.nationality}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Overall:</span>
                  <div className="font-medium">{selectedPlayer.overall}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Potencial:</span>
                  <div className="font-medium">{selectedPlayer.potential}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <div className="font-medium">{selectedPlayer.marketValue}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Salário:</span>
                  <div className="font-medium">{selectedPlayer.salary}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Contrato:</span>
                  <div className="font-medium">até {selectedPlayer.contract}</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Estatísticas da Temporada</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Jogos: <span className="font-medium">{selectedPlayer.stats.appearances}</span></div>
                  <div>Nota: <span className="font-medium">{selectedPlayer.stats.rating}</span></div>
                  <div>Gols: <span className="font-medium">{selectedPlayer.stats.goals}</span></div>
                  <div>Assistências: <span className="font-medium">{selectedPlayer.stats.assists}</span></div>
                  {selectedPlayer.position === 'GK' && (
                    <div className="col-span-2">Defesas: <span className="font-medium">{selectedPlayer.stats.cleanSheets}</span></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;

