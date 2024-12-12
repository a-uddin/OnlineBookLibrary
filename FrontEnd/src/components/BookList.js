import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5010/allbooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const deleteBook = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Book?');
    if (!confirmDelete) return;
    axios.post(`http://localhost:5010/deleteBook/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== id));
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div>
      <h3>Book List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Pub Year</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Format</th>
            <th>Actions</th>
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
              <td>
                <Link to={`/edit/${book._id}`} className="btn btn-primary btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
