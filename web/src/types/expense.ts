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
  valorCentavos: number // usar centavos para precisão
  dataISO: string // ex.: '2025-01-31'
  categoria: Categoria
  status: Status
}

