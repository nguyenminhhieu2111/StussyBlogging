import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import logoSb from '../image/SeekPng.com_stussy-logo-png_3225091.png'

const AuthencationPageStyles = styled.div`


.form{
    max-width: 600px;
    margin: 0px auto;
}
.have-acc{
    margin-bottom: 20px;
}
`
const ImageSignUp=styled.img`
 width: 18%;
 object-fit: cover;
 margin: 0 auto 20px;
`
const Heading=styled.h1`
 text-align: center;
 color: ${props => props.theme.primary};
 font-size: 40px;
 font-weight: bold;
 margin-bottom: 20px;
`
const AuthenticationPage = ({children}) => {
    return (
        <AuthencationPageStyles>
             <div className="container">
        <NavLink  to={"/"}>
              <ImageSignUp srcSet={logoSb} alt="" />
        </NavLink>
              <Heading>Meta Blogging</Heading>
              {children}
              </div>
        </AuthencationPageStyles>
    );
};

export default AuthenticationPage;