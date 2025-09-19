import { Wallet, Bell, Settings, Eye, EyeOff, ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";

export default function FinanceOverview({ showBalance, setShowBalance, totalBalance, monthlyIncome, monthlyExpenses, formatCurrency }) {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Finance Manager</h1>
            <p className="text-gray-600">Take control of your financial future</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Balance */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100">Total Balance</p>
            <button onClick={() => setShowBalance(!showBalance)} className="p-1 hover:bg-white/20 rounded">
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-3xl font-bold">{showBalance ? formatCurrency(totalBalance) : "••••••"}</p>
        </div>

        {/* Income */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(monthlyIncome)}</p>
              <p className="text-sm text-gray-600">Monthly Income</p>
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(monthlyExpenses)}</p>
              <p className="text-sm text-gray-600">Monthly Expenses</p>
            </div>
          </div>
        </div>

        {/* Net Savings */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(monthlyIncome - monthlyExpenses)}</p>
              <p className="text-sm text-gray-600">Net Savings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
