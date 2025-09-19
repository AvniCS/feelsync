import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Sparkles, MapPin, DollarSign, Calendar } from "lucide-react";

import TravelPlanDisplay from "./travelPlanDisplay";

const destinationTypes = [
  { value: "beach", label: "🏖️ Beach & Coast", mood: ["calm", "happy", "excited"] },
  { value: "mountains", label: "🏔️ Mountains & Nature", mood: ["anxious", "confused", "sad"] },
  { value: "city", label: "🏙️ City & Urban", mood: ["energetic", "excited", "lonely"] },
  { value: "countryside", label: "🌾 Countryside & Rural", mood: ["calm", "sad", "confused"] },
  { value: "adventure", label: "🚵 Adventure & Sports", mood: ["energetic", "excited", "angry"] },
  { value: "cultural", label: "🏛️ Cultural & Historical", mood: ["confused", "lonely", "calm"] },
  { value: "wellness", label: "🧘 Wellness & Spa", mood: ["anxious", "sad", "calm"] },
  { value: "romantic", label: "💕 Romantic Getaway", mood: ["happy", "excited", "lonely"] }
];

export default function TravelPlanGenerator({ onGeneratePlan, userMood }) {
  const [formData, setFormData] = useState({
    destination_type: "",
    budget: "",
    duration: ""
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.destination_type || !formData.budget || !formData.duration) return;

    setIsGenerating(true);
    try {
      const plan = await onGeneratePlan(formData);
      setGeneratedPlan(plan);
    } catch (error) {
      console.error("Error generating plan:", error);
    }
    setIsGenerating(false);
  };

  if (generatedPlan) {
    return <TravelPlanDisplay plan={generatedPlan} onBack={() => setGeneratedPlan(null)} />;
  }

  // Sort destination types by mood match
  const sortedDestinationTypes = [...destinationTypes].sort((a, b) => {
    const aMatches = userMood && a.mood.includes(userMood) ? 1 : 0;
    const bMatches = userMood && b.mood.includes(userMood) ? 1 : 0;
    return bMatches - aMatches;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-500" />
            Plan Your Perfect Trip
          </CardTitle>
          <p className="text-gray-600">
            Tell us your preferences and let AI create a personalized travel experience for you
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Destination Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              What kind of destination speaks to you?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sortedDestinationTypes.map((type) => {
                const matchesMood = userMood && type.mood.includes(userMood);
                return (
                  <Button
                    key={type.value}
                    variant={formData.destination_type === type.value ? "default" : "outline"}
                    onClick={() => handleInputChange('destination_type', type.value)}
                    className={`
                      h-auto p-4 text-left relative
                      ${formData.destination_type === type.value 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                        : matchesMood 
                          ? 'border-orange-400 bg-orange-50 hover:bg-orange-100' 
                          : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    {matchesMood && formData.destination_type !== type.value && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          Perfect for your mood!
                        </div>
                      </div>
                    )}
                    <div className="text-base font-medium">{type.label}</div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Budget and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                What's your budget?
              </Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Enter total budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="pl-10 bg-white/70 border-white/30"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('budget', '500')}
                  className="text-sm"
                >
                  $500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('budget', '1500')}
                  className="text-sm"
                >
                  $1,500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('budget', '3000')}
                  className="text-sm"
                >
                  $3,000
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                How many days?
              </Label>
              <Input
                type="number"
                placeholder="Trip duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="bg-white/70 border-white/30"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[3, 5, 7, 14].map(days => (
                  <Button
                    key={days}
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('duration', days.toString())}
                    className="text-sm"
                  >
                    {days} days
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center pt-6">
            <Button
              onClick={handleGenerate}
              disabled={!formData.destination_type || !formData.budget || !formData.duration || isGenerating}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Creating Your Perfect Trip...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate My Travel Plan
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}