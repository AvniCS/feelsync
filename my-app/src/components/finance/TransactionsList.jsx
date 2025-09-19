export default function TransactionsList({ transactions, formatCurrency }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <ul className="divide-y divide-gray-100">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between py-3">
            <span className="text-gray-700">{tx.name}</span>
            <span
              className={`font-medium ${
                tx.amount < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {formatCurrency(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
