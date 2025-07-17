import { useMemo } from 'react';
import { squadPlayers, seasonStats } from '@/data';
import {
  getTopContribuitors,
  getAllScorers,
  getAllAssists,
  getAllRated,
  getAllContribuitors,
  getYoungTalents,
  getTopRated
} from '../../utils/players/playerUtils';

export function usePlayersData() {
  const currentSeason = seasonStats[1];

  const topContribuitors = useMemo(() => getTopContribuitors(squadPlayers), []);
  const allScorers = useMemo(() => getAllScorers(squadPlayers), []);
  const allAssists = useMemo(() => getAllAssists(squadPlayers), []);
  const allRated = useMemo(() => getAllRated(squadPlayers), []);
  const youngTalents = useMemo(() => getYoungTalents(squadPlayers), []);
  const allContribuitors = useMemo(() => getAllContribuitors(squadPlayers), []);



  return {
    currentSeason,
    topContribuitors,
    allContribuitors,
    allScorers,
    allAssists,
    allRated,
    youngTalents,
    squadSize: squadPlayers.length,
    squadPlayers
  };
}
