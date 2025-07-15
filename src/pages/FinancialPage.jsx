import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  Eye,
} from 'lucide-react';
import {
  squadPlayers,
  transfersBySeasonData,
  weeklyWagesBySeasonData,
} from '../data/index.js';

const Financial = () => {
  const [salaryView, setSalaryView] = useState('weekly');
  const [selectedSeason, setSelectedSeason] = useState(
    transfersBySeasonData[transfersBySeasonData.length - 1].season
  );

  const calculateSalary = (weeklySalary, view) => {
    const weekly = parseFloat(weeklySalary.replace('€', '').replace(',', ''));
    switch (view) {
      case 'monthly':
        return weekly * 4.33;
      case 'annual':
        return weekly * 52;
      default:
        return weekly;
    }
  };

  const getSalaryLabel = (view) => {
    switch (view) {
      case 'monthly':
        return 'Mensal';
      case 'annual':
        return 'Anual';
      default:
        return 'Semanal';
    }
  };

  const formatCurrency = (value, view) => {
    if (view === 'annual' && value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value.toFixed(0)}`;
  };

  const salaryByFunction = squadPlayers.reduce((acc, player) => {
    const func = player.function;
    const salary = calculateSalary(player.salary, salaryView);

    if (!acc[func]) {
      acc[func] = { function: func, total: 0, count: 0 };
    }
    acc[func].total += salary;
    acc[func].count++;
    return acc;
  }, {});

  const salaryFunctionData = Object.values(salaryByFunction)
    .map((func) => ({
      function: func.function,
      total: func.total,
      average: func.total / func.count,
      count: func.count,
    }))
    .sort((a, b) => b.total - a.total);

  const topSalaries = squadPlayers
    .map((player) => ({
      ...player,
      calculatedSalary: calculateSalary(player.salary, salaryView),
    }))
    .sort((a, b) => b.calculatedSalary - a.calculatedSalary)
    .slice(0, 10);

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
    '#98D8C8',
  ];

  const totalSalary = squadPlayers.reduce(
    (sum, player) => sum + calculateSalary(player.salary, salaryView),
    0
  );

  const selectedSeasonData = transfersBySeasonData.find(
    (data) => data.season === selectedSeason
  );

  return (
    <div className="space-y-6">
      {/* Seletor de Temporada */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Resumo Financeiro</h2>
        <div>
          <label htmlFor="season-select" className="mr-2 text-sm text-muted-foreground">
            Temporada:
          </label>
          <select
            id="season-select"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            {transfersBySeasonData.map((data) => (
              <option key={data.season} value={data.season}>
                {data.season}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards do Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas (Vendas)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{selectedSeasonData.vendas}M</div>
            <p className="text-xs text-muted-foreground">temporada {selectedSeason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos (Compras)</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{selectedSeasonData.compras}M</div>
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
              className={`text-2xl font-bold ${
                selectedSeasonData.vendas - selectedSeasonData.compras >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {selectedSeasonData.vendas - selectedSeasonData.compras >= 0 ? '+' : '-'}€
              {Math.abs(selectedSeasonData.vendas - selectedSeasonData.compras)}M
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
            <div className="text-2xl font-bold">{formatCurrency(totalSalary, salaryView)}</div>
            <p className="text-xs text-muted-foreground">
              por {getSalaryLabel(salaryView).toLowerCase()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de Transferências */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transferências por Temporada (Compras vs Vendas)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transfersBySeasonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`€${value}M`, name === 'vendas' ? 'Vendas' : 'Compras']}
                />
                <Bar dataKey="compras" fill="#FF6B35" name="Compras" />
                <Bar dataKey="vendas" fill="#4ECDC4" name="Vendas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos Semanais da Folha Salarial por Temporada</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyWagesBySeasonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}M`, 'Gasto Semanal']} />
                <Bar dataKey="gastoSemanal" fill="#003366" name="Gasto Semanal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 10 Maiores Salários */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Top 10 Maiores Salários - {getSalaryLabel(salaryView)}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <Button
                  variant={salaryView === 'weekly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSalaryView('weekly')}
                >
                  Semanal
                </Button>
                <Button
                  variant={salaryView === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSalaryView('monthly')}
                >
                  Mensal
                </Button>
                <Button
                  variant={salaryView === 'annual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSalaryView('annual')}
                >
                  Anual
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Todos os Salários - {getSalaryLabel(salaryView)}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {squadPlayers
                      .map((player) => ({
                        ...player,
                        calculatedSalary: calculateSalary(player.salary, salaryView),
                      }))
                      .sort((a, b) => b.calculatedSalary - a.calculatedSalary)
                      .map((player, index) => (
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
            {topSalaries.map((player, index) => (
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

      {/* Gráfico de Salários por Função */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Salários por Função</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={salaryFunctionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ function: func, total }) =>
                  `${func}: ${formatCurrency(total, salaryView)}`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="total"
              >
                {salaryFunctionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(value, salaryView), 'Total']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;
