import { Wallet, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
          <Wallet className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Finance Manager
          </h1>
          <p className="text-gray-600">Take control of your financial future</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-emerald-50">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
