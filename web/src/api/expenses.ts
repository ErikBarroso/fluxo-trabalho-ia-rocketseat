import type { Expense } from "../types/expense";
import { mockExpenses } from "../mocks/expenses";

export async function fetchExpenses(): Promise<Expense[]> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return mockExpenses.map((e) => ({ ...e }));
}
