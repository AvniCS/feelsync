import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Play, Pause, Square, RotateCcw } from "lucide-react";

export default function MeditationTimer({ session, onComplete, onCancel }) {
  const [timeLeft, setTimeLeft] = useState(session.timeLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [moodAfter, setMoodAfter] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowCompletion(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(session.duration * 60);
    setIsRunning(false);
  };

  const handleComplete = () => {
    onComplete({
      type: session.type,
      duration: session.duration,
      mood_before: session.moodBefore,
      mood_after: moodAfter,
      notes
    });
  };

  if (showCompletion) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">
              🎉 Session Complete!
            </CardTitle>
            <p className="text-gray-600">
              Great job completing your {session.duration}-minute {session.type} session
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                How are you feeling now?
              </label>
              <Select value={moodAfter} onValueChange={setMoodAfter}>
                <SelectTrigger className="bg-white/50 border-white/30">
                  <SelectValue placeholder="Select your current mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">😊 Happy</SelectItem>
                  <SelectItem value="calm">😌 Calm</SelectItem>
                  <SelectItem value="sad">😢 Sad</SelectItem>
                  <SelectItem value="anxious">😰 Anxious</SelectItem>
                  <SelectItem value="excited">🤩 Excited</SelectItem>
                  <SelectItem value="confused">😕 Confused</SelectItem>
                  <SelectItem value="angry">😠 Angry</SelectItem>
                  <SelectItem value="lonely">😔 Lonely</SelectItem>
                  <SelectItem value="energetic">⚡ Energetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Any thoughts or insights? (optional)
              </label>
              <Textarea
                placeholder="How did this session feel? What did you notice?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/50 border-white/30"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Skip & Return
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!moodAfter}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Save Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {session.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Session
          </CardTitle>
          <p className="text-gray-600">
            {session.duration} minute meditation • Find a comfortable position and breathe
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Timer Display */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (timeLeft / (session.duration * 60))}`}
                  className="transition-all duration-1000 ease-linear"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isRunning ? "Meditating..." : "Paused"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              className="w-12 h-12 rounded-full"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={toggleTimer}
              disabled={timeLeft === 0}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={onCancel}
              className="w-12 h-12 rounded-full"
            >
              <Square className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Guidance Text */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
            <p className="text-gray-700 text-center leading-relaxed">
              {session.type === "breathing" && "Focus on your breath. Inhale slowly through your nose, hold for a moment, then exhale gently through your mouth."}
              {session.type === "mindfulness" && "Notice the present moment. Observe your thoughts without judgment, letting them come and go like clouds in the sky."}
              {session.type === "body_scan" && "Start from the top of your head and slowly scan down through your body, noticing any tension and letting it release."}
              {session.type === "loving_kindness" && "Begin by sending loving thoughts to yourself, then extend that same kindness to others in your life."}
              {session.type === "sleep" && "Let your body sink into relaxation. Release the day's stress and prepare your mind for peaceful rest."}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}