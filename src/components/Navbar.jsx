import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  ArrowLeftRight, 
  Cpu, 
  PieChart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap,
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: TrendingUp },
    { path: '/markets', label: 'Markets', icon: BarChart3 },
    { path: '/trade', label: 'Trade Order', icon: ArrowLeftRight },
    { path: '/strategies', label: 'Algo Bots', icon: Cpu },
    { path: '/portfolio', label: 'Portfolio', icon: PieChart }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-lg flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-none">
                  FINPULSE<span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5 truncate max-w-[170px] sm:max-w-none">
                  Algorithmic Wealth &amp; Trading Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold hidden sm:flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Ultra Latency 1.2ms</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-300" />}
            </button>

            <Link
              to="/trade"
              className="hidden sm:flex px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase items-center space-x-1 shadow-md transition-all active:scale-95"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Trade Now</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-r border-slate-800">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm text-white">FINPULSE MENU</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-1 overflow-y-auto flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Trading Modules</div>
              {navLinks.map((link) => {
                const IconComp = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComp className="w-4 h-4 text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-800 space-y-2">
              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FinPulse SEC &amp; CFTC Compliant Core
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 py-1.5 px-2 flex items-center justify-around">
        {navLinks.map((link) => {
          const IconComp = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-emerald-400 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconComp className={`w-5 h-5 ${isActive ? 'scale-110 text-emerald-400' : ''} transition-transform`} />
              <span className="text-[9px] mt-0.5 tracking-tight font-medium leading-none">
                {link.label.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
