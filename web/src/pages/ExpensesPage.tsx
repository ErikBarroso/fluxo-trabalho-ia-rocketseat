import { useEffect, useState } from 'react'
import { fetchExpenses } from '../api/expenses'
import type { Expense } from '../types/expense'

function formatCurrencyBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    cents / 100,
  )
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

