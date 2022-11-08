import React, { useEffect } from 'react';
import styled from 'styled-components';
import "boxicons"
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase-app/firebase-config';
import { useState } from 'react';
import Postcategory from '../module/post/Postcategory';
const FotterStyled=styled.div`
background-color: gray;
margin-top: 50px;
.categoriesLists{
    display: flex;
    flex-wrap: wrap;
    @media (max-width:450px) {
    flex-direction:column ;
}
}
.categoryItem{
    background-color: #EBEDEF ;
    border-radius: 50px;
    margin: 5px auto;
}
h1{
    font-weight: 600;
    font-size: 25px;
    text-transform: uppercase;
    text-align: center;
}
.fotterBox{
    width: 80%;
    margin: 0px auto;
    text-align: center;
    display: flex;
    justify-content: space-between;    
@media (max-width:450px) {
    width: 95%;
}
}
.about_US{
    h2{
        font-weight: 600;
        font-size: 20px;
        text-transform: uppercase;
        color: silver;
        @media (max-width:450px) {
            font-size: 16px;
        }
    }
    width: 30%;
    @media (max-width:450px) {
        width: 50%;
        font-size: 14px;
    }
}
.contac{
 margin-top: 50px;
 display: flex;
gap: 30px;
@media (max-width:450px) {
  gap:10px ;
}

}
`
const Fotter = () => {
   const [categoryList,setCategoryList]=useState([]);
   useEffect(()=>{
    const colRef=collection(db,"categories")
    onSnapshot(colRef,(snapshot)=>{
        let results=[];
        snapshot.forEach((doc)=>{
            results.push({
                
                id:doc.id,
                ...doc.data()
            })
        })
        setCategoryList(results)
    })
},[])
console.log("ssa",categoryList)

    return (
        <FotterStyled>
            <div className="footerContainer">
                    <h1>Stussy Blogging</h1>
                <div className="fotterBox">
                    <div className="about_US contaced">
                    <h2>About us</h2>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet consequatur error provident enim fugit sapiente fuga, delectus modi repudiandae perferendis consequuntur. Animi vitae illo facilis laudantium saepe eum sint ipsa.
                    </div>
                    <div className="contac">
                    <box-icon type='logo' name='facebook-circle'></box-icon>
                    <box-icon type='logo' name='instagram'></box-icon>
                    <box-icon name='youtube' type='logo' ></box-icon>
                    <box-icon name='twitter' type='logo' ></box-icon>
                    </div>
                    <div className="about_US">
                        <h2>Tag</h2>
                        <div className="categoriesLists">
                            {categoryList.length > 0 && categoryList.map(category =>(
                                <div className="categoryItem" key={category.name}>
                                <Postcategory to={category?.slug} type=''>{category.name}</Postcategory>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </FotterStyled>
    );
};

export default Fotter;