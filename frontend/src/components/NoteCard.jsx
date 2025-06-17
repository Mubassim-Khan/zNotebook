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
    <div className="col-md-3 bg-gray-500 border">
      <div className="my-3">
        <div className=" mb-2 mt-2 text-gray-700">
          <div className="d-inline-flex align-items-center gap-1">
            {/* Note Title */}
            <h5 className="card-title">{note.title}</h5>
          </div>

          {/* Note Tag */}
          {note.tag && (
            <p className="inline-block text-blue-800 text-xs px-2 py-1 rounded">
              Note Tag: {note.tag}
            </p>
          )}

          {/* Note Description */}
          <p className="mb-2">{note.description}</p>

          {/* Note Created Time */}
          <p className="card-date">
            Created at: {localDateTime.localDate} {localDateTime.localTime}
          </p>
        </div>
      </div>
    </div>
  );
};
