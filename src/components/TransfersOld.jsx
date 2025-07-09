import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, TrendingUp, TrendingDown, Plus, Search, Filter, DollarSign } from 'lucide-react';
import { transferHistory } from '../data/mockData';

const Transfers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');

  const filteredTransfers = transferHistory.filter(transfer => {
    const matchesSearch = transfer.player.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
    const matchesSeason = seasonFilter === 'all' || transfer.season === seasonFilter;
    return matchesSearch && matchesType && matchesSeason;
  });

  // Calcular estatísticas de transferências
  const totalSpent = transferHistory
    .filter(t => t.type === 'Entrada')
    .reduce((sum, t) => sum + parseFloat(t.value.replace('€', '').replace('M', '')), 0);

  const totalReceived = transferHistory
    .filter(t => t.type === 'Saída')
    .reduce((sum, t) => sum + parseFloat(t.value.replace('€', '').replace('M', '')), 0);

  const netSpend = totalSpent - totalReceived;

  const seasons = [...new Set(transferHistory.map(t => t.season))];

  const getTransferIcon = (type) => {
    return type === 'Entrada' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTransferBadge = (type) => {
    return type === 'Entrada' ? (
      <Badge className="bg-green-100 text-green-800">Entrada</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Saída</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{totalSpent}M</div>
            <p className="text-xs text-muted-foreground">em contratações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{totalReceived}M</div>
            <p className="text-xs text-muted-foreground">em vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netSpend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {netSpend > 0 ? '-' : '+'}€{Math.abs(netSpend)}M
            </div>
            <p className="text-xs text-muted-foreground">balanço final</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferências</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transferHistory.length}</div>
            <p className="text-xs text-muted-foreground">total de movimentações</p>
          </CardContent>
        </Card>
      </div>

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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Entrada">Entradas</SelectItem>
                  <SelectItem value="Saída">Saídas</SelectItem>
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
                  {seasons.map(season => (
                    <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão para Nova Transferência */}
      <div className="flex justify-end">
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Registrar Transferência</span>
        </Button>
      </div>

      {/* Lista de Transferências */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transferências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransfers.map((transfer) => (
              <div key={transfer.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTransferIcon(transfer.type)}
                    <div>
                      <div className="font-semibold text-lg">{transfer.player}</div>
                      <div className="text-sm text-muted-foreground">
                        {transfer.type === 'Entrada' ? (
                          <span>{transfer.from} → <strong>FC Porto</strong></span>
                        ) : (
                          <span><strong>FC Porto</strong> → {transfer.to}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      {getTransferBadge(transfer.type)}
                      <div className="text-lg font-bold">{transfer.value}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transfer.date).toLocaleDateString('pt-BR')} • {transfer.season}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransfers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma transferência encontrada com os filtros aplicados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Análise por Temporada */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Temporada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Temporada</th>
                  <th className="text-center py-2">Entradas</th>
                  <th className="text-center py-2">Saídas</th>
                  <th className="text-center py-2">Investido</th>
                  <th className="text-center py-2">Recebido</th>
                  <th className="text-center py-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((season) => {
                  const seasonTransfers = transferHistory.filter(t => t.season === season);
                  const entries = seasonTransfers.filter(t => t.type === 'Entrada');
                  const exits = seasonTransfers.filter(t => t.type === 'Saída');
                  const spent = entries.reduce((sum, t) => sum + parseFloat(t.value.replace('€', '').replace('M', '')), 0);
                  const received = exits.reduce((sum, t) => sum + parseFloat(t.value.replace('€', '').replace('M', '')), 0);
                  const balance = received - spent;

                  return (
                    <tr key={season} className="border-b">
                      <td className="py-2 font-medium">{season}</td>
                      <td className="text-center py-2">{entries.length}</td>
                      <td className="text-center py-2">{exits.length}</td>
                      <td className="text-center py-2 text-red-600">€{spent}M</td>
                      <td className="text-center py-2 text-green-600">€{received}M</td>
                      <td className={`text-center py-2 font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {balance >= 0 ? '+' : ''}€{balance}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transfers;

