import { useEffect } from "react";
function Vendas() {
  useEffect(() => {
    document.title = "Bartira | Vendas";
  }, []);
  return (
    <>
      <h1>Vendas</h1>
    </>
  );
}

export default Vendas;
