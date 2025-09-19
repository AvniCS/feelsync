import React, { useState } from "react";
import { Brain, Calendar, Clock, Target } from "lucide-react";

export default function AIScheduleForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    studyHours: "",
    focusArea: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call parent callback if provided
    if (onGenerate) {
      onGenerate(formData);
    } else {
      console.log("AI Schedule form data:", formData);
      alert("This is where AI generation would happen!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Brain className="text-white w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          AI-Powered Schedule Generator
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Fill out your study preferences and let the AI propose an optimized plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            <Clock className="inline w-4 h-4 mr-1" />
            Total Study Hours Available
          </label>
          <input
            type="number"
            name="studyHours"
            value={formData.studyHours}
            onChange={handleChange}
            placeholder="e.g. 4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            <Target className="inline w-4 h-4 mr-1" />
            Focus Area / Subject
          </label>
          <input
            type="text"
            name="focusArea"
            value={formData.focusArea}
            onChange={handleChange}
            placeholder="e.g. Mathematics, Physics…"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            <Calendar className="inline w-4 h-4 mr-1" />
            Specific Goal (optional)
          </label>
          <input
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            placeholder="e.g. Finish Chapter 5"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:opacity-90 transition"
        >
          Generate Schedule
        </button>
      </form>
    </div>
  );
}
