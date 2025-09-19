export default function BudgetsGrid({ budgets, formatCurrency }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Budgets</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => {
          const progress = (b.spent / b.limit) * 100;
          return (
            <div
              key={b.id}
              className="border border-gray-100 rounded-xl p-4 hover:shadow transition"
            >
              <div className="flex justify-between mb-1">
                <p className="text-gray-700 font-medium">{b.category}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(b.spent)} / {formatCurrency(b.limit)}
                </p>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    progress > 80 ? "bg-red-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:text-emerald-600 hover:border-emerald-500 cursor-pointer">
          + Add new budget
        </div>
      </div>
    </div>
  );
}
