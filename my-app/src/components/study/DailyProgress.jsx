export default function DailyProgress({ completedToday, totalToday, progressPercent }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Progress</h2>
      <div className="text-sm text-gray-600 mb-1">
        {completedToday} of {totalToday} tasks completed
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-indigo-500 h-4 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="text-right text-sm text-gray-500 mt-1">
        {Math.round(progressPercent)}%
      </div>
    </div>
  );
}
