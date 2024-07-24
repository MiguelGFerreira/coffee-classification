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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zCoffeeLotSchema>({
    resolver: zodResolver(coffeeLotSchema),
  });

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const onSubmit = async (data: zCoffeeLotSchema) => {

    if (lot.status === "Classificado") {
      await patchLote(data, lot.idlote, lot.numLote);
      return;
    }

    await postLote(data, lot.idlote, lot.numLote);
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
          <p><strong>Classificação:</strong> Resultado</p>
          <p><strong>Pagamento:</strong> Sim/Não/A disposição</p>
          <p><strong>Status:</strong> {lot.status}</p>
        </div>
        <form id="classification" onSubmit={handleSubmit(onSubmit)}>
          {["defeitos", "umidade", "fundo10", "impurezas", "broca", "ac18", "peneira17", "mk10", "p16", "p15", "p14", "p13", "p12", "p10_11", "cata"].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
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
      </div>
    </div>
  );
};

export default LotDetail;
