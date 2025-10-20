import type { ReactNode } from 'react'

type Props = {
  title: string
  value: ReactNode
  subtitle?: string
}

export default function SummaryCard({ title, value, subtitle }: Props) {
  return (
    <div className="summary-card">
      <div className="summary-title">{title}</div>
      <div className="summary-value">{value}</div>
      {subtitle && <div className="summary-subtitle">{subtitle}</div>}
    </div>
  )
}
