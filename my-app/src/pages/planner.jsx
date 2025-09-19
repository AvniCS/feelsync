import React, { useState, useEffect } from "react";
import  DailySchedule  from "@/entities/dailySchedule.schema.json";
import { User } from "@/entities/User";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Target, Brain, CheckCircle2, Plus } from "lucide-react";

import ScheduleSetup from "../components/planner/scheduleSetup";
import DailyPlanner from "../components/planner/dailyplanner";
import ProductivityStats from "../components/planner/productivityStats";

export default function Planner() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("setup");
  const [schedules, setSchedules] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      const schedulesData = await DailySchedule.filter(
        { created_by: userData.email },
        "-created_date",
        30
      );
      
      setUser(userData);
      setSchedules(schedulesData);
      
      // Check if user has basic schedule setup
      if (schedulesData.length > 0) {
        setCurrentView("planner");
        
        // Get today's schedule
        const today = new Date().toISOString().split('T')[0];
        const todayScheduleData = schedulesData.find(s => s.schedule_date === today);
        setTodaySchedule(todayScheduleData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const generateDailySchedule = async (setupData) => {
    const prompt = `Create a personalized daily schedule based on:
    - Profession: ${setupData.profession}
    - Wake up time: ${setupData.wake_up_time}
    - Sleep time: ${setupData.sleep_time}
    - Work hours: ${setupData.work_hours.start} to ${setupData.work_hours.end}
    - Current mood: ${user?.current_mood || 'neutral'}
    
    Generate a realistic daily schedule with specific tasks, time slots, and productivity suggestions that consider their emotional state.`;

    try {
      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            daily_tasks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  task: { type: "string" },
                  time_slot: { type: "string" },
                  priority: { type: "string", enum: ["low", "medium", "high"] },
                  completed: { type: "boolean", default: false },
                  mood_points: { type: "number", default: 0 }
                }
              }
            },
            ai_suggestions: { type: "array", items: { type: "string" } }
          }
        }
      });

      const scheduleData = {
        ...setupData,
        daily_tasks: result.daily_tasks,
        ai_suggestions: result.ai_suggestions,
        schedule_date: new Date().toISOString().split('T')[0]
      };

      await DailySchedule.create(scheduleData);
      loadData();
    } catch (error) {
      console.error("Error generating schedule:", error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 px-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center floating-animation">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              AI Productivity Planner
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let AI create personalized schedules that adapt to your mood and help you achieve your goals.
          </p>
        </motion.div>

        {/* Navigation */}
        {currentView !== "setup" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center px-4"
          >
            <div className="flex bg-white/70 backdrop-blur-xl rounded-full p-2 space-x-2">
              <Button
                variant={currentView === "planner" ? "default" : "ghost"}
                onClick={() => setCurrentView("planner")}
                className={currentView === "planner" ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white" : ""}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Today's Plan
              </Button>
              <Button
                variant={currentView === "stats" ? "default" : "ghost"}
                onClick={() => setCurrentView("stats")}
                className={currentView === "stats" ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white" : ""}
              >
                <Target className="w-4 h-4 mr-2" />
                Productivity Stats
              </Button>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="w-full px-4">
          <AnimatePresence mode="wait">
            {currentView === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <ScheduleSetup 
                  onSetupComplete={generateDailySchedule}
                  userMood={user?.current_mood}
                />
              </motion.div>
            )}

            {currentView === "planner" && (
              <motion.div
                key="planner"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <DailyPlanner 
                  schedule={todaySchedule}
                  onUpdateSchedule={loadData}
                  userMood={user?.current_mood}
                />
              </motion.div>
            )}

            {currentView === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <ProductivityStats schedules={schedules} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}