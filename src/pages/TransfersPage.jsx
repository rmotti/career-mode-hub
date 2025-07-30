import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/common/card';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/common/select';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/common/alert-dialog';

import * as lucideReact from 'lucide-react';

import TransferModal from '@/components/transfers/TransferModal';
import { useTransfers } from '@/hooks/finances/useTransfers';
import { getTransferTypeColor, getTransferIcon, formatDate } from '@/utils/finances/transferUtils';

const Transfers = () => {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    seasonFilter,
    setSeasonFilter,
    financialStats,
    filteredTransfers,
    isModalOpen,
    setIsModalOpen,
    editingTransfer,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
    transfers
  } = useTransfers();


  const transferTypes = ['all', 'Entrada', 'Saída', 'Empréstimo (Entrada)', 'Empréstimo (Saída)', 'Renovação'];
  const seasons = ['all', ...Array.from(new Set(transfers.map(t => t.season))).sort().reverse()];

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <lucideReact.TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{financialStats.totalReceived}M</div>
            <p className="text-xs text-muted-foreground">em vendas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <lucideReact.TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{financialStats.totalInvested}M</div>
            <p className="text-xs text-muted-foreground">em contratações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <lucideReact.DollarSign className="h-4 w-4 text-muted-foreground" />
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
            <lucideReact.Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialStats.totalTransfers}</div>
            <p className="text-xs text-muted-foreground">total de movimentações</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e botão adicionar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <lucideReact.Filter className="h-5 w-5" />
              <span>Filtros</span>
            </CardTitle>
            <Button onClick={handleAdd} className="flex items-center space-x-2">
              <lucideReact.Plus className="h-4 w-4" />
              <span>Registrar Transferência</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <lucideReact.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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

      {/* Lista de transferências */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transferências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransfers.map((transfer) => {
              const Icon = getTransferIcon(transfer.type);

              return (
                <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <Badge className={getTransferTypeColor(transfer.type)}>
                        {transfer.type}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-medium">{transfer.playerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {transfer.fromClub && transfer.toClub
                          ? `${transfer.fromClub} → ${transfer.toClub}`
                          : transfer.fromClub || transfer.toClub || 'FC Porto'}
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
                      <Button variant="outline" size="sm" onClick={() => handleEdit(transfer)}>
                        <lucideReact.Edit className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <lucideReact.Trash2 className="h-3 w-3" />
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
                            <AlertDialogAction onClick={() => handleDelete(transfer.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredTransfers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma transferência encontrada com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        transfer={editingTransfer}
      />
    </div>
  );
};

export default Transfers;
