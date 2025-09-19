export default function TabsNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow ${
              activeTab === tab.id
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
