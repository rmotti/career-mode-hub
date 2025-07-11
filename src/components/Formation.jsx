import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Users, Edit } from 'lucide-react';
import { fcPortoPlayers } from '../data/mockData';

const Formation = ({ isCompact = false }) => {
  // Função para obter o melhor jogador de cada posição
  const getBestPlayerByPosition = (position) => {
    return fcPortoPlayers
      .filter(player => player.position === position)
      .sort((a, b) => b.overall - a.overall)[0];
  };

  // Escalação inicial 4-3-3
  const [formation, setFormation] = useState({
    GK: getBestPlayerByPosition('GK'),
    RB: getBestPlayerByPosition('RB'),
    CB1: fcPortoPlayers.filter(p => p.position === 'CB').sort((a, b) => b.overall - a.overall)[0],
    CB2: fcPortoPlayers.filter(p => p.position === 'CB').sort((a, b) => b.overall - a.overall)[1],
    LB: getBestPlayerByPosition('LB'),
    CDM: getBestPlayerByPosition('CDM'),
    CM1: fcPortoPlayers.filter(p => p.position === 'CM').sort((a, b) => b.overall - a.overall)[0],
    CM2: fcPortoPlayers.filter(p => p.position === 'CM').sort((a, b) => b.overall - a.overall)[1],
    RW: getBestPlayerByPosition('RW'),
    ST: getBestPlayerByPosition('ST'),
    LW: getBestPlayerByPosition('LW')
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Função para trocar jogador
  const changePlayer = (position, player) => {
    setFormation(prev => ({
      ...prev,
      [position]: player
    }));
    setSelectedPosition(null);
  };

  // Obter jogadores disponíveis para uma posição
  const getAvailablePlayers = (position) => {
    let positions = [position];
    
    // Permitir flexibilidade nas posições
    if (position === 'CB1' || position === 'CB2') positions = ['CB'];
    if (position === 'CM1' || position === 'CM2') positions = ['CM', 'CAM', 'CDM'];
    if (position === 'RW') positions = ['RW', 'RM'];
    if (position === 'LW') positions = ['LW', 'LM'];
    
    return fcPortoPlayers
      .filter(player => positions.includes(player.position))
      .sort((a, b) => b.overall - a.overall);
  };

  const PlayerCard = ({ player, position }) => {
    if (!player) return (
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs border-2 border-dashed border-gray-400">
        ?
      </div>
    );

    return (
      <div className="relative">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg">
          {player.overall}
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-center min-w-max">
          <div className="bg-white px-1 rounded shadow text-black">
            {player.name.split(' ')[0]}
          </div>
        </div>
      </div>
    );
  };

  if (isCompact) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Escalação Titular</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-green-100 rounded-lg p-4 min-h-[300px]" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}>
            {/* Formação 4-3-3 Compacta */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              {/* Atacantes */}
              <div className="flex justify-center space-x-12">
                <PlayerCard player={formation.LW} position="LW" />
                <PlayerCard player={formation.ST} position="ST" />
                <PlayerCard player={formation.RW} position="RW" />
              </div>
              
              {/* Meio-campo */}
              <div className="flex justify-center space-x-10">
                <PlayerCard player={formation.CM1} position="CM1" />
                <PlayerCard player={formation.CDM} position="CDM" />
                <PlayerCard player={formation.CM2} position="CM2" />
              </div>
              
              {/* Defesa */}
              <div className="flex justify-center space-x-8">
                <PlayerCard player={formation.LB} position="LB" />
                <PlayerCard player={formation.CB1} position="CB1" />
                <PlayerCard player={formation.CB2} position="CB2" />
                <PlayerCard player={formation.RB} position="RB" />
              </div>
              
              {/* Goleiro */}
              <div className="flex justify-center">
                <PlayerCard player={formation.GK} position="GK" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Escalação Titular (4-3-3)</h2>
        <Button 
          variant={isEditMode ? "default" : "outline"}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditMode ? 'Finalizar Edição' : 'Editar Escalação'}
        </Button>
      </div>

      <div className="relative bg-green-100 rounded-lg p-8 min-h-[600px]" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}>
        {/* Campo de futebol */}
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          {/* Atacantes */}
          <div className="flex justify-center space-x-16 mt-8">
            <PlayerCard 
              player={formation.LW} 
              position="LW" 
              onClick={() => isEditMode && setSelectedPosition('LW')}
            />
            <PlayerCard 
              player={formation.ST} 
              position="ST" 
              onClick={() => isEditMode && setSelectedPosition('ST')}
            />
            <PlayerCard 
              player={formation.RW} 
              position="RW" 
              onClick={() => isEditMode && setSelectedPosition('RW')}
            />
          </div>
          
          {/* Meio-campo */}
          <div className="flex justify-center space-x-12">
            <PlayerCard 
              player={formation.CM1} 
              position="CM1" 
              onClick={() => isEditMode && setSelectedPosition('CM1')}
            />
            <PlayerCard 
              player={formation.CDM} 
              position="CDM" 
              onClick={() => isEditMode && setSelectedPosition('CDM')}
            />
            <PlayerCard 
              player={formation.CM2} 
              position="CM2" 
              onClick={() => isEditMode && setSelectedPosition('CM2')}
            />
          </div>
          
          {/* Defesa */}
          <div className="flex justify-center space-x-8">
            <PlayerCard 
              player={formation.LB} 
              position="LB" 
              onClick={() => isEditMode && setSelectedPosition('LB')}
            />
            <PlayerCard 
              player={formation.CB1} 
              position="CB1" 
              onClick={() => isEditMode && setSelectedPosition('CB1')}
            />
            <PlayerCard 
              player={formation.CB2} 
              position="CB2" 
              onClick={() => isEditMode && setSelectedPosition('CB2')}
            />
            <PlayerCard 
              player={formation.RB} 
              position="RB" 
              onClick={() => isEditMode && setSelectedPosition('RB')}
            />
          </div>
          
          {/* Goleiro */}
          <div className="flex justify-center mb-8">
            <PlayerCard 
              player={formation.GK} 
              position="GK" 
              onClick={() => isEditMode && setSelectedPosition('GK')}
            />
          </div>
        </div>
      </div>

      {/* Modal de seleção de jogador */}
      {selectedPosition && (
        <Dialog open={!!selectedPosition} onOpenChange={() => setSelectedPosition(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selecionar jogador para {selectedPosition}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {getAvailablePlayers(selectedPosition).map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => changePlayer(selectedPosition, player)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {player.overall}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {player.position} • {player.function}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {player.potential}
                    </Badge>
                    <div className="text-sm text-muted-foreground">{player.marketValue}</div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Formation;

