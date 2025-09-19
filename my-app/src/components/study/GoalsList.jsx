export default function GoalsList({ goals, toggleGoalComplete }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Goals</h2>
      <ul className="space-y-3">
        {goals.map(goal => (
          <li
            key={goal.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div>
              <div className={`font-medium ${goal.completed ? "line-through text-gray-400" : ""}`}>
                {goal.title}
              </div>
              <div className="text-sm text-gray-500">
                Deadline: {goal.deadline}
              </div>
            </div>
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoalComplete(goal.id)}
              className="w-5 h-5 accent-indigo-500"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
