import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export const DeleteModal = ({
  removeArticle,
  articleId,
  onClose,
  isOpen,
  noteTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full animate-zoom-in-scale max-w-sm">
        <h2 className="text-lg font-bold mb-4">Delete Note</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{noteTitle}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => removeArticle(articleId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
