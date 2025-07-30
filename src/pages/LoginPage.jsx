import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/common/card';
import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Simulação de login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002147] via-[#003366] to-[#00172d] p-4">
      <Card className="w-full max-w-md shadow-xl border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden">
        <CardHeader className="text-center space-y-2 pt-6">
          <CardTitle className="text-3xl font-bold text-white tracking-wide">Career Hub</CardTitle>
          <p className="text-sm text-gray-300">Gerencie sua equipe e conquiste títulos</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
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
            >
              Entrar no Clube
            </Button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-300">
            Novo por aqui?{' '}
            <a href="/register" className="text-primary font-semibold hover:underline">
              Criar conta
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
