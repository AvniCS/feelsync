import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Activity, Target, TrendingUp, Zap, Shield } from "lucide-react";

// Mock Google Fit integration - replace with real API when available
const generateMockFitnessData = () => ({
  heart_rate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
  stress_level: Math.floor(Math.random() * 60) + 20, // 20-80%
  steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
  calories_burned: Math.floor(Math.random() * 300) + 200, // 200-500 calories
  sleep_hours: Math.round((Math.random() * 3 + 6) * 10) / 10, // 6-9 hours
  fitness_goals: {
    daily_steps: 10000,
    weekly_workouts: 3,
    stress_target: 30
  }
});

const generateAIRecommendations = (data, mood) => {
  const recommendations = [];
  
  if (data.stress_level > 50) {
    recommendations.push("Your stress levels are elevated. Try a 5-minute breathing exercise.");
  }
  
  if (data.steps < data.fitness_goals.daily_steps * 0.5) {
    recommendations.push("You're behind on your step goal. Take a short walk to boost your mood!");
  }
  
  if (data.heart_rate > 90 && mood === "anxious") {
    recommendations.push("Your heart rate suggests anxiety. Consider some gentle meditation.");
  }
  
  if (data.sleep_hours < 7) {
    recommendations.push("You may need more rest. Poor sleep can affect your emotional well-being.");
  }
  
  if (mood === "energetic" && data.steps < 8000) {
    recommendations.push("You're feeling energetic! Perfect time for a workout to maintain that positive mood.");
  }
  
  return recommendations;
};

export default function FitnessTracker({ userMood }) {
  const [fitnessData, setFitnessData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading fitness data
    if (isConnected) {
      const mockData = generateMockFitnessData();
      mockData.ai_recommendations = generateAIRecommendations(mockData, userMood);
      mockData.mood_correlation = getMoodCorrelation(mockData, userMood);
      setFitnessData(mockData);
    }
  }, [isConnected, userMood]);

  const getMoodCorrelation = (data, mood) => {
    if (data.stress_level > 60 && ["anxious", "angry"].includes(mood)) {
      return "High stress may be contributing to your current mood";
    }
    if (data.steps > 8000 && ["happy", "energetic"].includes(mood)) {
      return "Great activity level - this may be boosting your mood!";
    }
    if (data.sleep_hours < 7 && ["sad", "confused"].includes(mood)) {
      return "Low sleep may be affecting how you feel today";
    }
    return "Your fitness data looks balanced with your current mood";
  };

  const connectToGoogleFit = () => {
    setIsLoading(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  const getStressColor = (level) => {
    if (level < 30) return "text-green-600";
    if (level < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStressLabel = (level) => {
    if (level < 30) return "Low";
    if (level < 60) return "Moderate";
    return "High";
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Activity className="w-6 h-6 text-blue-500" />
              Fitness & Wellness Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Connect Your Fitness Data</h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Connect with Google Fit to get AI-powered insights about how your physical health affects your mood and get personalized wellness recommendations.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Privacy First:</strong> Your health data is processed locally and only used to provide personalized wellness insights. We never share your fitness information.
                </div>
              </div>
            </div>
            <Button
              onClick={connectToGoogleFit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6"
            >
              {isLoading ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Connecting to Google Fit...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Connect Google Fit
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Fitness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{fitnessData?.heart_rate}</div>
            <div className="text-xs opacity-90">Heart Rate (BPM)</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{fitnessData?.steps.toLocaleString()}</div>
            <div className="text-xs opacity-90">Steps Today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{fitnessData?.calories_burned}</div>
            <div className="text-xs opacity-90">Calories Burned</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{fitnessData?.sleep_hours}h</div>
            <div className="text-xs opacity-90">Sleep Last Night</div>
          </CardContent>
        </Card>
      </div>

      {/* Stress Level & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {fitnessData?.stress_level}%
                </span>
                <Badge className={`${getStressColor(fitnessData?.stress_level)} bg-opacity-10`}>
                  {getStressLabel(fitnessData?.stress_level)} Stress
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    fitnessData?.stress_level < 30 ? 'bg-green-500' :
                    fitnessData?.stress_level < 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${fitnessData?.stress_level}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Target: Under {fitnessData?.fitness_goals.stress_target}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Daily Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Steps</span>
                  <span>{fitnessData?.steps}/{fitnessData?.fitness_goals.daily_steps}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (fitnessData?.steps / fitnessData?.fitness_goals.daily_steps) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      {fitnessData?.ai_recommendations && fitnessData.ai_recommendations.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              AI Wellness Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fitnessData.ai_recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{recommendation}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {fitnessData.mood_correlation && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Mood Insight:</span>
                  <span className="text-purple-700">{fitnessData.mood_correlation}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}