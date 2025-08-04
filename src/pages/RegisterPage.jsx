import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/common/card';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { toast } from 'sonner'; // ✅ Sonner para toasts

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao registrar');

      // 🔹 Salva token e usuário
      if (data.token) {
        localStorage.setItem('token', data.token); // Mantém compatível com saveService
      }
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Toast de sucesso
      toast.success(`Conta criada! Bem-vindo(a), ${data.user.userName || userName}`);

      // Redireciona para /saves
      navigate('/saves');
    } catch (err) {
      console.error('Erro ao registrar:', err.message);
      // ✅ Toast de erro
      toast.error(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002147] via-[#003366] to-[#00172d] p-4">
      <Card className="w-full max-w-md shadow-xl border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden">
        <CardHeader className="text-center space-y-2 pt-6">
          <CardTitle className="text-3xl font-bold text-white tracking-wide">Criar Conta</CardTitle>
          <p className="text-sm text-gray-300">Entre para o Career Hub</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
            <Input
              type="text"
              placeholder="Nome de usuário"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
              className="bg-white/10 text-gray-100 placeholder-gray-300 border-white/20 focus:border-primary focus:ring-primary"
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-gray-100 placeholder-gray-300 border-white/20 focus:border-primary focus:ring-primary"
            />

            <Input
              type="password"
              placeholder="Senha"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 text-gray-100 placeholder-gray-300 border-white/20 focus:border-primary focus:ring-primary"
            />

            <Button
              type="submit"
              className="w-full py-2 text-lg font-semibold bg-primary text-white rounded-xl hover:brightness-110 transition"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-300">
            Já tem conta?{' '}
            <a href="/login" className="text-primary font-semibold hover:underline">
              Entrar
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
