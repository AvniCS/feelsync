import React, { useState } from "react";
import { User } from "@/entities/User.jsx";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    mainChallenges: "",
    goals: "",
    preferredActivities: [],
    currentMood: ""
  });

  const challenges = [
    "Stress & Anxiety", "Depression", "Loneliness", "Work-Life Balance", 
    "Relationships", "Sleep Issues", "Self-Confidence", "Anger Management"
  ];

  const activities = [
    "Journaling", "Meditation", "Talking to Others", "Exercise", 
    "Creative Activities", "Travel Planning", "Goal Setting", "Reading"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActivity = (activity) => {
    setFormData(prev => ({
      ...prev,
      preferredActivities: prev.preferredActivities.includes(activity)
        ? prev.preferredActivities.filter(a => a !== activity)
        : [...prev.preferredActivities, activity]
    }));
  };

  const generatePersonalizedCode = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Based on this user profile, create a personalized wellness code (like a motto or mantra):
      Age: ${formData.age}
      Main challenges: ${formData.mainChallenges}
      Goals: ${formData.goals}
      Preferred activities: ${formData.preferredActivities.join(', ')}
      Current mood: ${formData.currentMood}
      
      Generate a short, inspiring, personalized wellness code/motto (2-4 words) that captures their journey and goals.`;

      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            code: { type: "string" },
            meaning: { type: "string" }
          }
        }
      });

      // Save user data and navigate to dashboard
      await User.updateMyUserData({
        age: parseInt(formData.age),
        onboarding_completed: true,
        personalized_code: result.code,
        current_mood: formData.currentMood,
        preferred_activities: formData.preferredActivities,
        safe_mode: parseInt(formData.age) < 18
      });

      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error generating code:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center floating-animation">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to FeelsSync
            </CardTitle>
            <p className="text-gray-600 mt-2">Let's create your personalized wellness journey</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="age">How old are you?</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="border-white/30 bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>What's your current mood?</Label>
                  <Select value={formData.currentMood} onValueChange={(value) => handleInputChange('currentMood', value)}>
                    <SelectTrigger className="border-white/30 bg-white/50">
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">😊 Happy</SelectItem>
                      <SelectItem value="sad">😢 Sad</SelectItem>
                      <SelectItem value="anxious">😰 Anxious</SelectItem>
                      <SelectItem value="calm">😌 Calm</SelectItem>
                      <SelectItem value="excited">🤩 Excited</SelectItem>
                      <SelectItem value="confused">😕 Confused</SelectItem>
                      <SelectItem value="angry">😠 Angry</SelectItem>
                      <SelectItem value="lonely">😔 Lonely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!formData.age || !formData.currentMood}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label>What are your main challenges?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {challenges.map((challenge) => (
                      <Button
                        key={challenge}
                        variant={formData.mainChallenges.includes(challenge) ? "default" : "outline"}
                        onClick={() => {
                          const current = formData.mainChallenges.split(', ').filter(c => c);
                          if (current.includes(challenge)) {
                            handleInputChange('mainChallenges', current.filter(c => c !== challenge).join(', '));
                          } else {
                            handleInputChange('mainChallenges', [...current, challenge].join(', '));
                          }
                        }}
                        className="text-sm h-auto p-3"
                      >
                        {challenge}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">What are your wellness goals?</Label>
                  <Textarea
                    id="goals"
                    placeholder="Tell us what you hope to achieve..."
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="border-white/30 bg-white/50"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!formData.mainChallenges || !formData.goals}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label>What activities help you feel better?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {activities.map((activity) => (
                      <Button
                        key={activity}
                        variant={formData.preferredActivities.includes(activity) ? "default" : "outline"}
                        onClick={() => toggleActivity(activity)}
                        className="text-sm h-auto p-3"
                      >
                        {activity}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Ready to generate your personalized wellness code?
                  </p>
                  <Button 
                    onClick={generatePersonalizedCode}
                    disabled={isGenerating || formData.preferredActivities.length === 0}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-4 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Generating Your Code...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate My Wellness Code
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}