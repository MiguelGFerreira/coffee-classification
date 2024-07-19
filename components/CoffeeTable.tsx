"use client"

import { CoffeeLot } from "@/types";
import { useRouter } from "next/navigation";

const coffeeLots: CoffeeLot[] = [
  { id: '1', date: '01/07/24', purchase: 'VI240962', group: 'CON', lot: 'VI45801-00', bags: 500, broker: 'Roberto Rosa', seller: 'Alberta Coffee', status: 'Não classificado' },
  { id: '2', date: '02/07/24', purchase: 'VI240963', group: 'CON', lot: 'VI45802-00', bags: 300, broker: 'Carlos Silva', seller: 'Best Beans', status: 'Classificado' },
];


const CoffeeTable = () => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/lote/${id}`)
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
              onClick={() => handleRowClick(lot.id)}
              className="text-center hover:bg-secondary-green transition-colors cursor-pointer">
              <td>{lot.date}</td>
              <td>{lot.purchase}</td>
              <td>{lot.group}</td>
              <td>{lot.lot}</td>
              <td>{lot.bags}</td>
              <td>{lot.broker}</td>
              <td>{lot.seller}</td>
              <td>{lot.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeTable;
