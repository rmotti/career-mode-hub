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

const mockTeams = [
  { id: 1, name: "FC Porto", logo: "src/assets/fc-porto-logo.png", colors: { primary: "#0033A0" } },
  { id: 2, name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", colors: { primary: "#FEBE10" } },
  { id: 3, name: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", colors: { primary: "#6CABDD" } },
  { id: 4, name: "Bayer Leverkusen", logo: "src/assets/bayer-04-leverkusen-logo.svg", colors: { primary: "#DC052D" } },
  { id: 5, name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg", colors: { primary: "#A50044" } },
  { id: 6, name: "Liverpool", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", colors: { primary: "#C8102E" } },
  { id: 7, name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", colors: { primary: "#034694" } },
  { id: 8, name: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg", colors: { primary: "#000000" } },
  { id: 9, name: "Paris Saint-Germain", logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Paris_Saint-Germain_F.C..svg", colors: { primary: "#004170" } },
  { id: 10, name: "AC Milan", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg", colors: { primary: "#DA291C" } },
  { id: 11, name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", colors: { primary: "#EF0107" } },
  { id: 12, name: "Borussia Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg", colors: { primary: "#FDE100" } },
  { id: 13, name: "Tottenham Hotspur", logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg", colors: { primary: "#132257" } },
  { id: 14, name: "Atlético Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg", colors: { primary: "#D50032" } },
];

export default function SelectTeamPage() {
  const navigate = useNavigate();
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleSelectTeam = () => {
    if (!selectedTeamId) return;
    const team = mockTeams.find((t) => t.id === Number(selectedTeamId));
    localStorage.setItem("selectedTeam", JSON.stringify(team));
    navigate("/dashboard");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={true} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent
          onEscapeKeyDown={(e) => e.preventDefault()} // Bloqueia ESC
          onPointerDownOutside={(e) => e.preventDefault()} // Bloqueia clique fora
          className="w-[400px] text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     p-6 rounded-xl shadow-xl animate-in fade-in zoom-in-95"
        >
          {/* Header centralizado */}
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
              disabled={!selectedTeamId}
              onClick={handleSelectTeam}
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
