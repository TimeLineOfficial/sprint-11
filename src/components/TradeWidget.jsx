import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../data/mockTradingData';
import { calculateOrderTotal, validateRiskLimits } from '../utils/financialMath';
import { ArrowLeftRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export function TradeWidget({ initialSymbol = 'NVDA', portfolioBalance = 148520.40, onTradeExecuted }) {
  const [tradeType, setTradeType] = useState('BUY');
  const [orderType, setOrderType] = useState('MARKET');
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);

  const selectedAsset = ASSETS.find((a) => a.id === selectedSymbol) || ASSETS[0];

  const [quantity, setQuantity] = useState('10');
  const [limitPrice, setLimitPrice] = useState(selectedAsset.price.toString());
  const [isProcessing, setIsProcessing] = useState(false);
  const [executedOrder, setExecutedOrder] = useState(null);
  const [validationError, setValidationError] = useState('');

  const currentPrice = orderType === 'MARKET' ? selectedAsset.price : Number(limitPrice) || selectedAsset.price;
  const orderDetails = calculateOrderTotal(quantity, currentPrice);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setValidationError('');

    const riskResult = validateRiskLimits(orderDetails.total, portfolioBalance);
    if (!riskResult.valid) {
      setValidationError(riskResult.reason);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = {
        id: orderId,
        symbol: selectedAsset.id,
        name: selectedAsset.name,
        type: tradeType,
        orderType,
        quantity: Number(quantity),
        price: currentPrice,
        total: orderDetails.total,
        timestamp: new Date().toLocaleTimeString()
      };

      setExecutedOrder(order);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      if (onTradeExecuted) {
        onTradeExecuted(order);
      }
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 text-xs transition-colors">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-3">
        <div className="flex items-center space-x-2 font-extrabold text-sm text-slate-900 dark:text-white">
          <ArrowLeftRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Algorithmic Order Execution</span>
        </div>
        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          Bal: ${portfolioBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>

      {executedOrder && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-1.5" data-testid="order-success-banner">
          <div className="font-extrabold text-xs flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Order {executedOrder.id} Executed!
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-300">
            {executedOrder.type} {executedOrder.quantity} {executedOrder.symbol} @ ${executedOrder.price.toFixed(2)} (Total: ${executedOrder.total.toFixed(2)})
          </p>
          <button
            onClick={() => setExecutedOrder(null)}
            className="text-[10px] underline font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
          >
            Place New Order
          </button>
        </div>
      )}

      {validationError && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center gap-2" data-testid="order-error-banner">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500 dark:text-rose-400" />
          <span className="text-[11px] font-semibold">{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="space-y-4">
        {/* Buy / Sell Tabs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTradeType('BUY')}
            className={`py-2.5 rounded-xl font-extrabold text-xs uppercase transition-all ${
              tradeType === 'BUY'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            BUY / LONG
          </button>
          <button
            type="button"
            onClick={() => setTradeType('SELL')}
            className={`py-2.5 rounded-xl font-extrabold text-xs uppercase transition-all ${
              tradeType === 'SELL'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SELL / SHORT
          </button>
        </div>

        {/* Asset Picker & Order Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Select Asset</label>
            <select
              value={selectedSymbol}
              onChange={(e) => {
                setSelectedSymbol(e.target.value);
                const asset = ASSETS.find((a) => a.id === e.target.value);
                if (asset) setLimitPrice(asset.price.toString());
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              {ASSETS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — ${a.price} ({a.change24h > 0 ? `+${a.change24h}%` : `${a.change24h}%`})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="MARKET">Instant Market Order</option>
              <option value="LIMIT">Limit Order</option>
            </select>
          </div>
        </div>

        {/* Quantity & Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Quantity / Units *</label>
            <input
              type="number"
              step="any"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. 10"
              data-testid="quantity-input"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              {orderType === 'MARKET' ? 'Market Price ($)' : 'Limit Price ($)'}
            </label>
            <input
              type="number"
              step="any"
              disabled={orderType === 'MARKET'}
              value={orderType === 'MARKET' ? selectedAsset.price : limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 disabled:opacity-60"
              data-testid="price-input"
            />
          </div>
        </div>

        {/* Fee & Summary Breakdown */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Subtotal:</span>
            <span className="text-slate-900 dark:text-white" data-testid="subtotal-display">${orderDetails.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Estimated Fee (0.1%):</span>
            <span className="text-slate-900 dark:text-white">${orderDetails.fee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-xs pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <span>Total Order Cost:</span>
            <span className="text-emerald-600 dark:text-emerald-400" data-testid="total-display">${orderDetails.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50 ${
            tradeType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' : 'bg-rose-500 hover:bg-rose-400 text-white'
          }`}
          data-testid="submit-order-button"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>ROUTING TO ORDER BOOK...</span>
            </>
          ) : (
            <span>EXECUTE {tradeType} ORDER</span>
          )}
        </button>
      </form>
    </div>
  );
}
