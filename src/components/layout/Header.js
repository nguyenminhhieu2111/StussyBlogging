import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from '../../contexts/auth-context';
import Logo from '../../image/Logo';
import Button from '../button/Button';
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
   padding: 30px 0px;
   .container{
     max-width: 1300px;
   }
  .header-main {
    display: flex;
    align-items: center;
  }
  a.active {
    display: block;
    max-width: 90px;
    object-fit: cover;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 25px;
    list-style: none;
  }
  .menu-link{
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 18px;
   
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 520px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button {
    margin-left: 20px;
  }
  @media (max-width:480px) {
    padding: 5px 0px;
    .header-main{
      align-items: center;
      justify-content: center;
      flex-wrap:wrap;
      line-height: 30px;
    }
    .menu-link{
      font-size: 14px;
      letter-spacing: 2px;
    }
    .header-auth{
      font-size: 14px;
      margin-top: 5px;
    }
    .search{
      padding: 10px 5px;
      font-size: 14px;
      margin-right: 0;
    }
  }
`;

function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const {userInfo}=useAuth()

    return (
        <HeaderStyles>
      <div className="container">
          <NavLink to="/" style={{"margin":"20px auto"}}>
           <Logo  className='logo'/>
          </NavLink>
        <div className="header-main">
          <ul className="ml-5 menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? 
            <Button type={"button"} style={{maxWidth:"200px"}} height="56px" className="header-button" to="/sign-in">
            Sign Up
          </Button> : 
          <div className='header-auth'>
          <span style={{fontFamily:"stussy"}}>Welcome back,{" "}</span>
          <strong className='text-primary'>{getLastName(userInfo?.fullname)}</strong>
          </div>}
          <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
        </div>
      </div>
    </HeaderStyles>
    );
};

export default Header;