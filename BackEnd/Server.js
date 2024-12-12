var express = require("express");
let Books = require("./BooksSchema");
let mongodbConnected = require("./MongoDBConnect");
const cors = require("cors");
var bodyparser = require("body-parser");
var app = express();

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
  console.log("Root route working");
});

// Start server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Get all books
app.get("/allbooks", async (req, res) => {
  try {
    const allBooks = await Books.find();
    res.status(200).json(allBooks);
  } catch (err) {
    console.error("Error fetching all books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get a single book by ID
app.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    res.status(500).json({ error: "Failed to fetch the book" });
  }
});

// Add a new book
app.post("/addbooks", async (req, res) => {
  try {
    const newBook = new Books(req.body);
    const savedBook = await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: savedBook });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(400).json({ error: "Failed to add the book" });
  }
});

// Update an existing book by ID
app.post("/updatebook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      booktitle: req.body.booktitle,
      PubYear: req.body.PubYear,
      author: req.body.author,
      Topic: req.body.Topic,
      formate: req.body.formate,
    };

    console.log("Updating book with ID:", id, "Data:", updateData);

    // Perform the update
    const updatedBook = await Books.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ error: "Failed to update the book" });
  }
});

// Delete a book by ID
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete the book" });
  }
});


app.get("/books-by-topic/:topic", async (req, res) => {
  try {
    const topic = req.params.topic.trim(); // Trim whitespace
    const books = await Books.find({ Topic: { $regex: new RegExp(`^${topic}$`, "i") } }); // Case-insensitive matching
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books by topic:", err);
    res.status(500).json({ error: "Failed to fetch books by topic" });
  }
});
