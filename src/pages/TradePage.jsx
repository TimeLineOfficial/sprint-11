import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TradeWidget } from '../components/TradeWidget';
import { ArrowLeftRight, ShieldCheck, Activity } from 'lucide-react';

export default function TradePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const symbol = queryParams.get('symbol') || 'NVDA';

  const [executedLogs, setExecutedLogs] = useState([]);

  const orderBookBids = [
    { price: 128.38, size: 450, total: 57771.00 },
    { price: 128.35, size: 1200, total: 154020.00 },
    { price: 128.30, size: 2800, total: 359240.00 }
  ];

  const orderBookAsks = [
    { price: 128.42, size: 310, total: 39810.20 },
    { price: 128.45, size: 850, total: 109182.50 },
    { price: 128.50, size: 1950, total: 250575.00 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-sm space-y-1 text-xs">
        <div className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Algorithmic Matching Engine • FIX Protocol Active
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
          Order Execution Terminal
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Widget */}
        <div className="lg:col-span-6 space-y-6">
          <TradeWidget initialSymbol={symbol} onTradeExecuted={(order) => setExecutedLogs((prev) => [order, ...prev])} />
        </div>

        {/* Right Order Book Visualizer */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl text-xs">
            <h3 className="font-extrabold text-sm text-white border-b border-slate-700 pb-2.5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Real-Time Level 2 Order Book Depth ({symbol})
            </h3>

            {/* Asks (Sells) */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-slate-700/60 flex justify-between">
                <span>Ask Price ($)</span>
                <span>Size</span>
                <span>Depth Total ($)</span>
              </div>
              {orderBookAsks.map((ask, idx) => (
                <div key={idx} className="flex justify-between items-center text-rose-400 bg-rose-500/5 px-2 py-1 rounded">
                  <span className="font-bold">${ask.price.toFixed(2)}</span>
                  <span>{ask.size}</span>
                  <span className="text-slate-300">${ask.total.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Spread Indicator */}
            <div className="p-2 bg-slate-900 rounded-xl text-center font-mono text-emerald-400 font-extrabold border border-slate-700">
              SPREAD: $0.04 (0.03%) • MID-MARKET $128.40
            </div>

            {/* Bids (Buys) */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase pb-1 border-b border-slate-700/60 flex justify-between">
                <span>Bid Price ($)</span>
                <span>Size</span>
                <span>Depth Total ($)</span>
              </div>
              {orderBookBids.map((bid, idx) => (
                <div key={idx} className="flex justify-between items-center text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded">
                  <span className="font-bold">${bid.price.toFixed(2)}</span>
                  <span>{bid.size}</span>
                  <span className="text-slate-300">${bid.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
