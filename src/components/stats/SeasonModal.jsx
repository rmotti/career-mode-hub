import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/common/dialog';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { Label } from '@/components/ui/common/label';

const SeasonModal = ({ isOpen, onClose, onSave, season = null }) => {
  const [formData, setFormData] = useState({
    season: '',
    matches: '',
    wins: '',
    draws: '',
    losses: '',
    goalsFor: '',
    goalsAgainst: '',
    points: '',
    position: ''
  });

  const isEditing = !!season;

  useEffect(() => {
    if (season) {
      setFormData({
        season: season.season || '',
        matches: season.matches?.toString() || '',
        wins: season.wins?.toString() || '',
        draws: season.draws?.toString() || '',
        losses: season.losses?.toString() || '',
        goalsFor: season.goalsFor?.toString() || '',
        goalsAgainst: season.goalsAgainst?.toString() || '',
        points: season.points?.toString() || '',
        position: season.position?.toString() || ''
      });
    } else {
      // Reset form for new season
      setFormData({
        season: '',
        matches: '',
        wins: '',
        draws: '',
        losses: '',
        goalsFor: '',
        goalsAgainst: '',
        points: '',
        position: ''
      });
    }
  }, [season, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.season || !formData.matches) {
      alert('Por favor, preencha os campos obrigatórios: Temporada e Jogos');
      return;
    }

    const seasonData = {
      season: formData.season,
      matches: parseInt(formData.matches) || 0,
      wins: parseInt(formData.wins) || 0,
      draws: parseInt(formData.draws) || 0,
      losses: parseInt(formData.losses) || 0,
      goalsFor: parseInt(formData.goalsFor) || 0,
      goalsAgainst: parseInt(formData.goalsAgainst) || 0,
      points: parseInt(formData.points) || 0,
      position: parseInt(formData.position) || 1
    };

    onSave(seasonData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Temporada' : 'Adicionar Nova Temporada'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="season">Temporada *</Label>
              <Input
                id="season"
                value={formData.season}
                onChange={(e) => handleInputChange('season', e.target.value)}
                placeholder="2024/25"
                required
              />
            </div>

            <div>
              <Label htmlFor="matches">Jogos *</Label>
              <Input
                id="matches"
                type="number"
                value={formData.matches}
                onChange={(e) => handleInputChange('matches', e.target.value)}
                placeholder="34"
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="position">Posição Final</Label>
              <Input
                id="position"
                type="number"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="1"
                min="1"
                max="20"
              />
            </div>

            <div>
              <Label htmlFor="wins">Vitórias</Label>
              <Input
                id="wins"
                type="number"
                value={formData.wins}
                onChange={(e) => handleInputChange('wins', e.target.value)}
                placeholder="25"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="draws">Empates</Label>
              <Input
                id="draws"
                type="number"
                value={formData.draws}
                onChange={(e) => handleInputChange('draws', e.target.value)}
                placeholder="6"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="losses">Derrotas</Label>
              <Input
                id="losses"
                type="number"
                value={formData.losses}
                onChange={(e) => handleInputChange('losses', e.target.value)}
                placeholder="3"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="points">Pontos</Label>
              <Input
                id="points"
                type="number"
                value={formData.points}
                onChange={(e) => handleInputChange('points', e.target.value)}
                placeholder="81"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="goalsFor">Gols Marcados</Label>
              <Input
                id="goalsFor"
                type="number"
                value={formData.goalsFor}
                onChange={(e) => handleInputChange('goalsFor', e.target.value)}
                placeholder="78"
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="goalsAgainst">Gols Sofridos</Label>
              <Input
                id="goalsAgainst"
                type="number"
                value={formData.goalsAgainst}
                onChange={(e) => handleInputChange('goalsAgainst', e.target.value)}
                placeholder="31"
                min="0"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Adicionar Temporada'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SeasonModal;

