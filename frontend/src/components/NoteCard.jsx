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

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 animate-fade-in-scale">
      <div className="flex items-center justify-between mb-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {note.title}
        </h5>
        {note.tag && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full ml-2">
            {note.tag}
          </span>
        )}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {note.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-300">
          Created at: {localDateTime.localDate} {localDateTime.localTime}
        </span>
      </div>
    </div>
  );
};
