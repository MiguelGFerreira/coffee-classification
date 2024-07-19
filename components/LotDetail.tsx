"use client"

import { useState } from "react";
import { CoffeeLot } from "@/types";
import { useRouter } from "next/navigation";

interface LotDetailProps {
  lot: CoffeeLot;
}

const LotDetail = ({ lot }: LotDetailProps) => {
  const [isEditing, setIsEditing] = useState(lot.status === "Classificado" ? false : true);
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="text-primary-green mb-4">
        &larr; Voltar
      </button>
      <div className="bg-white grid grid-cols-2 shadow-md rounded-lg gap-4 p-4">
        <div>
          <h2 className="text-2xl font-bold text-coffee-brown mb-4">Detalhes do Lote</h2>
          <div className="justify-between">
            <p><strong>Data:</strong> {lot.date}</p>
            <p><strong>Compra:</strong> {lot.purchase}</p>
            <p><strong>Grupo:</strong> {lot.group}</p>
            <p><strong>Lote:</strong> {lot.lot}</p>
            <p><strong>Sacas:</strong> {lot.bags}</p>
            <p><strong>Corretor:</strong> {lot.broker}</p>
            <p><strong>Vendedor:</strong> {lot.seller}</p>
            <p><strong>Status:</strong> {lot.status}</p>
          </div>
        </div>
        <form>
          <div>
            <div>
              <label>Defeitos</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>Umidade</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>Fundo #10</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>Impurezas</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>Broca</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#18AC</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#17</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#MK10</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#16</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#15</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#14</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#13</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#12</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>#10/11</label>
              <input type="text" disabled={!isEditing} />
            </div>
            <div>
              <label>Cata</label>
              <input type="text" disabled={!isEditing} />
            </div>
          </div>
        </form>
      </div>
      {isEditing ? (
        <button type="button" onClick={handleSaveClick} className="mt-4 bg-primary-green text-white px-4 py-2 rounded">
          Salvar
        </button>
      ) : (
        <button type="button" onClick={handleEditClick} className="mt-4 bg-secondary-green text-white px-4 py-2 rounded">
          Editar
        </button>
      )}
    </div>
  );
};

export default LotDetail;
