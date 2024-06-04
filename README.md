# Library Management System

This repository contains two main folders: `client` and `server`. The `client` is built with React, and the `server` is built with Node.js and Express.

## How to Start Contributing

1. **Fork the Repo and Clone it to Your PC**
   - Click the 'Fork' button at the top right of this repository.
   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/library-management-system.git
     ```

2. **Install Dependencies**
   - Navigate to both the `client` and `server` directories and run `npm install` to install all dependencies:
     ```bash
     cd client
     npm install
     cd ../server
     npm install
     ```

3. **Create Environment Variables**
   - In the `server` directory, create a `.env` file. Get the credentials from the Library Team and add them to the `.env` file.

4. **Start the Development Servers**
   - In the `client` directory, start the React development server:
     ```bash
     npm start
     ```
   - In the `server` directory, start the Node.js server:
     ```bash
     npm start
     ```

You are now ready to contribute!

## For the Library Team

### How to Add Books

1. **Set Up a MongoDB Account**
   - If you don't have a MongoDB account, create one.

2. **Access the Database**
   - Go to our database using the link provided by the team.

3. **Convert Excel Sheet to JSON**
   - Use [ConvertSimple](https://www.convertsimple.com/convert-xlsx-to-json/) to convert your Excel sheet to JSON format.

4. **Import JSON Data**
   - In the database, use the import data option, select JSON format, and add the recently converted JSON file. The database will be updated accordingly.

### Other Features

- **Add a Book**
  - You can add a book by entering the required details on the website.

- **Delete a Book**
  - You can delete a book by entering the Book ID/SrNo on the website.

- **Add/Edit Notifications**
  - You can add or edit notifications as needed.

**Note:**
When adding or deleting a book from the website, ensure you also update your Excel sheet. Failure to do so can disrupt the IDs assigned to each book, potentially hampering the database. First update the excel and then the website for each book.

## Important

**Do not make the credentials public.** This will create a huge mishap for both the database and the website.

## Deployment

- **Client:** Hosted on Vercel.
- **Server:** Hosted on Render.
