import React from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WellnessCode({ code }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-xl border-white/30 text-white shadow-2xl">
        <CardContent className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">
              Your Personal Wellness Code
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            "{code}"
          </h2>
          <p className="text-white/80 text-sm">
            Let this guide your journey today 💜
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}