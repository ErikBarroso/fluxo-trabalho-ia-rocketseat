import { useEffect, useMemo, useState } from 'react'
import { fetchExpenses } from '../api/expenses'
import { formatCurrencyBRL } from '../utils/format'
import MasterPage from '../components/layout/MasterPage'
import FinancasHeader from '../components/financas/FinancasHeader'
import MonthlySummary from '../components/financas/MonthlySummary'
import type { Expense } from '../types/expense'

function formatDateBR(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR')
}

function StatusBadge({ status }: { status: Expense['status'] }) {
  const cls = status === 'Pago' ? 'badge badge-paid' : 'badge badge-pending'
  return <span className={cls} aria-label={`Status: ${status}`}>{status}</span>
}

export default function ExpensesPage() {
  const [data, setData] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const totalCents = useMemo(
    () => data.reduce((acc, item) => acc + item.valorCentavos, 0),
    [data],
  )

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
      <MasterPage header={<FinancasHeader />}>
        <div className="panel table-scroll" />
      </MasterPage>
    )
  }

  return (
    <MasterPage header={<FinancasHeader />}>
      <MonthlySummary expenses={data} />

      <div className="panel table-scroll">
        <table className="expenses-table" aria-label="Tabela de gastos do mês">
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
                <td>
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MasterPage>
  )
}
