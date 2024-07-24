export interface CoffeeLot {
  idlote: number;
  data_entrada: string;
  referencia: string;
  valor_total: number;
  descricao: string;
  numLote: string;
  qtd_sacas: number;
  qtd_kg: number;
  pesoliquido: number;
  corretor: string;
  nome: string;
  cidade: string;
  status?: string;
}
