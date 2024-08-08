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
  status: string;
  clas_id?: number;
  clas_defeitoS?: number;
  clas_umidade?: number;
  clas_fundo10?: number;
  clas_impurezas?: number;
  clas_broca?: number;
  clas_ac18?: number;
  clas_peneira17?: number;
  clas_moka10?: number;
  clas_peneira16?: number;
  clas_peneira15?: number;
  clas_peneira14?: number;
  clas_peneira13?: number;
  clas_peneira12?: number;
  clas_peneira10_11?: number;
  clas_cata?: number;
  clas_resultado?: string;
  clas_pagamento?: string;
  clas_usuario?: string;
  clas_editado?: string;
}

export const coffeeLotSchema = z.object({
  defeitos: z.coerce.number().min(0, "Defeitos são obrigatórios"),
  umidade: z.coerce.number().min(0, "Umidade é obrigatória"),
  fundo10: z.coerce.number().min(0, "Fundo #10 é obrigatório"),
  impurezas: z.coerce.number().min(0, "Impurezas são obrigatórias"),
  broca: z.coerce.number().min(0, "Broca é obrigatória"),
  ac18: z.coerce.number().min(0, "#18AC é obrigatório"),
  moka10: z.coerce.number().min(0, "#MK10 é obrigatório"),
  peneira17: z.coerce.number().min(0, "#17 é obrigatório"),
  peneira16: z.coerce.number().min(0, "#16 é obrigatório"),
  peneira15: z.coerce.number().min(0, "#15 é obrigatório"),
  peneira14: z.coerce.number().min(0, "#14 é obrigatório"),
  peneira13: z.coerce.number().min(0, "#13 é obrigatório"),
  peneira12: z.coerce.number().min(0, "#12 é obrigatório"),
  peneira10_11: z.coerce.number().min(0, "#10/11 é obrigatório"),
  cata: z.coerce.number().min(0, "Cata é obrigatória"),
  clas_resultado: z.string(),
  clas_pagamento: z.string(),
});

// Export types from schema
export type zCoffeeLotSchema = z.infer<typeof coffeeLotSchema>;

export interface User {
  userlogon: Object,
	displayName: string,
	usuario: string
}
