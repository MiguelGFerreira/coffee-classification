"use client"

import { getLotes } from "@/api";
import { CoffeeLot } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const CoffeeTable = () => {
  const router = useRouter();
  const [coffeeLots, setCoffeeLots] = useState<CoffeeLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    lotNumber: "",
    isClassified: "",
    date: "",
    seller: ""
  });

  const handleRowClick = (id: number) => {
    router.push(`/lote/${id}`)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSearch = () => {
    setCoffeeLots(
      coffeeLots.filter((lot) => {
        const matchesLotNumber = lot.numLote.includes(filter.lotNumber);
        const matchesClassifiedStatus = filter.isClassified
          ? (filter.isClassified === "classificado" && lot.status === "Classificado") ||
          (filter.isClassified === "naoClassificado" && lot.status !== "Classificado")
          : true;
        const matchesDate = filter.date
          ? lot.data_entrada === filter.date.split("-").reverse().join("/")
          : true;
        const matchesSeller = lot.nome.toLowerCase().includes(filter.seller.toLowerCase());

        return matchesLotNumber && matchesClassifiedStatus && matchesDate && matchesSeller;
      })
    );
  };

  const handleReset = () => {
    setFilter({
      lotNumber: "",
      isClassified: "",
      date: "",
      seller: ""
    });
    fetchData(); // Reload data without filters
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
        <input
          type="text"
          name="lotNumber"
          value={filter.lotNumber}
          onChange={handleFilterChange}
          placeholder="Buscar pelo número do lote"
          className="border rounded-md p-2"
        />
        <select
          name="isClassified"
          value={filter.isClassified}
          onChange={handleFilterChange}
          className="border rounded-md p-2"
        >
          <option value="">Todos</option>
          <option value="classificado">Classificado</option>
          <option value="naoClassificado">Não Classificado</option>
        </select>
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          placeholder="Data"
          className="border rounded-md p-2"
        />
        <input
          type="text"
          name="seller"
          value={filter.seller}
          onChange={handleFilterChange}
          placeholder="Buscar pelo vendedor"
          className="border rounded-md p-2"
        />
        <button onClick={handleSearch} className="bg-primary-green text-white px-4 py-2 rounded-md">
          Buscar
        </button>
        <button onClick={handleReset} className="bg-primary-green text-white px-4 py-2 rounded-md">
          Limpar
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-secondary-green text-white text-center">
          <tr>
            <th>Data</th>
            <th>Compra</th>
            <th>Grupo</th>
            <th>Lote</th>
            <th>Sacas</th>
            <th>Pagamento</th>
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
              <td>{lot.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeTable;
