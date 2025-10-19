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

