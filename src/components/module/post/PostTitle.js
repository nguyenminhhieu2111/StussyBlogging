import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'

const PostTitleStyle = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.25px;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
      @media screen and (max-width: 1023.98px) {
        font-size: 14px;
      }
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
      @media screen and (max-width: 1023.98px) {
        font-size: 16px;
      }
    `};
`;

const PostTitle = ({children,className,to="",size=""}) => {
    return (
        <PostTitleStyle size={size} className={`post-title ${className}`}>
          <Link to={`/${to}`}>{children}</Link>
        </PostTitleStyle>
    );
};

export default PostTitle;