import React from "react";
import { useStudyPlannerData } from "../hooks/useStudyPlannerData";
import StudyHeader from "../components/study/StudyHeader";
import StudyStats from "../components/study/StudyStats";
import TabsNavigation from "../components/study/TabsNavigation";
import TodaySchedule from "../components/study/TodaySchedule";
import DailyProgress from "../components/study/DailyProgress";
import GoalsList from "../components/study/GoalsList";
import SubjectsGrid from "../components/study/SubjectsGrid";
import AIScheduleForm from "../components/study/AIScheduleForm";

export default function StudyPlannerPage() {
  const data = useStudyPlannerData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <StudyHeader />
      <StudyStats {...data} />
      <TabsNavigation {...data} />

      {data.activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TodaySchedule {...data} />
          <div className="space-y-6">
            <DailyProgress {...data} />
            <GoalsList {...data} />
          </div>
        </div>
      )}

      {data.activeTab === "subjects" && <SubjectsGrid {...data} />}
      {data.activeTab === "schedule" && <AIScheduleForm />}
    </div>
  );
}
