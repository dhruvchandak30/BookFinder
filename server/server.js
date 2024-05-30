require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const UpdateCounter = require("./Routes/UpdateCounter");
const AddBook = require("./Routes/AddBook");
const DeleteBook=require('./Routes/DeleteBook');
const FetchBooks=require('./Routes/FetchBooks');

app.use(UpdateCounter);
app.use(AddBook);
app.use(DeleteBook);
app.use(FetchBooks);

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
