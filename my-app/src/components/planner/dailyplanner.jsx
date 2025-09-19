import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Lightbulb, Target, Calendar } from "lucide-react";

export default function DailyPlanner({ schedule, onUpdateSchedule, userMood }) {
  if (!schedule) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No schedule for today
        </h3>
        <p className="text-gray-500">
          Generate your first AI-powered daily schedule to get started
        </p>
      </motion.div>
    );
  }

  const completedTasks = schedule.daily_tasks?.filter(task => task.completed)?.length || 0;
  const totalTasks = schedule.daily_tasks?.length || 0;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Today's Progress</h2>
                <p className="opacity-90">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{Math.round(completionRate)}%</div>
                <div className="text-sm opacity-90">Complete</div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-teal-500" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.daily_tasks?.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border transition-all duration-300
                    ${task.completed 
                      ? 'bg-green-50 border-green-200 opacity-75' 
                      : 'bg-white border-gray-200 hover:shadow-md'
                    }
                  `}
                >
                  <button className="flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-teal-500 transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.task}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {task.time_slot}
                      </div>
                      <Badge className={`border ${priorityColors[task.priority]}`}>
                        {task.priority} priority
                      </Badge>
                      {task.mood_points > 0 && (
                        <Badge className="bg-purple-100 text-purple-800">
                          +{task.mood_points} mood points
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Suggestions */}
      {schedule.ai_suggestions && schedule.ai_suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                AI Productivity Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.ai_suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}