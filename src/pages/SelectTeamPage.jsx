import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/common/dialog";
import { Button } from "@/components/ui/common/button";
import { createSave } from "@/services/saveService";
import { toast } from "sonner";
import axios from "axios";

// Placeholder para bandeiras e logos ausentes
const placeholderImg = "https://upload.wikimedia.org/wikipedia/commons/0/09/No_image_available.svg";

export default function SelectTeamPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // 🔹 Spinner de loading
  const Spinner = () => (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-400 mt-2 text-sm">Carregando...</p>
    </div>
  );

  // 🔹 Buscar países ao abrir
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/teams/countries")
      .then((res) => {
        console.log("Countries API response:", res.data);
        setCountries(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Erro ao carregar países:", err.message);
        toast.error("Erro ao carregar países.");
        setCountries([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Buscar ligas quando selecionar país
  useEffect(() => {
    if (!selectedCountry) return;
    setLoading(true);
    axios
      .get(`/api/teams/leagues?country=${selectedCountry}`)
      .then((res) => setLeagues(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        toast.error("Erro ao carregar ligas.");
        setLeagues([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCountry]);

  // 🔹 Buscar times quando selecionar liga
  useEffect(() => {
    if (!selectedLeague) return;
    setLoading(true);
    axios
      .get(`/api/teams/teams?league=${selectedLeague.id}&season=${selectedLeague.season}`)
      .then((res) => setTeams(Array.isArray(res.data) ? res.data : []))
      .catch(() => {
        toast.error("Erro ao carregar times.");
        setTeams([]);
      })
      .finally(() => setLoading(false));
  }, [selectedLeague]);

  // 🔹 Criar save ao confirmar time
  const handleSelectTeam = async () => {
    if (!selectedTeam) return;
    setLoading(true);

    try {
      const res = await createSave({
        name: `Save ${selectedTeam.name}`,
        team: selectedTeam.name,
        season: "2025/26",
      });

      localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
      localStorage.setItem("currentSave", res.data._id);

      toast.success(`Save "${selectedTeam.name}" criado com sucesso!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar save:", error.response?.data || error.message);
      toast.error("Erro ao criar save. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate("/");

  // 🔹 Renderizador de listas com fallback
  const renderList = (items, onClick, labelKey = "name", imgKey = "logo") => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p className="text-gray-400">Nenhum resultado encontrado.</p>;
    }

    return items.map((item) => (
      <Button
        key={item.id || item.code || item[labelKey]}
        className={`w-64 flex items-center justify-start gap-3 px-4 ${
          selectedTeam?.id === item.id ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => onClick(item)}
      >
        <img
          src={item[imgKey] || placeholderImg}
          alt={item[labelKey]}
          className="w-6 h-6 rounded-sm object-contain"
        />
        <span className="truncate">{item[labelKey]}</span>
      </Button>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={true} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent
          aria-describedby="dialog-desc"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="w-[420px] text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     p-6 rounded-xl shadow-xl animate-in fade-in zoom-in-95"
        >
          <p id="dialog-desc" className="sr-only">
            Selecione país, liga e time para criar o save
          </p>

          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="w-full text-center text-xl font-bold">
              {step === 1 && "Selecione o País"}
              {step === 2 && "Selecione a Liga"}
              {step === 3 && "Selecione o Time"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-3 mt-4 max-h-[320px] overflow-y-auto w-full">
            {loading && <Spinner />}

            {!loading && step === 1 && renderList(countries, (c) => {
              setSelectedCountry(c.name);
              setStep(2);
            }, "name", "flag")}

            {!loading && step === 2 && renderList(leagues, (l) => {
              setSelectedLeague(l);
              setStep(3);
            }, "name", "logo")}

            {!loading && step === 3 && renderList(teams, (t) => setSelectedTeam(t), "name", "logo")}
          </div>

          <div className="flex justify-between w-full mt-6">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Voltar
              </Button>
            )}

            {step === 3 && (
              <Button
                className="ml-auto w-32"
                disabled={!selectedTeam || loading}
                onClick={handleSelectTeam}
              >
                {loading ? "Criando..." : "Confirmar"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
