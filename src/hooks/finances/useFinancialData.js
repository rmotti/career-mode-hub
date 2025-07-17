import { useMemo, useState } from 'react';
import { squadPlayers, transfersBySeasonData, weeklyWagesBySeasonData } from '../../data/index';
import { calculateSalary, parseCurrency, formatCurrency } from '../../utils/finances/financialUtils';

export function useFinancialData() {
  const [salaryView, setSalaryView] = useState('weekly');
  const [selectedSeason, setSelectedSeason] = useState(
    transfersBySeasonData[transfersBySeasonData.length - 1].season
  );

  const totalSalary = useMemo(() =>
    squadPlayers.reduce((sum, player) => sum + calculateSalary(player.salary, salaryView), 0),
    [salaryView]
  );

  const salaryByFunction = useMemo(() => {
    const grouped = squadPlayers.reduce((acc, player) => {
      const func = player.function;
      const salary = calculateSalary(player.salary, salaryView);
      if (!acc[func]) acc[func] = { function: func, total: 0, count: 0 };
      acc[func].total += salary;
      acc[func].count++;
      return acc;
    }, {});
    return Object.values(grouped).map(f => ({
      ...f,
      average: f.total / f.count
    })).sort((a, b) => b.total - a.total);
  }, [salaryView]);

  const topSalaries = useMemo(() =>
    squadPlayers
      .map(player => ({
        ...player,
        calculatedSalary: calculateSalary(player.salary, salaryView)
      }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary)
      .slice(0, 10),
    [salaryView]
  );

  const allSalaries = useMemo(() =>
    squadPlayers
      .map(player => ({
        ...player,
        calculatedSalary: calculateSalary(player.salary, salaryView)
      }))
      .sort((a, b) => b.calculatedSalary - a.calculatedSalary),
    [salaryView]
  );


const topMarketValues = useMemo(() =>
  squadPlayers
    .filter(p => p.marketValue)
    .map(player => ({
      ...player,
      parsedMarketValue: parseCurrency(player.marketValue)
    }))
    .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue)
    .slice(0, 5),
  []
);

const allMarketValues = useMemo(() =>
  squadPlayers
    .filter(p => p.marketValue)
    .map(player => ({
      ...player,
      parsedMarketValue: parseCurrency(player.marketValue)
    }))
    .sort((a, b) => b.parsedMarketValue - a.parsedMarketValue),
  []
);

const totalSquadValue = useMemo(() => {
  const total = squadPlayers.reduce(
    (sum, player) =>
      sum + (player.marketValue ? player.parsedMarketValue || parseCurrency(player.marketValue) : 0),
    0
  );
  return formatCurrency(total, 'annual'); 
}, [squadPlayers]);

const selectedSeasonData = transfersBySeasonData.find(s => s.season === selectedSeason);

  return {
    salaryView,
    setSalaryView,
    selectedSeason,
    setSelectedSeason,
    totalSalary,
    salaryByFunction,
    topSalaries,
    allSalaries,
    selectedSeasonData,
    squadPlayers,
    weeklyWagesBySeasonData,
    transfersBySeasonData,
    topMarketValues,
    allMarketValues,
    totalSquadValue,
    selectedSeasonData
  };
}
