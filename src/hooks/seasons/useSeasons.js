import { useLocalStorage } from '../storage/useLocalStorage';
import { seasonStats } from '../../data';

export function useSeasons() {
  const [seasons, setSeasons] = useLocalStorage('fc-porto-seasons', seasonStats);

  const addSeason = (newSeason) => setSeasons(prev => [newSeason, ...prev]);

  const updateSeason = (updatedSeason) =>
    setSeasons(prev => prev.map(s => s.season === updatedSeason.season ? updatedSeason : s));

  const deleteSeason = (seasonId) =>
    setSeasons(prev => prev.filter(s => s.season !== seasonId));

  return {
    seasons,
    setSeasons,
    addSeason,
    updateSeason,
    deleteSeason
  };
}
