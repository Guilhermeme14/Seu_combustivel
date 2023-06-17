import React, { useState } from 'react';
import Form from './componentes/Dados';
import Results from './componentes/Resultados';
import History from './componentes/History';

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

  const handleSubmit = (data) => {
    const { distance, consumption, fuelPrice, unit, additionalExpenses } = data;
    let convertedDistance = distance;

    if (unit === 'mi') {
      // Converter milhas para quilômetros
      convertedDistance = distance * 0.621371;
    }

    const cost = (convertedDistance / consumption) * fuelPrice;

    const newTripData = {
      distance: convertedDistance,
      consumption,
      cost,
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
      const autonomy = distance / fuelAmount;
      setAutonomyData((prevData) => ({ ...prevData, autonomy: autonomy.toFixed(1) }));
    }
  };

  const handleAutonomyChange = (event) => {
    const { name, value } = event.target;
    setAutonomyData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h1>Seu Combustível</h1>
      <p>Bem-vindo ao "Seu Combustível"! Aqui você pode calcular o custo do combustível para a sua viagem, incluindo despesas adicionais ao longo do percurso.</p>
      <Form onSubmit={handleSubmit} />
      <Results tripData={tripData} currency={currency} additionalExpenses={additionalExpenses} />
      <History history={history} currency={currency} />
      <div>
        <label>Escolha a moeda:</label>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="BRL">Real (BRL)</option>
          <option value="USD">Dólar (USD)</option>
          <option value="ARS">Peso Argentino (ARS)</option>
        </select>
      </div>
      <section>
        <h2>Como calcular a autonomia do veículo</h2>
        <p>Para calcular a autonomia do seu veículo, você pode seguir os seguintes passos:</p>
        <ol>
          <li>Registre a quilometragem do veículo antes de abastecer.</li>
          <li>Abasteça o tanque completamente.</li>
          <li>Anote a quantidade de litros de combustível necessários para encher o tanque novamente.</li>
          <li>Registre a quilometragem novamente após percorrer uma distância significativa.</li>
          <li>Subtraia a quilometragem inicial da quilometragem final para obter a quantidade de quilômetros rodados.</li>
          <li>Divida a quantidade de quilômetros rodados pela quantidade de litros que foram necessários para encher o tanque novamente.</li>
        </ol>
        <p>Por exemplo, se o veículo percorreu 210 km nesse trajeto e precisou de 16 litros de combustível, significa que a média de consumo foi de 13,1 km/l.</p>
        <p>Se preferir, você pode utilizar a seguinte fórmula:</p>
        <p>Autonomia = Distância percorrida / Quantidade de combustível utilizada</p>
        <p>Assim, você poderá calcular a autonomia do seu veículo de forma mais conveniente.</p>

        <h3>Calcular Autonomia</h3>
        <div>
          <label>Distância percorrida (em km):</label>
          <input
            type="number"
            name="distance"
            value={autonomyData.distance}
            onChange={handleAutonomyChange}
          />
        </div>
        <div>
          <label>Quantidade de combustível utilizada (em litros):</label>
          <input
            type="number"
            name="fuelAmount"
            value={autonomyData.fuelAmount}
            onChange={handleAutonomyChange}
          />
        </div>
        <button onClick={calculateAutonomy}>Calcular</button>
        {autonomyData.autonomy && <p>A autonomia do veículo é de {autonomyData.autonomy} km/l.</p>}
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
