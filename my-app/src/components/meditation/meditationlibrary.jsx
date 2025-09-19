import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, Leaf, Heart, Moon, Zap, Clock } from "lucide-react";

const meditations = [
  {
    type: "breathing",
    title: "Deep Breathing",
    description: "Simple breathing exercises to calm your mind and reduce anxiety",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    durations: [3, 5, 10, 15],
    benefits: ["Reduces anxiety", "Improves focus", "Lowers stress"],
    moodMatch: ["anxious", "angry", "confused"]
  },
  {
    type: "mindfulness",
    title: "Mindfulness Practice",
    description: "Present-moment awareness to ground yourself in the here and now",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    durations: [5, 10, 15, 20],
    benefits: ["Increases awareness", "Reduces overthinking", "Improves clarity"],
    moodMatch: ["confused", "anxious", "sad"]
  },
  {
    type: "body_scan",
    title: "Body Scan Relaxation",
    description: "Progressive muscle relaxation to release physical tension",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    durations: [10, 15, 20, 30],
    benefits: ["Releases tension", "Improves sleep", "Body awareness"],
    moodMatch: ["anxious", "angry", "energetic"]
  },
  {
    type: "loving_kindness",
    title: "Loving Kindness",
    description: "Cultivate compassion and positive feelings toward yourself and others",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    durations: [5, 10, 15, 20],
    benefits: ["Increases self-love", "Reduces loneliness", "Builds compassion"],
    moodMatch: ["sad", "lonely", "angry"]
  },
  {
    type: "sleep",
    title: "Sleep Meditation",
    description: "Gentle practices to help you unwind and prepare for restful sleep",
    icon: Moon,
    color: "from-indigo-500 to-purple-500",
    durations: [10, 15, 20, 30],
    benefits: ["Better sleep quality", "Reduces insomnia", "Deep relaxation"],
    moodMatch: ["anxious", "energetic", "confused"]
  }
];

export default function MeditationLibrary({ onStartSession, userMood }) {
  // Sort meditations by mood match
  const sortedMeditations = [...meditations].sort((a, b) => {
    const aMatches = userMood && a.moodMatch.includes(userMood) ? 1 : 0;
    const bMatches = userMood && b.moodMatch.includes(userMood) ? 1 : 0;
    return bMatches - aMatches;
  });

  return (
    <div className="space-y-6">
      {sortedMeditations.map((meditation, index) => {
        const matchesMood = userMood && meditation.moodMatch.includes(userMood);
        
        return (
          <motion.div
            key={meditation.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`
              relative overflow-hidden transition-all duration-300
              ${matchesMood ? 'ring-2 ring-purple-400 bg-gradient-to-br from-white/90 to-purple-50/90' : 'bg-white/70'}
              backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl
            `}>
              {matchesMood && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500 text-white">
                    Perfect for your mood!
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${meditation.color} flex items-center justify-center`}>
                    <meditation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                      {meditation.title}
                    </CardTitle>
                    <p className="text-gray-600 leading-relaxed">
                      {meditation.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {meditation.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    Choose your duration:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {meditation.durations.map((duration) => (
                      <Button
                        key={duration}
                        onClick={() => onStartSession(meditation.type, duration)}
                        variant="outline"
                        className={`
                          bg-gradient-to-r ${meditation.color} text-white border-0
                          hover:opacity-90 transition-all duration-300
                        `}
                      >
                        {duration} min{duration !== 1 ? 's' : ''}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}