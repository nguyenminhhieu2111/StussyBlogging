import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import Postcategory from "./Postcategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width) {
    text-align: center;
  }
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
    }
    &-category {
     margin-bottom: 40px;
     @media (max-width:450px) {
      margin-bottom: 10px;
     }
    }
    &-info {
     
    }
    &-dot {
    
    }
    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;

const PostItem = ({data}) => {
  console.log("lodas",data)
  if (!data) return null;
  const date=data?.createAt?.seconds? new Date(data?.createAt?.seconds * 1000) : new Date()
  const formatDate=new Date(date).toLocaleDateString("vi-VI")
  return (
    <PostItemStyles>
     <PostImage
      url={data.image}
        alt=""
        to={data.slug}
      ></PostImage>
      <Postcategory to={data.category?.slug}>{data.category?.name}</Postcategory>
     <PostTitle to={data?.slug}>{data.title}</PostTitle>
     <PostMeta to={slugify(data.user?.username || "",{lower:true})}
          authorName={data.user?.fullname}
          date={formatDate}>
         </PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
