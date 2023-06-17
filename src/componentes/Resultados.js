import React from 'react';

const Results = ({ tripData, currency, additionalExpenses }) => {
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

  let distance = '-';
  let consumption = '-';
  let cost = '-';
  let totalCost = '-';

  if (tripData) {
    distance = typeof tripData.distance === 'number' ? parseFloat(tripData.distance).toFixed(2) : '-';
    consumption = typeof tripData.consumption === 'number' ? tripData.consumption : '-';
    cost = typeof tripData.cost === 'number' ? (tripData.cost * exchangeRate).toFixed(2) : '-';

    let additionalExpensesTotal = 0;
    additionalExpenses.forEach((expense) => {
      switch (expense) {
        case 'troca_pneu':
          additionalExpensesTotal += 120;
          break;
        case 'troca_oleo':
          additionalExpensesTotal += 115;
          break;
        case 'troca_agua':
          additionalExpensesTotal += 50;
          break;
        default:
          break;
      }
    });

    totalCost = typeof tripData.cost === 'number' ? ((tripData.cost + additionalExpensesTotal) * exchangeRate).toFixed(2) : '-';
  }

  return (
    <div>
      <h2>Resultado da Viagem</h2>
      {tripData ? (
        <div>
          <p>Distância: {parseFloat(tripData.distance).toFixed(2)} km</p>
          <p>Consumo: {tripData.consumption} L/km</p>
          <p>Custo Total: {currencySymbol} {totalCost}</p>
        </div>
      ) : (
        <p>Nenhum resultado para exibir.</p>
      )}
    </div>
  );
};

export default Results;
