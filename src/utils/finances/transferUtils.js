import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export const getTransferTypeColor = (type) => {
  const colors = {
    Entrada: 'bg-green-100 text-green-800',
    Saída: 'bg-red-100 text-red-800',
    'Empréstimo (Entrada)': 'bg-blue-100 text-blue-800',
    'Empréstimo (Saída)': 'bg-orange-100 text-orange-800',
    Renovação: 'bg-purple-100 text-purple-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const getTransferIcon = (type) => {
  if (['Entrada', 'Empréstimo (Entrada)'].includes(type)) return TrendingUp;
  if (['Saída', 'Empréstimo (Saída)'].includes(type)) return TrendingDown;
  return Calendar;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};
