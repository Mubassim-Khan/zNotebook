export const WelcomePage = ({ openAddModal }) => {
  // For the welcome message
  const showLoggedInUsername = () => localStorage.getItem("name");

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center">
      <p className="mb-8 font-bold text-5xl my-2 text-center flex flex-wrap justify-center py-2">
        Welcome,
        <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-red-500 bg-clip-text text-transparent ml-3 mb-1">
          {showLoggedInUsername()}
        </span>
      </p>
      <button
        onClick={openAddModal}
        type="button"
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-8 py-4 text-center mb-2 mt-5 shadow-lg"
      >
        Create Note
      </button>
    </div>
  );
};
