import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Container, Badge, CardTitle, Table, Button, Media } from 'reactstrap';
import { AiFillInfoCircle, AiOutlineDelete } from "react-icons/ai";

import { getMyBookmarks, deleteBookmark } from "../../utils/apicalls.js";
import { getDateInStrFormat } from "../../utils/utils.js";

import Header from '../Header.jsx';

export default function WatchList() {

    const [bookmarks, setBookmarks] = useState(null);
  
    const getBookmarks = () => {
      getMyBookmarks(sessionStorage.getItem('email')).then((bookmarks) => {
        setBookmarks(bookmarks);
      });
    }
  
    useEffect(() =>{
      getBookmarks();
    },[]);

    //Deleting selected bookmark
    const deleteSelBookmark = (bookmark) => {
    deleteBookmark(bookmark._id)
      .then((res) => (getBookmarks()));
    }
   
    return bookmarks === null ? 
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
          <CardTitle tag="center"><Badge pill color="dark">{bookmarks.length} bookmarks</Badge></CardTitle>
            <Table dark>
              <tbody>
              {bookmarks.map((bookmark) => {
                return (
                  <Row className="justify-content-center">
                    <Col xs="10">
                      <div className="card" style={{ backgroundColor: 'black' }}>
                        <div className="card-body">
                          <Row>
                            <Col xs="2"><Media src={bookmark.movie.poster} alt="Poster" height="150px"/></Col>
                            <Col xs="8">
                              <h6>{bookmark.movie.title}</h6>
                              <font color="#F1C61A">Added to bookmarks: {getDateInStrFormat(new Date(bookmark.addeddate))}</font><br/>
                              Year: {bookmark.movie.year}<br/>
                              Director: {bookmark.movie.director}<br/>
                              Popularity: {bookmark.movie.imdbRating}<br/>
                              Plot: {bookmark.movie.plot}
                            </Col>
                            <Col xs="2">
                              <table cellPadding="3">
                                <tr>
                                  <td><Link to={`/details/${bookmark.movie._id}`}><Button color="danger"><AiFillInfoCircle/> Details</Button></Link></td>
                                  <td><Button color="secondary" onClick={() => deleteSelBookmark(bookmark)}><AiOutlineDelete/> Remove</Button></td>                
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
