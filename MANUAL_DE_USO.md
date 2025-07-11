# FC Porto Career Hub - Manual de Uso Completo v1.0.0

**Autor:** Rodrigo Motti de Santana
**Data:** Julho de 2025  
**Versão:** 1.0.0

---

## Índice

1. [Introdução](#introdução)
2. [Instalação e Configuração](#instalação-e-configuração)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Guia de Uso das Telas](#guia-de-uso-das-telas)
5. [Gerenciamento de Dados](#gerenciamento-de-dados)
6. [Personalização e Edição](#personalização-e-edição)
7. [Solução de Problemas](#solução-de-problemas)
8. [Desenvolvimento e Contribuição](#desenvolvimento-e-contribuição)
9. [Roadmap e Funcionalidades Futuras](#roadmap-e-funcionalidades-futuras)

---

## Introdução

O **FC Porto Career Hub** é uma aplicação web desenvolvida em React que simula um sistema de gestão de carreira no modo carreira do FIFA/EA FC para o FC Porto. O sistema oferece uma interface completa para acompanhar estatísticas do elenco, transferências, dados financeiros, histórico de temporadas e muito mais.

### Características Principais

- **Interface Moderna**: Desenvolvida com React, Tailwind CSS e shadcn/ui
- **Dados Organizados**: Sistema modular de dados separados por categoria
- **Responsiva**: Funciona perfeitamente em desktop e dispositivos móveis
- **Personalizável**: Fácil edição de dados através de arquivos organizados
- **Completa**: Seis telas principais cobrindo todos os aspectos do clube

### Público-Alvo

Este sistema é ideal para:
- Jogadores de FIFA/EA FC que querem acompanhar sua carreira de forma detalhada
- Fãs do FC Porto que desejam simular a gestão do clube
- Desenvolvedores que querem um exemplo de aplicação React bem estruturada
- Qualquer pessoa interessada em sistemas de gestão esportiva

---

## Instalação e Configuração

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para controle de versão)

### Passo a Passo da Instalação

1. **Clone ou extraia o projeto**
   ```bash
   # Se usando Git
   git clone [url-do-repositorio]
   cd fc-porto-career-hub
   
   # Ou extraia o arquivo ZIP fornecido
   unzip fc-porto-career-hub-final.zip
   cd fc-porto-career-hub/fc-porto-career-hub
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador
   - Acesse `http://localhost:5173`
   - A aplicação estará rodando e pronta para uso

### Configuração Inicial

Após a instalação, você pode:

1. **Verificar os dados padrão** em `src/data/`
2. **Personalizar informações do clube** em `src/data/club/clubInfo.js`
3. **Atualizar dados dos jogadores** em `src/data/players/squad.js`
4. **Configurar dados da temporada** em `src/data/seasons/seasonStats.js`

---

## Estrutura do Projeto

### Organização de Arquivos

```
fc-porto-career-hub/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes de interface (shadcn/ui)
│   │   ├── Dashboard.jsx  # Tela principal
│   │   ├── Players.jsx    # Gestão do elenco
│   │   ├── Statistics.jsx # Estatísticas da temporada
│   │   ├── History.jsx    # Histórico do clube
│   │   ├── Financial.jsx  # Dados financeiros
│   │   ├── Transfers.jsx  # Transferências
│   │   └── Formation.jsx  # Escalação titular
│   ├── data/              # Dados organizados
│   │   ├── players/       # Dados dos jogadores
│   │   ├── seasons/       # Dados das temporadas
│   │   ├── transfers/     # Histórico de transferências
│   │   ├── financial/     # Dados financeiros
│   │   ├── club/          # Informações do clube
│   │   └── index.js       # Arquivo principal de dados
│   ├── hooks/             # Hooks personalizados
│   ├── lib/               # Utilitários
│   └── main.jsx           # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts
└── vite.config.js         # Configuração do Vite
```

### Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e servidor de desenvolvimento
- **Tailwind CSS**: Framework de CSS utilitário
- **shadcn/ui**: Biblioteca de componentes
- **Lucide React**: Ícones
- **Recharts**: Gráficos e visualizações
- **React Router**: Navegação (se aplicável)

---

## Guia de Uso das Telas

### 1. Dashboard (Visão Geral)

A tela principal oferece uma visão geral completa do clube:

#### Estatísticas Principais
- **Elenco Total**: Número de jogadores registrados
- **Média de Idade**: Idade média do elenco
- **Posição Liga**: Posição atual na liga com pontos
- **Valor do Elenco**: Valor total estimado do plantel

#### Resumo da Temporada
Exibe estatísticas da temporada atual:
- Vitórias, empates e derrotas
- Gols marcados
- Dados extraídos automaticamente de `seasonStats`

#### Artilheiros da Temporada
- Lista os top 3 artilheiros
- Botão "Ver todos" para lista completa
- Mostra gols e assistências de cada jogador

#### Jovens Talentos
- Jogadores com idade ≤ 23 anos e potencial ≥ 85
- Exibe progressão (Overall → Potencial)
- Valor de mercado atual

#### Escalação Titular
- Visualização da formação tática
- Campo de futebol com posições dos jogadores
- **Modo somente leitura** (botão de edição removido)

### 2. Elenco

Gestão completa do plantel:

#### Filtros Disponíveis
- **Por Setor**: Defesa, Meio-campo, Ataque
- **Por Função**: Crucial, Importante, Rodizio, Promessa, Esporádico
- **Busca por Nome**: Campo de pesquisa dinâmica

#### Informações dos Jogadores
Cada jogador exibe:
- **Dados Básicos**: Nome, idade, nacionalidade
- **Posição e Função**: Com diferenciação de cores por setor
- **Atributos**: Overall, potencial, valor de mercado
- **Contrato**: Salário semanal e ano de término
- **Estatísticas**: Jogos, gols, assistências, nota média

#### Diferenciação por Cores
- **Goleiro**: Amarelo
- **Defesa**: Azul  
- **Meio-campo**: Verde
- **Ataque**: Vermelho

#### Modal de Detalhes
Clique em qualquer jogador para ver:
- Informações completas
- Estatísticas detalhadas da temporada
- Histórico de desempenho

### 3. Estatísticas

Análise detalhada da temporada:

#### Resumo da Temporada
- **Jogos**: Total de partidas disputadas
- **Vitórias**: Número de vitórias
- **Gols Sofridos**: Total de gols sofridos (substitui pontos)

#### Rankings de Performance
Três categorias principais:

1. **Artilheiros**
   - Top 3 na tela principal
   - Modal "Ver todos" com lista completa
   - Ordenação por gols decrescente

2. **Assistentes**
   - Top 3 assistentes da temporada
   - Modal com todos os jogadores com assistências
   - Inclui gols de cada jogador

3. **Melhores Notas**
   - Jogadores com melhor média de nota
   - Modal com classificação completa
   - Estatísticas de gols e assistências

#### Funcionalidade "Ver Todos"
- Modais expansivos para cada categoria
- Listas completas e ordenadas
- Informações detalhadas de cada jogador
- Design responsivo para diferentes tamanhos de tela

### 4. História

Registros históricos do clube:

#### Resumo Histórico
- **Títulos Conquistados**: Temporadas em 1º lugar
- **Total de Jogos**: Soma de todas as temporadas
- **Total de Vitórias**: Vitórias acumuladas
- **Total de Gols**: Gols marcados historicamente

#### Rankings Históricos

1. **Maiores Artilheiros**
   - Baseado apenas em dados de 2024/25 em diante
   - Lista dos 5 maiores goleadores
   - Temporadas de atuação

2. **Maiores Assistentes**
   - Top 5 assistentes da história recente
   - Dados apenas de temporadas registradas
   - Posição e temporada de cada jogador

#### Novos Rankings Financeiros

1. **Maiores Valores de Mercado**
   - Top 5 jogadores por valor atual
   - Posição e idade de cada jogador
   - Valores atualizados do mercado

2. **Maiores Compras**
   - Aquisições mais caras da história
   - Clube de origem
   - Temporada da transferência

3. **Maiores Vendas**
   - Vendas mais lucrativas
   - **Ordenação corrigida** por valor
   - Clube de destino

#### Histórico de Temporadas
- Lista de todas as temporadas registradas
- Estatísticas completas de cada temporada
- Possibilidade de adicionar novas temporadas
- Edição de dados existentes

### 5. Financeiro

Gestão financeira do clube:

#### Resumo Financeiro
Quatro cards principais:
- **Receitas (Vendas)**: €37M na temporada 2024/25
- **Gastos (Compras)**: €15M em aquisições
- **Saldo Líquido**: +€22M de lucro
- **Folha Salarial**: €2.1M por semana

#### Gráficos de Transferências

1. **Transferências por Temporada**
   - **Dados apenas de 2024/25** (conforme solicitado)
   - Barras diferenciadas para compras e vendas
   - Tooltip corrigido: "Compras" e "Vendas"
   - Cores distintas para fácil identificação

2. **Gastos Semanais da Folha Salarial**
   - **Apenas temporada 2024/25**
   - Evolução dos gastos com salários
   - Dados em milhões de euros por semana

#### Top 10 Maiores Salários
- Lista dos jogadores mais bem pagos
- **Opção "Ver todos"** com modal expansivo
- Três visualizações: Semanal, Mensal, Anual
- Botões para alternar entre períodos
- Informações de posição e função

#### Distribuição de Salários por Função
- **Gráfico de pizza** por função (não por posição)
- Categorias: Crucial, Importante, Rodizio, Promessa, Esporádico
- Valores totais e percentuais
- Cores diferenciadas para cada função

### 6. Transferências

Gestão completa de transferências:

#### Resumo Financeiro
Cards com estatísticas da temporada:
- **Total Investido**: Gastos com aquisições
- **Total Recebido**: Receitas com vendas
- **Saldo Líquido**: **Calculado automaticamente** do balanço financeiro
- **Total de Transferências**: Número de movimentações

#### Filtros e Busca
- **Busca por Nome**: Jogador ou clube
- **Filtro por Tipo**: Entrada, Saída, Empréstimo, Renovação
- **Filtro por Temporada**: Todas as temporadas disponíveis

#### Lista de Transferências
Cada transferência mostra:
- **Tipo**: Badge colorido por categoria
- **Jogador**: Nome do atleta
- **Clubes**: Origem e destino
- **Valor**: Taxa de transferência
- **Data**: Data da operação

#### Tipos de Transferência
- **Entrada**: Jogador chegou ao clube (verde)
- **Saída**: Jogador saiu do clube (vermelho)
- **Empréstimo (Entrada)**: Chegada por empréstimo (azul)
- **Empréstimo (Saída)**: Saída por empréstimo (laranja)
- **Renovação**: Renovação de contrato (roxo)

#### Funcionalidades Avançadas
- **Adicionar Transferência**: Formulário completo
- **Editar Transferência**: Modificar dados existentes
- **Excluir Transferência**: Remoção com confirmação
- **Ordenação**: Por data (mais recentes primeiro)

---

## Gerenciamento de Dados

### Estrutura de Dados Organizada

O sistema utiliza uma estrutura modular para facilitar a edição e manutenção:

#### 1. Dados dos Jogadores (`src/data/players/squad.js`)

```javascript
{
  id: 1,                    // ID único
  name: "Diogo Costa",      // Nome completo
  position: "GK",           // Posição (GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST)
  function: "Crucial",      // Importância (Crucial, Importante, Rodizio, Promessa, Esporadico)
  age: 25,                  // Idade
  nationality: "Portugal",  // Nacionalidade
  overall: 84,              // Nota atual (0-99)
  potential: 89,            // Potencial máximo (0-99)
  salary: "€20,000",        // Salário semanal
  marketValue: "€52M",      // Valor de mercado
  contract: "2027",         // Ano de término do contrato
  stats: {                  // Estatísticas da temporada
    appearances: 12,        // Jogos
    goals: 0,              // Gols
    assists: 0,            // Assistências
    cleanSheets: 7,        // Jogos sem sofrer gols (goleiros)
    rating: 7.8            // Nota média
  }
}
```

#### 2. Dados das Temporadas (`src/data/seasons/seasonStats.js`)

```javascript
{
  season: "2024/25",        // Nome da temporada
  matches: 18,              // Jogos disputados
  wins: 14,                 // Vitórias
  draws: 3,                 // Empates
  losses: 1,                // Derrotas
  goalsFor: 42,             // Gols marcados
  goalsAgainst: 12,         // Gols sofridos
  points: 45,               // Pontos conquistados
  position: 2               // Posição na liga
}
```

#### 3. Histórico de Transferências (`src/data/transfers/transferHistory.js`)

```javascript
{
  id: 1,                           // ID único
  playerName: "João Mário",        // Nome do jogador
  type: "Entrada",                 // Tipo da transferência
  fromClub: "Benfica",             // Clube de origem
  toClub: "FC Porto",              // Clube de destino
  fee: "€15M",                     // Taxa da transferência
  date: "2024-07-15",              // Data (YYYY-MM-DD)
  season: "2024/25"                // Temporada
}
```

#### 4. Dados Financeiros (`src/data/financial/financialData.js`)

Inclui:
- **Balanço da temporada atual**
- **Dados de transferências por temporada**
- **Gastos semanais com salários**
- **Maiores compras da história**
- **Maiores vendas da história**
- **Maiores valores de mercado atuais**

#### 5. Informações do Clube (`src/data/club/clubInfo.js`)

```javascript
{
  name: "FC Porto",
  founded: 1893,
  stadium: "Estádio do Dragão",
  capacity: 50033,
  manager: "Sérgio Conceição",
  league: "Liga Portugal",
  budget: "€45M",
  wage: "€2.1M/week"
}
```

### Como Editar os Dados

#### Adicionando um Novo Jogador

1. Abra `src/data/players/squad.js`
2. Adicione um novo objeto ao array `fcPortoPlayers`:

```javascript
{
  id: 31,                    // Próximo ID disponível
  name: "Novo Jogador",
  position: "ST",
  function: "Promessa",
  age: 20,
  nationality: "Portugal",
  overall: 70,
  potential: 85,
  salary: "€8,000",
  marketValue: "€5M",
  contract: "2028",
  stats: { 
    appearances: 0, 
    goals: 0, 
    assists: 0, 
    cleanSheets: 0, 
    rating: 0 
  }
}
```

#### Atualizando Estatísticas da Temporada

1. Abra `src/data/seasons/seasonStats.js`
2. Modifique os valores da temporada atual:

```javascript
{
  season: "2024/25",
  matches: 20,              // Atualizar número de jogos
  wins: 16,                 // Atualizar vitórias
  draws: 3,
  losses: 1,
  goalsFor: 48,             // Atualizar gols marcados
  goalsAgainst: 14,         // Atualizar gols sofridos
  points: 51,               // Atualizar pontos
  position: 1               // Atualizar posição
}
```

#### Adicionando uma Nova Transferência

1. Abra `src/data/transfers/transferHistory.js`
2. Adicione ao array `transferHistory`:

```javascript
{
  id: 8,                    // Próximo ID
  playerName: "Novo Jogador",
  type: "Entrada",
  fromClub: "Clube Origem",
  toClub: "FC Porto",
  fee: "€20M",
  date: "2025-01-15",
  season: "2024/25"
}
```

#### Atualizando Dados Financeiros

1. Abra `src/data/financial/financialData.js`
2. Modifique os valores conforme necessário:

```javascript
export const currentSeasonBalance = {
  receitas: 45000000,       // Atualizar receitas
  gastos: 20000000,         // Atualizar gastos
  saldoLiquido: 25000000,   // Atualizar saldo
  folhaSalarial: 115000000  // Atualizar folha salarial
};
```

### Validação de Dados

Ao editar dados, certifique-se de:

1. **IDs únicos**: Cada jogador/transferência deve ter ID único
2. **Formatos corretos**: 
   - Datas: "YYYY-MM-DD"
   - Valores: "€XM" ou "€X.XM"
   - Salários: "€X,XXX"
3. **Posições válidas**: GK, CB, LB, RB, CDM, CM, CAM, LW, RW, ST
4. **Funções válidas**: Crucial, Importante, Rodizio, Promessa, Esporadico
5. **Tipos de transferência**: Entrada, Saída, Empréstimo (Entrada), Empréstimo (Saída), Renovação

---

## Personalização e Edição

### Cores e Temas

#### Cores por Setor (em `src/data/club/clubInfo.js`)

```javascript
export const sectorColors = {
  goleiro: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300"
  },
  defesa: {
    bg: "bg-blue-100", 
    text: "text-blue-800",
    border: "border-blue-300"
  },
  meio: {
    bg: "bg-green-100",
    text: "text-green-800", 
    border: "border-green-300"
  },
  ataque: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300"
  }
};
```

Para alterar as cores:
1. Modifique as classes Tailwind CSS
2. Use o padrão: `bg-[cor]-100`, `text-[cor]-800`, `border-[cor]-300`
3. Cores disponíveis: red, blue, green, yellow, purple, pink, indigo, etc.

#### Personalizando Informações do Clube

Edite `src/data/club/clubInfo.js`:

```javascript
export const clubInfo = {
  name: "Seu Clube",              // Nome do clube
  founded: 1900,                  // Ano de fundação
  stadium: "Seu Estádio",         // Nome do estádio
  capacity: 40000,                // Capacidade
  manager: "Seu Técnico",         // Nome do técnico
  league: "Sua Liga",             // Nome da liga
  budget: "€30M",                 // Orçamento
  wage: "€1.8M/week"              // Folha salarial semanal
};
```

### Adicionando Novas Funcionalidades

#### Criando um Novo Campo para Jogadores

1. **Adicione o campo aos dados**:
```javascript
// Em src/data/players/squad.js
{
  id: 1,
  name: "Jogador",
  // ... outros campos
  newField: "Novo Valor",         // Novo campo
}
```

2. **Atualize a interface**:
```jsx
// Em src/components/Players.jsx
<div className="text-sm text-muted-foreground">
  {player.newField}
</div>
```

#### Adicionando Nova Estatística

1. **Atualize a estrutura de stats**:
```javascript
stats: { 
  appearances: 12,
  goals: 0,
  assists: 0,
  cleanSheets: 7,
  rating: 7.8,
  newStat: 5                      // Nova estatística
}
```

2. **Exiba na interface**:
```jsx
<div>Nova Stat: {player.stats.newStat}</div>
```

### Modificando Layout e Design

#### Alterando Grid de Cards

Para mudar o layout dos cards principais:

```jsx
// De 4 colunas para 3 colunas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Para 5 colunas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
```

#### Personalizando Cores dos Gráficos

Em componentes com gráficos (Financial.jsx, Statistics.jsx):

```javascript
// Cores personalizadas para gráficos
const COLORS = [
  '#003366',    // Azul escuro (cor principal do Porto)
  '#FFD700',    // Dourado
  '#0066CC',    // Azul claro
  '#FF6B35',    // Laranja
  '#4ECDC4'     // Verde água
];
```

#### Modificando Tamanhos de Componentes

```jsx
// Altura de gráficos
<ResponsiveContainer width="100%" height={400}>  // Era 300

// Altura mínima de cards
<div className="min-h-[400px]">  // Era min-h-[300px]

// Largura máxima de modais
<DialogContent className="max-w-4xl">  // Era max-w-2xl
```

---

## Solução de Problemas

### Problemas Comuns

#### 1. Erro "Cannot read property of undefined"

**Causa**: Dados ausentes ou estrutura incorreta
**Solução**:
```javascript
// Use optional chaining
player.stats?.goals || 0

// Ou valores padrão
const goals = player.stats && player.stats.goals ? player.stats.goals : 0;
```

#### 2. Gráficos não aparecem

**Causa**: Dados em formato incorreto
**Solução**:
```javascript
// Certifique-se que os dados são arrays válidos
const chartData = Array.isArray(data) ? data : [];

// Verifique se os campos existem
const validData = data.filter(item => item.value !== undefined);
```

#### 3. Cores não aplicadas corretamente

**Causa**: Classes Tailwind não reconhecidas
**Solução**:
1. Verifique se as classes estão no formato correto
2. Use apenas classes padrão do Tailwind
3. Reinicie o servidor de desenvolvimento

#### 4. Modal não abre

**Causa**: Estado não gerenciado corretamente
**Solução**:
```jsx
// Certifique-se que o estado está sendo usado
const [isOpen, setIsOpen] = useState(false);

// E que está sendo passado corretamente
<Dialog open={isOpen} onOpenChange={setIsOpen}>
```

#### 5. Dados não atualizam

**Causa**: Cache do navegador ou importação incorreta
**Solução**:
1. Limpe o cache do navegador (Ctrl+F5)
2. Verifique se está importando do arquivo correto
3. Reinicie o servidor de desenvolvimento

### Debugging

#### Console do Navegador

Use o console para debugar:

```javascript
// Verificar dados carregados
console.log('Jogadores:', fcPortoPlayers);
console.log('Temporadas:', seasonStats);

// Verificar filtros
console.log('Jogadores filtrados:', filteredPlayers);

// Verificar cálculos
console.log('Média de idade:', averageAge);
```

#### React Developer Tools

1. Instale a extensão React Developer Tools
2. Abra as ferramentas de desenvolvedor (F12)
3. Vá para a aba "Components"
4. Inspecione o estado dos componentes

#### Verificação de Dados

Crie uma função de validação:

```javascript
// Em src/data/validation.js
export const validatePlayerData = (players) => {
  return players.every(player => {
    return player.id && 
           player.name && 
           player.position && 
           player.stats &&
           typeof player.stats.goals === 'number';
  });
};
```

### Performance

#### Otimizações Recomendadas

1. **Memoização de cálculos pesados**:
```jsx
const expensiveCalculation = useMemo(() => {
  return players.reduce((sum, player) => sum + player.value, 0);
}, [players]);
```

2. **Lazy loading de componentes**:
```jsx
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

3. **Virtualização para listas grandes**:
```jsx
// Para listas com muitos itens, considere react-window
import { FixedSizeList as List } from 'react-window';
```

---

## Desenvolvimento e Contribuição

### Estrutura de Desenvolvimento

#### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Verifica código com ESLint

# Testes (se configurados)
npm run test         # Executa testes
npm run test:watch   # Testes em modo watch
```

#### Padrões de Código

1. **Nomenclatura**:
   - Componentes: PascalCase (`PlayerCard.jsx`)
   - Funções: camelCase (`calculateAge`)
   - Constantes: UPPER_SNAKE_CASE (`MAX_PLAYERS`)

2. **Estrutura de Componentes**:
```jsx
/**
 * Documentação do componente
 */
const ComponentName = ({ prop1, prop2 }) => {
  // ==================== ESTADO ====================
  const [state, setState] = useState(initialValue);
  
  // ==================== EFEITOS ====================
  useEffect(() => {
    // Efeitos aqui
  }, [dependencies]);
  
  // ==================== FUNÇÕES ====================
  const handleFunction = () => {
    // Lógica aqui
  };
  
  // ==================== RENDERIZAÇÃO ====================
  return (
    <div>
      {/* JSX aqui */}
    </div>
  );
};
```

3. **Comentários**:
   - Use JSDoc para funções
   - Comente seções complexas
   - Explique o "porquê", não o "o quê"

#### Adicionando Novas Telas

1. **Crie o componente**:
```jsx
// src/components/NewScreen.jsx
const NewScreen = () => {
  return (
    <div className="space-y-6">
      <h1>Nova Tela</h1>
      {/* Conteúdo aqui */}
    </div>
  );
};

export default NewScreen;
```

2. **Adicione ao roteamento** (se usando React Router):
```jsx
// src/App.jsx
import NewScreen from './components/NewScreen';

// Adicione a rota
<Route path="/new-screen" element={<NewScreen />} />
```

3. **Atualize a navegação**:
```jsx
// src/components/Header.jsx
const tabs = [
  // ... outras abas
  { id: 'new-screen', label: 'Nova Tela', icon: NewIcon }
];
```

#### Contribuindo com Melhorias

1. **Fork do projeto**
2. **Crie uma branch para sua feature**:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Faça suas alterações**
4. **Teste thoroughly**
5. **Commit com mensagens descritivas**:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```
6. **Push e crie Pull Request**

### Extensões Recomendadas

Para desenvolvimento, instale:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Auto Rename Tag**
4. **Bracket Pair Colorizer**
5. **GitLens**
6. **Prettier - Code formatter**
7. **ESLint**

### Configuração do Ambiente

#### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)",
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

#### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

---

## Roadmap e Funcionalidades Futuras

### Versão 1.1.0 (Próxima Release)

#### Funcionalidades Planejadas

1. **Sistema de Autenticação**
   - Login/logout de usuários
   - Múltiplos perfis de carreira
   - Dados salvos na nuvem

2. **Comparação de Temporadas**
   - Gráficos de evolução
   - Comparação lado a lado
   - Tendências de performance

3. **Relatórios Avançados**
   - Exportação para PDF
   - Relatórios personalizados
   - Análises estatísticas

4. **Modo Escuro**
   - Toggle entre temas
   - Preferências salvas
   - Cores adaptadas

#### Melhorias Técnicas

1. **API Integration**
   - Backend para dados dinâmicos
   - Sincronização em tempo real
   - Backup automático

2. **Performance**
   - Lazy loading de componentes
   - Otimização de re-renders
   - Cache inteligente

3. **Mobile First**
   - PWA (Progressive Web App)
   - Instalação no dispositivo
   - Funcionamento offline

### Versão 1.2.0 (Médio Prazo)

#### Funcionalidades Avançadas

1. **Simulador de Transferências**
   - Calculadora de valores
   - Impacto financeiro
   - Sugestões de mercado

2. **Análise Tática**
   - Estatísticas posicionais
   - Análise de formações


#### Expansão de Dados

1. **Histórico Completo**
   - Dados de temporadas anteriores
   - Estatísticas históricas
   - Evolução de jogadores

2. **Scouting System**
   - Base de dados de jogadores
   - Relatórios de observação
   - Recomendações de contratação

3. **Academia**
   - Jogadores da base
   - Progressão de jovens
   - Sistema de promoção

### Versão 2.0.0 (Longo Prazo)

#### Revolução da Plataforma

1. **Multi-Clube**
   - Gestão de múltiplos clubes
   - Diferentes ligas
   - Comparações globais

2. **IA Integrada**
   - Assistente virtual
   - Análises preditivas
   - Sugestões inteligentes



### Como Contribuir com o Roadmap

#### Sugestões de Funcionalidades

1. **Abra uma Issue** no repositório
2. **Descreva detalhadamente** a funcionalidade
3. **Explique o valor** para os usuários
4. **Proponha implementação** se possível

#### Votação de Prioridades

- Participe das discussões
- Vote nas funcionalidades desejadas
- Compartilhe casos de uso
- Teste versões beta

#### Desenvolvimento Colaborativo

- Implemente funcionalidades menores
- Melhore documentação
- Reporte bugs
- Otimize performance

---

## Conclusão

O **FC Porto Career Hub v1.0.0** representa uma base sólida para gestão de carreira no FIFA/EA FC. Com sua arquitetura modular, interface intuitiva e dados organizados, oferece uma experiência completa para acompanhar e gerenciar todos os aspectos de um clube.

### Principais Conquistas da v1.0.0

1. **Interface Completa**: Seis telas cobrindo todos os aspectos do clube
2. **Dados Organizados**: Sistema modular para fácil edição
3. **Design Responsivo**: Funciona em todos os dispositivos
4. **Performance Otimizada**: Carregamento rápido e navegação fluida
5. **Código Documentado**: Fácil manutenção e extensão

### Próximos Passos

1. **Teste a aplicação** com seus dados
2. **Personalize** conforme suas necessidades
3. **Contribua** com sugestões e melhorias
4. **Acompanhe** as próximas versões
5. **Compartilhe** com a comunidade

### Suporte e Comunidade

Para dúvidas, sugestões ou problemas:

- **Documentação**: Este manual completo
- **Issues**: Reporte bugs e solicite funcionalidades
- **Discussões**: Participe das conversas da comunidade
- **Wiki**: Contribua com tutoriais e guias

---

**Desenvolvido por Rodrigo Motti de Santana**  
**FC Porto Career Hub v1.0.0 - Janeiro 2025**

*"Mais que um sistema, uma paixão pelo futebol e pela gestão esportiva."*

