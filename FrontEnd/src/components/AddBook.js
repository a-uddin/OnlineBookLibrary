import React, { useState } from "react";
import axios from "axios";

function AddBook() {
  const [book, setBook] = useState({
    booktitle: "",
    PubYear: "",
    author: "",
    Topic: "Programming",
    formate: "Hard Copy",
  });

  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!book.booktitle.trim()) newErrors.booktitle = "Book Title is required";
    if (!book.PubYear || isNaN(book.PubYear)) newErrors.PubYear = "Publication Year is required and must be a number";
    if (!book.author.trim()) newErrors.author = "Author is required";
    if (!book.Topic.trim()) newErrors.Topic = "Topic is required";
    if (!book.formate) newErrors.formate = "Format is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to Add this Book?');
    if (!confirmDelete) return;
    if (validateForm()) {
      axios.post("http://localhost:5010/addbooks", book)
        .then(() => {
          alert("Book added successfully!");
          setBook({ booktitle: "", PubYear: "", author: "", Topic: "Programming", formate: "Hard Copy" });
          setErrors({});
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 p-4 shadow-sm">
        <h3 className="text-center mb-4">Add a New Book</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              name="booktitle"
              className={`form-control ${errors.booktitle ? "is-invalid" : ""}`}
              value={book.booktitle}
              onChange={handleChange}
              placeholder="Enter book title"
            />
            {errors.booktitle && <div className="invalid-feedback">{errors.booktitle}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              className={`form-control ${errors.author ? "is-invalid" : ""}`}
              value={book.author}
              onChange={handleChange}
              placeholder="Enter author's name"
            />
            {errors.author && <div className="invalid-feedback">{errors.author}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input
              type="number"
              name="PubYear"
              className={`form-control ${errors.PubYear ? "is-invalid" : ""}`}
              value={book.PubYear}
              onChange={handleChange}
              placeholder="Enter publication year"
            />
            {errors.PubYear && <div className="invalid-feedback">{errors.PubYear}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Topic</label>
            <select
              name="Topic"
              className={`form-control ${errors.Topic ? "is-invalid" : ""}`}
              value={book.Topic}
              onChange={handleChange}
            >
              <option>Programming</option>
              <option>Data Science</option>
              <option>AI</option>
              <option>Engineering</option>
            </select>
            {errors.Topic && <div className="invalid-feedback">{errors.Topic}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Format</label>
            <div>
              <input
                type="radio"
                name="formate"
                value="Hard Copy"
                checked={book.formate === "Hard Copy"}
                onChange={handleChange}
              />{" "}
              Hard Copy
              <input
                type="radio"
                name="formate"
                value="Electronic Copy"
                checked={book.formate === "Electronic Copy"}
                onChange={handleChange}
                className="ms-3"
              />{" "}
              Electronic Copy
            </div>
            {errors.formate && <div className="text-danger">{errors.formate}</div>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
