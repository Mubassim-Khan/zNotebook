import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export const DeleteModal = ({ removeArticle, articleId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e) => {
    try {
      e.preventDefault();
      removeArticle(articleId);
      setIsOpen(false);
    } catch (error) {
      toast.error("Request timed out");
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        <MdDelete className="w-5 h-5" />
        Delete
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-scale">
          <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700 animate-zoom-in-scale">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-medium text-gray-700 dark:text-gray-300">
                Are you sure you want to delete this Blog?
              </h3>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
