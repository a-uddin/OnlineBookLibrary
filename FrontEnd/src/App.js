import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import BookList from "./components/BookList";
import BooksByTopic from "./components/BooksByTopic";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-3">
          <Link className="navbar-brand" to="/">
            On-Line Book Library
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add a Book
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Display All Books
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show by Topic
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/show-topic/Programming">
                      Programming
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/show-topic/Data Science">
                      Data Science
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/show-topic/AI">
                      AI
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/show-topic/Engineering">
                      Engineering
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/show-topic/:topic" element={<BooksByTopic />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
