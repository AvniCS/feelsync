import React, { useState, useEffect } from "react";
import  MeditationSession  from "@/entities/meditationSession.schema.json";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Play, Pause, RotateCcw, Clock, Heart } from "lucide-react";
import { format } from "date-fns";

import MeditationTimer from "../components/meditation/meditationtimer";
import MeditationLibrary from "../components/meditation/meditationlibrary";
import SessionHistory from "../components/meditation/sessionhistory";

export default function Meditation() {
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("library");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, sessionsData] = await Promise.all([
        User.me(),
        MeditationSession.filter({ created_by: (await User.me()).email }, "-created_date", 20)
      ]);
      setUser(userData);
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const startSession = (type, duration) => {
    setActiveSession({
      type,
      duration,
      timeLeft: duration * 60,
      isRunning: false,
      moodBefore: user?.current_mood || ""
    });
    setCurrentView("timer");
  };

  const completeSession = async (sessionData) => {
    await MeditationSession.create({
      ...sessionData,
      completed: true
    });
    setActiveSession(null);
    setCurrentView("library");
    loadData();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center floating-animation">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Meditation Center
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find peace and clarity through guided meditation. Take a moment to breathe and center yourself.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="flex bg-white/70 backdrop-blur-xl rounded-full p-2 space-x-2">
            <Button
              variant={currentView === "library" ? "default" : "ghost"}
              onClick={() => setCurrentView("library")}
              className={currentView === "library" ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""}
            >
              Meditation Library
            </Button>
            <Button
              variant={currentView === "history" ? "default" : "ghost"}
              onClick={() => setCurrentView("history")}
              className={currentView === "history" ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""}
            >
              Your Sessions
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentView === "timer" && activeSession && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <MeditationTimer
                session={activeSession}
                onComplete={completeSession}
                onCancel={() => {
                  setActiveSession(null);
                  setCurrentView("library");
                }}
              />
            </motion.div>
          )}

          {currentView === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <MeditationLibrary
                onStartSession={startSession}
                userMood={user?.current_mood}
              />
            </motion.div>
          )}

          {currentView === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <SessionHistory sessions={sessions} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}