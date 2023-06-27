import React from 'react';

const History = ({ history, currency, unit }) => {
  let currencySymbol = '';
  let exchangeRate = 1;

  switch (currency) {
    case 'BRL':
      currencySymbol = 'R$';
      break;
    case 'USD':
      currencySymbol = '$';
      exchangeRate = 1 / 4.81; // Taxa de câmbio: 1 real = 4,81 dólares
      break;
    case 'ARS':
      currencySymbol = 'ARS$';
      exchangeRate = 1 * 51.66; // Taxa de câmbio: 1 real = 248 pesos argentinos
      break;
    default:
      currencySymbol = 'R$';
  }

  return (
    <div>
      <h2>Histórico de Resultados</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((result, index) => (
            <li key={index}>
              Distância: {result.distance ? parseFloat(result.distance).toFixed(2) : '-'}{result.unit === 'km' ? 'km' : 'mi'}  
              | Consumo: {result.consumption ? parseFloat(result.consumption).toFixed(2) : '-'} {result.unit === 'km' ? 'L/km' : 'MPG'}  
              | Custo total: {currencySymbol} {(result.totalCost * exchangeRate).toFixed(2)} 
              </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado de viagem registrado.</p>
      )}
    </div>
  );
};

export default History;
