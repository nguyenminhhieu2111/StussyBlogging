import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import Postcategory from "./Postcategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-info {
     
    }
    &-dot {
     
    }
    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 22px;
      margin-bottom: 12px;
    }
  }
`;

const PostNewestLarge = ({data}) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostNewestLargeStyles>
     <PostImage
       url={data?.image} alt="" to={data?.slug}
      ></PostImage>
      <Postcategory to={data?.category?.slug}>
        {data?.category?.name}</Postcategory>
       <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
      <PostMeta
      to={slugify(data?.user?.username || "", { lower: true })}
        authorName={data?.user?.fullname}
        date={formatDate}>
        
      </PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
