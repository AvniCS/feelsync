import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp, Brain } from "lucide-react";
import { format } from "date-fns";

export default function SessionHistory({ sessions }) {
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const completedSessions = sessions.filter(s => s.completed);
  
  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800",
    sad: "bg-blue-100 text-blue-800",
    anxious: "bg-red-100 text-red-800",
    calm: "bg-green-100 text-green-800",
    excited: "bg-purple-100 text-purple-800",
    confused: "bg-gray-100 text-gray-800",
    angry: "bg-red-200 text-red-900",
    lonely: "bg-indigo-100 text-indigo-800",
    energetic: "bg-orange-100 text-orange-800"
  };

  const typeColors = {
    breathing: "from-green-500 to-emerald-500",
    mindfulness: "from-blue-500 to-cyan-500",
    body_scan: "from-purple-500 to-pink-500",
    loving_kindness: "from-pink-500 to-rose-500",
    sleep: "from-indigo-500 to-purple-500"
  };

  if (sessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No meditation sessions yet
        </h3>
        <p className="text-gray-500">
          Start your first meditation session to track your progress
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalMinutes}</div>
            <div className="text-sm opacity-90">Total Minutes</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{completedSessions.length}</div>
            <div className="text-sm opacity-90">Sessions Completed</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {completedSessions.length > 0 ? Math.round(totalMinutes / completedSessions.length) : 0}
            </div>
            <div className="text-sm opacity-90">Avg Session</div>
          </CardContent>
        </Card>
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${typeColors[session.type]} flex items-center justify-center`}>
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-800">
                          {session.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {session.duration} min{session.duration !== 1 ? 's' : ''}
                        </Badge>
                        {session.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(session.created_date), "MMM d, yyyy 'at' h:mm a")}
                        </div>
                      </div>
                      
                      {session.mood_before && session.mood_after && (
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-600">Mood:</span>
                          <Badge className={moodColors[session.mood_before]}>
                            {session.mood_before}
                          </Badge>
                          <span className="text-gray-400">→</span>
                          <Badge className={moodColors[session.mood_after]}>
                            {session.mood_after}
                          </Badge>
                        </div>
                      )}
                      
                      {session.notes && (
                        <p className="text-gray-600 text-sm italic mt-2">
                          "{session.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}