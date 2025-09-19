import { Eye, EyeOff } from "lucide-react";

export default function BalanceCards({ showBalance, setShowBalance, formatCurrency }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total Balance", value: 45000 },
        { label: "Income", value: 25000 },
        { label: "Expenses", value: -12000 },
        { label: "Net Savings", value: 33000 },
      ].map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">{card.label}</p>
            {idx === 0 && (
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-emerald-600"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          <p className="text-2xl font-bold mt-2">
            {showBalance ? formatCurrency(card.value) : "•••••"}
          </p>
        </div>
      ))}
    </div>
  );
}
