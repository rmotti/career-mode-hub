import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/common/card';
import { Button } from '@/components/ui/common/button';
import { toast } from 'sonner'; // ✅ Sonner para toasts

export default function SaveMenuPage() {
  const navigate = useNavigate();

  const handleNewSave = () => {
    toast.info('Iniciando criação de um novo save...'); // ✅ Toast informativo
    navigate('/select-team');
  };

  const handleLoadSave = () => {
    toast.info('Carregando seus saves...'); // ✅ Toast informativo
    navigate('/load-save');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00172d] via-[#003366] to-[#002147] p-4">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <Card className="p-8 shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Escolha uma opção</h1>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full py-3 text-lg font-semibold bg-green-600 text-white rounded-xl hover:brightness-110 transition"
              onClick={handleNewSave}
            >
              Novo Save
            </Button>
            <Button
              className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl hover:brightness-110 transition"
              onClick={handleLoadSave}
            >
              Carregar Save
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
