require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

app.use(cors({}))
app.use(express.json());

// Import routes
const UpdateCounter = require("./Routes/UpdateCounter");
const AddBook = require("./Routes/AddBook");
const DeleteBook = require('./Routes/DeleteBook');
const FetchBooks = require('./Routes/FetchBooks');
const AddNotification = require("./Routes/AddNotification");
const Authenticate=require('./Routes/Authenticate');
// Use routes
app.use(UpdateCounter);
app.use(AddBook);
app.use(DeleteBook);
app.use(FetchBooks);
app.use(AddNotification);
app.use(Authenticate);

// Connect to MongoDB using Mongoose
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to MongoDB");
   
// }).catch(err => {
//     console.error("Failed to connect to MongoDB", err);
// });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
