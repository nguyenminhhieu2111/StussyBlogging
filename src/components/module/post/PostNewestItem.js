import { data } from "autoprefixer";
import React from "react";
import styled from "styled-components";
import Postcategory from "./Postcategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import slugify from "slugify";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
    }
    &-category {
      
    }
    &-info {
    
    }
    &-dot {
      
    }
    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 16px;
      margin-bottom: 8px;
    }
  }
  @media (max-width:450px) {
   
    .post{
      &-image{
        width: 120px;
        height: 60px;
      }
      &-title{
        font-size: 14px;
        letter-spacing: 1.3;
      }
    }
  }
`;
const PostNewestItem = ({data}) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestItemStyles>
    <PostImage
        url={data.image}
        alt=""
        to={data?.slug}
      ></PostImage>
      <div className="post-content">
        <Postcategory type="secondary" to={data?.category?.slug}>{data.category?.name}</Postcategory>
        <PostTitle to={data?.slug}>{data.title}</PostTitle>
       <PostMeta
         to={slugify(data?.user?.username || "", { lower: true })}
          authorName={data?.user?.fullname}
          date={formatDate}>
        
       </PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
