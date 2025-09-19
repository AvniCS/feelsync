import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Brain, Clock, Briefcase, Target } from "lucide-react";

export default function ScheduleSetup({ onSetupComplete, userMood }) {
  const [formData, setFormData] = useState({
    profession: "",
    wake_up_time: "07:00",
    sleep_time: "23:00",
    work_hours: {
      start: "09:00",
      end: "17:00"
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.profession.trim()) return;
    
    setIsGenerating(true);
    await onSetupComplete(formData);
    setIsGenerating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center"
    >
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-teal-500" />
            Set Up Your Personal Schedule
          </CardTitle>
          <p className="text-gray-600">
            Tell us about your routine so AI can create the perfect schedule for you
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profession */}
          <div className="space-y-2">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              What's your profession or main activity?
            </Label>
            <Input
              placeholder="e.g., Software Developer, Student, Teacher, Entrepreneur..."
              value={formData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              className="bg-white/70 border-white/30"
            />
          </div>

          {/* Sleep Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Wake Up Time
              </Label>
              <Input
                type="time"
                value={formData.wake_up_time}
                onChange={(e) => handleInputChange('wake_up_time', e.target.value)}
                className="bg-white/70 border-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                Sleep Time
              </Label>
              <Input
                type="time"
                value={formData.sleep_time}
                onChange={(e) => handleInputChange('sleep_time', e.target.value)}
                className="bg-white/70 border-white/30"
              />
            </div>
          </div>

          {/* Work Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                Work Start Time
              </Label>
              <Input
                type="time"
                value={formData.work_hours.start}
                onChange={(e) => handleInputChange('work_hours.start', e.target.value)}
                className="bg-white/70 border-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                Work End Time
              </Label>
              <Input
                type="time"
                value={formData.work_hours.end}
                onChange={(e) => handleInputChange('work_hours.end', e.target.value)}
                className="bg-white/70 border-white/30"
              />
            </div>
          </div>

          {/* Mood Info */}
          {userMood && (
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">
                💡 <strong>AI Note:</strong> We'll customize your schedule for when you're feeling{" "}
                <span className="font-semibold text-teal-600">{userMood}</span> to maximize your productivity and well-being.
              </p>
            </div>
          )}

          {/* Generate Button */}
          <div className="text-center pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!formData.profession.trim() || isGenerating}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Brain className="w-5 h-5 mr-2 animate-spin" />
                  Creating Your Perfect Schedule...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Generate My AI Schedule
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}