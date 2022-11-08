import React, { Fragment } from 'react';
import Fotter from './Fotter';
import Header from './Header';

const Layout = ({children}) => {
    return (
        <Fragment>
         <Header></Header>  
         {children} 
         <Fotter></Fotter>
        </Fragment>
    );
};

export default Layout;