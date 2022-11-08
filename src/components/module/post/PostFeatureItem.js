import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import slugify from "slugify";
import styled from "styled-components";
import { db } from "../../../firebase-app/firebase-config";
import Postcategory from "./Postcategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  overflow: hidden;
  .post {

    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
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
      font-size: 22px;
      color: white;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = ({data}) => {
  const {category,user}=data
  console.log(data)
 /*  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }

    fetch();
  }, [data.categoryId]); */
  /* useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setUser(docSnap.data());
        }
      }
    }
    fetchUser();
  }, [data.userId]); */
  if (!data || !data.id) return null;
  const date=data?.createAt?.seconds? new Date(data?.createAt?.seconds * 1000) : new Date()
  const formatDate=new Date(date).toLocaleDateString("vi-VI")
  return (
    <PostFeatureItemStyles>
       <PostImage
        url={data.image}
        alt="unsplash"
        to="/"
      ></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
        {category?.name && (
            <Postcategory to={category.slug}>{category.name}</Postcategory>
          )}
          <PostMeta to={slugify(user?.username || "",{lower:true})}
          authorName={user?.fullname}
          date={formatDate}>
         </PostMeta>
           
        </div>
        <PostTitle size="big" to={data.slug}>{data.title}</PostTitle>
     
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
