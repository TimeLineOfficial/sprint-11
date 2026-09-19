import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS, PORTFOLIO_INITIAL } from '../data/mockTradingData';
import { TradeWidget } from '../components/TradeWidget';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  ArrowLeftRight, 
  Cpu, 
  PieChart, 
  ShieldCheck, 
  Zap,
  Wallet
} from 'lucide-react';

export default function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([]);

  const handleTradeExecuted = (newOrder) => {
    setRecentOrders((prev) => [newOrder, ...prev]);
  };

  const quickActions = [
    { label: 'Buy Asset', path: '/trade?type=BUY', icon: ArrowUpRight, color: 'bg-emerald-500 text-slate-950' },
    { label: 'Sell Asset', path: '/trade?type=SELL', icon: ArrowDownRight, color: 'bg-rose-500 text-white' },
    { label: 'Algo Bots', path: '/strategies', icon: Cpu, color: 'bg-blue-600 text-white' },
    { label: 'Markets', path: '/markets', icon: BarChart3, color: 'bg-purple-600 text-white' },
    { label: 'Portfolio', path: '/portfolio', icon: PieChart, color: 'bg-teal-500 text-slate-950' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-xl space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] sm:text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> SEC &amp; CFTC Institutional Engine
            </div>
            <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              FinPulse AI Wealth &amp; Algorithmic Portal
            </h1>
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-300 pt-1">
              <div>
                Net Worth: <span className="font-extrabold text-white text-sm sm:text-xl font-mono">${PORTFOLIO_INITIAL.totalNetWorth.toLocaleString()}</span>
              </div>
              <div className="text-emerald-400 font-extrabold text-xs sm:text-sm flex items-center gap-0.5">
                <ArrowUpRight className="w-4 h-4" /> +${PORTFOLIO_INITIAL.dailyPnL.toLocaleString()} (24h)
              </div>
            </div>
          </div>

          <div className="hidden sm:flex gap-2.5 flex-shrink-0">
            <Link
              to="/trade"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs uppercase flex items-center justify-center space-x-1.5 shadow-md hover:bg-emerald-400 active:scale-95 transition-all"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Instant Trade</span>
            </Link>
            <Link
              to="/strategies"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs uppercase flex items-center justify-center space-x-1.5 border border-slate-700 active:scale-95 transition-all"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Deploy Algo Bot</span>
            </Link>
          </div>
        </div>

        {/* 1-Tap Mobile Quick Action Buttons Grid */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 sm:hidden border-t border-slate-800">
          {quickActions.map((act) => {
            const IconComp = act.icon;
            return (
              <Link
                key={act.label}
                to={act.path}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-center space-y-1 active:scale-95 transition-all"
              >
                <div className={`w-8 h-8 rounded-lg ${act.color} flex items-center justify-center shadow-sm`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-white leading-none tracking-tighter truncate w-full">
                  {act.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Grid: Order Execution & Market Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Trade Widget & Recent Orders */}
        <div className="lg:col-span-6 space-y-6">
          <TradeWidget onTradeExecuted={handleTradeExecuted} />

          {/* Recent Executed Orders Log */}
          {recentOrders.length > 0 && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm text-xs transition-colors">
              <div className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center justify-between">
                <span>Recent Algorithmic Execution Log</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{recentOrders.length} Orders</span>
              </div>
              <div className="space-y-2">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className={ord.type === 'BUY' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {ord.type}
                        </span>
                        <span>{ord.quantity} {ord.symbol}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{ord.timestamp} • ID: {ord.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">${ord.total.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">@ ${ord.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Market Tickers & Asset Allocation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Real-Time Asset Tickers */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm text-xs transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Live Market Ticker (24h)
              </h3>
              <Link to="/markets" className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ASSETS.map((asset) => (
                <div key={asset.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1.5 hover:border-emerald-500 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-900 dark:text-white">{asset.id}</div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      asset.change24h > 0 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                    }`}>
                      {asset.change24h > 0 ? `+${asset.change24h}%` : `${asset.change24h}%`}
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">${asset.price.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Vol: ${asset.volume24h}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Allocation Breakdown */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm text-xs transition-colors">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2.5 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Portfolio Asset Allocation
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Equities (NVDA)</span>
                  <span>45% ($66,834.18)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[45%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Crypto (BTC &amp; ETH)</span>
                  <span>38% ($56,437.75)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[38%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Cash Liquidity</span>
                  <span>17% ($25,248.47)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full w-[17%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
