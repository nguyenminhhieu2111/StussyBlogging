import {Carousel} from "react-responsive-carousel"
import PostItem from "./PostItem"
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase-app/firebase-config";
import Heading from "../../layout/Heading";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PostCarosel = ({categoryId=""}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const docRef = query(
        collection(db, "posts"),
        where("category.id", "==", categoryId)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("post",results)
        setPosts(results);
        
      });
    }, [categoryId]);
    if (!categoryId || posts.length <= 0) return null;
    return (
      <div className="post-related">
        <Heading>Bài viết liên quan</Heading>
        <Carousel showArrows="false">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </Carousel>
      </div>
    );
};

export default PostCarosel;