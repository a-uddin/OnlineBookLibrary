import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BooksByTopic() {
  const { topic } = useParams(); // Get the topic from the route
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5010/books-by-topic/${topic}`) // Use backend API for case-insensitive matching
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books by topic:", error);
        setLoading(false);
      });
  }, [topic]);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <h3>Books on Topic: {topic}</h3>
      {books.length === 0 ? (
        <p>No books found for this topic.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Pub Year</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.booktitle}</td>
                <td>{book.PubYear}</td>
                <td>{book.author}</td>
                <td>{book.Topic}</td>
                <td>{book.formate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BooksByTopic;
