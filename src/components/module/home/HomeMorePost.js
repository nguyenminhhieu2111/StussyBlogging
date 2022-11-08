import { collection, doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase-app/firebase-config';
import parser from "html-react-parser"
import { useRef } from 'react';
import { Tween } from 'gsap/gsap-core';
import gsap from 'gsap';
import Heading from '../../layout/Heading';
import { Link } from 'react-router-dom';

const BoxImage=styled.div`
background-color: teal;
padding: 7px;
border-radius: 10px;
:hover{
    .modal{
        transform: translateX(0);
        transition: all 0.5s ease-in-out;
    }
}
@media (max-width:450px) {
    padding: 2px;
    border-radius: 15px;
}
img{
    @media (max-width:450px) {
        height: 50px !important;
        border-radius: 15px;
    }
}
`
const BoxBall=styled.div`
width: 20%;
height: 220px;
position: relative;
overflow: hidden;
transition: 1s ease-in-out;
@media (max-width:450px) {
   height:initial ;
   width: 25%;
}
`
const BoxModal=styled.div`
width: 100%;
padding-bottom: 11px;
position: absolute;
background-color: teal;
top: 52%;
transform: translateX(100%);
z-index: 1;
border: 10px;
@media (max-width:450px){
    display: none;
}
`

const HomeMorePost = () => {
    const [post,setPost]=useState([])
useEffect(()=>{
    const colRef=collection(db,"posts")
    onSnapshot(colRef,(snapshot)=>{
         const result=[]
         snapshot.forEach((doc)=>{
            result.push({
                id:doc.id,
                ...doc.data()
            })
         })
         
         setPost(result)
        })

},[])




    return (
        <div className='container'>
            
        <Heading>More Posts</Heading>
        <div className='box-chill'>
        {post.map((posts)=>(
            
                    <BoxBall key={posts.id}>     
                   {/*  <BoxModal ref={boxRef} >
                    <PostTitle  className='title_hsc'>{posts.title}</PostTitle>
                    <PostDesc >{posts.desk}</PostDesc>  
                    </BoxModal>  
                    <BoxIcon  onClick={() => setModal(!modalOpen)}>
                    <box-icon name='transfer-alt'></box-icon>
                    </BoxIcon>      */}    
                     <BoxImage>    
                     <Link to={posts.slug}>                        
                    <img  style={{"width":"100%","height":"150px","objectFit":"cover","cursor":"pointer"}} src={posts.image} alt="asasasa"/>                     
                     </Link>        
                     <BoxModal className='modal'>
                         <div className="w-3/4 mx-auto mt-2 text-center">               
                        <Link className="font-semibold text-white transition-all hover:text-red-300 text-[14px]" to={posts.slug}>{posts.desk}</Link>
                         </div>
                     </BoxModal>         
                     </BoxImage>
              
                    </BoxBall>
                
            
        ))}
            
        </div>
        </div>
    );
};

export default HomeMorePost;