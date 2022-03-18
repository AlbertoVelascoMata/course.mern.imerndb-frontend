import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';

import { GoogleLogout } from 'react-google-login';
import config from '../config.js';

export default function Header(){

  const navigate = useNavigate();

  const onLogout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  if (sessionStorage.getItem("name") !== null){

    return (
      <Navbar light color="danger" expand="md">
        <NavbarBrand><span className="text-white"><strong> MERNFlix</strong></span></NavbarBrand>
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/home" style={{ textDecoration: 'none' }}><NavLink><span className="text-white" border="0">All movies </span></NavLink></Link>
            </NavItem>
            <NavItem>
            <Link to="/home/bookmarks" style={{ textDecoration: 'none' }}><NavLink><span className="text-white">My Bookmarks</span></NavLink></Link>
            </NavItem>
          </Nav>
          <NavbarText>
            <span className="text-white">{sessionStorage.getItem('name')} </span>
            <GoogleLogout
              clientId={config.clientID}
              buttonText="Logout"
              theme='dark'
              onLogoutSuccess={onLogout}
            />
          </NavbarText>
        </Collapse>
      </Navbar>
    );
  }
}
