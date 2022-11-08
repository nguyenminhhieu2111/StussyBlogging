import React from 'react';
import styled from "styled-components"
import Button from '../../button/Button';

const HomebannerStyle=styled.div`
  max-height: 400px;
  padding: 40px 0px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner_image img{
      border-radius: 5px;
      max-width: 100%;
  }
  .container{
      max-width: 1200px;
  }
  .banner{
      display:flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
  }
  .banner_content{
      max-width: 500px;
      color: white;
      line-height: 1.7;
  }
  .banner-heading{
      font-family: "stussy";
      color: black;
      margin-bottom: 20px;
  }
  @media (max-width:450px) {
    padding: 10px 0px;
    .banner{
        display: block;
        font-size: 14px;
        font-weight: 300;
    }
    .banner_content{
        text-align: center;
        line-height: 1.3;
    }
    .banner-heading{
        margin-bottom: 10px;
    }
    .banner_image{
        margin-top: 10px;
    }
  }
`
const Homebanner = () => {
    return (
        <HomebannerStyle>
            <div className="container">
                <div className="banner">
                    <div className="banner_content">
                          <h1 className='banner-heading'>Stussy Blogging</h1>
                          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi possimus, commodi natus consequuntur maiores, similique voluptatibus, ipsum esse alias perferendis magnam nobis eius quis ea laborum voluptates veritatis saepe exercitationem!</p>
                        <Button pinker="secondary" to="/sign-up" style={{marginTop:"20px"}}>Get started</Button>
                    </div>
                    <div className="banner_image">
                        <img src="https://fado.vn/blog/wp-content/uploads/2020/11/stussy-3.jpg" alt="" />
                    </div>
                </div>
            </div>
        </HomebannerStyle>
    );
};

export default Homebanner;