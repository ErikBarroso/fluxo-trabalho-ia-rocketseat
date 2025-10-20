import { useMemo } from 'react'
import SummaryCard from '../ui/SummaryCard'
import type { Expense } from '../../types/expense'
import { formatCurrencyBRL } from '../../utils/format'

type Props = {
  expenses: Expense[]
}

export default function MonthlySummary({ expenses }: Props) {
  const { total, valorPago, pendentes, topCategoria, maiorDespesa, ticketMedio } = useMemo(() => {
    let total = 0
    let valorPago = 0
    let pendentesQuantidade = 0
    let pendentesValor = 0
    const somaPorCategoria = new Map<string, number>()
    let maiorDespesa: Expense | null = null

    for (const item of expenses) {
      total += item.valorCentavos

      somaPorCategoria.set(
        item.categoria,
        (somaPorCategoria.get(item.categoria) || 0) + item.valorCentavos,
      )

      if (item.status === 'Pendente') {
        pendentesQuantidade += 1
        pendentesValor += item.valorCentavos
      }

      if (item.status === 'Pago') {
        valorPago += item.valorCentavos
      }

      if (!maiorDespesa || item.valorCentavos > maiorDespesa.valorCentavos) {
        maiorDespesa = item
      }
    }

    let topCategoria: null | { categoria: string; total: number; percent: number } = null
    for (const [categoria, soma] of somaPorCategoria) {
      if (!topCategoria || soma > topCategoria.total) {
        topCategoria = {
          categoria,
          total: soma,
          percent: total > 0 ? (soma / total) * 100 : 0,
        }
      }
    }

    const ticketMedio = expenses.length > 0 ? Math.round(total / expenses.length) : null

    return {
      total,
      valorPago,
      pendentes: { count: pendentesQuantidade, total: pendentesValor },
      topCategoria,
      maiorDespesa,
      ticketMedio,
    }
  }, [expenses])

  return (
    <div className="summary-grid">
      <SummaryCard title="Despesas do mês" value={formatCurrencyBRL(total)} />

      <SummaryCard title="Valor pago" value={formatCurrencyBRL(valorPago)} />

      {ticketMedio !== null && (
        <SummaryCard title="Ticket médio" value={formatCurrencyBRL(ticketMedio)} />
      )}

      <SummaryCard
        title="A pagar"
        value={`${pendentes.count} itens — ${formatCurrencyBRL(pendentes.total)}`}
      />

      {topCategoria && (
        <SummaryCard
          title="Top categoria"
          value={`${topCategoria.categoria} — ${formatCurrencyBRL(topCategoria.total)}`}
          subtitle={`${topCategoria.percent.toFixed(0)}% das despesas`}
        />
      )}

      {maiorDespesa && (
        <SummaryCard
          title="Maior despesa"
          value={`${maiorDespesa.nome} — ${formatCurrencyBRL(maiorDespesa.valorCentavos)}`}
        />
      )}
    </div>
  )
}
