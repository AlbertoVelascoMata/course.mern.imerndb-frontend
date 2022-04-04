import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from './Login';
import MovieList from './movies/MovieList'
import MovieDetails from './movies/MovieDetails';
import WatchList from './movies/WatchList';
import WatchedList from './movies/WatchedList';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
          <Route path="/" element={<MovieList/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/details/:id" element={<MovieDetails/>} />
          <Route path="/watchlist" element={<WatchList/>} />
          <Route path="/watched" element={<WatchedList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
