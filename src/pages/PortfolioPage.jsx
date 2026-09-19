import React from 'react';
import { PORTFOLIO_INITIAL } from '../data/mockTradingData';
import { PieChart, TrendingUp, ShieldCheck, ArrowUpRight, Wallet, Activity } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      <div className="bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SEC Institutional Wealth Account
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Portfolio Holdings &amp; Asset Analytics
          </h1>
        </div>

        <div className="flex items-center space-x-3 font-mono">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Cash Balance</div>
            <div className="text-sm font-extrabold text-emerald-400">${PORTFOLIO_INITIAL.cashBalance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="text-slate-400 font-bold text-[11px]">Total Net Worth</div>
          <div className="text-2xl font-extrabold text-white font-mono">${PORTFOLIO_INITIAL.totalNetWorth.toLocaleString()}</div>
          <div className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% YTD Return
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="text-slate-400 font-bold text-[11px]">Unrealized P&amp;L</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">+${PORTFOLIO_INITIAL.unrealizedPnL.toLocaleString()}</div>
          <div className="text-slate-400 text-[11px]">Cumulative Unrealized Gain</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="text-slate-400 font-bold text-[11px]">Portfolio Risk Profile</div>
          <div className="text-2xl font-extrabold text-blue-400 font-mono">Sharpe 2.34</div>
          <div className="text-slate-400 text-[11px]">Moderate-Aggressive Growth</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl text-xs">
        <div className="p-4 border-b border-slate-700 font-extrabold text-white text-sm flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" /> Active Asset Positions ({PORTFOLIO_INITIAL.holdings.length})
        </div>

        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-700/80 font-extrabold text-slate-400 uppercase text-[10px]">
          <div className="col-span-3">Asset Symbol</div>
          <div className="col-span-2 text-right">Quantity</div>
          <div className="col-span-2 text-right">Avg Cost</div>
          <div className="col-span-2 text-right">Current Price</div>
          <div className="col-span-3 text-right">Total Value ($)</div>
        </div>

        <div className="divide-y divide-slate-700/60 font-mono">
          {PORTFOLIO_INITIAL.holdings.map((h) => (
            <div key={h.symbol} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center space-y-2 sm:space-y-0">
              <div className="sm:col-span-3 font-extrabold text-white text-sm flex items-center justify-between sm:justify-start space-x-2 font-sans">
                <span>{h.symbol}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  +{h.returnPct}%
                </span>
              </div>

              <div className="sm:col-span-2 flex justify-between sm:justify-end text-slate-300">
                <span className="sm:hidden font-sans text-slate-400 text-xs">Quantity:</span>
                <span>{h.quantity}</span>
              </div>

              <div className="sm:col-span-2 flex justify-between sm:justify-end text-slate-400">
                <span className="sm:hidden font-sans text-slate-400 text-xs">Avg Cost:</span>
                <span>${h.avgCost.toLocaleString()}</span>
              </div>

              <div className="sm:col-span-2 flex justify-between sm:justify-end text-slate-300">
                <span className="sm:hidden font-sans text-slate-400 text-xs">Current Price:</span>
                <span>${h.currentPrice.toLocaleString()}</span>
              </div>

              <div className="sm:col-span-3 flex justify-between sm:justify-end text-emerald-400 font-extrabold text-sm">
                <span className="sm:hidden font-sans text-slate-400 text-xs">Total Value:</span>
                <span>${h.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
