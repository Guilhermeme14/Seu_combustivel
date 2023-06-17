import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [unit, setUnit] = useState('km');
  const [additionalExpenses, setAdditionalExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ distance, consumption, fuelPrice, unit, additionalExpenses });
  };

  const handleAdditionalExpenseChange = (e) => {
    const expense = e.target.value;
    if (e.target.checked) {
      setAdditionalExpenses([...additionalExpenses, expense]);
    } else {
      setAdditionalExpenses(additionalExpenses.filter((item) => item !== expense));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Distância:
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </label>
      <label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="km">Quilômetros</option>
          <option value="mi">Milhas</option>
        </select>
      </label>
      <label>
        Consumo médio de combustível:
        <input
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
        />
      </label>
      <label>
        Preço do combustível (por litro):
        <input
          type="number"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
      </label><br></br>
      <label>Despesas Adicionais:</label>
      <div>
        <label>
          <input
            type="checkbox"
            value="troca_pneu"
            onChange={handleAdditionalExpenseChange}
          />
          Troca de Pneu (R$120)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="troca_oleo"
            onChange={handleAdditionalExpenseChange}
          />
          Troca de Óleo (R$115)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="troca_agua"
            onChange={handleAdditionalExpenseChange}
          />
          Troca de Água (R$50)
        </label>
      </div>
      <button type="submit">Calcular</button>
    </form>
  );
};

export default Form;
