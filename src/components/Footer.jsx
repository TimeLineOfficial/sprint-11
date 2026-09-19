import React from 'react';
import { ShieldCheck, Cpu, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-6 sm:py-8 mt-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              FP
            </div>
            <span className="font-extrabold text-white text-sm">FinPulse AI Trading Engine</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> 256-bit AES Encryption</span>
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-blue-400" /> Algorithmic Backtester Active</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Real-Time Order Routing</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed text-center sm:text-left">
          Risk Warning: Trading financial instruments, cryptocurrencies, and equities carries substantial risk of loss and is not suitable for every investor. Automated algorithmic strategies do not guarantee profits. Past performance is not indicative of future results.
        </p>

        <div className="text-[10px] text-slate-600 text-center sm:text-right">
          © 2026 FinPulse AI Inc. All rights reserved. • Sprint 11 QA Standard Certified
        </div>
      </div>
    </footer>
  );
};
