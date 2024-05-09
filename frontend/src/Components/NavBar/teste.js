import React, { useState } from 'react';

const cargos = {
  "João": "Gerente",
  "Maria": "Analista",
  "José": "Assistente"
};

const CargoForm = ({ onAdd }) => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cargoAssociado = cargos[nome] || 'Cargo não encontrado'; // Verifica se o nome está associado a algum cargo
    onAdd({ nome, cargo: cargoAssociado });
    setNome('');
    setCargo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </label>
      <label>
        Cargo:
        <input
          type="text"
          value={cargo}
          onChange={(event) => setCargo(event.target.value)}
          readOnly // Impede a edição direta do campo de cargo
        />
      </label>
      <button type="submit">Adicionar</button>
    </form>
  );
};

const ListaCargos = ({ cargos }) => (
  <ul>
    {cargos.map((cargo, index) => (
      <li key={index}>
        <strong>Nome:</strong> {cargo.nome}, <strong>Cargo:</strong> {cargo.cargo}
      </li>
    ))}
  </ul>
);

const Cargo = () => {
  const [cargosList, setCargosList] = useState([]);

  const handleAddCargo = (cargo) => {
    setCargosList([...cargosList, cargo]);
  };

  return (
    <div>
      <h1>Associação de Nomes e Cargos</h1>
      <CargoForm onAdd={handleAddCargo} />
      <ListaCargos cargos={cargosList} />
    </div>
  );
};

export default Cargo;
