"use client"

import { useState } from "react";
import { CoffeeLot, zCoffeeLotSchema, coffeeLotSchema } from "@/types";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { patchLote, postLote } from "@/api";

interface LotDetailProps {
  lot: CoffeeLot;
}

const LotDetail = ({ lot }: LotDetailProps) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(lot.status === "Classificado" ? false : true);

  const defaultValues = {
    defeitos: lot.clas_defeitoS || 0,
    umidade: lot.clas_umidade || 0,
    fundo10: lot.clas_fundo10 || 0,
    impurezas: lot.clas_impurezas || 0,
    broca: lot.clas_broca || 0,
    ac18: lot.clas_ac18 || 0,
    peneira17: lot.clas_peneira17 || 0,
    moka10: lot.clas_moka10 || 0,
    peneira16: lot.clas_peneira16 || 0,
    peneira15: lot.clas_peneira15 || 0,
    peneira14: lot.clas_peneira14 || 0,
    peneira13: lot.clas_peneira13 || 0,
    peneira12: lot.clas_peneira12 || 0,
    peneira10_11: lot.clas_peneira10_11 || 0,
    cata: lot.clas_cata || 0,
    resultado: lot.clas_resultado || "",
    pagamento: lot.clas_pagamento || "",
  };1

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zCoffeeLotSchema>({
    resolver: zodResolver(coffeeLotSchema),
    defaultValues,
  });

  const handleEditClick = () => {
    console.log("edit");
    setIsEditable(true);
  };

  const onSubmit = async (data: zCoffeeLotSchema) => {
    console.log("submit");

    if (lot.status === "Classificado") {
      await patchLote(data, lot.clas_id);
      location.reload();
      return;
    }

    await postLote(data, lot.idlote, lot.numLote);
    location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="text-primary-green mb-4">
        &larr; Voltar
      </button>
      <div className="bg-white grid grid-cols-2 shadow-md rounded-lg gap-4 p-4">
        <div className="grid justify-between">
          <h2 className="text-2xl font-bold text-coffee-brown mb-4">Detalhes do Lote</h2>
          <p><strong>Data:</strong> {lot.data_entrada}</p>
          <p><strong>Compra:</strong> {lot.referencia}</p>
          <p><strong>Grupo:</strong> {lot.descricao}</p>
          <p><strong>Lote:</strong> {lot.numLote}</p>
          <p><strong>Sacas:</strong> {lot.qtd_sacas}</p>
          <p><strong>Kg:</strong> {lot.qtd_sacas * 60}</p>
          <p><strong>Kg recebimento:</strong> {lot.pesoliquido}</p>
          <p><strong>DI(Kg):</strong> {(lot.qtd_sacas * 60) - lot.pesoliquido}</p>
          <p><strong>Corretor:</strong> {lot.corretor}</p>
          <p><strong>Vendedor:</strong> {lot.nome}</p>
          <p><strong>Município:</strong> {lot.cidade}</p>
          <p><strong>Classificação:</strong> <input id="resultado" disabled={!isEditable} value={lot.clas_resultado} form="classification" type="text" /></p>
          <p><strong>Pagamento:</strong>
            <select
              disabled={!isEditable}
              id="pagamento"
              name="pagamento"
              form="classification"
              value={lot.clas_pagamento}
              className="border rounded-md p-2 mr-2"
            >
              <option value=""></option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
              <option value="A disposição">A disposição</option>
            </select></p>
          <p><strong>Status:</strong> {lot.status}</p>
        </div>
        <form id="classification" onSubmit={handleSubmit(onSubmit)}>
          {["defeitos", "umidade", "fundo10", "impurezas", "broca", "ac18", "peneira17", "moka10", "peneira16", "peneira15", "peneira14", "peneira13", "peneira12", "peneira10_11", "cata"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="numeric"
                id={field}
                {...register(field as keyof zCoffeeLotSchema)}
                className={`mt-1 block w-full border ${errors[field as keyof zCoffeeLotSchema] ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                disabled={!isEditable}
              />
              {errors[field as keyof zCoffeeLotSchema] && (
                <p className="mt-2 text-sm text-red-600">
                  {errors[field as keyof zCoffeeLotSchema]?.message}
                </p>
              )}
            </div>
          ))}
          {isEditable && (
            <button
              type="submit"
              className="bg-secondary-green text-white px-4 py-2 rounded-md"
            >
              Salvar
            </button>

          )}
        </form>
        {!isEditable && (
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-secondary-green text-white px-4 py-2 rounded-md"
          >
            Editar
          </button>

        )}

      </div>
    </div>
  );
};

export default LotDetail;
