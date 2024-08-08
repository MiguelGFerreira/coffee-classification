"use client"

import { useContext, useState } from "react";
import { CoffeeLot, zCoffeeLotSchema, coffeeLotSchema } from "@/types";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { patchLote, postLote } from "@/api";
import { UserContext } from "@/context/UserContext";

interface LotDetailProps {
  lot: CoffeeLot;
}

const LotDetail = ({ lot }: LotDetailProps) => {
  const router = useRouter();
  const [isEditable, setIsEditable] = useState(lot.status !== "Classificado");

  const [resultado, setResultado] = useState(lot.clas_resultado || "");
  const [pagamento, setPagamento] = useState(lot.clas_pagamento || "");

  const user = useContext(UserContext);

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
    clas_resultado: lot.clas_resultado || "",
    clas_pagamento: lot.clas_pagamento || "",
  };

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

  const formatNumber = (input: HTMLInputElement) => {
    input.value = input.value.replace(',', '.');
  }

  const onSubmit = async (data: zCoffeeLotSchema) => {
    console.log("submit");

    const updatedData = {
      ...data,
      clas_resultado: resultado,
      clas_pagamento: pagamento,
    }

    console.log(user);

    try {
      if (lot.status === "Classificado") {
        console.log("patch");
        await patchLote(updatedData, lot.clas_id, user!.displayName);
      } else {
        console.log("post");
        await postLote(updatedData, lot.idlote, lot.numLote, user!.displayName);
      }
      location.reload();
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };

  console.log(user);

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="text-primary-green mb-4">
        &larr; Voltar
      </button>
      <form id="classification" onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h2 className="font-bold text-coffee-brown mb-4">Detalhes do Lote</h2>
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
            <p><strong>Status:</strong> {lot.status}</p>
            <p><strong>Classificação:</strong></p>
            <input
              id="clas_resultado"
              value={resultado}
              onChange={(e) => setResultado(e.target.value)}
              disabled={!isEditable}
              type="text"
              className="border rounded-md p-2 w-full"
            />
            <p><strong>Pagamento:</strong></p>
            <select
              id="clas_pagamento"
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
              disabled={!isEditable}
              className="border rounded-md p-2 w-full"
            >
              <option value=""></option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
              <option value="A disposição">A disposição</option>
            </select>
            <p><strong>Classificado por:</strong> {lot.clas_usuario}</p>
          </div>
          <div className="space-y-4">
            {[
              "defeitos",
              "umidade",
              "fundo10",
              "impurezas",
              "broca",
              "ac18",
              "peneira17",
              "moka10",
              "peneira16",
              "peneira15",
              "peneira14",
              "peneira13",
              "peneira12",
              "peneira10_11",
              "cata",
            ].map((field) => (
              <div key={field} className="flex gap-4 mb-4">
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  {...register(field as keyof zCoffeeLotSchema)}
                  className={`${errors[field as keyof zCoffeeLotSchema] ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  disabled={!isEditable}
                  onBlur={(e) => formatNumber(e.target)}
                />
                {errors[field as keyof zCoffeeLotSchema] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors[field as keyof zCoffeeLotSchema]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {isEditable && (
          <div className="mt-4">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-secondary-green text-white px-4 py-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        )}
      </form>
      {!isEditable && (
        <button
          type="button"
          onClick={handleEditClick}
          className="bg-secondary-green text-white px-4 py-2 rounded-md mt-4"
        >
          Editar
        </button>
      )}
    </div>
  );
};

export default LotDetail;
