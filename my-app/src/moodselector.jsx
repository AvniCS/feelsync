import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { motion } from "framer-motion";

const moods = [
  { name: "happy", emoji: "😊", color: "from-yellow-400 to-orange-500", label: "Happy" },
  { name: "sad", emoji: "😢", color: "from-blue-400 to-indigo-500", label: "Sad" },
  { name: "anxious", emoji: "😰", color: "from-red-400 to-pink-500", label: "Anxious" },
  { name: "calm", emoji: "😌", color: "from-green-400 to-teal-500", label: "Calm" },
  { name: "excited", emoji: "🤩", color: "from-purple-400 to-pink-500", label: "Excited" },
  { name: "confused", emoji: "😕", color: "from-gray-400 to-gray-600", label: "Confused" },
  { name: "angry", emoji: "😠", color: "from-red-500 to-red-700", label: "Angry" },
  { name: "lonely", emoji: "😔", color: "from-indigo-400 to-purple-500", label: "Lonely" },
  { name: "energetic", emoji: "⚡", color: "from-yellow-500 to-red-500", label: "Energetic" }
];

export default function MoodSelector({ currentMood, onMoodSelect }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-gray-800">
            How are you feeling right now?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMoodSelect(mood.name)}
                className={`
                  relative p-4 rounded-2xl transition-all duration-300 group
                  ${currentMood === mood.name 
                    ? `bg-gradient-to-br ${mood.color} text-white shadow-2xl transform scale-110` 
                    : 'bg-white/50 hover:bg-white/80 text-gray-700 hover:shadow-lg'
                  }
                `}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </div>
                
                {currentMood === mood.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-white/20 pointer-events-none"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {currentMood && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 p-4 bg-white/50 rounded-xl"
            >
              <p className="text-gray-600">
                You're feeling <span className="font-semibold text-purple-600">
                  {moods.find(m => m.name === currentMood)?.label}
                </span> right now. That's completely valid! 💜
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}