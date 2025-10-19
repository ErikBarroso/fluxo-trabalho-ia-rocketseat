# Tabela de Gastos — Guia Rápido

Objetivo: exibir uma tabela com as colunas Nome, Valor, Data, Categoria e Status. Usaremos uma “API” local (pasta `api/`) que retorna dados mockados (pasta `mocks/`), simulando uma requisição real sem backend.

---

## Task 1 — Criar o projeto React (Vite + TS)
```bash
mkdir web && cd web
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

---

## Task 2 — Estrutura mínima de pastas
```text
web/
  src/
    api/
      expenses.ts      # funções que simulam requisições (fetchExpenses)
    mocks/
      expenses.ts      # dados mockados usados pela “API”
    types/
      expense.ts       # tipagem do gasto
    pages/
      ExpensesPage.tsx # página com a tabela
    App.tsx            # renderiza a página
```

---

## Task 3 — Tipos e dados mock
Crie `web/src/types/expense.ts`:
```ts
export type Status = 'Pago' | 'Pendente'

export type Categoria =
  | 'Alimentação'
  | 'Transporte'
  | 'Moradia'
  | 'Lazer'
  | 'Saúde'
  | 'Educação'
  | 'Outros'

export interface Expense {
  id: string
  nome: string
  valorCentavos: number  // usar centavos para precisão
  dataISO: string        // ex.: '2025-01-31'
  categoria: Categoria
  status: Status
}
```

Crie `web/src/mocks/expenses.ts`:
```ts
import type { Expense } from '../types/expense'

export const mockExpenses: Expense[] = [
  {
    id: '1',
    nome: 'Supermercado',
    valorCentavos: 23590,
    dataISO: '2025-01-05',
    categoria: 'Alimentação',
    status: 'Pago',
  },
  {
    id: '2',
    nome: 'Transporte (App)',
    valorCentavos: 4590,
    dataISO: '2025-01-10',
    categoria: 'Transporte',
    status: 'Pendente',
  },
  {
    id: '3',
    nome: 'Aluguel',
    valorCentavos: 200000,
    dataISO: '2025-01-01',
    categoria: 'Moradia',
    status: 'Pago',
  },
]
```

---

## Task 4 — “API” simulada
Crie `web/src/api/expenses.ts`:
```ts
import type { Expense } from '../types/expense'
import { mockExpenses } from '../mocks/expenses'

export async function fetchExpenses(): Promise<Expense[]> {
  // Simula latência de rede
  await new Promise((r) => setTimeout(r, 350))
  return mockExpenses
}
```

---

## Task 5 — Página com a tabela
Crie `web/src/pages/ExpensesPage.tsx`:
```tsx
import { useEffect, useState } from 'react'
import { fetchExpenses } from '../api/expenses'
import type { Expense } from '../types/expense'

function formatCurrencyBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDateBR(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR')
}

export default function ExpensesPage() {
  const [data, setData] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchExpenses().then((res) => {
      if (!active) return
      setData(res)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <main className="container">
        <p>Carregando…</p>
      </main>
    )
  }

  return (
    <main className="container">
      <h1>Gastos do mês</h1>
      <div className="table-wrapper">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="num">Valor</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td className="num">{formatCurrencyBRL(item.valorCentavos)}</td>
                <td>
                  <time dateTime={item.dataISO}>{formatDateBR(item.dataISO)}</time>
                </td>
                <td>{item.categoria}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
```

No arquivo `web/src/index.css`, adicione um estilo simples para a tabela:
```css
.container { max-width: 960px; margin: 0 auto; padding: 24px; }
.table-wrapper { overflow-x: auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; }
.expenses-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.expenses-table thead th { background: #f9fafb; color: #374151; font-weight: 600; text-align: left; padding: 12px 16px; border-bottom: 1px solid #e5e7eb; }
.expenses-table tbody td { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; color: #374151; white-space: nowrap; }
.expenses-table tbody tr:nth-child(even) { background: #fafafa; }
.expenses-table tbody tr:hover { background: #f5f5f5; }
.expenses-table .num { text-align: right; font-variant-numeric: tabular-nums; }
```

---

## Task 6 — Conectar na aplicação
Edite `web/src/App.tsx`:
```tsx
import ExpensesPage from './pages/ExpensesPage'

export default function App() {
  return <ExpensesPage />
}
```

Rodar o projeto:
```bash
npm run dev
```

---

Pronto! Você terá a tabela com as 5 colunas e uma pasta `api` que simula a requisição usando os dados de `mocks`. Quando quiser, expandimos com filtros, ordenação e ações por linha.

