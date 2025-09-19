export default function TabsNav({ activeTab, setActiveTab }) {
  const tabs = ["overview", "transactions", "budgets", "goals"];

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full text-sm capitalize transition ${
            activeTab === tab
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
