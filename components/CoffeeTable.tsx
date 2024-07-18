// components/CoffeeTable.tsx
import { CoffeeLot } from "@/types";
import Link from "next/link";

const coffeeLots: CoffeeLot[] = [
  { id: '1', date: '01/07/24', purchase: 'VI240962', group: 'CON', lot: 'VI45801-00', bags: 500, broker: 'Roberto Rosa', seller: 'Alberta Coffee', status: 'Não classificado' },
  { id: '2', date: '02/07/24', purchase: 'VI240963', group: 'CON', lot: 'VI45802-00', bags: 300, broker: 'Carlos Silva', seller: 'Best Beans', status: 'Classificado' },
];

const CoffeeTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-secondary-green text-white">
          <tr>
            <th className="py-2 px-4">Data</th>
            <th className="py-2 px-4">Compra</th>
            <th className="py-2 px-4">Grupo</th>
            <th className="py-2 px-4">Lote</th>
            <th className="py-2 px-4">Sacas</th>
            <th className="py-2 px-4">Corretor</th>
            <th className="py-2 px-4">Vendedor</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-coffee-brown">
          {coffeeLots.map((lot, index) => (
            <tr key={index} className="hover:bg-secondary-green transition-colors cursor-pointer">
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.date}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.purchase}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.group}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.lot}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.bags}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.broker}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.seller}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/lote/${lot.id}`}>
                  {lot.status}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeeTable;
