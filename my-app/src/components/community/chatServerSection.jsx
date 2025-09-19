import React, { useState, useEffect } from "react";
import { ChatServer } from "@/entities/chatServer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Search, MessageCircle, Lock, Globe, Crown } from "lucide-react";

import CreateServerDialog from "./createServerDialog";
import ChatRoom from "./chatRoom";

export default function ChatServersSection({ userMood, user }) {
  const [servers, setServers] = useState([]);
  const [filteredServers, setFilteredServers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMoodFilter, setSelectedMoodFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeServer, setActiveServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    const filterServers = () => {
      let filtered = servers.filter(server =>
        server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        server.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedMoodFilter !== "all") {
        filtered = filtered.filter(server => 
          server.mood_theme === selectedMoodFilter || server.mood_theme === "mixed"
        );
      }

      setFilteredServers(filtered);
    };

    filterServers();
  }, [servers, searchTerm, selectedMoodFilter]);

  const loadServers = async () => {
    try {
      const serversData = await ChatServer.filter({ is_active: true }, "-created_date", 50);
      setServers(serversData);
    } catch (error) {
      console.error("Error loading servers:", error);
    }
    setIsLoading(false);
  };

  const handleCreateServer = async (serverData) => {
    try {
      await ChatServer.create(serverData);
      loadServers();
      setShowCreateDialog(false);
    } catch (error) {
      console.error("Error creating server:", error);
    }
  };

  const joinServer = (server) => {
    setActiveServer(server);
  };

  const leaveServer = () => {
    setActiveServer(null);
  };

  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800 border-yellow-200",
    sad: "bg-blue-100 text-blue-800 border-blue-200",
    anxious: "bg-red-100 text-red-800 border-red-200",
    calm: "bg-green-100 text-green-800 border-green-200",
    excited: "bg-purple-100 text-purple-800 border-purple-200",
    confused: "bg-gray-100 text-gray-800 border-gray-200",
    angry: "bg-red-200 text-red-900 border-red-300",
    lonely: "bg-indigo-100 text-indigo-800 border-indigo-200",
    energetic: "bg-orange-100 text-orange-800 border-orange-200",
    mixed: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200"
  };

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    calm: "😌",
    excited: "🤩",
    confused: "😕",
    angry: "😠",
    lonely: "😔",
    energetic: "⚡",
    mixed: "🌈"
  };

  if (activeServer) {
    return <ChatRoom server={activeServer} onLeave={leaveServer} userMood={userMood} user={user} />;
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search chat servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 border-white/30"
            />
          </div>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Server
        </Button>
      </div>

      {/* Mood Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedMoodFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedMoodFilter("all")}
          className={selectedMoodFilter === "all" ? "bg-green-500 text-white" : ""}
        >
          All Moods
        </Button>
        {Object.entries(moodEmojis).map(([mood, emoji]) => (
          <Button
            key={mood}
            variant={selectedMoodFilter === mood ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMoodFilter(mood)}
            className={selectedMoodFilter === mood ? "bg-green-500 text-white" : ""}
          >
            {emoji} {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </Button>
        ))}
      </div>

      {/* Recommended Servers for Current Mood */}
      {userMood && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" />
                Perfect for Your Current Mood ({moodEmojis[userMood]} {userMood})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServers
                  .filter(server => server.mood_theme === userMood || server.mood_theme === "mixed")
                  .slice(0, 4)
                  .map((server) => (
                    <ServerCard 
                      key={server.id} 
                      server={server} 
                      onJoin={() => joinServer(server)}
                      moodColors={moodColors}
                      moodEmojis={moodEmojis}
                      isRecommended={true}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* All Servers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server, index) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServerCard 
              server={server} 
              onJoin={() => joinServer(server)}
              moodColors={moodColors}
              moodEmojis={moodEmojis}
            />
          </motion.div>
        ))}
      </div>

      {filteredServers.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No servers found
          </h3>
          <p className="text-gray-500 mb-6">
            Be the first to create a server for this mood!
          </p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Server
          </Button>
        </motion.div>
      )}

      {/* Create Server Dialog */}
      <CreateServerDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreate={handleCreateServer}
        userMood={userMood}
      />
    </div>
  );
}

function ServerCard({ server, onJoin, moodColors, moodEmojis, isRecommended = false }) {
  return (
    <Card className={`
      relative overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl
      ${isRecommended ? 'ring-2 ring-purple-400 bg-gradient-to-br from-white/90 to-purple-50/90' : 'bg-white/70'}
      backdrop-blur-xl border-white/30 shadow-lg
    `}>
      {isRecommended && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-500 text-white">
            Recommended!
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              {server.privacy === "private" ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {server.name}
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed">
              {server.description || "A space for meaningful conversations"}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={`border ${moodColors[server.mood_theme]}`}>
            {moodEmojis[server.mood_theme]} {server.mood_theme}
          </Badge>
          {server.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {server.member_count || 0}/{server.max_members} members
          </div>
          <div className="flex items-center gap-1">
            {server.privacy === "private" ? (
              <Lock className="w-4 h-4" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {server.privacy}
          </div>
        </div>
        
        <Button 
          onClick={onJoin}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Join Chat
        </Button>
      </CardContent>
    </Card>
  );
}
