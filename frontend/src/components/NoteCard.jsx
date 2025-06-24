import { useTheme } from "../context/theme/ThemeContext";

export const NoteCard = ({ note }) => {
  const convertToLocalTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      localDate,
      localTime,
    };
  };
  const localDateTime = convertToLocalTime(note.date);
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg shadow-md p-4 flex flex-col justify-between h-64 border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-gray-200 border-slate-500 text-black"
      } `}
    >
      <div className="flex items-center justify-between mb-2">
        <h5
          className={`mb-2 text-2xl font-bold tracking-tight ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {note.title}
        </h5>
        {note.tag && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full ml-2">
            {note.tag}
          </span>
        )}
      </div>
      <div
        className={`prose max-w-none text-sm overflow-auto flex-1 mb-4 ${
          theme === "dark" ? "text-gray-200 prose-invert" : "text-gray-800"
        }`}
        dangerouslySetInnerHTML={{ __html: note.description }}
      />
      <div className="flex items-center justify-between mt-4">
        <span
          className={`text-xs ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          Created at: {localDateTime.localDate} {localDateTime.localTime}
        </span>
      </div>
    </div>
  );
};
