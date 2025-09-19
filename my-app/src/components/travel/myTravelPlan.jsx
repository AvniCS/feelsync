import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Eye, Compass } from "lucide-react";
import { format } from "date-fns";

export default function MyTravelPlans({ plans }) {
  if (plans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No travel plans yet
        </h3>
        <p className="text-gray-500">
          Start planning your first mood-based adventure!
        </p>
      </motion.div>
    );
  }

  const statusColors = {
    planning: "bg-yellow-100 text-yellow-800",
    booked: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800"
  };

  return (
    <div className="space-y-6">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    {plan.generated_destination}
                  </CardTitle>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(plan.created_date), "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${plan.budget}
                    </div>
                    <Badge className={statusColors[plan.status]}>
                      {plan.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">Duration:</span>
                  <span>{plan.duration} days</span>
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{plan.destination_type.replace('_', ' ')}</span>
                </div>
                
                {plan.itinerary && plan.itinerary.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Preview: </span>
                    {plan.itinerary[0]?.activities?.slice(0, 2).join(", ")}
                    {plan.itinerary[0]?.activities?.length > 2 && "..."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}