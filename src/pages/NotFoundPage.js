import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../image/Logo';
const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
    max-width: 350px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
        <NavLink to="/" className="logo">
        <Logo/>
        </NavLink>
         
           <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className={"back"}>
        Back to home
      </NavLink>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;