import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [distance, setDistance] = useState('');
  const [consumption, setConsumption] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [unit, setUnit] = useState('km');
  const [fuel, setFuel] = useState('gasolina');
  const [additionalExpenses, setAdditionalExpenses] = useState([]);
  const [consumptionError, setConsumptionError] = useState('');
  const [distanceError, setDistanceError] = useState('');
  const [fuelPriceError, setFuelPriceError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ distance, consumption, fuelPrice, unit, fuel, additionalExpenses });
    }
  };

  const handleAdditionalExpenseChange = (e) => {
    const expense = e.target.value;
    if (e.target.checked) {
      setAdditionalExpenses([...additionalExpenses, expense]);
    } else {
      setAdditionalExpenses(additionalExpenses.filter((item) => item !== expense));
    }
  };
  const validateForm = () => {
    let valid = true;

    if (consumption === '') {
      setConsumptionError('O consumo médio de combustível é obrigatório.');
      valid = false;
    } else {
      setConsumptionError('');
    }

    if (distance === '') {
      setDistanceError('A distância é obrigatória.');
      valid = false;
    } else {
      setDistanceError('');
    }

    if (fuelPrice === '') {
      setFuelPriceError('O preço do combustível é obrigatório.');
      valid = false;
    } else {
      setFuelPriceError('');
    }

    return valid;
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label>
            Distância:
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
            {distanceError && <span className="mensagem-erro">{distanceError}</span>}
          </label>
          <br />
          <label>
            Sistema de unidades de medida:
          </label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="km">Sistema internacional</option>
            <option value="mi">Sistema imperial</option>
          </select>
          <br />
          <label> Combústivel utilizado: </label>
          <label>
            <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="gasolina"> Gasolina comum </option>
              <option value="alcool"> Álcool </option>
              <option value="diesel"> Diesel </option>
            </select>
          </label>
          <br/>
          <label>
            Consumo médio de combustível:
            <input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
            />
            {consumptionError && <span className="mensagem-erro">{consumptionError}</span>}
          </label>
          <br />
          <label>
            Preço do combustível:
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
            />
            {fuelPriceError && <span className="mensagem-erro">{fuelPriceError}</span>}
          </label>
          <br />
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
          <button className="Botão" type="submit">Calcular</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
