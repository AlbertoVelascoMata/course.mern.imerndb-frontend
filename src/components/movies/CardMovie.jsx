import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Media, Button } from 'reactstrap';
import { AiFillEye, AiFillSignal, AiFillAppstore, AiTwotoneCalendar, AiOutlineStar } from "react-icons/ai";

import { addNewBookmark } from "../../utils/apicalls.js";

export default function CardMovie({ movie }){

  const navigate = useNavigate();

  const addBookmark = () => {
    //Save bookmark in database with the api call
    addNewBookmark(sessionStorage.getItem('email'), movie)
      .then((res) => navigate('/home/bookmarks'));
  }

  return(
    <div className="card" style={{ width: '18rem', backgroundColor: 'black' }}>
      <div className="card-body">
        <h6 className="text-white">{movie.title}</h6>
        <p>
          <Media src={movie.poster} alt="Poster" height="350px"/>
        </p>
        <p className="text-white">
          <AiTwotoneCalendar/> Cinema release: {movie.year}<br/>
          <AiFillSignal/> Popularity: {movie.imdbRating}<br/>
          <AiFillAppstore/> Category: 
            {movie.category.map((cat) => {
              return (<span className="text-white"> {cat} </span>);
            })}
        </p> 
        <table cellPadding="3">
          <tr>
            <td><Link to={`/home/details/${movie._id}`}><Button color="danger"><AiFillEye/> Watch</Button></Link></td>
            <td><Button color="warning" onClick={addBookmark}><AiOutlineStar/> Add</Button></td>                
          </tr>
        </table>
      </div>
    </div>
  );
}
