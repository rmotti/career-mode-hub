import React, { useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/common/select';

import { DollarSign, TrendingUp, TrendingDown, Calculator, Eye } from 'lucide-react';

import { useFinancialData } from '@/hooks/finances/useFinancialData';
import { formatCurrency, getSalaryLabel } from '@/utils/finances/financialUtils';

const COLORS = [
  '#003366',
  '#FFD700',
  '#0066CC',
  '#FF6B35',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8'
];

// Helper: formata número em milhões com 1 casa (pt-BR)
const formatMillions = (v, digits = 1) =>
  Number(v ?? 0).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });

const FinancesPage = () => {
  const {
    salaryView,
    setSalaryView,
    selectedSeason,
    setSelectedSeason,
    totalSalaryWeekly,
    salaryByFunction,
    topSalaries,
    allSalaries,
    weeklyWagesBySeasonData,
    transfersBySeasonData,
    financialStatsTransfers,
    getFinancialStatsBySeason
  } = useFinancialData();

  // Temporadas dinâmicas (une salários e transferências) e ordena desc
  const seasons = useMemo(() => {
    const fromWages = (weeklyWagesBySeasonData || []).map(d => d.season);
    const fromTransfers = (transfersBySeasonData || []).map(d => d.season);
    const unique = Array.from(new Set([...fromWages, ...fromTransfers]));
    return unique.sort((a, b) => {
      const aStart = parseInt(String(a).split('/')[0], 10);
      const bStart = parseInt(String(b).split('/')[0], 10);
      return bStart - aStart;
    });
  }, [weeklyWagesBySeasonData, transfersBySeasonData]);

  // Garante seleção da temporada mais recente
  useEffect(() => {
    if (!selectedSeason || (seasons.length && !seasons.includes(selectedSeason))) {
      setSelectedSeason(seasons[0]);
    }
  }, [seasons, selectedSeason, setSelectedSeason]);

  /* ------------------ Dados para gráficos ------------------ */
  // 1) Evolução da Folha Salarial (em milhões)
  const wagesSeasons = (weeklyWagesBySeasonData || []).map(d => String(d.season));
  const weeklyWagesMillions = (weeklyWagesBySeasonData || []).map(
    d => (Number(d.weeklyExpense) || 0) / 1_000_000
  );

  // 2) Receitas vs Despesas (já em milhões)
  const transferStats = getFinancialStatsBySeason();
  const transferSeasons = transferStats.map(d => String(d.season));
  const totalInvested = transferStats.map(d => Number(d.totalInvested) || 0);
  const totalReceived = transferStats.map(d => Number(d.totalReceived) || 0);

  // 3) Pizza por função
  const pieLabels = (salaryByFunction || []).map(d => d.function);
  const pieValues = (salaryByFunction || []).map(d => Number(d.total) || 0);

  // Saldo líquido formatado
  const net = Number(financialStatsTransfers?.netBalance ?? 0);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Resumo Financeiro</h2>
        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season} value={season}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards do Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas (Vendas)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{formatMillions(financialStatsTransfers?.totalReceived, 1)}M
            </div>
            <p className="text-xs text-muted-foreground">temporada {selectedSeason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos (Compras)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              €{formatMillions(financialStatsTransfers?.totalInvested, 1)}M
            </div>
            <p className="text-xs text-muted-foreground">temporada {selectedSeason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div
              className={
                'text-2xl font-bold ' + (net >= 0 ? 'text-green-600' : 'text-red-600')
              }
            >
              {net >= 0 ? '+' : '-'}€{formatMillions(Math.abs(net), 1)}M
            </div>
            <p className="text-xs text-muted-foreground">lucro na temporada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folha Salarial</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSalaryWeekly}</div>
            <p className="text-xs text-muted-foreground">por semana ({selectedSeason})</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Evolução da Folha Salarial */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Folha Salarial (por Semana)</CardTitle>
          </CardHeader>
          <CardContent>
            <Plot
              data={[
                {
                  type: 'bar',
                  x: wagesSeasons,
                  y: weeklyWagesMillions,
                  name: 'Folha Semanal (€M)',
                  marker: { color: '#4ECDC4' },
                  hovertemplate: '€%{y:.1f}M<extra></extra>'
                }
              ]}
              layout={{
                height: 300,
                autosize: true,
                bargap: 0.6,
                yaxis: { title: '€ Milhões/semana' },
                xaxis: { title: 'Temporada' },
                margin: { t: 30, r: 20, l: 40, b: 40 }
              }}
              config={{ displaylogo: false, responsive: true }}
              useResizeHandler
              style={{ width: '100%' }}
            />
          </CardContent>
        </Card>

        {/* Receitas vs Despesas */}
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs. Despesas por Temporada</CardTitle>
          </CardHeader>
          <CardContent>
            <Plot
              data={[
                {
                  type: 'bar',
                  x: transferSeasons,
                  y: totalReceived,
                  name: 'Receitas (Vendas)',
                  marker: { color: '#4CAF50' },
                  hovertemplate: '€%{y:.1f}M<extra></extra>'
                },
                {
                  type: 'bar',
                  x: transferSeasons,
                  y: totalInvested,
                  name: 'Despesas (Compras)',
                  marker: { color: '#F44336' },
                  hovertemplate: '€%{y:.1f}M<extra></extra>'
                }
              ]}
              layout={{
                barmode: 'group',
                bargap: 0.4,
                bargroupgap: 0.2,
                height: 300,
                autosize: true,
                yaxis: { title: '€ Milhões' },
                xaxis: { title: 'Temporada' },
                margin: { t: 30, r: 20, l: 40, b: 40 }
              }}
              config={{ displaylogo: false, responsive: true }}
              useResizeHandler
              style={{ width: '100%' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Salários */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>
                Top 10 Maiores Salários - {getSalaryLabel(salaryView)} ({selectedSeason})
              </span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {['weekly', 'monthly', 'annual'].map((view) => (
                <Button
                  key={view}
                  variant={salaryView === view ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSalaryView(view)}
                >
                  {getSalaryLabel(view)}
                </Button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      Todos os Salários - {getSalaryLabel(salaryView)} ({selectedSeason})
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {(allSalaries || []).map((player, index) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant={index < 3 ? 'default' : 'secondary'}>
                            {index + 1}
                          </Badge>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {player.position} • {player.function}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {formatCurrency(player.calculatedSalary, salaryView)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Overall: {player.overall}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(topSalaries || []).map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Badge variant={index < 3 ? 'default' : 'secondary'}>{index + 1}</Badge>
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {player.position} • {player.function}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {formatCurrency(player.calculatedSalary, salaryView)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall: {player.overall}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico Pizza */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Salários por Função ({selectedSeason})</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                type: 'pie',
                labels: pieLabels,
                values: pieValues,
                textinfo: 'label+percent',
                marker: { colors: COLORS }
              }
            ]}
            layout={{ height: 400, autosize: true }}
            config={{ displaylogo: false, responsive: true }}
            useResizeHandler
            style={{ width: '100%' }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancesPage;
