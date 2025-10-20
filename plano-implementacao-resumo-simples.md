# Plano de Implementação (Simples) — Resumo do Mês

Escopo mínimo, direto do `resumo-mensal-ideias.md`:

- Header com título “Finanças pessoais”.
- Cards de resumo acima da tabela, sem filtros, sem responsividade específica, sem acessibilidade extra, sem exportação, sem testes.
- Usar TODOS os itens do mock (já estão em um único mês: 2025-01), evitando qualquer filtro por período.

Observação: Como o dataset atual só possui despesas, os cards focam em despesas (sem receitas, poupança ou orçamento).

---

## Task 2 — Utilitário de moeda (opcional)

Objetivo: formatação consistente de valores em BRL para os cards.

- Reusar a função `formatCurrencyBRL` existente em `src/pages/ExpensesPage.tsx`.
- Se preferir centralizar, criar `src/utils/format.ts` apenas com:

```ts
export function formatCurrencyBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}
```

---

## Task 3 — Componente do Header (estático)

Objetivo: exibir apenas o título “Finanças pessoais”.

- Arquivo: `src/components/financas/FinancasHeader.tsx`
- Conteúdo sugerido:

```tsx
export default function FinancasHeader() {
  return (
    <div className="financas-header">
      <h1>Finanças pessoais</h1>
    </div>
  );
}
```

- Integração: usar no slot `header` do `MasterPage`.

---

## Task 4 — Componente reutilizável de Card

Objetivo: um card simples para exibir título e valor (e subtítulo opcional).

- Arquivo: `src/components/ui/SummaryCard.tsx`
- Conteúdo sugerido:

```tsx
import type { ReactNode } from "react";

type Props = {
  title: string;
  value: ReactNode;
  subtitle?: string;
};

export default function SummaryCard({ title, value, subtitle }: Props) {
  return (
    <div className="summary-card">
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
      {subtitle && <div className="summary-subtitle">{subtitle}</div>}
    </div>
  );
}
```

---

## Task 5 — Componente MonthlySummary (grid de cards)

Objetivo: calcular métricas simples usando todos os itens do mock (sem filtros) e renderizar cards.

- Arquivo: `src/components/financas/MonthlySummary.tsx`
- Métricas (todas extraídas diretamente do `resumo-mensal-ideias.md` e possíveis com despesas):

  - Despesas do mês: soma de `valorCentavos` de todos os itens.
  - A pagar (pendentes): contagem e soma de itens com `status === 'Pendente'`.
  - Top categoria: categoria com maior soma de `valorCentavos` e percentual sobre o total.
  - Maior despesa: item com maior `valorCentavos` (mostrar nome e valor).

- Conteúdo sugerido (cálculos inline para simplicidade):

```tsx
import SummaryCard from "../ui/SummaryCard";
import type { Expense } from "../../types/expense";
import { useMemo } from "react";

function formatCurrencyBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

type Props = { expenses: Expense[] };

export default function MonthlySummary({ expenses }: Props) {
  const { total, pendentes, top, maior } = useMemo(() => {
    const total = expenses.reduce((acc, e) => acc + e.valorCentavos, 0);

    const pendentesList = expenses.filter((e) => e.status === "Pendente");
    const pendentes = {
      count: pendentesList.length,
      total: pendentesList.reduce((acc, e) => acc + e.valorCentavos, 0),
    };

    const porCategoria = new Map<string, number>();
    for (const e of expenses) {
      porCategoria.set(
        e.categoria,
        (porCategoria.get(e.categoria) || 0) + e.valorCentavos
      );
    }
    let top = null as null | {
      categoria: string;
      total: number;
      percent: number;
    };
    for (const [categoria, soma] of porCategoria) {
      if (!top || soma > top.total) {
        top = {
          categoria,
          total: soma,
          percent: total > 0 ? (soma / total) * 100 : 0,
        };
      }
    }

    let maior = null as null | Expense;
    for (const e of expenses) {
      if (!maior || e.valorCentavos > maior.valorCentavos) maior = e;
    }

    return { total, pendentes, top, maior };
  }, [expenses]);

  return (
    <div className="summary-grid">
      <SummaryCard title="Despesas do mês" value={formatCurrencyBRL(total)} />
      <SummaryCard
        title="A pagar"
        value={`${pendentes.count} itens — ${formatCurrencyBRL(
          pendentes.total
        )}`}
      />
      {top && (
        <SummaryCard
          title="Top categoria"
          value={`${top.categoria} — ${formatCurrencyBRL(top.total)}`}
          subtitle={`${top.percent.toFixed(0)}% das despesas`}
        />
      )}
      {maior && (
        <SummaryCard
          title="Maior despesa"
          value={`${maior.nome} — ${formatCurrencyBRL(maior.valorCentavos)}`}
        />
      )}
    </div>
  );
}
```

- Layout simples esperado (sem responsividade específica):
  - `.summary-grid` pode ser `display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;`
  - `.summary-card` pode herdar estilos semelhantes a `.panel` ou seguir a paleta existente.

---

## Task 6 — Integrar na página

Objetivo: mostrar header e cards acima da tabela existente.

- Arquivo: `src/pages/ExpensesPage.tsx`
- Passos:
  1. Importar `MasterPage`, `FinancasHeader`, `MonthlySummary`.
  2. Envolver conteúdo com `MasterPage` e passar `header={<FinancasHeader />}`.
  3. Renderizar `<MonthlySummary expenses={data} />` antes da tabela.

Exemplo resumido:

```tsx
import MasterPage from "../components/layout/MasterPage";
import FinancasHeader from "../components/financas/FinancasHeader";
import MonthlySummary from "../components/financas/MonthlySummary";

// ... estados existentes (data, loading)

if (loading) return <div className="panel table-scroll" />;

return (
  <MasterPage header={<FinancasHeader />}>
    <MonthlySummary expenses={data} />

    <div className="panel table-scroll">
      {/* tabela já existente aqui */}
      {/* ... */}
    </div>
  </MasterPage>
);
```

---

## Task 7 — Estilos mínimos (opcional)

Objetivo: apenas dar forma aos cards sem responsividade.

- Arquivo: `src/index.css` (ou onde preferir)
- Sugestão rápida:

```css
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 12px;
}
.summary-card {
  background: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  padding: 12px;
}
.summary-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}
.summary-value {
  font-size: 18px;
  font-weight: 600;
}
.summary-subtitle {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}
.financas-header h1 {
  font-size: 20px;
  margin: 0 0 12px;
}
```

---

## Resultado esperado

- Header “Finanças pessoais” visível no topo.
- Quatro cards acima da tabela:
  - Ticket médio
  - Valor pago = soma de todas pagas.
- Valores calculados usando todas as transações do mock (mês único), sem filtros ou interações adicionais.
