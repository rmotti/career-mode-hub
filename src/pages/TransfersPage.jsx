import * as card from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as select from '@/components/ui/select';
import * as alertDialog from '@/components/ui/alert-dialog';
import * as lucideReact from 'lucide-react';

import TransferModal from "@/components/TransferModal";
import { useTransfers } from '@/hooks/useTransfers';
import { getTransferTypeColor, getTransferIcon, formatDate } from '@/utils/transferUtils';

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
        <card.Card>
          <card.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card.CardTitle className="text-sm font-medium">Total Investido</card.CardTitle>
            <lucideReact.TrendingDown className="h-4 w-4 text-muted-foreground" />
          </card.CardHeader>
          <card.CardContent>
            <div className="text-2xl font-bold text-red-600">€{financialStats.totalInvested}M</div>
            <p className="text-xs text-muted-foreground">em contratações</p>
          </card.CardContent>
        </card.Card>

        <card.Card>
          <card.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card.CardTitle className="text-sm font-medium">Total Recebido</card.CardTitle>
            <lucideReact.TrendingUp className="h-4 w-4 text-muted-foreground" />
          </card.CardHeader>
          <card.CardContent>
            <div className="text-2xl font-bold text-green-600">€{financialStats.totalReceived}M</div>
            <p className="text-xs text-muted-foreground">em vendas</p>
          </card.CardContent>
        </card.Card>

        <card.Card>
          <card.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card.CardTitle className="text-sm font-medium">Saldo Líquido</card.CardTitle>
            <lucideReact.DollarSign className="h-4 w-4 text-muted-foreground" />
          </card.CardHeader>
          <card.CardContent>
            <div className={`text-2xl font-bold ${financialStats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {financialStats.netBalance >= 0 ? '+' : ''}€{financialStats.netBalance}M
            </div>
            <p className="text-xs text-muted-foreground">balanço final</p>
          </card.CardContent>
        </card.Card>

        <card.Card>
          <card.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card.CardTitle className="text-sm font-medium">Transferências</card.CardTitle>
            <lucideReact.Calendar className="h-4 w-4 text-muted-foreground" />
          </card.CardHeader>
          <card.CardContent>
            <div className="text-2xl font-bold">{financialStats.totalTransfers}</div>
            <p className="text-xs text-muted-foreground">total de movimentações</p>
          </card.CardContent>
        </card.Card>
      </div>

      {/* Filtros e botão adicionar */}
      <card.Card>
        <card.CardHeader>
          <div className="flex items-center justify-between">
            <card.CardTitle className="flex items-center space-x-2">
              <lucideReact.Filter className="h-5 w-5" />
              <span>Filtros</span>
            </card.CardTitle>
            <Button onClick={handleAdd} className="flex items-center space-x-2">
              <lucideReact.Plus className="h-4 w-4" />
              <span>Registrar Transferência</span>
            </Button>
          </div>
        </card.CardHeader>
        <card.CardContent>
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
              <select.Select value={typeFilter} onValueChange={setTypeFilter}>
                <select.SelectTrigger>
                  <select.SelectValue placeholder="Tipo" />
                </select.SelectTrigger>
                <select.SelectContent>
                  <select.SelectItem value="all">Todos os tipos</select.SelectItem>
                  {transferTypes.slice(1).map(type => (
                    <select.SelectItem key={type} value={type}>{type}</select.SelectItem>
                  ))}
                </select.SelectContent>
              </select.Select>
            </div>
            <div className="w-full md:w-48">
              <select.Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <select.SelectTrigger>
                  <select.SelectValue placeholder="Temporada" />
                </select.SelectTrigger>
                <select.SelectContent>
                  <select.SelectItem value="all">Todas as temporadas</select.SelectItem>
                  {seasons.slice(1).map(season => (
                    <select.SelectItem key={season} value={season}>{season}</select.SelectItem>
                  ))}
                </select.SelectContent>
              </select.Select>
            </div>
          </div>
        </card.CardContent>
      </card.Card>

      {/* Lista de transferências */}
      <card.Card>
        <card.CardHeader>
          <card.CardTitle>Histórico de Transferências</card.CardTitle>
        </card.CardHeader>
        <card.CardContent>
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
                    <alertDialog.AlertDialog>
                      <alertDialog.AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <lucideReact.Trash2 className="h-3 w-3" />
                        </Button>
                      </alertDialog.AlertDialogTrigger>
                      <alertDialog.AlertDialogContent>
                        <alertDialog.AlertDialogHeader>
                          <alertDialog.AlertDialogTitle>Confirmar Exclusão</alertDialog.AlertDialogTitle>
                          <alertDialog.AlertDialogDescription>
                            Tem certeza que deseja excluir a transferência de {transfer.playerName}? Esta ação não pode ser desfeita.
                          </alertDialog.AlertDialogDescription>
                        </alertDialog.AlertDialogHeader>
                        <alertDialog.AlertDialogFooter>
                          <alertDialog.AlertDialogCancel>Cancelar</alertDialog.AlertDialogCancel>
                          <alertDialog.AlertDialogAction onClick={() => handleDelete(transfer.id)}>
                            Excluir
                          </alertDialog.AlertDialogAction>
                        </alertDialog.AlertDialogFooter>
                      </alertDialog.AlertDialogContent>
                    </alertDialog.AlertDialog>
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
        </card.CardContent>
      </card.Card>

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
