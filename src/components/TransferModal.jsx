import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const TransferModal = ({ isOpen, onClose, onSave, transfer = null }) => {
  const [formData, setFormData] = useState({
    playerName: '',
    type: '',
    fromClub: '',
    toClub: '',
    fee: '',
    date: '',
    season: '',
    notes: ''
  });

  const transferTypes = ['Entrada', 'Saída', 'Empréstimo (Entrada)', 'Empréstimo (Saída)', 'Renovação'];
  const isEditing = !!transfer;

  useEffect(() => {
    if (transfer) {
      setFormData({
        playerName: transfer.playerName || '',
        type: transfer.type || '',
        fromClub: transfer.fromClub || '',
        toClub: transfer.toClub || '',
        fee: transfer.fee || '',
        date: transfer.date || '',
        season: transfer.season || '',
        notes: transfer.notes || ''
      });
    } else {
      // Reset form for new transfer
      setFormData({
        playerName: '',
        type: '',
        fromClub: '',
        toClub: '',
        fee: '',
        date: '',
        season: '2024/25',
        notes: ''
      });
    }
  }, [transfer, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.playerName || !formData.type || !formData.date) {
      alert('Por favor, preencha os campos obrigatórios: Jogador, Tipo e Data');
      return;
    }

    const transferData = {
      ...formData,
      id: isEditing ? transfer.id : Date.now() // Simple ID generation
    };

    onSave(transferData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Transferência' : 'Registrar Nova Transferência'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="playerName">Nome do Jogador *</Label>
              <Input
                id="playerName"
                value={formData.playerName}
                onChange={(e) => handleInputChange('playerName', e.target.value)}
                placeholder="Nome do jogador"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Tipo de Transferência *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {transferTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fromClub">Clube de Origem</Label>
              <Input
                id="fromClub"
                value={formData.fromClub}
                onChange={(e) => handleInputChange('fromClub', e.target.value)}
                placeholder="Ex: Boca Juniors"
              />
            </div>

            <div>
              <Label htmlFor="toClub">Clube de Destino</Label>
              <Input
                id="toClub"
                value={formData.toClub}
                onChange={(e) => handleInputChange('toClub', e.target.value)}
                placeholder="Ex: FC Porto"
              />
            </div>

            <div>
              <Label htmlFor="fee">Valor da Transferência</Label>
              <Input
                id="fee"
                value={formData.fee}
                onChange={(e) => handleInputChange('fee', e.target.value)}
                placeholder="€7M ou Livre ou Empréstimo"
              />
            </div>

            <div>
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="season">Temporada</Label>
              <Input
                id="season"
                value={formData.season}
                onChange={(e) => handleInputChange('season', e.target.value)}
                placeholder="2024/25"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Informações adicionais sobre a transferência..."
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Registrar Transferência'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;

