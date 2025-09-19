export default function GoalsGrid({ goals, formatCurrency }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Goals</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((g) => {
          const progress = (g.saved / g.target) * 100;
          return (
            <div
              key={g.id}
              className="border border-gray-100 rounded-xl p-4 hover:shadow transition"
            >
              <div className="flex justify-between mb-1">
                <p className="text-gray-700 font-medium">{g.name}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(g.saved)} / {formatCurrency(g.target)}
                </p>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    progress > 80 ? "bg-emerald-600" : "bg-emerald-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button className="mt-3 w-full px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition text-sm">
                + Add Funds
              </button>
            </div>
          );
        })}
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:text-emerald-600 hover:border-emerald-500 cursor-pointer">
          + Create new goal
        </div>
      </div>
    </div>
  );
}
