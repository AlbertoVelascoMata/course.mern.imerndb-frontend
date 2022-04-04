import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Badge, CardTitle } from 'reactstrap';
import { getAllMovies, getMyBookmarks, getWatchedMovies } from "../../utils/apicalls.js";

import Header from '../Header.jsx';
import MovieCard from './MovieCard';

export default function MovieList(){
  const [movies, setMovies] = useState(null);

  useEffect(() =>{
    getAllMovies().then((movies) => {
      let moviesDict = movies.reduce((dict, movie) => {
        movie.watched_id = null;
        movie.bookmark_id = null;
        dict[movie._id] = movie;
        return dict;
      }, {});

      getMyBookmarks(sessionStorage.getItem('email')).then((bookmarks) => {
        bookmarks.map((bookmark) => {
          moviesDict[bookmark.movie._id].bookmark_id = bookmark._id;
        });

        getWatchedMovies(sessionStorage.getItem('email')).then((watchedMovies) => {
          watchedMovies.map((watchedMovie) => {
            moviesDict[watchedMovie.movie._id].watched_id = watchedMovie._id;
          });
          setMovies(Object.values(moviesDict));
        });
      });
    });
  }, []);
 
  return movies === null ? 
    (<div>
      <Row>
        <Col>
          <Header/>
        </Col>
      </Row>
      <Row><h1 class="text-white">Loading...</h1></Row>
    </div>) 
    : (
    <div>
      <Row>
        <Col>
          <Header/>
        </Col>
      </Row> 
      <Container>
        <CardTitle tag="center"><Badge pill color="dark">{movies.length} movies</Badge></CardTitle>
          <Row>
            {movies.map((movie) => {
                return ( 
                  <Col sm="3" xs="4">
                    <MovieCard movie={movie} />
                  </Col>
                )
            })}
          </Row>
      </Container>
    </div>
  );        
}
