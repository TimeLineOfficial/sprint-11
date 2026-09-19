import React, { useState } from 'react';
import { STRATEGIES } from '../data/mockTradingData';
import { calculateSharpeRatio, calculateNetProfit, calculateMaxDrawdown } from '../utils/financialMath';
import { Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function StrategiesPage() {
  const [activeBots, setActiveBots] = useState(['STRAT-EMA']);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  const toggleBot = (botId) => {
    setActiveBots((prev) =>
      prev.includes(botId) ? prev.filter((id) => id !== botId) : [...prev, botId]
    );
  };

  const sampleReturnsList = [0.03, 0.015, -0.008, 0.042, 0.021, -0.012, 0.035, 0.028];
  const calculatedSharpe = calculateSharpeRatio(sampleReturnsList, 0.02);
  const calculatedNetProfit = calculateNetProfit(100000, 142800);
  const calculatedDrawdown = calculateMaxDrawdown([100000, 115000, 108000, 122000, 118000, 142800]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs transition-colors">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Algorithmic Backtester &amp; Strategy Engine
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Automated Quantitative Trading Bots
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {['1M', '6M', '1Y', '3Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                selectedTimeframe === tf
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Backtest Math Verification Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xl text-xs transition-colors">
        <div className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Backtest Strategy Performance Profile ({selectedTimeframe})
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Calculated Net Profit</div>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">+{calculatedNetProfit}%</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500">Initial: $100k → Final: $142.8k</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Sharpe Ratio</div>
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">{calculatedSharpe}</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500">Risk-Free Rate: 2.0%</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Max Drawdown</div>
            <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">-{calculatedDrawdown}%</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500">Peak-to-Trough Loss</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Active Bots</div>
            <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">{activeBots.length} Running</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500">Continuous Execution</div>
          </div>
        </div>
      </div>

      {/* Strategies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STRATEGIES.map((strat) => {
          const isActive = activeBots.includes(strat.id);
          return (
            <div key={strat.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl text-xs flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] uppercase border border-emerald-500/30">
                    {strat.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{strat.id}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">{strat.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{strat.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Win Rate:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{strat.winRate}%</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Sharpe Ratio:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{strat.sharpeRatio}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Max Drawdown:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">-{strat.maxDrawdown}%</span>
                </div>
              </div>

              <button
                onClick={() => toggleBot(strat.id)}
                className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase shadow-md transition-all flex items-center justify-center space-x-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-rose-500 hover:bg-rose-400 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isActive ? 'HALT ALGORITHM' : 'DEPLOY ALGO BOT'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
