// src/pages/finance.jsx
import { useState } from "react";
import Header from "@/components/finance/Header";
import BalanceCards from "@/components/finance/BalanceCards";
import TabsNav from "@/components/finance/TabsNav";
import TransactionsList from "@/components/finance/TransactionsList";
import BudgetsGrid from "@/components/finance/BudgetsGrid";
import GoalsGrid from "@/components/finance/GoalsGrid";

export default function FinancePage() {
  // centralised state here
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // your dummy data arrays (move them here)
  const transactions = [
    { id: 1, name: "Groceries", amount: -1200 },
    { id: 2, name: "Salary", amount: +25000 },
  ];

  const budgets = [
    { id: 1, category: "Food", spent: 1500, limit: 5000 },
    { id: 2, category: "Transport", spent: 800, limit: 2000 },
  ];

  const goals = [
    { id: 1, name: "Emergency Fund", saved: 20000, target: 50000 },
  ];

  // helper to format currency
  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amt);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header />

      <BalanceCards
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        formatCurrency={formatCurrency}
      />

      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && (
        <>
          <TransactionsList
            transactions={transactions}
            formatCurrency={formatCurrency}
          />
          <BudgetsGrid budgets={budgets} formatCurrency={formatCurrency} />
          <GoalsGrid goals={goals} formatCurrency={formatCurrency} />
        </>
      )}

      {activeTab === "transactions" && (
        <TransactionsList
          transactions={transactions}
          formatCurrency={formatCurrency}
        />
      )}

      {activeTab === "budgets" && (
        <BudgetsGrid budgets={budgets} formatCurrency={formatCurrency} />
      )}

      {activeTab === "goals" && (
        <GoalsGrid goals={goals} formatCurrency={formatCurrency} />
      )}
    </div>
  );
}

