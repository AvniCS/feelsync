import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from  "./components/lib/utils";
import { BookOpen, Users, Brain, Compass, Calendar, Heart } from "lucide-react";

const activities = [
  {
    id: "journal",
    title: "Write in Journal",
    description: "Express your thoughts and feelings in a safe space",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    page: "Journal",
    benefits: "Helps process emotions and gain clarity",
    moodMatch: ["sad", "confused", "anxious", "happy"]
  },
  {
    id: "community",
    title: "Connect with Others",
    description: "Share anonymously and find support from people who understand",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    page: "Community",
    benefits: "Reduces isolation and builds connection",
    moodMatch: ["lonely", "sad", "happy", "excited"]
  },
  {
    id: "meditation",
    title: "Meditate & Breathe",
    description: "Calm your mind with guided meditation sessions",
    icon: Brain,
    color: "from-indigo-500 to-purple-500",
    page: "Meditation",
    benefits: "Reduces stress and increases mindfulness",
    moodMatch: ["anxious", "angry", "confused", "calm"]
  },
  {
    id: "travel",
    title: "Plan Your Next Adventure",
    description: "Discover mood-based travel suggestions and plan escapes",
    icon: Compass,
    color: "from-orange-500 to-red-500",
    page: "Travel",
    benefits: "Inspires hope and provides goals to work toward",
    moodMatch: ["sad", "lonely", "excited", "happy"]
  },
  {
    id: "planner",
    title: "Organize Your Day",
    description: "Create mood-aware schedules and track your productivity",
    icon: Calendar,
    color: "from-teal-500 to-blue-500",
    page: "Planner",
    benefits: "Brings structure and accomplishment",
    moodMatch: ["confused", "anxious", "energetic", "calm"]
  },
  {
    id: "growth",
    title: "Personal Growth",
    description: "Get relationship advice and self-improvement tips",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    page: "Growth",
    benefits: "Builds confidence and emotional intelligence",
    moodMatch: ["confused", "sad", "lonely", "happy"]
  }
];

export default function ActivityGrid({ currentMood, userPreferences = [] }) {
  const navigate = useNavigate();

  // Sort activities by mood match and user preferences
  const sortedActivities = [...activities].sort((a, b) => {
    const aMatchesMood = a.moodMatch.includes(currentMood) ? 1 : 0;
    const bMatchesMood = b.moodMatch.includes(currentMood) ? 1 : 0;
    const aInPreferences = userPreferences.includes(a.title) ? 1 : 0;
    const bInPreferences = userPreferences.includes(b.title) ? 1 : 0;
    
    return (bMatchesMood + bInPreferences) - (aMatchesMood + aInPreferences);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {sortedActivities.map((activity, index) => {
        const matchesMood = activity.moodMatch.includes(currentMood);
        const isPreferred = userPreferences.includes(activity.title);
        
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`
              relative overflow-hidden transition-all duration-300 cursor-pointer group
              ${matchesMood ? 'ring-2 ring-purple-400 bg-gradient-to-br from-white/90 to-purple-50/90' : 'bg-white/70'}
              backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl
            `}>
              {matchesMood && (
                <div className="absolute top-3 right-3">
                  <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Perfect for your mood!
                  </div>
                </div>
              )}
              
              {isPreferred && !matchesMood && (
                <div className="absolute top-3 right-3">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Your favorite!
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {activity.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-medium">
                    💡 {activity.benefits}
                  </p>
                </div>
                
                <Button 
                  onClick={() => navigate(createPageUrl(activity.page))}
                  className={`
                    w-full bg-gradient-to-r ${activity.color} 
                    hover:opacity-90 text-white font-medium py-3 rounded-xl
                    transition-all duration-300 group-hover:shadow-lg
                  `}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}