import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/common/dialog';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { Label } from '@/components/ui/common/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/common/select';

const PlayerModal = ({ isOpen, onClose, onSave, player = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    function: '',
    age: '',
    nationality: '',
    overall: '',
    potential: '',
    salary: '',
    marketValue: '',
    contract: '',
    stats: {
      appearances: '',
      goals: '',
      assists: '',
      cleanSheets: '',
      rating: ''
    }
  });

  const positions = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];
  const functions = ['Crucial', 'Importante', 'Rodizio', 'Esporadico', 'Promessa'];
  const isEditing = !!player;

  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || '',
        position: player.position || '',
        function: player.function || '',
        age: player.age?.toString() || '',
        nationality: player.nationality || '',
        overall: player.overall?.toString() || '',
        potential: player.potential?.toString() || '',
        salary: player.salary || '',
        marketValue: player.marketValue || '',
        contract: player.contract || '',
        stats: {
          appearances: player.stats?.appearances?.toString() || '',
          goals: player.stats?.goals?.toString() || '',
          assists: player.stats?.assists?.toString() || '',
          cleanSheets: player.stats?.cleanSheets?.toString() || '',
          rating: player.stats?.rating?.toString() || ''
        }
      });
    } else {
      setFormData({
        name: '',
        position: '',
        function: '',
        age: '',
        nationality: '',
        overall: '',
        potential: '',
        salary: '',
        marketValue: '',
        contract: '',
        stats: {
          appearances: '',
          goals: '',
          assists: '',
          cleanSheets: '',
          rating: ''
        }
      });
    }
  }, [player, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStatsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.age) {
      alert('Por favor, preencha os campos obrigatórios: Nome, Posição e Idade');
      return;
    }

    const playerData = {
      ...formData,
      age: parseInt(formData.age) || 0,
      overall: parseInt(formData.overall) || 0,
      potential: parseInt(formData.potential) || 0,
      stats: {
        appearances: parseInt(formData.stats.appearances) || 0,
        goals: parseInt(formData.stats.goals) || 0,
        assists: parseInt(formData.stats.assists) || 0,
        cleanSheets: parseInt(formData.stats.cleanSheets) || 0,
        rating: parseFloat(formData.stats.rating) || 0
      }
    };

    if (isEditing) {
      playerData.id = player.id;
    }

    onSave(playerData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Jogador' : 'Adicionar Novo Jogador'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome do jogador"
                required
              />
            </div>

            <div>
              <Label htmlFor="position">Posição *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => handleInputChange('position', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a posição" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="function">Função no Elenco</Label>
              <Select
                value={formData.function}
                onValueChange={(value) => handleInputChange('function', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  {functions.map(fn => (
                    <SelectItem key={fn} value={fn}>{fn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Idade"
                min="16"
                max="45"
                required
              />
            </div>

            <div>
              <Label htmlFor="nationality">Nacionalidade</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="País"
              />
            </div>

            <div>
              <Label htmlFor="overall">Overall</Label>
              <Input
                id="overall"
                type="number"
                value={formData.overall}
                onChange={(e) => handleInputChange('overall', e.target.value)}
                placeholder="Overall (1-99)"
                min="1"
                max="99"
              />
            </div>

            <div>
              <Label htmlFor="potential">Potencial</Label>
              <Input
                id="potential"
                type="number"
                value={formData.potential}
                onChange={(e) => handleInputChange('potential', e.target.value)}
                placeholder="Potencial (1-99)"
                min="1"
                max="99"
              />
            </div>

            <div>
              <Label htmlFor="salary">Salário</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="€25,000"
              />
            </div>

            <div>
              <Label htmlFor="marketValue">Valor de Mercado</Label>
              <Input
                id="marketValue"
                value={formData.marketValue}
                onChange={(e) => handleInputChange('marketValue', e.target.value)}
                placeholder="€15M"
              />
            </div>

            <div>
              <Label htmlFor="contract">Contrato até</Label>
              <Input
                id="contract"
                value={formData.contract}
                onChange={(e) => handleInputChange('contract', e.target.value)}
                placeholder="2027"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Estatísticas da Temporada</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="appearances">Jogos</Label>
                <Input
                  id="appearances"
                  type="number"
                  value={formData.stats.appearances}
                  onChange={(e) => handleStatsChange('appearances', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="goals">Gols</Label>
                <Input
                  id="goals"
                  type="number"
                  value={formData.stats.goals}
                  onChange={(e) => handleStatsChange('goals', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="assists">Assistências</Label>
                <Input
                  id="assists"
                  type="number"
                  value={formData.stats.assists}
                  onChange={(e) => handleStatsChange('assists', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="cleanSheets">Clean Sheets</Label>
                <Input
                  id="cleanSheets"
                  type="number"
                  value={formData.stats.cleanSheets}
                  onChange={(e) => handleStatsChange('cleanSheets', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="rating">Nota Média</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  value={formData.stats.rating}
                  onChange={(e) => handleStatsChange('rating', e.target.value)}
                  placeholder="7.0"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Adicionar Jogador'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerModal;
