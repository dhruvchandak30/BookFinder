import React from 'react';
import BookSearch from './components/BookSearch';
import jsonData from './assets/LibraryKeywords.json';

const App = () => {
  return (
    <div>
      <h1>Book Search</h1>
      <BookSearch data={jsonData} />
    </div>
  );
};

export default App;

