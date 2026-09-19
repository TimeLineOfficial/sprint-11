import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TradeWidget } from '../components/TradeWidget';

describe('Sprint 11 QA: TradeWidget React Testing Library DOM Tests', () => {
  it('renders TradeWidget correctly with default inputs', () => {
    render(<TradeWidget initialSymbol="NVDA" portfolioBalance={100000} />);
    expect(screen.getByText(/Algorithmic Order Execution/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-order-button')).toBeInTheDocument();
  });

  it('updates subtotal and total display when quantity changes', async () => {
    render(<TradeWidget initialSymbol="NVDA" portfolioBalance={100000} />);
    const qtyInput = screen.getByTestId('quantity-input');

    fireEvent.change(qtyInput, { target: { value: '20' } });

    await waitFor(() => {
      expect(qtyInput).toHaveValue(20);
    });
  });

  it('shows error banner when order exceeds risk limit', async () => {
    render(<TradeWidget initialSymbol="NVDA" portfolioBalance={10000} />);
    const qtyInput = screen.getByTestId('quantity-input');
    const submitBtn = screen.getByTestId('submit-order-button');

    // NVDA price ~ $128.40. 500 units = $64,200 (exceeds $10,000 balance & 20% risk limit)
    fireEvent.change(qtyInput, { target: { value: '500' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('order-error-banner')).toBeInTheDocument();
    });
  });

  it('executes valid trade and calls callback', async () => {
    const handleTrade = vi.fn();
    render(<TradeWidget initialSymbol="NVDA" portfolioBalance={100000} onTradeExecuted={handleTrade} />);
    const submitBtn = screen.getByTestId('submit-order-button');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('order-success-banner')).toBeInTheDocument();
      expect(handleTrade).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});
