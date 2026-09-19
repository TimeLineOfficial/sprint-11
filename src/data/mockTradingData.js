export const ASSETS = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC/USD', type: 'Crypto', price: 67420.50, change24h: 3.84, volume24h: '28.4B', category: 'Crypto', sparkline: [64000, 65200, 64800, 66100, 67420.50] },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH/USD', type: 'Crypto', price: 3512.80, change24h: -1.12, volume24h: '14.2B', category: 'Crypto', sparkline: [3600, 3580, 3550, 3490, 3512.80] },
  { id: 'NVDA', name: 'NVIDIA Corporation', symbol: 'NVDA', type: 'Equities', price: 128.40, change24h: 5.62, volume24h: '42.1B', category: 'Stocks', sparkline: [120, 122, 124, 126, 128.40] },
  { id: 'AAPL', name: 'Apple Inc.', symbol: 'AAPL', type: 'Equities', price: 224.30, change24h: 0.85, volume24h: '18.9B', category: 'Stocks', sparkline: [221, 222, 223, 223.5, 224.30] },
  { id: 'TSLA', name: 'Tesla, Inc.', symbol: 'TSLA', type: 'Equities', price: 248.90, change24h: -2.45, volume24h: '22.3B', category: 'Stocks', sparkline: [258, 255, 252, 250, 248.90] },
  { id: 'SOL', name: 'Solana', symbol: 'SOL/USD', type: 'Crypto', price: 142.10, change24h: 8.92, volume24h: '6.8B', category: 'Crypto', sparkline: [128, 132, 136, 139, 142.10] }
];

export const PORTFOLIO_INITIAL = {
  totalNetWorth: 148520.40,
  cashBalance: 24500.00,
  unrealizedPnL: 12450.80,
  dailyPnL: 3210.40,
  holdings: [
    { symbol: 'NVDA', quantity: 350, avgCost: 105.20, currentPrice: 128.40, value: 44940.00, returnPct: 22.05 },
    { symbol: 'BTC', quantity: 0.85, avgCost: 58000.00, currentPrice: 67420.50, value: 57307.42, returnPct: 16.24 },
    { symbol: 'ETH', quantity: 6.0, avgCost: 3100.00, currentPrice: 3512.80, value: 21076.80, returnPct: 13.31 }
  ]
};

export const STRATEGIES = [
  {
    id: 'STRAT-EMA',
    name: 'Exponential Moving Average Cross',
    type: 'Trend Following',
    sharpeRatio: 2.34,
    winRate: 68.4,
    maxDrawdown: 9.2,
    netProfitPct: 42.8,
    description: 'Triggers long orders when 9-period EMA crosses above 21-period EMA on 15m candles.'
  },
  {
    id: 'STRAT-RSI',
    name: 'RSI Mean Reversion Scalper',
    type: 'Mean Reversion',
    sharpeRatio: 1.95,
    winRate: 74.1,
    maxDrawdown: 12.4,
    netProfitPct: 31.5,
    description: 'Buys when 14-period RSI drops below 30 and sells when RSI exceeds 70.'
  },
  {
    id: 'STRAT-GRID',
    name: 'Automated High-Frequency Grid Bot',
    type: 'Arbitrage Grid',
    sharpeRatio: 2.89,
    winRate: 88.2,
    maxDrawdown: 4.1,
    netProfitPct: 54.2,
    description: 'Deploys 20 limit order levels across support and resistance channels.'
  }
];
