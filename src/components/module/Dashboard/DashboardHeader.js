
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../contexts/auth-context";
import Button from "../../button/Button";
import stussy from "../../../image/SeekPng.com_stussy-logo-png_3225091.png"
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .logo1{
    max-width: 10%;
  }
`;

const DashboardHeader = () => {
  
  const { userInfo } = useAuth();
  console.log("users",userInfo)
  return (
    <DashboardHeaderStyles>
    <NavLink to="/" className="logo">
       <img className="logo1" src={stussy} alt="" />
        <span className="hidden text-xl font-bold text-pink-600 uppercase lg:inline-block">Stussy Blogging</span>
      </NavLink>
      <Button to="/manage/add-post" className="header-button" height="52px">
        Write new post
      </Button>
      <Link to="/profile" className="header-avatar">
          <img src={userInfo? userInfo.avatar : stussy} alt="" />
        </Link>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;