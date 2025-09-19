export default function SubjectsGrid({ subjects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {subjects.map(subject => (
        <div
          key={subject.id}
          className={`p-6 rounded-2xl shadow text-white bg-gradient-to-r ${subject.color}`}
        >
          <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
          <p className="text-sm">Hours planned: {subject.hours}</p>
          <p className="text-sm">Completed: {subject.completed}</p>
          <p className="text-sm">Priority: {subject.priority}</p>
        </div>
      ))}

      <button className="p-6 rounded-2xl shadow bg-white border text-gray-600 hover:bg-gray-50">
        + Add Subject
      </button>
    </div>
  );
}
