import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Container, Badge, CardTitle, Table, Button, Media } from 'reactstrap';
import { AiFillInfoCircle, AiOutlineDelete } from "react-icons/ai";

import { getWatchedMovies, markAsUnwatched } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";

import Header from '../Header.jsx';

export default function WatchedList() {
    const [watchedMovies, setWatchedMovies] = useState(null);
  
    const updateWatchedMovies = () => {
      getWatchedMovies(sessionStorage.getItem('email'))
        .then((watched_movies) => {setWatchedMovies(watched_movies);});
    }
  
    useEffect(() => { updateWatchedMovies();}, []);

    //Deleting selected bookmark
    const deleteWatchedMovie = (watched_movie) => {
      markAsUnwatched(watched_movie._id)
        .then((res) => (updateWatchedMovies()));
    }
   
    return watchedMovies === null ? 
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
          <CardTitle tag="center"><Badge pill color="dark">{watchedMovies.length} watched movies</Badge></CardTitle>
            <Table dark>
              <tbody>
              {watchedMovies.map((watched_movie) => {
                return (
                  <Row className="justify-content-center">
                    <Col xs="10">
                      <div className="card" style={{ backgroundColor: 'black' }}>
                        <div className="card-body">
                          <Row>
                            <Col xs="2"><Media src={watched_movie.movie.poster} alt="Poster" height="150px"/></Col>
                            <Col xs="8">
                              <h6>{watched_movie.movie.title}</h6>
                              <font color="#F1C61A">Watched: {getDateInStrFormat(new Date(watched_movie.watcheddate))}</font><br/>
                              Year: {watched_movie.movie.year}<br/>
                              Director: {watched_movie.movie.director}<br/>
                              Popularity: {watched_movie.movie.imdbRating}<br/>
                              Plot: {watched_movie.movie.plot}
                            </Col>
                            <Col xs="2">
                              <table cellPadding="3">
                                <tr>
                                  <td><Link to={`/details/${watched_movie.movie._id}`}><Button color="danger"><AiFillInfoCircle/> Details</Button></Link></td>
                                  <td><Button color="secondary" onClick={() => deleteWatchedMovie(watched_movie)}><AiOutlineDelete/> Remove</Button></td>                
                                </tr>
                              </table>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>)
                })}
                </tbody>
            </Table>
        </Container>
      </div>
    );       
}
