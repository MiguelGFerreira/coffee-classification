"use client"

import { getLotes } from "@/api";
import { CoffeeLot } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoffeeTable = () => {
  const router = useRouter();
  const [coffeeLots, setCoffeeLots] = useState<CoffeeLot[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRowClick = (id: number) => {
    router.push(`/lote/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLotes();
        setCoffeeLots(data);
      } catch (error) {
        console.error("Erro ao buscar lotes de café:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-secondary-green text-white text-center">
          <tr>
            <th>Data</th>
            <th>Compra</th>
            <th>Grupo</th>
            <th>Lote</th>
            <th>Sacas</th>
            <th>Corretor</th>
            <th>Vendedor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-coffee-brown">
          {coffeeLots.map((lot, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(lot.idlote)}
              className="text-center hover:bg-secondary-green transition-colors cursor-pointer">
              <td>{lot.data_entrada}</td>
              <td>{lot.referencia}</td>
              <td>{lot.descricao}</td>
              <td>{lot.numLote}</td>
              <td>{lot.qtd_sacas}</td>
              <td>{lot.corretor}</td>
              <td>{lot.nome}</td>
              <td>{lot.cidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeTable;
