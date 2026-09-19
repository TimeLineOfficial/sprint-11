import { describe, it, expect } from 'vitest';
import {
  calculateNetProfit,
  calculateSharpeRatio,
  calculateMaxDrawdown,
  calculateOrderTotal,
  validateRiskLimits
} from '../utils/financialMath';

describe('Sprint 11 QA: Financial Math & Risk Engine Unit Tests', () => {
  it('should correctly calculate net profit percentage', () => {
    expect(calculateNetProfit(100000, 150000)).toBe(50.0);
    expect(calculateNetProfit(100000, 80000)).toBe(-20.0);
    expect(calculateNetProfit(0, 100)).toBe(0);
  });

  it('should calculate Sharpe Ratio accurately', () => {
    const returns = [0.05, 0.02, -0.01, 0.04, 0.03];
    const sharpe = calculateSharpeRatio(returns, 0.01);
    expect(sharpe).toBeGreaterThan(0);
    expect(typeof sharpe).toBe('number');
  });

  it('should compute Peak-to-Trough Maximum Drawdown percentage', () => {
    const equityCurve = [100, 120, 90, 110, 80, 130];
    // Peak is 120, lowest after peak is 80 -> Drawdown = (120 - 80) / 120 = 33.33%
    expect(calculateMaxDrawdown(equityCurve)).toBe(33.33);
  });

  it('should compute Order Totals with fee breakdown', () => {
    const order = calculateOrderTotal(10, 100, 0.001); // 10 units @ $100 = $1000 subtotal, $1 fee
    expect(order.subtotal).toBe(1000.0);
    expect(order.fee).toBe(1.0);
    expect(order.total).toBe(1001.0);
  });

  it('should enforce Risk Limits and flag excessive trades', () => {
    const portfolioBalance = 100000;
    // 20% limit = $20,000 max order value
    expect(validateRiskLimits(5000, portfolioBalance, 20).valid).toBe(true);
    expect(validateRiskLimits(25000, portfolioBalance, 20).valid).toBe(false);
    expect(validateRiskLimits(150000, portfolioBalance, 20).valid).toBe(false);
    expect(validateRiskLimits(0, portfolioBalance, 20).valid).toBe(false);
  });
});
