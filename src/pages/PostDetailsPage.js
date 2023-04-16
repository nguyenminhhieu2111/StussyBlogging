import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import PostCategory from "../components/module/post/Postcategory";
import PostImage from "../components/module/post/PostImage";
import PostItem from "../components/module/post/PostItem";
import PostMeta from "../components/module/post/PostMeta";
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useParams, useSearchParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { userRole } from "../utils/constants";
import { useAuth } from "../contexts/auth-context";
import AuthorBox from "../components/author/AuthorBox";
import PostRelated from "../components/module/post/PostRelated";
import parse from "html-react-parser"
import PostCarosel from "../components/module/post/PostCarosel";


const PostSummary=styled.span`
color: chocolate;
font-weight: 600;
`
const PostDetailsPageStyles = styled.div`

 
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
      color:  teal;
     @media (max-width:450px) {
        margin-bottom: 8px;
      }
  
    }
    &-info {
      flex: 1;
      @media (max-width:450px) {
        text-align: center;
      }
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    display: flex;
    border-radius: 20px;
    border:1px solid gray;
    @media(max-width:450px){
        margin-bottom: 0;
      }
    &-image {
      width: 100px;
      height: 100px;
      flex-shrink: 0;
      border-radius: inherit;
      @media (max-width:450px) {
        width: 50% !important;
        margin: 0px auto;
      }
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      text-transform: uppercase;
      font-family: 'stussy';
      letter-spacing: 10px;
      margin-top: 15px;
      font-size: 14px;
      @media (max-width:450px) {
        text-align: center;
        margin-top: 0;
        font-size: 12px;
      }
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 0px;
    .post {
      &-header {
        flex-direction: column;
        @media (max-width:450px) {
        gap: 20px;
      }
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    
    }
  }
`;

const PostDetailsPage = () => {
  const [postInfo,setPostInfo]=useState({})
  const {slug}=useParams();
  const { userInfo } = useAuth();
  useEffect(()=>{
    async function fetchData(){
      if (!slug) return;
      const colRef=query(collection(db,"posts"),where("slug","==",slug))
      onSnapshot(colRef,(snapshot)=>{
        snapshot.forEach((doc)=>{
          doc.data() && setPostInfo({
            id:doc.id,
            ...doc.data()
          })
        })
      })
    }
    fetchData()
  },[slug])

  useEffect(()=>{
   document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  },[slug])
  if(!slug) return <NotFoundPage></NotFoundPage>
  if(!postInfo.title)return null;
  const {user}=postInfo
  const date=postInfo?.createAt?.seconds? new Date(postInfo?.createAt?.seconds * 1000) : new Date()
  const formatDate=new Date(date).toLocaleDateString("vi-VI")
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
             url={postInfo.image}
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo.category?.slug}>{postInfo.category?.name}</PostCategory>
              <h1 className="post-heading">
                {postInfo.title}
              </h1>
              <PostMeta
              authorName={user?.fullname}
              date={formatDate}></PostMeta>
              <PostSummary>{postInfo.desk}</PostSummary>
              <br/>
              {userInfo?.role === userRole.ADMIN && (
                <Link
                  to={`/manage/update-post?id=${postInfo.id}`}
                  className="inline-block px-4 py-2 mt-5 text-sm border border-gray-400 rounded-md"
                >
                  Edit post
                </Link>
              )}
            </div>
          </div>
          <div className="post-content">
           <div className="entry-content">
           {parse(postInfo.content)}
           </div>
           <AuthorBox userId={user?.id}></AuthorBox>
          </div>
         <PostCarosel categoryId={postInfo?.category?.id}></PostCarosel>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;