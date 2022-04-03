import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Badge, CardTitle } from 'reactstrap';
import { getAllMovies } from "../../utils/apicalls.js";

import Header from '../Header.jsx';
import MovieCard from './MovieCard';

export default function MovieList(){

  const [movies, setMovies] = useState(null);

  const getMovies = () => {
    getAllMovies().then((movies) => {
      setMovies(movies);
    });
  }

  useEffect(() =>{
    getMovies();
  },[]);
 
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
        <CardTitle tag="center"><Badge pill color="dark">Total movies found: {movies.length}</Badge></CardTitle>
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
