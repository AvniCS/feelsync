export default function TodaySchedule({ todayTasks, toggleTaskComplete }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
      <ul className="space-y-3">
        {todayTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div>
              <div className="font-medium">{task.task}</div>
              <div className="text-sm text-gray-500">
                {task.subject} — {task.time}
              </div>
            </div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskComplete(task.id)}
              className="w-5 h-5 accent-indigo-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
