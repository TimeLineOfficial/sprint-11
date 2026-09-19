/**
 * Core Financial & Algorithmic Trading Utilities for FinPulse AI
 */

export function calculateNetProfit(initialCapital, finalBalance) {
  if (initialCapital <= 0) return 0;
  const profit = finalBalance - initialCapital;
  const percentage = (profit / initialCapital) * 100;
  return Number(percentage.toFixed(2));
}

export function calculateSharpeRatio(returns, riskFreeRate = 0.02) {
  if (!returns || returns.length === 0) return 0;
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return 0;
  const sharpe = (avgReturn - riskFreeRate) / stdDev;
  return Number(sharpe.toFixed(2));
}

export function calculateMaxDrawdown(equityCurve) {
  if (!equityCurve || equityCurve.length < 2) return 0;
  let peak = equityCurve[0];
  let maxDrawdown = 0;

  for (let i = 1; i < equityCurve.length; i++) {
    if (equityCurve[i] > peak) {
      peak = equityCurve[i];
    }
    const drawdown = (peak - equityCurve[i]) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return Number((maxDrawdown * 100).toFixed(2));
}

export function calculateOrderTotal(quantity, price, feeRate = 0.001) {
  const qty = Number(quantity);
  const prc = Number(price);

  if (isNaN(qty) || isNaN(prc) || qty <= 0 || prc <= 0) {
    return { subtotal: 0, fee: 0, total: 0 };
  }

  const subtotal = qty * prc;
  const fee = subtotal * feeRate;
  const total = subtotal + fee;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    fee: Number(fee.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}

export function validateRiskLimits(orderValue, portfolioBalance, maxRiskPercent = 20) {
  if (orderValue <= 0) {
    return { valid: false, reason: 'Order value must be greater than $0.00' };
  }
  const maxAllowed = (portfolioBalance * maxRiskPercent) / 100;
  if (orderValue > maxAllowed) {
    return {
      valid: false,
      reason: `Order value ($${orderValue.toLocaleString()}) exceeds single-trade risk limit of ${maxRiskPercent}% ($${maxAllowed.toLocaleString()})`
    };
  }
  if (orderValue > portfolioBalance) {
    return { valid: false, reason: 'Insufficient account liquidity' };
  }

  return { valid: true, reason: 'Risk limits passed successfully' };
}
