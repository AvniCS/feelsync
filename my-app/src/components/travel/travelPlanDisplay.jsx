import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Calendar, ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";

export default function TravelPlanDisplay({ plan, onBack }) {
  const totalCost = plan.itinerary?.reduce((sum, day) => sum + (day.estimated_cost || 0), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Plan Another Trip
      </Button>

      {/* Header Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                {plan.generated_destination}
              </CardTitle>
              <p className="opacity-90 mt-2">
                Your perfect {plan.destination_type.replace('_', ' ')} getaway awaits!
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${plan.budget}</div>
              <div className="text-sm opacity-90">Budget</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {plan.duration} Days
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Est. Cost: ${totalCost}
            </div>
            <Badge className="bg-white/20 text-white">
              Mood-matched for {plan.mood_when_created}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Itinerary */}
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your Day-by-Day Itinerary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plan.itinerary?.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {day.day}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="font-semibold text-lg">Day {day.day}</div>
                  <div className="space-y-1">
                    {day.activities?.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Estimated cost: ${day.estimated_cost}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Travel Tips */}
      {plan.travel_tips && plan.travel_tips.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              AI Travel Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.travel_tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}