import React from 'react';

const History = ({ history, currency }) => {
  let currencySymbol = '';

  switch (currency) {
    case 'BRL':
      currencySymbol = 'R$';
      break;
    case 'USD':
      currencySymbol = '$';
      break;
    case 'ARS':
      currencySymbol = 'ARS$';
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
              Distância: {result.distance ? parseFloat(result.distance).toFixed(2) : '-'} km | Consumo:{' '}
              {result.consumption ? result.consumption : '-'} L/km | Custo: {currencySymbol} {(result.cost).toFixed(2)}
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
