export default function StudyStats({ subjects, completedToday, totalToday }) {
  const stats = [
    { title: "Tasks Today", value: `${completedToday}/${totalToday}` },
    { title: "Subjects Tracking", value: subjects.length },
    { title: "Streak", value: "🔥 5 days" },
    { title: "Weekly Goal", value: "80% complete" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-4 text-center"
        >
          <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
          <div className="text-gray-600">{stat.title}</div>
        </div>
      ))}
    </div>
  );
}
