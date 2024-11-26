import React from "react";
import { useSelector } from "react-redux";

function Tarjetas() {
  const user = useSelector((state) => state.user);
  const { myCards } = user;

  console.log(myCards);
  return (
    <div className="text-start text-lg w-full h-screen">
      <div className="space-y-5 px-4 pt-3">
        <h1 className="text-4xl font-medium">Tarjetas</h1>
        {!myCards && <p>Actualmente no tienes tartejas asignadas.</p>}
      </div>
    </div>
  );
}

export default Tarjetas;
