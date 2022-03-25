import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from './Login'
import MovieList from './movies/MovieList'
import ShowMovie from './movies/ShowMovie';
import MyMovieList from './movies/MyMovieList';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<MovieList/>} />
        <Route path="/home/details/:id" element={<ShowMovie/>} />
        <Route path="/home/bookmarks" element={<MyMovieList/>} />
      </Routes>
    </Router>
  );
}

export default App;
