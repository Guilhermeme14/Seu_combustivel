import React, { useState } from 'react';
import Form from './componentes/Dados';
import Results from './componentes/Resultados';
import History from './componentes/History';
import './App.css';

const App = () => {
  const [tripData, setTripData] = useState(null);
  const [history, setHistory] = useState([]);
  const [currency, setCurrency] = useState('BRL');
  const [additionalExpenses, setAdditionalExpenses] = useState([]);
  const [autonomyData, setAutonomyData] = useState({
    distance: '',
    fuelAmount: '',
    autonomy: null,
  });
  const [exchangeRate, setExchangeRate] = useState(1);

  const handleSubmit = (data) => {
    const { distance, consumption, fuelPrice, unit, fuel, additionalExpenses } = data;

    let convertedDistance = distance;
    let convertedConsumption = consumption;

    if (unit === 'mi' && fuel === 'gasolina') {
      convertedDistance = distance * 0.621371;
      convertedConsumption = consumption * 2.352145;
    } else if (unit === 'mi' && fuel === 'alcool') {
      convertedDistance = distance * 0.621371;
      convertedConsumption = (consumption * 2.352145) * 0.7;
    } else if (unit === 'mi' && fuel === 'diesel') {
      convertedDistance = distance * 0.621371;
      convertedConsumption = (consumption * 2.352145) * 1.3;
    }

    if (unit === 'km' && fuel === 'alcool') {
      convertedConsumption = consumption * 0.7;
    } else if (unit === 'km' && fuel === 'diesel') {
      convertedConsumption = consumption * 1.3;
    }

    const cost = (convertedDistance / convertedConsumption) * fuelPrice;

    const additionalExpensesTotal = additionalExpenses.reduce((total, expense) => {
      switch (expense) {
        case 'troca_pneu':
          return total + 120;
        case 'troca_oleo':
          return total + 115;
        case 'troca_agua':
          return total + 50;
        default:
          return total;
      }
    }, 0);

    const totalCost = (cost + additionalExpensesTotal) * exchangeRate;
    const gasolinaGasta = distance / consumption;
    const newTripData = {
      distance: convertedDistance,
      consumption: convertedConsumption,
      cost,
      unit,
      fuel,
      totalCost,
      gasolinaGasta,
    };

    setTripData(newTripData);
    setAdditionalExpenses(additionalExpenses);
    setHistory((prevHistory) => [...prevHistory, newTripData]);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const calculateAutonomy = () => {
    const { distance, fuelAmount } = autonomyData;

    if (distance !== '' && fuelAmount !== '') {
      let autonomy = distance / fuelAmount;

      if (autonomyData.unit === 'mi') {
        autonomy = autonomy / 1.25;
      }

      setAutonomyData((prevData) => ({ ...prevData, autonomy: autonomy.toFixed(1) }));
    }
  };

  const handleAutonomyChange = (event) => {
    const { name, value } = event.target;
    setAutonomyData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container">
      <h1>Seu Combustível</h1>
      <p>
        Bem-vindo ao "Seu Combustível"! Aqui você pode calcular o custo do combustível para a sua viagem, incluindo despesas adicionais ao longo do percurso.
      </p>
      <Form onSubmit={handleSubmit} />
      <Results tripData={tripData} currency={currency} additionalExpenses={additionalExpenses} gasolinaGasta={tripData && tripData.gasolinaGasta} />
      <History history={history} currency={currency} />
      <div className="form-container-moeda">
        <div className="form-box-moeda">
          <label>Escolha a moeda:</label>
          <select className="form-select" value={currency} onChange={handleCurrencyChange}>
            <option value="BRL">Real (BRL)</option>
            <option value="USD">Dólar (USD)</option>
            <option value="ARS">Peso Argentino (ARS)</option>
          </select>
        </div>
      </div>
      <section>
      <h2>Como calcular a autonomia do veículo</h2>
        <p>Para calcular a autonomia do seu veículo, você pode seguir os seguintes passos:</p>
        <ol>
          <li>Registre a quilometragem do veículo antes de começar a viagem.</li>
          <li>Abasteça o veículo com a quantidade desejada de combustível.</li>
          <li>Registre a quilometragem do veículo após a viagem.</li>
          <li>Anote a quantidade de combustível restante no tanque.</li>
          <li>Subtraia a quilometragem inicial da quilometragem final para obter a distância percorrida.</li>
          <li>Divida a distância percorrida pela quantidade de combustível restante para obter a autonomia do veículo.</li>
          <li>Informe a distância percorrida e a quantidade de combustível utilizada nos campos abaixo.</li>
        </ol>
        <div className="form-container-autonomia">
          <div className="form-box-autonomia">
            <label>Distância percorrida ({autonomyData.unit === 'mi' ? 'milhas' : 'quilômetros'}):</label>
            <input
              type="number"
              name="distance"
              value={autonomyData.distance}
              onChange={handleAutonomyChange}
              placeholder="Distância"
            /><br/>
          
          
            <label>Quantidade de combustível utilizada (litros):</label>
            <input
              type="number"
              name="fuelAmount"
              value={autonomyData.fuelAmount}
              onChange={handleAutonomyChange}
              placeholder="Combustível"
            /><br/>
          
          
            <label className='unidade_autonomia'>Unidade:</label>
            <select
              name="unit"
              value={autonomyData.unit}
              onChange={handleAutonomyChange}
            >
              <option value="km">Quilômetros (km)</option><br/>
              <option value="mi">Milhas (mi)</option>
            </select><br/>
         
          <button className="Botão" onClick={calculateAutonomy}>Calcular</button>
          {autonomyData.autonomy && (
            <p>A autonomia do veículo é de {autonomyData.autonomy} {autonomyData.unit === 'mi' ? 'milhas por galão' : 'quilômetros por litro'}.</p>
          )}
        </div>
        </div>
      </section>
      <section>
        <h2>Dicas para economizar combustível</h2>
        <ul>
          <li>Mantenha os pneus calibrados corretamente, pois pneus murchos aumentam o consumo de combustível.</li>
          <li>Evite acelerações e frenagens bruscas. Dirigir de maneira suave e constante ajuda a economizar combustível.</li>
          <li>Desligue o motor em longos períodos de espera, como em engarrafamentos ou paradas prolongadas.</li>
          <li>Utilize o ar condicionado de forma consciente, pois seu uso constante pode aumentar o consumo de combustível.</li>
          <li>Verifique regularmente o filtro de ar do veículo e substitua-o quando necessário.</li>
          <li>Evite transportar excesso de peso no veículo, pois isso aumenta o consumo de combustível.</li>
          <li>Planeje suas viagens com antecedência, evitando trajetos mais longos ou congestionados, quando possível.</li>
          <li>Realize a manutenção regular do veículo, como troca de óleo, filtros e velas, para garantir um bom desempenho e economia de combustível.</li>
          <li>Utilize combustível de qualidade e evite abastecer em postos desconhecidos ou suspeitos.</li>
          <li>Considere compartilhar o carro com outras pessoas ou utilizar meios de transporte alternativos, como bicicleta ou transporte público, sempre que possível.</li>
        </ul>
      </section>
    </div>
  );
};

export default App;
