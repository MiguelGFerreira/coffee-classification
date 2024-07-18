import { CoffeeLot } from "@/types";
import LotDetail from "@/components/LotDetail";

const mockData: CoffeeLot[] = [
  { id: '1', date: '01/07/24', purchase: 'VI240962', group: 'CON', lot: 'VI45801-00', bags: 500, broker: 'Roberto Rosa', seller: 'Alberta Coffee', status: 'Não classificado' },
  { id: '2', date: '02/07/24', purchase: 'VI240963', group: 'CON', lot: 'VI45802-00', bags: 300, broker: 'Carlos Silva', seller: 'Best Beans', status: 'Classificado' },
];

const LotPage = ({ params }: { params: { id: string } }) => {
  console.log(mockData);
  const lot = mockData.find(lot => lot.id === params.id);

  if (!lot) {
    return <p>Lote não encontrado</p>;
  }

  return <LotDetail lot={lot} />;
};

export default LotPage;
