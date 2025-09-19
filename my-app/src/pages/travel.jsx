import React, { useState, useEffect } from "react";
import  TravelPlan  from "@/entities/travelPlan.schema.json";
import { User } from "@/entities/User";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MapPin, DollarSign, Calendar, Plane, Camera, Heart, Mountain } from "lucide-react";

import TravelPlanGenerator from "../components/travel/travelPlanGenerator";
import TravelPlanDisplay from "../components/travel/travelPlanDisplay";
import MyTravelPlans from "../components/travel/myTravelPlan";

export default function Travel() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("explore");
  const [travelPlans, setTravelPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, plansData] = await Promise.all([
        User.me(),
        TravelPlan.filter({ created_by: (await User.me()).email }, "-created_date")
      ]);
      setUser(userData);
      setTravelPlans(plansData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const generateTravelPlan = async (formData) => {
    const prompt = `Create a detailed travel plan based on:
    - Destination type: ${formData.destination_type}
    - Budget: $${formData.budget}
    - Duration: ${formData.duration} days
    - Current mood: ${user?.current_mood || 'neutral'}
    
    Suggest a specific destination that matches these criteria and create a day-by-day itinerary with activities and estimated costs.`;

    try {
      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            destination: { type: "string" },
            itinerary: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  activities: { type: "array", items: { type: "string" } },
                  estimated_cost: { type: "number" }
                }
              }
            },
            travel_tips: { type: "array", items: { type: "string" } }
          }
        }
      });

      const planData = {
        ...formData,
        mood_when_created: user?.current_mood || "calm",
        generated_destination: result.destination,
        itinerary: result.itinerary,
        travel_tips: result.travel_tips
      };

      await TravelPlan.create(planData);
      loadData();
      return planData;
    } catch (error) {
      console.error("Error generating travel plan:", error);
      // Return mock data for demo
      return {
        ...formData,
        mood_when_created: user?.current_mood || "calm",
        generated_destination: "Bali, Indonesia",
        itinerary: [
          { day: 1, activities: ["Arrive and check in", "Beach walk", "Local dinner"], estimated_cost: 120 },
          { day: 2, activities: ["Temple tour", "Rice terrace visit", "Spa treatment"], estimated_cost: 150 }
        ],
        travel_tips: ["Pack light clothing", "Try local cuisine", "Respect local customs"]
      };
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center floating-animation">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Travel & Wellness
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover destinations that match your mood and let AI plan the perfect wellness journey for you.
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
              variant={currentView === "explore" ? "default" : "ghost"}
              onClick={() => setCurrentView("explore")}
              className={currentView === "explore" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
            >
              <Compass className="w-4 h-4 mr-2" />
              Plan New Trip
            </Button>
            <Button
              variant={currentView === "my-plans" ? "default" : "ghost"}
              onClick={() => setCurrentView("my-plans")}
              className={currentView === "my-plans" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : ""}
            >
              <MapPin className="w-4 h-4 mr-2" />
              My Travel Plans
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentView === "explore" && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <TravelPlanGenerator 
                onGeneratePlan={generateTravelPlan}
                userMood={user?.current_mood}
              />
            </motion.div>
          )}

          {currentView === "my-plans" && (
            <motion.div
              key="my-plans"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <MyTravelPlans plans={travelPlans} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
 