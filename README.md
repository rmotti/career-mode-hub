# FC Porto Career Hub - Modo Carreira FC25

Uma interface web moderna e intuitiva para gerenciar seu time no modo carreira do EA Sports FC 25, com foco no FC Porto.

## 🎯 Funcionalidades

### 📊 Dashboard Principal
- Resumo geral do elenco (total de jogadores, posição na liga, valor do elenco)
- Estatísticas da temporada atual (vitórias, empates, derrotas, gols)
- Top artilheiros da temporada
- Jovens talentos com maior potencial

### 👥 Gestão de Jogadores
- Lista completa do elenco com cards detalhados
- Filtros por posição e busca por nome
- Informações detalhadas de cada jogador:
  - Dados pessoais (idade, nacionalidade)
  - Overall e potencial com indicadores visuais
  - Salário e valor de mercado
  - Estatísticas da temporada atual
  - Status do contrato

### 📈 Estatísticas Históricas
- Gráficos de evolução por temporada
- Distribuição de jogadores por posição
- Rankings de performance (artilheiros, assistências, melhores notas)
- Análise detalhada por posição
- Comparação entre temporadas

### 🔄 Histórico de Transferências
- Registro completo de entradas e saídas
- Resumo financeiro (investido, recebido, saldo líquido)
- Filtros por tipo de transferência e temporada
- Análise por temporada com balanço financeiro
- Botão para registrar novas transferências

## 🎨 Design

- **Identidade Visual**: Cores oficiais do FC Porto (azul e dourado)
- **Interface Moderna**: Design limpo e profissional
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Intuitivo**: Navegação simples e clara

## 🚀 Como Usar

### Instalação
```bash
# Clone ou baixe o projeto
cd fc-porto-career-hub

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev
```

### Navegação
1. **Dashboard**: Visão geral do seu time e temporada
2. **Jogadores**: Gerencie seu elenco, veja detalhes e estatísticas
3. **Estatísticas**: Analise a evolução histórica do time
4. **Transferências**: Controle o mercado e histórico financeiro

### Personalização dos Dados

Os dados dos jogadores estão em `src/data/mockData.js`. Você pode:

1. **Atualizar jogadores existentes**: Modifique as estatísticas, valores e contratos
2. **Adicionar novos jogadores**: Inclua novos membros do elenco
3. **Registrar transferências**: Adicione entradas e saídas
4. **Atualizar estatísticas**: Modifique dados das temporadas

#### Exemplo de jogador:
```javascript
{
  id: 1,
  name: "Diogo Costa",
  position: "GK",
  age: 24,
  nationality: "Portugal",
  overall: 84,
  potential: 89,
  salary: "€45,000",
  marketValue: "€35M",
  contract: "2027",
  stats: {
    appearances: 28,
    goals: 0,
    assists: 2,
    cleanSheets: 15,
    rating: 7.8
  }
}
```

## 🛠️ Tecnologias

- **React 18**: Framework principal
- **Tailwind CSS**: Estilização
- **shadcn/ui**: Componentes de interface
- **Recharts**: Gráficos e visualizações
- **Lucide Icons**: Ícones
- **Vite**: Build tool

## 📱 Recursos Especiais

- **Indicadores de Potencial**: Estrelas visuais para jovens talentos
- **Cores por Posição**: Badges coloridos para fácil identificação
- **Gráficos Interativos**: Visualizações dinâmicas das estatísticas
- **Filtros Avançados**: Busca e filtros em todas as seções
- **Dados Persistentes**: Informações mantidas localmente

## 🎮 Dicas de Uso

1. **Atualize regularmente**: Mantenha os dados sincronizados com seu jogo
2. **Use os filtros**: Encontre rapidamente jogadores específicos
3. **Monitore jovens talentos**: Acompanhe a evolução dos promissores
4. **Controle financeiro**: Use a seção de transferências para análise de ROI
5. **Compare temporadas**: Use as estatísticas para identificar tendências

## 🔧 Desenvolvimento

Para contribuir ou modificar:

```bash
# Estrutura do projeto
src/
├── components/          # Componentes React
├── data/               # Dados mock
├── assets/             # Imagens e recursos
└── App.jsx            # Componente principal
```

## 📄 Licença

Projeto desenvolvido para uso pessoal no modo carreira do EA Sports FC 25.

---

**Força Porto! 💙🐉**

