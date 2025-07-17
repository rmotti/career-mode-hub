import { useMemo } from 'react';
import { squadPlayers, seasonStats } from '../data/index';
import {
  getTopContribuitors,
  getAllScorers,
  getAllAssists,
  getAllRated,
  getYoungTalents
} from '../utils/dashboardUtils';

export function useDashboardData() {
  const currentSeason = seasonStats[1];

  const topContribuitors = useMemo(() => getTopContribuitors(squadPlayers), []);
  const allScorers = useMemo(() => getAllScorers(squadPlayers), []);
  const allAssists = useMemo(() => getAllAssists(squadPlayers), []);
  const allRated = useMemo(() => getAllRated(squadPlayers), []);
  const youngTalents = useMemo(() => getYoungTalents(squadPlayers), []);


  return {
    currentSeason,
    topContribuitors,
    allScorers,
    allAssists,
    allRated,
    youngTalents,
    squadSize: squadPlayers.length,
    squadPlayers
  };
}
