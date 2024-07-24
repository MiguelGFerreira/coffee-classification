import { z } from "zod";

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

export const coffeeLotSchema = z.object({
  defeitos: z.string().min(1, "Defeitos são obrigatórios"),
  umidade: z.string().min(1, "Umidade é obrigatória"),
  fundo10: z.string().min(1, "Fundo #10 é obrigatório"),
  impurezas: z.string().min(1, "Impurezas são obrigatórias"),
  broca: z.string().min(1, "Broca é obrigatória"),
  ac18: z.string().min(1, "#18AC é obrigatório"),
  mk10: z.string().min(1, "#MK10 é obrigatório"),
  peneira17: z.string().min(1, "#17 é obrigatório"),
  p16: z.string().min(1, "#16 é obrigatório"),
  p15: z.string().min(1, "#15 é obrigatório"),
  p14: z.string().min(1, "#14 é obrigatório"),
  p13: z.string().min(1, "#13 é obrigatório"),
  p12: z.string().min(1, "#12 é obrigatório"),
  p10_11: z.string().min(1, "#10/11 é obrigatório"),
  cata: z.string().min(1, "Cata é obrigatória"),
});

// Export types from schema
export type zCoffeeLotSchema = z.infer<typeof coffeeLotSchema>;
