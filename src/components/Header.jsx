import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';


import { GoogleLogout } from 'react-google-login';
import config from '../config.js';

export default function Header() {
  const navigate = useNavigate();

  const onLogout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  let user_name = sessionStorage.getItem("name");
  return (
    <div>
      <Navbar color="danger" expand="md" light>
        <NavbarBrand>
          <Link to="/login" style={{ textDecoration: 'none' }}><span className="text-white"><strong>IMernDb</strong></span></Link>
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link to="/" style={{ textDecoration: 'none' }}><NavLink><span className="text-white" border="0">Browse</span></NavLink></Link>
            </NavItem>
            <NavItem>
              {user_name === null
                ? (<NavLink><span onClick={() => navigate("/login")} className="text-white">Watchlist</span></NavLink>)
                : (<Link to="/watchlist" style={{ textDecoration: 'none' }}><NavLink><span className="text-white">Watchlist</span></NavLink></Link>)}
            </NavItem>
            <NavItem>
              {user_name === null
                ? (<NavLink><span onClick={() => navigate("/login")} className="text-white">Watched</span></NavLink>)
                : (<Link to="/watched" style={{ textDecoration: 'none' }}><NavLink><span className="text-white">Watched</span></NavLink></Link>)}
            </NavItem>
          </Nav>
          <Nav navbar>
            {user_name === null ? (
              <NavItem className="text-white">
                <NavLink onClick={() => navigate("/login")}>
                  <span className="text-white">Login</span>
                </NavLink>
              </NavItem>
            ) : (
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  <span className="text-white">{user_name}</span>
                </DropdownToggle>
                <DropdownMenu end flip={false}>
                  {/*<DropdownItem diabled>
                    {sessionStorage.getItem("email")}
                  </DropdownItem>
                  <DropdownItem divider />*/}
                  <DropdownItem>
                    <GoogleLogout
                      clientId={config.clientID}
                      buttonText="Logout"
                      theme='dark'
                      onLogoutSuccess={onLogout}
                    />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
