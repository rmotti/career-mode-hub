export const getSector = (position) => {
  if (position === 'GK') return 'Goleiro';
  if (['CB', 'RB', 'LB'].includes(position)) return 'Defesa';
  if (['CDM', 'CM', 'CAM', 'RM', 'LM'].includes(position)) return 'Meio';
  if (['RW', 'LW', 'ST'].includes(position)) return 'Ataque';
  return 'Outro';
};

export const getPotentialIndicator = (potential) => {
  if (potential >= 90) return '⭐⭐⭐⭐⭐';
  if (potential >= 85) return '⭐⭐⭐⭐';
  if (potential >= 80) return '⭐⭐⭐';
  if (potential >= 75) return '⭐⭐';
  return '⭐';
};
