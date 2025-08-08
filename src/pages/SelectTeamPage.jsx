import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/common/dialog";
import { Button } from "@/components/ui/common/button";
import { createSave } from "@/services/saveService";
import { toast } from "sonner";
import axios from "axios";

export default function SelectTeamPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-400 mt-2 text-sm">Carregando...</p>
    </div>
  );

  // 🔹 Buscar países ao montar
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/countries")
      .then((res) => {
        console.log("Countries API response:", res.data);
        const data = Array.isArray(res.data) ? res.data : res.data.countries || [];
        setCountries(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar países:", err.message);
        toast.error("Erro ao carregar países.");
        setCountries([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Criar save ao confirmar país
  const handleSelectCountry = async () => {
    if (!selectedCountry) return;
    setLoading(true);

    try {
      const res = await createSave({
        name: `Save ${selectedCountry.name}`,
        country: selectedCountry.name,
        season: "2025/26",
      });

      localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
      localStorage.setItem("currentSave", res.data._id);

      toast.success(`Save "${selectedCountry.name}" criado com sucesso!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar save:", error.response?.data || error.message);
      toast.error("Erro ao criar save. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate("/saves");

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
            Selecione o País para criar o save
          </p>

          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="w-full text-center text-xl font-bold">
              Selecione o País
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-3 mt-4 max-h-[320px] overflow-y-auto w-full">
            {loading && <Spinner />}

            {!loading && countries.length === 0 && (
              <p className="text-gray-400">Nenhum país encontrado.</p>
            )}

            {!loading &&
              countries.map((country, index) => {
                const isSelected = selectedCountry?.name === country.name;

                return (
                  <Button
                    key={index}
                    className={`w-64 flex items-center justify-start gap-3 px-4 ${
                      isSelected ? "bg-blue-600 text-white" : ""
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <span className="truncate">{country.name}</span>
                  </Button>
                );
              })}
          </div>

          <div className="flex justify-end w-full mt-6">
            <Button
              className="ml-auto w-32"
              disabled={!selectedCountry || loading}
              onClick={handleSelectCountry}
            >
              {loading ? "Criando..." : "Confirmar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
