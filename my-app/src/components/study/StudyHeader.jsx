import { Brain } from "lucide-react";

export default function StudyHeader() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
        <Brain className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Study Planner
        </h1>
        <p className="text-gray-600">Smart scheduling for academic success</p>
      </div>
    </div>
  );
}
