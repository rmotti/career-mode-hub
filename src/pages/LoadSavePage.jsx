import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/common/card";
import { Button } from "@/components/ui/common/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/common/alert-dialog";
import { getSaves, deleteSave } from "@/services/saveService";
import { toast } from "sonner"; // ✅ Usando Sonner para toasts

export default function LoadSavePage() {
  const navigate = useNavigate();

  const [saves, setSaves] = useState([]);
  const [selectedSave, setSelectedSave] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSaves();
  }, []);

  const fetchSaves = () => {
    getSaves()
      .then((res) => setSaves(res.data))
      .catch((err) => {
        console.error("Erro ao carregar saves:", err);
        toast.error("Erro ao carregar saves. Não foi possível buscar seus saves.");
      });
  };

  const handleLoad = (save) => {
    localStorage.setItem(
      "selectedTeam",
      JSON.stringify({
        id: save._id,
        name: save.team,
        colors: { primary: "#0033A0" },
      })
    );
    localStorage.setItem("currentSave", save._id);

    toast.success(`Save "${save.name}" carregado com sucesso!`);
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (!selectedSave) return;

    setLoading(true);
    try {
      await deleteSave(selectedSave._id);
      setSaves((prev) => prev.filter((s) => s._id !== selectedSave._id));
      toast.success(`Save "${selectedSave.name}" excluído com sucesso!`);
      setSelectedSave(null);
    } catch (error) {
      console.error("Erro ao deletar save:", error.response?.data || error.message);
      toast.error("Erro ao excluir save. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {saves.length === 0 && <p className="text-white">Nenhum save encontrado.</p>}

        {saves.map((save) => (
          <Card
            key={save._id}
            className="relative hover:shadow-lg hover:border-primary transition 
                       bg-white/10 backdrop-blur-lg border border-white/20"
          >
            <CardContent className="flex flex-col items-center p-6">
              <h2 className="text-black font-extrabold">{save.name}</h2>
              <p className="text-sm text-gray-300">{save.team}</p>
              <p className="text-xs text-gray-400 mt-1">
                Criado em: {new Date(save.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 mt-4 w-full">
                <Button
                  className="flex-1 bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleLoad(save)}
                >
                  Carregar
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="flex-1 bg-red-600 text-white hover:bg-red-700"
                      onClick={() => setSelectedSave(save)}
                    >
                      Excluir
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-white rounded-xl p-6">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir Save</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir <strong>{save.name}</strong>?  
                        Esta ação não poderá ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setSelectedSave(null)}
                        className="hover:bg-gray-100"
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? "Excluindo..." : "Excluir"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
