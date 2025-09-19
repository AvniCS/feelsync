import React, { useState, useEffect } from "react";
import  JournalEntry  from "@/entities/JournalEntry.schema.json";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Heart, Calendar, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [entriesData, userData] = await Promise.all([
        JournalEntry.filter({ created_by: (await User.me()).email }, "-created_date"),
        User.me()
      ]);
      setEntries(entriesData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSaveEntry = async () => {
    if (!newEntry.content.trim()) return;

    await JournalEntry.create({
      ...newEntry,
      mood: user?.current_mood || newEntry.mood,
    });

    setNewEntry({ title: "", content: "", mood: "" });
    setShowNewEntry(false);
    loadData();
  };

  const filteredEntries = entries.filter(entry =>
    entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800",
    sad: "bg-blue-100 text-blue-800",
    anxious: "bg-red-100 text-red-800",
    calm: "bg-green-100 text-green-800",
    excited: "bg-purple-100 text-purple-800",
    confused: "bg-gray-100 text-gray-800",
    angry: "bg-red-200 text-red-900",
    lonely: "bg-indigo-100 text-indigo-800",
    energetic: "bg-orange-100 text-orange-800"
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="w-full max-w-none space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Your Journal
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A safe space to express your thoughts, process emotions, and track your mental wellness journey.
          </p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/70 border-white/30"
              />
            </div>
          </div>
          <Button
            onClick={() => setShowNewEntry(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </motion.div>

        {/* New Entry Card */}
        <AnimatePresence>
          {showNewEntry && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Write a New Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Entry title (optional)"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-white/50 border-white/30"
                  />
                  <Textarea
                    placeholder="How are you feeling? What's on your mind? Let it all out..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    className="bg-white/50 border-white/30 min-h-32"
                    rows={6}
                  />
                  {user?.current_mood && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Current mood:</span>
                      <Badge className={moodColors[user.current_mood]}>
                        {user.current_mood}
                      </Badge>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewEntry(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveEntry}
                      disabled={!newEntry.content.trim()}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      Save Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        {entry.title && (
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            {entry.title}
                          </CardTitle>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(entry.created_date), "MMM d, yyyy 'at' h:mm a")}
                          </div>
                          {entry.mood && (
                            <Badge className={moodColors[entry.mood]}>
                              {entry.mood}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEntries.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm ? "No entries found" : "Your journal is empty"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Start your wellness journey by writing your first entry"
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowNewEntry(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Write Your First Entry
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}