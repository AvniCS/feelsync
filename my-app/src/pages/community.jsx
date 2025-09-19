import React, { useState, useEffect } from "react";
import  CommunityPost  from "@/entities/communityPost.schema.json";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Heart, Plus, Filter, Shield } from "lucide-react";
import { format } from "date-fns";

// Mood and category color definitions moved outside the component
// to be accessible by other components if needed, like ChatServersSection
const moodColors = {
  happy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  sad: "bg-blue-100 text-blue-800 border-blue-200",
  anxious: "bg-red-100 text-red-800 border-red-200",
  calm: "bg-green-100 text-green-800 border-green-200",
  excited: "bg-purple-100 text-purple-800 border-purple-200",
  confused: "bg-gray-100 text-gray-800 border-gray-200",
  angry: "bg-red-200 text-red-900 border-red-300",
  lonely: "bg-indigo-100 text-indigo-800 border-indigo-200",
  energetic: "bg-orange-100 text-orange-800 border-orange-200"
};

const categoryColors = {
  general: "bg-blue-50 text-blue-700",
  advice: "bg-purple-50 text-purple-700",
  support: "bg-pink-50 text-pink-700",
  celebration: "bg-green-50 text-green-700",
  question: "bg-orange-50 text-orange-700"
};

// Placeholder for ChatServersSection component
function ChatServersSection({ userMood, user, moodColors }) {
  // Mock data for chat servers
  const chatServers = [
    { id: 1, name: "General Hangout", description: "A place for open discussions and general chat.", mood_focus: "all" },
    { id: 2, name: "Calm Corner", description: "Find peace and serenity in this calm-focused server.", mood_focus: "calm" },
    { id: 3, name: "Anxiety Support Group", description: "Connect with others managing anxiety, share tips and support.", mood_focus: "anxious" },
    { id: 4, name: "Happy Vibes Lounge", description: "Share your joys and spread positivity!", mood_focus: "happy" },
    { id: 5, name: "Confused Conversations", description: "A space to articulate and explore confusing thoughts.", mood_focus: "confused" },
    { id: 6, name: "Creative Minds", description: "For artists, writers, and anyone with a creative spark.", mood_focus: "all" },
    { id: 7, name: "Dealing with Loneliness", description: "Find companionship and understanding.", mood_focus: "lonely" },
    { id: 8, name: "Energetic Exchange", description: "Share your energy and motivation!", mood_focus: "energetic" },
  ];

  const filteredServers = userMood === "all" || !userMood
    ? chatServers
    : chatServers.filter(server => server.mood_focus === "all" || server.mood_focus === userMood);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Join a Live Chat Server</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Connect in real-time with people who share similar feelings or interests.
        {userMood && userMood !== "all" && (
          <span className="block mt-1">Your current mood (<Badge className={moodColors[userMood]}>{userMood}</Badge>) might suggest these servers for you.</span>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.length > 0 ? (
          filteredServers.map((server) => (
            <Card key={server.id} className="bg-white/70 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{server.name}</CardTitle>
                <Badge variant="outline" className={`py-1 px-3 rounded-full text-xs ${server.mood_focus === "all" ? "bg-gray-100 text-gray-700" : moodColors[server.mood_focus]}`}>
                  {server.mood_focus === "all" ? "Any Mood" : server.mood_focus.charAt(0).toUpperCase() + server.mood_focus.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">{server.description}</p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  Join Server
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Chat Servers Available</h3>
            <p className="text-gray-500 mb-6">Try exploring other servers or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default function Community() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", mood: "", category: "general" });
  const [filterMood, setFilterMood] = useState("all");
  const [currentView, setCurrentView] = useState("posts"); // New state for view
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsData, userData] = await Promise.all([
        CommunityPost.list("-created_date", 50),
        User.me()
      ]);
      setPosts(postsData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) return;

    await CommunityPost.create({
      ...newPost,
      mood: user?.current_mood || newPost.mood,
    });

    setNewPost({ content: "", mood: "", category: "general" });
    setShowNewPost(false);
    loadData();
  };

  const handleSupport = async (postId) => {
    // This would typically update the support count
    // For now, just reload data to show changes
    loadData();
  };

  const filteredPosts = filterMood === "all" 
    ? posts 
    : posts.filter(post => post.mood === filterMood);


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Anonymous Community
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with others who understand. Share your journey anonymously in a safe, supportive space.
          </p>
          {user?.safe_mode && (
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              Safe Mode Active - All interactions are monitored for your safety
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="flex bg-white/70 backdrop-blur-xl rounded-full p-2 space-x-2 border border-gray-100 shadow-sm">
            <Button
              variant={currentView === "posts" ? "default" : "ghost"}
              onClick={() => setCurrentView("posts")}
              className={currentView === "posts" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:from-green-600 hover:to-emerald-600" : "text-gray-700 hover:bg-gray-100"}
            >
              <Heart className="w-4 h-4 mr-2" />
              Community Posts
            </Button>
            <Button
              variant={currentView === "chat-servers" ? "default" : "ghost"}
              onClick={() => setCurrentView("chat-servers")}
              className={currentView === "chat-servers" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:from-green-600 hover:to-emerald-600" : "text-gray-700 hover:bg-gray-100"}
            >
              <Users className="w-4 h-4 mr-2" />
              Chat Servers
            </Button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentView === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{duration: 0.3}}
              className="space-y-6" // Add some spacing for content below navigation
            >
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Select value={filterMood} onValueChange={setFilterMood}>
                      <SelectTrigger className="w-40 bg-white/70 border-white/30">
                        <SelectValue placeholder="Filter by mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Moods</SelectItem>
                        <SelectItem value="happy">😊 Happy</SelectItem>
                        <SelectItem value="sad">😢 Sad</SelectItem>
                        <SelectItem value="anxious">😰 Anxious</SelectItem>
                        <SelectItem value="calm">😌 Calm</SelectItem>
                        <SelectItem value="excited">🤩 Excited</SelectItem>
                        <SelectItem value="lonely">😔 Lonely</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => setShowNewPost(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Anonymously
                </Button>
              </div>

              {/* New Post Form */}
              <AnimatePresence>
                {showNewPost && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-500" />
                          Share With the Community
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Select 
                            value={newPost.category} 
                            onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger className="bg-white/50 border-white/30">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">💬 General</SelectItem>
                              <SelectItem value="advice">💡 Seeking Advice</SelectItem>
                              <SelectItem value="support">🤗 Need Support</SelectItem>
                              <SelectItem value="celebration">🎉 Celebration</SelectItem>
                              <SelectItem value="question">❓ Question</SelectItem>
                            </SelectContent>
                          </Select>
                          {user?.current_mood && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Mood:</span>
                              <Badge className={moodColors[user.current_mood]}>
                                {user.current_mood}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <Textarea
                          placeholder="Share what's on your mind... Remember, you're anonymous here. This is a safe space to express yourself."
                          value={newPost.content}
                          onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                          className="bg-white/50 border-white/30 min-h-32"
                          rows={4}
                        />
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setShowNewPost(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreatePost}
                            disabled={!newPost.content.trim()}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          >
                            Share Anonymously
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Posts Feed */}
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }} // Reduced delay for smoother appearance
                    >
                      <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge className={categoryColors[post.category]}>
                                  {post.category}
                                </Badge>
                                <Badge className={`border ${moodColors[post.mood]}`}>
                                  {post.mood}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500">
                                Anonymous • {format(new Date(post.created_date), "MMM d, yyyy 'at' h:mm a")}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSupport(post.id)}
                              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Send Support ({post.support_count || 0})
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredPosts.length === 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      {filterMood !== "all" ? "No posts for this mood" : "No posts yet"}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {filterMood !== "all" 
                        ? "Try selecting a different mood filter"
                        : "Be the first to share with the community"
                      }
                    </p>
                    {filterMood === "all" && (
                      <Button
                        onClick={() => setShowNewPost(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Share First Post
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === "chat-servers" && (
            <motion.div
              key="chat-servers"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{duration: 0.3}}
            >
              <ChatServersSection userMood={user?.current_mood} user={user} moodColors={moodColors} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
