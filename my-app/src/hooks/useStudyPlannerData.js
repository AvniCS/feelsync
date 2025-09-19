import { useState } from "react";
import { BarChart3, BookOpen, Target, Brain, TrendingUp } from "lucide-react";

export const useStudyPlannerData = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", color: "from-blue-500 to-cyan-500", hours: 20, completed: 12, priority: "High" },
    { id: 2, name: "Physics", color: "from-purple-500 to-pink-500", hours: 15, completed: 8, priority: "Medium" },
    { id: 3, name: "Chemistry", color: "from-green-500 to-emerald-500", hours: 18, completed: 10, priority: "High" }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: "Complete Calculus Chapter", deadline: "2025-09-20", completed: false, type: "short" },
    { id: 2, title: "Physics Mock Test", deadline: "2025-09-18", completed: true, type: "short" },
    { id: 3, title: "Master Organic Chemistry", deadline: "2025-10-15", completed: false, type: "long" }
  ]);

  const [todayTasks, setTodayTasks] = useState([
    { id: 1, subject: "Mathematics", task: "Derivatives Practice", time: "2:00 PM - 3:30 PM", completed: false },
    { id: 2, subject: "Physics", task: "Wave Mechanics", time: "4:00 PM - 5:00 PM", completed: true },
    { id: 3, subject: "Chemistry", task: "Reaction Mechanisms", time: "7:00 PM - 8:30 PM", completed: false }
  ]);

  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleTaskComplete = (taskId) => {
    setTodayTasks(tasks => tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleGoalComplete = (goalId) => {
    setGoals(g => g.map(goal =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "goals", label: "Goals", icon: Target },
    { id: "schedule", label: "AI Schedule", icon: Brain },
    { id: "progress", label: "Progress", icon: TrendingUp }
  ];

  return {
    subjects, setSubjects,
    goals, setGoals,
    todayTasks, setTodayTasks,
    activeTab, setActiveTab,
    toggleTaskComplete,
    toggleGoalComplete,
    completedToday,
    totalToday,
    progressPercent,
    tabs
  };
};
