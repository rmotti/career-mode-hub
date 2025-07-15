/**
 * COMPONENTE DASHBOARD - VISÃO GERAL DO FC PORTO CAREER HUB
 * 
 * Este componente representa a tela principal do sistema, exibindo:
 * - Estatísticas principais do elenco e temporada
 * - Resumo da temporada atual
 * - Top artilheiros da temporada
 * - Jovens talentos do elenco
 * - Escalação titular (modo compacto)
 * 
 * @author Manus AI
 * @version 1.0.0
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Trophy, TrendingUp, DollarSign, Target, Calendar, Eye } from 'lucide-react';
import { fcPortoPlayers, seasonStats, clubInfo } from '../data/index.js';


/**
 * Componente principal do Dashboard
 * Renderiza a visão geral com estatísticas e informações principais
 */
const Dashboard = () => {
  // ==================== DADOS DERIVADOS ====================
  
  /**
   * Obtém dados da temporada atual (primeira posição do array)
   */
  const currentSeason = seasonStats[1];
  
  /**
   * Calcula os top 3 artilheiros da temporada
   * Filtra jogadores com gols > 0, ordena por gols decrescente e pega os 3 primeiros
   */
  const topScorers = fcPortoPlayers
    .filter(player => player.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals)
    .slice(0, 3);

  /**
   * Lista completa de artilheiros para o modal "Ver todos"
   * Filtra jogadores com gols > 0 e ordena por gols decrescente
   */
  const allScorers = fcPortoPlayers
    .filter(player => player.stats.goals > 0)
    .sort((a, b) => b.stats.goals - a.stats.goals);

  /**
   * Lista completa de assistentes para o modal "Ver todos"
   * Filtra jogadores com assistências > 0 e ordena por assistências decrescente
   */
  const allAssists = fcPortoPlayers
    .filter(player => player.stats.assists > 0)
    .sort((a, b) => b.stats.assists - a.stats.assists);

  /**
   * Lista completa de jogadores com melhor nota para o modal "Ver todos"
   * Filtra jogadores com nota > 0 e ordena por nota decrescente
   */
  const allRated = fcPortoPlayers
    .filter(player => player.stats.rating > 0)
    .sort((a, b) => b.stats.rating - a.stats.rating);

  /**
   * Identifica jovens talentos do elenco
   * Critérios: idade <= 23 anos E potencial >= 85
   * Ordena por potencial decrescente
   */
  const youngTalents = fcPortoPlayers
    .filter(player => player.age <= 23 && player.potential >= 85)
    .sort((a, b) => b.potential - a.potential);

  // ==================== VALOR TOTAL DO ELENCO ====================
  /**
   * Calcula o valor total do elenco somando o marketValue de todos os jogadores
   * Considera que marketValue está em formato string, ex: "€20M"
   */
  const totalSquadValue = (() => {
    const total = fcPortoPlayers.reduce((sum, player) => {
      // Extrai o número do marketValue (ex: "€20M" -> 20)
      const match = typeof player.marketValue === 'string' && player.marketValue.match(/€([\d.]+)M/);
      if (match) {
        return sum + parseFloat(match[1]);
      }
      return sum;
    }, 0);
    // Retorna no formato "€XXXM"
    return `€${Math.round(total)}M`;
  })();

  // ==================== RENDERIZAÇÃO ====================
  
  return (
    <div className="space-y-6">
      {/* ==================== ESTATÍSTICAS PRINCIPAIS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Elenco Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fcPortoPlayers.length}</div>
            <p className="text-xs text-muted-foreground">jogadores registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Idade</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(fcPortoPlayers.reduce((sum, p) => sum + p.age, 0) / fcPortoPlayers.length)}
            </div>
            <p className="text-xs text-muted-foreground">anos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posição Liga</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSeason.position}º</div>
            <p className="text-xs text-muted-foreground">{currentSeason.points} pontos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor do Elenco</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSquadValue}</div>
            <p className="text-xs text-muted-foreground">valor total estimado</p>
          </CardContent>
        </Card>
      </div>

      {/* Resumo da Temporada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Temporada 2025/26</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{currentSeason.wins}</div>
            <div className="text-sm text-muted-foreground">Vitórias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{currentSeason.draws}</div>
            <div className="text-sm text-muted-foreground">Empates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{currentSeason.losses}</div>
            <div className="text-sm text-muted-foreground">Derrotas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{currentSeason.goalsFor}</div>
            <div className="text-sm text-muted-foreground">Gols Marcados</div>
          </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Maiores Contribuidores */}
          <Card>
            <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Maiores Contribuidores</span>
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Ver todos
            </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Todos os Maiores Contribuidores</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {fcPortoPlayers
                .filter(player => (player.stats.goals + player.stats.assists) > 0)
                .sort((a, b) => (b.stats.goals + b.stats.assists) - (a.stats.goals + a.stats.assists))
                .map((player, index) => (
              <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
                  </div>
                  <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-muted-foreground">{player.position} • {player.function}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{player.stats.goals + player.stats.assists} contribuições</div>
                  <div className="text-sm text-muted-foreground">{player.stats.goals} gols • {player.stats.assists} assists</div>
                </div>
              </div>
                ))}
            </div>
              </DialogContent>
            </Dialog>
          </div>
            </CardHeader>
            <CardContent>
          <div className="space-y-3">
            {fcPortoPlayers
              .filter(player => (player.stats.goals + player.stats.assists) > 0)
              .sort((a, b) => (b.stats.goals + b.stats.assists) - (a.stats.goals + a.stats.assists))
              .slice(0, 3)
              .map((player, index) => (
            <div key={player.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
                </div>
                <div>
              <div className="font-medium">{player.name}</div>
              <div className="text-sm text-muted-foreground">{player.position}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{player.stats.goals + player.stats.assists} contribuições</div>
                <div className="text-sm text-muted-foreground">{player.stats.goals} gols • {player.stats.assists} assists</div>
              </div>
            </div>
              ))}
          </div>
            </CardContent>
          </Card>

          {/* Jovens Talentos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Jovens Talentos</span>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver todos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Todos os Jovens Talentos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {youngTalents.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.age} anos • {player.position} • {player.function}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {player.overall} → {player.potential}
                          </Badge>
                          <div className="text-sm text-muted-foreground">{player.marketValue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {youngTalents.slice(0, 4).map((player) => (
                <div key={player.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {player.age} anos • {player.position}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {player.overall} → {player.potential}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{player.marketValue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    
    </div>
  );
};

export default Dashboard;

