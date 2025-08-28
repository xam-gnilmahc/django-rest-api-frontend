
import React, { useState, useRef } from "react";
import api from "../utils/apiInterceptor";

const Book: React.FC = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBook = async () => {
    if (!isbn.trim()) {
      setError("Please enter an ISBN");
      setBook(null);
      return;
    }

    setLoading(true);
    setError("");
    setBook(null);

    try {
      const response = await api.get(`/book?isbn=${isbn}`);
      const data = response.data?.message;

      if (!data) {
        setError("Book not found for the given ISBN");
        return;
      }

      setBook(data);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred while fetching the book"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 ISBN Book Search</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={fetchBook}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 font-medium text-center">{error}</p>}

      {book && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            {book.title || "N/A"}
          </h2>
          <p>
            <strong>👩‍💻 Authors:</strong>{" "}
            {(book.authors && book.authors.join(", ")) || "N/A"}
          </p>
          <p>
            <strong>🏢 Publishers:</strong>{" "}
            {(book.publishers && book.publishers.join(", ")) || "N/A"}
          </p>
          <p>
            <strong>📅 Publish Date:</strong> {book.publish_date || "N/A"}
          </p>
          <p>
            <strong>📖 Pages:</strong> {book.number_of_pages || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Book;
