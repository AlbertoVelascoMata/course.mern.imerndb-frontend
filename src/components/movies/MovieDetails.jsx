import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Row, Col, Button } from 'reactstrap';
import { AiOutlineArrowLeft, AiFillAppstore, AiFillVideoCamera, AiFillEdit, AiOutlineGlobal } from "react-icons/ai";

import Header from '../Header.jsx';
import { getSingleMovie } from "../../utils/apicalls.js";

export default function ShowMovie(){

  const [movie, setMovie] = useState(null);

  const getMovie = (id) => {
    getSingleMovie(id).then((movie) => {
      setMovie(movie);
    });
  }

  const { id } = useParams();

  useEffect(() =>{
    getMovie(id);
  },[id]);

  return movie === null ? 
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
    <Row><Col><Header /></Col></Row>
    <Row>
      <Col xs ="12" >
        <div className="card-body">
          <h4 className="text-white">{movie.title} </h4>
          <Link to={`/home`}><Button color="danger"><AiOutlineArrowLeft/> Back</Button></Link>
          <p className="text-white"><AiFillAppstore/> Category: 
            {movie.category.map((cat) => {
              return (<span className="text-white"> {cat} </span>);
            })}
          </p>
          <div className="video-responsive">
            <iframe
              width="100%"
              height="650"
              src={`https://www.youtube.com/embed/${movie.trailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <p className="text-white">
            <AiFillEdit/> Plot: {movie.plot}<br/>
            <AiFillVideoCamera/> Director: {movie.director}<br/>
            <AiOutlineGlobal/>Country: {movie.country}
          </p> 
        </div>
      </Col>
    </Row>
  </div>
  );
}
