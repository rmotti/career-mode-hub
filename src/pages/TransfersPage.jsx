import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Filter, TrendingUp, TrendingDown, DollarSign, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { transferHistory } from '../data/index.js';
import TransferModal from '../components/TransferModal.jsx';

const Transfers = () => {
  const [transfers, setTransfers] = useLocalStorage('fc-porto-transfers', transferHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);

  const transferTypes = ['all', 'Entrada', 'Saída', 'Empréstimo (Entrada)', 'Empréstimo (Saída)', 'Renovação'];
  const seasons = ['all', ...Array.from(new Set(transfers.map(t => t.season))).sort().reverse()];

  // Filtrar e ordenar transferências
  const filteredTransfers = useMemo(() => {
    return transfers
      .filter(transfer => {
        const matchesSearch = transfer.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transfer.fromClub?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transfer.toClub?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
        const matchesSeason = seasonFilter === 'all' || transfer.season === seasonFilter;
        return matchesSearch && matchesType && matchesSeason;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transfers, searchTerm, typeFilter, seasonFilter]);

  // Calcular estatísticas financeiras
  const financialStats = useMemo(() => {
    const currentSeasonTransfers = transfers.filter(t => t.season === '2024/25');
    
    let totalInvested = 0;
    let totalReceived = 0;
    let totalTransfers = currentSeasonTransfers.length;

    currentSeasonTransfers.forEach(transfer => {
      if (transfer.fee && transfer.fee !== 'Livre' && transfer.fee !== 'Empréstimo') {
        const value = parseFloat(transfer.fee.replace('€', '').replace('M', ''));
        if (!isNaN(value)) {
          if (transfer.type === 'Entrada' || transfer.type === 'Empréstimo (Entrada)') {
            totalInvested += value;
          } else if (transfer.type === 'Saída' || transfer.type === 'Empréstimo (Saída)') {
            totalReceived += value;
          }
        }
      }
    });

    const netBalance = totalReceived - totalInvested;

    return {
      totalInvested,
      totalReceived,
      netBalance,
      totalTransfers
    };
  }, [transfers]);

  const getTransferTypeColor = (type) => {
    const colors = {
      'Entrada': 'bg-green-100 text-green-800',
      'Saída': 'bg-red-100 text-red-800',
      'Empréstimo (Entrada)': 'bg-blue-100 text-blue-800',
      'Empréstimo (Saída)': 'bg-orange-100 text-orange-800',
      'Renovação': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTransferIcon = (type) => {
    if (type === 'Entrada' || type === 'Empréstimo (Entrada)') {
      return <TrendingUp className="h-4 w-4" />;
    } else if (type === 'Saída' || type === 'Empréstimo (Saída)') {
      return <TrendingDown className="h-4 w-4" />;
    }
    return <Calendar className="h-4 w-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleAddTransfer = () => {
    setEditingTransfer(null);
    setIsModalOpen(true);
  };

  const handleEditTransfer = (transfer) => {
    setEditingTransfer(transfer);
    setIsModalOpen(true);
  };

  const handleSaveTransfer = (transferData) => {
    if (editingTransfer) {
      // Editar transferência existente
      setTransfers(prev => prev.map(t => t.id === editingTransfer.id ? transferData : t));
    } else {
      // Adicionar nova transferência
      setTransfers(prev => [transferData, ...prev]);
    }
  };

  const handleDeleteTransfer = (transferId) => {
    setTransfers(prev => prev.filter(t => t.id !== transferId));
  };

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{financialStats.totalInvested}M</div>
            <p className="text-xs text-muted-foreground">em contratações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{financialStats.totalReceived}M</div>
            <p className="text-xs text-muted-foreground">em vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${financialStats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {financialStats.netBalance >= 0 ? '+' : ''}€{financialStats.netBalance}M
            </div>
            <p className="text-xs text-muted-foreground">balanço final</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferências</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialStats.totalTransfers}</div>
            <p className="text-xs text-muted-foreground">total de movimentações</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Botão Adicionar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </CardTitle>
            <Button onClick={handleAddTransfer} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Registrar Transferência</span>
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {transferTypes.slice(1).map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Temporada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as temporadas</SelectItem>
                  {seasons.slice(1).map(season => (
                    <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Transferências */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transferências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransfers.map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTransferIcon(transfer.type)}
                    <Badge className={getTransferTypeColor(transfer.type)}>
                      {transfer.type}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="font-medium">{transfer.playerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {transfer.fromClub && transfer.toClub ? 
                        `${transfer.fromClub} → ${transfer.toClub}` :
                        transfer.fromClub || transfer.toClub || 'FC Porto'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{transfer.fee || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(transfer.date)} • {transfer.season}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTransfer(transfer)}
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
                            Tem certeza que deseja excluir a transferência de {transfer.playerName}? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTransfer(transfer.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}

            {filteredTransfers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma transferência encontrada com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Adicionar/Editar Transferência */}
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransfer}
        transfer={editingTransfer}
      />
    </div>
  );
};

export default Transfers;

