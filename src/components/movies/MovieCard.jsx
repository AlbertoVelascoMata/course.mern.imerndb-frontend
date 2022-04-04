import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Media, Button } from 'reactstrap';
import { AiFillInfoCircle, AiFillEye, AiFillEyeInvisible, AiFillSignal, AiFillAppstore, AiTwotoneCalendar } from "react-icons/ai";
import {BiAddToQueue} from 'react-icons/bi';
import {IoIosRemoveCircle} from 'react-icons/io';

import { addNewBookmark, deleteBookmark, markAsUnwatched, markAsWatched } from "../../utils/apicalls.js";

export default function MovieCard({ movie }){
  const navigate = useNavigate();

  const [bookmarkId, setBookmarkId] = useState(movie.bookmark_id);
  const [watchedId, setWatchedId] = useState(movie.watched_id);

  const addToWatchlist = () => {
    let user_email = sessionStorage.getItem('email');
    if(user_email === null) navigate("/login");
    else addNewBookmark(user_email, movie)
          .then((res) => setBookmarkId(res._id));
  }

  const removeFromWatchList = () => {
    deleteBookmark(bookmarkId)
      .then(() => setBookmarkId(null));
  }

  const addToWatched = () => {
    let user_email = sessionStorage.getItem('email');
    if(user_email === null) navigate("/login");
    else markAsWatched(user_email, movie)
          .then((res) => setWatchedId(res._id));
  }

  const removeFromWatched = () => {
    markAsUnwatched(watchedId)
      .then(() => setWatchedId(null));
  }

  return (
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
            <td><Link to={`/details/${movie._id}`}><Button color="danger"><AiFillInfoCircle/> Details</Button></Link></td>
            <td>{bookmarkId !== null ? (
              <Button color="success" onClick={removeFromWatchList}><IoIosRemoveCircle/> In Watchlist</Button>
            ) : (
              <Button color="warning" onClick={addToWatchlist}><BiAddToQueue/> Bookmark</Button>
            )}</td>
            <td>{watchedId !== null ? (
              <Button color="info" onClick={removeFromWatched}><AiFillEyeInvisible/> Unwatch</Button>
            ) : (
              <Button color="primary" onClick={addToWatched}><AiFillEye/> Mark watched</Button>
            )}</td>               
          </tr>
        </table>
      </div>
    </div>
  );
}
