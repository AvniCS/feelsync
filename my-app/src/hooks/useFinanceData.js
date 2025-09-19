import { useState } from "react";
import { ShoppingBag, DollarSign, Coffee, Car, Gamepad2, Target, Heart, BookOpen, Zap, Phone, Home } from "lucide-react";

export const useFinanceData = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [transactions] = useState([
    { id: 1, type: "expense", category: "Food", amount: 45.50, description: "Grocery shopping", date: "2025-09-12", icon: ShoppingBag },
    { id: 2, type: "income", category: "Salary", amount: 3500.00, description: "Monthly salary", date: "2025-09-10", icon: DollarSign },
    //...
  ]);

  const [budgets] = useState([
    { id: 1, category: "Food", allocated: 500, spent: 245.50, color: "from-green-500 to-emerald-500", icon: ShoppingBag },
    //...
  ]);

  const [goals] = useState([
    { id: 1, title: "Emergency Fund", target: 10000, current: 7500, color: "from-green-500 to-emerald-500", icon: Target },
    //...
  ]);

  const totalBalance = 12350.75;
  const monthlyIncome = 3500.00;
  const monthlyExpenses = 1847.23;
  const monthlyBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(amount);

  return {
    showBalance, setShowBalance,
    activeTab, setActiveTab,
    transactions, budgets, goals,
    totalBalance, monthlyIncome, monthlyExpenses,
    monthlyBudget, totalSpent,
    formatCurrency
  };
};
