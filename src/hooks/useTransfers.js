import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { transferHistory } from '@/data';

export const useTransfers = () => {
  const [transfers, setTransfers] = useLocalStorage('fc-porto-transfers', transferHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);

  const filteredTransfers = useMemo(() => {
    return transfers
      .filter((transfer) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          transfer.playerName.toLowerCase().includes(search) ||
          transfer.fromClub?.toLowerCase().includes(search) ||
          transfer.toClub?.toLowerCase().includes(search);
        const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
        const matchesSeason = seasonFilter === 'all' || transfer.season === seasonFilter;
        return matchesSearch && matchesType && matchesSeason;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transfers, searchTerm, typeFilter, seasonFilter]);

  const financialStats = useMemo(() => {
    const currentSeasonTransfers = transfers.filter((t) => t.season === '2024/25');

    let totalInvested = 0;
    let totalReceived = 0;

    currentSeasonTransfers.forEach((transfer) => {
      const fee = transfer.fee;
      if (fee && fee !== 'Livre' && fee !== 'Empréstimo') {
        const value = parseFloat(fee.replace('€', '').replace('M', ''));
        if (!isNaN(value)) {
          if (['Entrada', 'Empréstimo (Entrada)'].includes(transfer.type)) {
            totalInvested += value;
          } else if (['Saída', 'Empréstimo (Saída)'].includes(transfer.type)) {
            totalReceived += value;
          }
        }
      }
    });

    return {
      totalInvested,
      totalReceived,
      netBalance: totalReceived - totalInvested,
      totalTransfers: currentSeasonTransfers.length
    };
  }, [transfers]);

  const handleAdd = () => {
    setEditingTransfer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer);
    setIsModalOpen(true);
  };

  const handleSave = (transferData) => {
    if (editingTransfer) {
      setTransfers((prev) =>
        prev.map((t) => (t.id === editingTransfer.id ? transferData : t))
      );
    } else {
      setTransfers((prev) => [transferData, ...prev]);
    }
  };

  const handleDelete = (id) => {
    setTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    transfers,
    setTransfers,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    seasonFilter,
    setSeasonFilter,
    isModalOpen,
    setIsModalOpen,
    editingTransfer,
    filteredTransfers,
    financialStats,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete
  };
};
