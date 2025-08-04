import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/common/dialog";
import { Button } from "@/components/ui/common/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/common/select";
import { createSave } from "@/services/saveService";
import { toast } from "sonner"; // ✅ Importa Sonner para toasts

const mockTeams = [
  { id: 1, name: "FC Porto" },
  { id: 2, name: "Real Madrid" },
  { id: 3, name: "Manchester City" },
  { id: 4, name: "Bayer Leverkusen" },
  { id: 5, name: "Barcelona" },
  { id: 6, name: "Liverpool" },
  { id: 7, name: "Chelsea" },
  { id: 8, name: "Juventus" },
  { id: 9, name: "Paris Saint-Germain" },
  { id: 10, name: "AC Milan" },
  { id: 11, name: "Arsenal" },
  { id: 12, name: "Borussia Dortmund" },
  { id: 13, name: "Tottenham Hotspur" },
  { id: 14, name: "Atlético Madrid" },
];

export default function SelectTeamPage() {
  const navigate = useNavigate();
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectTeam = async () => {
    if (!selectedTeamId) return;

    const team = mockTeams.find((t) => t.id === Number(selectedTeamId));
    setLoading(true);

    try {
      // 🔹 Cria o save no backend
      const res = await createSave({
        name: `Save ${team.name}`,
        team: team.name,
        season: "2025/26",
      });

      // 🔹 Guarda informações do save selecionado
      localStorage.setItem("selectedTeam", JSON.stringify(team));
      localStorage.setItem("currentSave", res.data._id);

      // ✅ Toast de sucesso
      toast.success(`Save "${team.name}" criado com sucesso!`);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar save:", error.response?.data || error.message);
      // ✅ Toast de erro
      toast.error("Erro ao criar save. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate("/");

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={true} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="w-[400px] text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     p-6 rounded-xl shadow-xl animate-in fade-in zoom-in-95"
        >
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="w-full text-center text-xl font-bold">
              Selecione seu Time
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 mt-4">
            <Select onValueChange={(value) => setSelectedTeamId(value)}>
              <SelectTrigger className="w-64 text-center">
                <SelectValue placeholder="Escolha um clube" />
              </SelectTrigger>
              <SelectContent>
                {mockTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="w-36 text-sm py-2"
              disabled={!selectedTeamId || loading}
              onClick={handleSelectTeam}
            >
              {loading ? "Criando..." : "Confirmar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
