import React, { useState, useEffect } from "react";
import  ChatMessageSchema  from "@/entities/chatmessage.schema.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Users, Globe, Lock, Shield, Heart, MoreVertical, Flag, Copy } from "lucide-react";
import { format } from "date-fns";

const anonymousNames = [
  "Gentle Soul", "Kind Heart", "Peaceful Mind", "Brave Spirit", "Calm Waters",
  "Bright Star", "Quiet Storm", "Free Bird", "Open Mind", "Pure Energy",
  "Wise Owl", "Happy Camper", "Night Sky", "Morning Sun", "Ocean Wave"
];

export default function ChatRoom({ server, onLeave, userMood, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [myAnonymousName] = useState(() => 
    anonymousNames[Math.floor(Math.random() * anonymousNames.length)]
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesData = await ChatMessageSchema.filter(
          { server_id: server.id },
          "-created_date",
          100
        );
        setMessages(messagesData.reverse()); // Show newest at bottom
      } catch (error) {
        console.error("Error loading messages:", error);
      }
      setIsLoading(false);
    };

    loadMessages();
  }, [server.id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await ChatMessageSchema.create({
        server_id: server.id,
        message: newMessage.trim(),
        sender_mood: userMood || "calm",
        anonymous_name: myAnonymousName
      });
      setNewMessage("");
      // Refresh messages after sending
      const messagesData = await ChatMessageSchema.filter(
        { server_id: server.id },
        "-created_date",
        100
      );
      setMessages(messagesData.reverse());
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    calm: "😌",
    excited: "🤩",
    confused: "😕",
    angry: "😠",
    lonely: "😔",
    energetic: "⚡"
  };

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onLeave}
                className="hover:bg-red-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  {server.privacy === "private" ? <Lock className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                  {server.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`border ${moodColors[server.mood_theme]}`}>
                    {moodEmojis[server.mood_theme] || "🌈"} {server.mood_theme}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {server.member_count || 1} online
                  </span>
                </div>
              </div>
            </div>
            {user?.safe_mode && (
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4" />
                Safe Mode
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Chat Messages */}
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    flex flex-col gap-2 p-3 rounded-lg
                    ${message.created_by === user?.email 
                      ? 'bg-green-50 border border-green-200 ml-8' 
                      : 'bg-gray-50 border border-gray-200 mr-8'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {message.anonymous_name || "Anonymous User"}
                      </span>
                      <Badge className={`text-xs ${moodColors[message.sender_mood]}`}>
                        {moodEmojis[message.sender_mood]} {message.sender_mood}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(message.created_date), "HH:mm")}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {message.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <button className="flex items-center gap-1 text-pink-600 hover:text-pink-700">
                      <Heart className="w-3 h-3" />
                      {message.support_count || 0}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {messages.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No messages yet. Be the first to start the conversation!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-lg">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Chatting as:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                {moodEmojis[userMood] || "😊"} {myAnonymousName}
              </Badge>
              <span className="text-xs">({userMood || "calm"})</span>
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Share your thoughts... Remember, this is an anonymous safe space."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white/70 border-white/30 resize-none"
                rows={2}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
