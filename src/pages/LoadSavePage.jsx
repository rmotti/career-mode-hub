import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/common/card';
import { Button } from '@/components/ui/common/button';
import clubLogo from '../assets/bayer-04-leverkusen-logo.svg';

export default function LoadSavePage() {
  const navigate = useNavigate();

  // Simula apenas 1 save
  const saves = [
    {
      id: 1,
      name: 'Save FC Bayer Leverkusen',
      team: 'Bayer 04 Leverkusen',
      logo: clubLogo,
      lastPlayed: '27/07/2025',
    },
  ];

  const handleLoad = (save) => {
    // Aqui futuramente você carregaria os dados reais do save
    localStorage.setItem('selectedTeam', JSON.stringify({
      id: 1,
      name: save.team,
      logo: save.logo,
      colors: { primary: '#D50000' },
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {saves.map((save) => (
          <Card
            key={save.id}
            className="cursor-pointer hover:shadow-lg hover:border-primary transition"
            onClick={() => handleLoad(save)}
          >
            <CardContent className="flex flex-col items-center p-6">
              <img src={save.logo} alt={save.team} className="h-20 mb-4" />
              <h2 className="text-lg font-bold">{save.name}</h2>
              <p className="text-sm text-gray-600 mt-1">Última vez jogado: {save.lastPlayed}</p>
              <Button className="mt-4 w-full bg-primary text-white">Carregar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
