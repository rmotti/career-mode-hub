export const calculateSalary = (weeklySalary, view) => {
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

export const getSalaryLabel = (view) => {
  switch (view) {
    case 'monthly':
      return 'Mensal';
    case 'annual':
      return 'Anual';
    default:
      return 'Semanal';
  }
};

export const formatCurrency = (value, view) => {
  if (view === 'annual' && value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
};


export const parseCurrency = (value) => {
  if (typeof value !== 'string') return 0;
  const num = parseFloat(value.replace(/[^\d.]/g, ''));
  if (value.toUpperCase().includes('M')) return num * 1_000_000;
  if (value.toUpperCase().includes('K')) return num * 1_000;
  return num;
};
