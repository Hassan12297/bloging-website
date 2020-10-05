import React from 'react';
import Main from './Components/Main'; 
import Write from './Components/Write'; 
import Blogs from './Components/Blogs';
import Footer from './Components/Footer'; 
import User from './Components/User'; 
import {Route} from 'react-router-dom';
import About from './Components/About';


export default function () 
{
    
  return(

    <div>
      <Route exact path="/" component={Main} />
      <Route exact path="/Blogs" component={Blogs} />
      <Route exact path="/Write" component={Write} />
      <Route exact path="/User" component={User} />
      <Route exact path="/About" component={About} />
    
    </div>
  );
}  
