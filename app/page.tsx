import CoffeeTable from "@/components/CoffeeTable";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl sm:text-2xl mb-4 text-coffee-brown font-bold">Lotes de Café</h1>
      <CoffeeTable />
    </div>
  );
}
