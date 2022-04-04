import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col, Container, Alert, Card, CardTitle, CardText, Media } from 'reactstrap';

import { GoogleLogin } from 'react-google-login';

import Header from './Header.jsx';
import config from '../config.js';

import MyImgLogin from '../images/background_imerndbdark.png';
var imgStyle = {
  width: "100%",
  height: "100%"
};

export default function Login() {
  const [loginMessage, setLoginMessage] = useState(null);

  const navigate = useNavigate();

  const responseGoogleSuccess = (googleUser) => {
    var profile = googleUser.getBasicProfile();

    sessionStorage.setItem('name', profile.getName());
    sessionStorage.setItem('email', profile.getEmail());

    navigate("/");
  }

  const responseGoogleFailure = () => {
    setLoginMessage(<Alert color="danger">Wrong login access. Try again</Alert>);
  }
  return (
    <div>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <Card inverse body className="text-center" style={{ backgroundColor: '#000', borderColor: '#000' }}>
              <CardTitle tag="h5">Welcome to IMernDb</CardTitle>
              <CardText>
                React-based web application developed as part of "Curso de desarrollo web full-stack con MERN v4.0"
              </CardText>
              {sessionStorage.getItem("name") === null
              ? (
                <CardText>
                  <GoogleLogin
                    clientId={config.clientID}
                    buttonText="Login with Google"
                    theme='dark'
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}/>
                  {loginMessage}
                </CardText>
              )
              : (<CardText>
                  <GoogleLogin
                    clientId={config.clientID}
                    buttonText={sessionStorage.getItem("email")}
                    theme='dark'
                    disabled/>
                </CardText>)}
              
              <Media style={imgStyle} object src={MyImgLogin} alt="Login" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
