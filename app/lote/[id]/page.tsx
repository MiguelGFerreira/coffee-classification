"use client"

import { CoffeeLot } from "@/types";
import LotDetail from "@/components/LotDetail";
import { useEffect, useState } from "react";
import { getLoteById } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const LotPage = ({ params }: { params: { id: string } }) => {
  const [coffeeLot, setCoffeeLot] = useState<CoffeeLot>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoteById(params.id);
        setCoffeeLot(data[0]);
      } catch (error) {
        console.error("Erro ao buscar lote de café:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!coffeeLot) {
    return <p>Lote não encontrado</p>;
  }

  return <LotDetail lot={coffeeLot} />;
};

export default LotPage;
