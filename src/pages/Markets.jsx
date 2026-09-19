import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../data/mockTradingData';
import { Search, Filter, ArrowUpRight, ArrowDownRight, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Markets() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = useMemo(() => {
    return ASSETS.filter((asset) => {
      const matchesCat = selectedCategory === 'All' || asset.category === selectedCategory;
      const matchesQuery = !searchQuery || asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs transition-colors">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Real-Time Institutional Liquidity Feeds
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Global Financial Markets ({filteredAssets.length})
          </h1>
        </div>

        <div className="relative md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symbol, asset name..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Crypto', 'Stocks'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {cat} Assets
          </button>
        ))}
      </div>

      {/* Assets Table / Mobile Cards */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xl text-xs transition-colors">
        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-200 dark:border-slate-700 font-extrabold text-slate-500 dark:text-slate-400 uppercase text-[10px]">
          <div className="col-span-4">Asset Symbol &amp; Name</div>
          <div className="col-span-3 text-right">Price ($)</div>
          <div className="col-span-3 text-right">24h Change</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700/60">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center space-y-2 sm:space-y-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="sm:col-span-4 flex items-center justify-between sm:justify-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">
                  {asset.id}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">{asset.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{asset.type} • Vol: ${asset.volume24h}</div>
                </div>
              </div>

              <div className="sm:col-span-3 flex justify-between sm:justify-end items-center font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                <span className="sm:hidden text-slate-500 dark:text-slate-400 text-xs font-normal">Price:</span>
                <span>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="sm:col-span-3 flex justify-between sm:justify-end items-center">
                <span className="sm:hidden text-slate-500 dark:text-slate-400 text-xs">24h Change:</span>
                <span className={`inline-flex items-center gap-1 font-extrabold text-xs px-2.5 py-1 rounded-lg ${
                  asset.change24h > 0 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {asset.change24h > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {asset.change24h > 0 ? `+${asset.change24h}%` : `${asset.change24h}%`}
                </span>
              </div>

              <div className="sm:col-span-2 pt-2 sm:pt-0">
                <button
                  onClick={() => navigate(`/trade?symbol=${asset.id}`)}
                  className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase shadow-sm active:scale-95 transition-all"
                >
                  Trade {asset.id}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
