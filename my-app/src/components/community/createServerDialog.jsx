import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Lock, Users, Sparkles, Plus, Trash2 } from "lucide-react";

export default function CreateServerDialog({ isOpen, onClose, onCreate, userMood }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mood_theme: userMood || "mixed",
    privacy: "public",
    max_members: 50,
    server_rules: ["Be respectful to all members", "Keep conversations supportive"],
    tags: []
  });
  const [newTag, setNewTag] = useState("");
  const [newRule, setNewRule] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addRule = () => {
    if (newRule.trim() && formData.server_rules.length < 10) {
      setFormData(prev => ({
        ...prev,
        server_rules: [...prev.server_rules, newRule.trim()]
      }));
      setNewRule("");
    }
  };

  const removeRule = (index) => {
    setFormData(prev => ({
      ...prev,
      server_rules: prev.server_rules.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setIsCreating(true);
    try {
      const serverData = {
        ...formData,
        invite_code: formData.privacy === "private" ? generateInviteCode() : null
      };
      await onCreate(serverData);
    } catch (error) {
      console.error("Error creating server:", error);
    }
    setIsCreating(false);
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const moodOptions = [
    { value: "happy", label: "😊 Happy", color: "yellow" },
    { value: "sad", label: "😢 Sad", color: "blue" },
    { value: "anxious", label: "😰 Anxious", color: "red" },
    { value: "calm", label: "😌 Calm", color: "green" },
    { value: "excited", label: "🤩 Excited", color: "purple" },
    { value: "confused", label: "😕 Confused", color: "gray" },
    { value: "angry", label: "😠 Angry", color: "red" },
    { value: "lonely", label: "😔 Lonely", color: "indigo" },
    { value: "energetic", label: "⚡ Energetic", color: "orange" },
    { value: "mixed", label: "🌈 Mixed/All Moods", color: "gradient" }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="bg-white/90 backdrop-blur-xl border-white/30 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-green-500" />
                Create Your Chat Server
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Server Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Server Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Cozy Anxiety Support, Happy Vibes Only..."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/70 border-white/30"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Server Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="What's this server about? What kind of conversations happen here?"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-white/70 border-white/30"
                  rows={3}
                />
              </div>

              {/* Mood Theme and Privacy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Primary Mood Theme</Label>
                  <Select
                    value={formData.mood_theme}
                    onValueChange={(value) => handleInputChange('mood_theme', value)}
                  >
                    <SelectTrigger className="bg-white/70 border-white/30">
                      <SelectValue placeholder="Select mood theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {moodOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Privacy Setting</Label>
                  <Select
                    value={formData.privacy}
                    onValueChange={(value) => handleInputChange('privacy', value)}
                  >
                    <SelectTrigger className="bg-white/70 border-white/30">
                      <SelectValue placeholder="Select privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Public - Anyone can join
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Private - Invite only
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Max Members */}
              <div className="space-y-2">
                <Label htmlFor="max_members" className="text-sm font-semibold">
                  Maximum Members
                </Label>
                <Select
                  value={formData.max_members.toString()}
                  onValueChange={(value) => handleInputChange('max_members', parseInt(value))}
                >
                  <SelectTrigger className="bg-white/70 border-white/30">
                    <SelectValue placeholder="Select max members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 members</SelectItem>
                    <SelectItem value="25">25 members</SelectItem>
                    <SelectItem value="50">50 members</SelectItem>
                    <SelectItem value="100">100 members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Tags (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="bg-white/70 border-white/30"
                  />
                  <Button onClick={addTag} size="sm" disabled={!newTag.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:bg-red-100">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Server Rules */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Server Rules</Label>
                <div className="space-y-2">
                  {formData.server_rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1 text-sm">{index + 1}. {rule}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a server rule..."
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addRule()}
                    className="bg-white/70 border-white/30"
                  />
                  <Button onClick={addRule} size="sm" disabled={!newRule.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Create Button */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name.trim() || isCreating}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  {isCreating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Create Server
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}