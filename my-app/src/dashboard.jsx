import React, { useState, useEffect } from "react";
import { User } from "@/entities/User.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/components/lib/utils";
import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Brain, Compass, Calendar, Sparkles, ArrowRight, Activity } from "lucide-react";

import MoodSelector from "./components/dashboard/moodselector.jsx";
import ActivityGrid from "./components/dashboard/activitygrid";
import WellnessCode from "./components/dashboard/wellnesscode";
import FitnessTracker from "./components/dashboard/fitnesstracker";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentMood, setCurrentMood] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await User.me();
        if (!userData.onboarding_completed) {
          navigate(createPageUrl("Welcome"));
          return;
        }
        setUser(userData);
        setCurrentMood(userData.current_mood || "");
      } catch (error) {
        navigate(createPageUrl("Welcome"));
      }
      setIsLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleMoodUpdate = async (mood) => {
    setCurrentMood(mood);
    await User.updateMyUserData({
      current_mood: mood,
      mood_history: [
        ...(user.mood_history || []),
        {
          mood,
          timestamp: new Date().toISOString(),
          notes: ""
        }
      ].slice(-50) // Keep last 50 mood entries
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your wellness space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back! 💜
          </h1>
          <p className="text-gray-600 text-lg">
            How are you feeling today? Let's check in with yourself.
          </p>
        </motion.div>

        {/* Wellness Code */}
        {user?.personalized_code && (
          <WellnessCode code={user.personalized_code} />
        )}

        {/* Mood Selector */}
        <MoodSelector currentMood={currentMood} onMoodSelect={handleMoodUpdate} />

        {/* Fitness Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FitnessTracker userMood={currentMood} />
        </motion.div>

        {/* What's Next Section */}
        {currentMood && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              What would you like to do next?
            </h2>
            <p className="text-gray-600">
              Choose an activity that resonates with how you're feeling
            </p>
          </motion.div>
        )}

        {/* Activity Grid */}
        {currentMood && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ActivityGrid currentMood={currentMood} userPreferences={user?.preferred_activities || []} />
          </motion.div>
        )}
      </div>
    </div>
  );
}