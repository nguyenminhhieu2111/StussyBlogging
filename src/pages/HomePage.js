import { signOut } from 'firebase/auth';
import React from 'react';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import Homebanner from '../components/module/home/Homebanner';
import HomeFeature from '../components/module/home/HomeFeature';
import HomeMorePost from '../components/module/home/HomeMorePost';
import HomeNewest from '../components/module/home/HomeNewest';
import { auth } from '../firebase-app/firebase-config';

const HomePage = () => {
   
    
    return (
      <>

      <Layout>
      <Homebanner></Homebanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
      <HomeMorePost></HomeMorePost>

      </Layout>
      </>
    );
};

export default HomePage;