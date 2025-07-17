export const calculatePositionStats = (players) => {
  const rawStats = players.reduce((acc, player) => {
    const pos = player.position;
    if (!acc[pos]) {
      acc[pos] = { position: pos, count: 0, avgOverall: 0, avgAge: 0, totalValue: 0 };
    }
    acc[pos].count++;
    acc[pos].avgOverall += player.overall;
    acc[pos].avgAge += player.age;
    const value = parseFloat(player.marketValue.replace('€', '').replace('M', ''));
    acc[pos].totalValue += value;
    return acc;
  }, {});

  return Object.values(rawStats).map(stat => ({
    ...stat,
    avgOverall: (stat.avgOverall / stat.count).toFixed(1),
    avgAge: (stat.avgAge / stat.count).toFixed(1),
    totalValue: stat.totalValue.toFixed(1),
  }));
};
