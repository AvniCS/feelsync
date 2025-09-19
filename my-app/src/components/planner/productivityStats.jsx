import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";

export default function ProductivityStats({ schedules }) {
  // Calculate stats from schedules
  const totalTasks = schedules.reduce((sum, schedule) => 
    sum + (schedule.daily_tasks?.length || 0), 0
  );
  
  const completedTasks = schedules.reduce((sum, schedule) => 
    sum + (schedule.daily_tasks?.filter(task => task.completed)?.length || 0), 0
  );
  
  const avgProductivityScore = schedules.length > 0 
    ? schedules.reduce((sum, s) => sum + (s.productivity_score || 0), 0) / schedules.length
    : 0;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (schedules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No productivity data yet
        </h3>
        <p className="text-gray-500">
          Complete some scheduled tasks to see your productivity insights
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
              <div className="text-sm opacity-90">Completion Rate</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-sm opacity-90">Tasks Completed</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{schedules.length}</div>
              <div className="text-sm opacity-90">Days Planned</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(avgProductivityScore)}</div>
              <div className="text-sm opacity-90">Avg Score</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle>Recent Schedule Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.slice(0, 7).map((schedule, index) => {
                const dayCompletedTasks = schedule.daily_tasks?.filter(t => t.completed)?.length || 0;
                const dayTotalTasks = schedule.daily_tasks?.length || 0;
                const dayRate = dayTotalTasks > 0 ? (dayCompletedTasks / dayTotalTasks) * 100 : 0;
                
                return (
                  <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{schedule.schedule_date}</div>
                      <div className="text-sm text-gray-500">
                        {dayCompletedTasks}/{dayTotalTasks} tasks • {schedule.profession}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{Math.round(dayRate)}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${dayRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}