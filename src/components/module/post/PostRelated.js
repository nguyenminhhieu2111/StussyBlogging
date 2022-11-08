import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase-app/firebase-config";
import Heading from "../../layout/Heading";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "" }) => {
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
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    );
  };
  
  export default PostRelated;