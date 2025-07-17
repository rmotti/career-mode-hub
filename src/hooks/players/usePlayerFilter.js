import { useState, useMemo } from 'react';
import { squadPlayers } from '@/data';

const positionOrder = ['GK', 'RB', 'CB', 'LB', 'CDM', 'CM', 'CAM', 'RM', 'LM', 'RW', 'LW', 'ST'];

const getSector = (position) => {
  if (position === 'GK') return 'Goleiro';
  if (['CB', 'RB', 'LB'].includes(position)) return 'Defesa';
  if (['CDM', 'CM', 'CAM', 'RM', 'LM'].includes(position)) return 'Meio';
  if (['RW', 'LW', 'ST'].includes(position)) return 'Ataque';
  return 'Outro';
};

export const usePlayerFilter = () => {
  const [filterPosition, setFilterPosition] = useState('all');

  const filteredAndSortedPlayers = useMemo(() => {
    return squadPlayers
      .filter(player => {
        if (filterPosition === 'all') return true;
        return getSector(player.position) === filterPosition;
      })
      .sort((a, b) => {
        const posA = positionOrder.indexOf(a.position);
        const posB = positionOrder.indexOf(b.position);
        if (posA !== posB) return posA - posB;
        return b.overall - a.overall;
      });
  }, [filterPosition]);

  return {
    filterPosition,
    setFilterPosition,
    filteredAndSortedPlayers,
    sectors: ['all', 'Goleiro', 'Defesa', 'Meio', 'Ataque'],
  };
};
