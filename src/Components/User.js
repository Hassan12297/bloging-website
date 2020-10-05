import React, { Component, useState,useEffect,useLayoutEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {TextField } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import zIndex from '@material-ui/core/styles/zIndex';
import { recomposeColor } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import firebase from 'firebase';
import Main from './Main';
import Blogs from './Blogs';
import { useHistory } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";





const theme = createMuiTheme({
  palette: {
    primary: {
      
      main: grey[50],
    },
    secondary: {
      
      main: '#212121',
    },
  },
});

const styles = (theme) => ({

  root: 
  {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },


});


const useStyles = makeStyles((theme) => ({
  rot: 
  {
    flexGrow: 1,
  },

  title: 
  {
    flexGrow: 1,
    fontFamily:"Times New Roman",
    fontWeight:"bold"
  },

  links:
  {
    zIndex:1,
    margin:20,
    color:'#000000',
    textDecoration:'none',
  },

  

  link:
{
    zIndex:1,
    margin:20,
    color:grey[50],
    textDecoration:'none',
     display:"inlineBlock",
     fontSize:16
     
    

},
btn:
{
  backgroundColor:grey[500],
  margin:15
},

popupButton:
{
  marginTop:15,
  marginBottom:15,
},

img:
{
  width:20,
  marginRight:7
},

subs:
{
  marginLeft:650,
  
},

btn1:{
  backgroundColor:grey[500],
  margin:15

},



}));


export default function User() {
  const history = useHistory();
  const [Username,setUsername]=useState("");
  const [photo,setPhoto]=useState("");
  const [email,setEmail]=useState("");
  const [isLogin, setIsLogin]=useState(true);
  const [sub,setSub]=useState("");
useLayoutEffect(()=>
  {
     firebase.auth().onAuthStateChanged(function(user) {
       if (user) 
       {
        setUsername(user.displayName);
        setPhoto(user.photoURL);
        setEmail(user.email);
       } 
       else 
      {
        // No user is signed in.
      }
    });
  //showing blogs
  var ref=firebase.database().ref("Blogs");
  ref.on('value',gotData,errData);






   })
//getting data

const gotData=(data)=>
{

   var listOfBlogs=document.getElementById("listOfBlogs");
 listOfBlogs.innerHTML="";
 console.log(listOfBlogs);

 
    var Blog=data.val();
    var keys=Object.keys(Blog);
    for(var i=0;i<keys.length;i++)
    {
        var k=keys[i];
      //fetching data from database 
        var blogs=Blog[k].Blog;
        var Email=Blog[k].Email;
      
        if(email===Email){ 
        var li=document.createElement('li');
        var div=document.createElement('div');
        var hr=document.createElement("hr");
        hr.style.marginLeft="20%";
        hr.style.marginRight="50%";
        div.style.width="70%";
        div.style.textAlign="center";
        div.innerHTML=blogs;
        li.appendChild(div);
        li.appendChild(hr);
        document.getElementById("listOfBlogs").appendChild(li);
       
        }
          

    }
  

}
//getting error
const errData=(err)=>{

    console.log(err);
}
  const logout=()=>
  {
    
    firebase.auth().signOut().then(function() {
        // Sign-out successfull
      }).catch(function(error) {
        // An error happened.
      });
      setIsLogin(false);
history.push("/");
    
  }


    
    const subscribe=(e)=>{
      e.preventDefault();
      firebase.database().ref("Subscriber").push(sub)
        var subscribe=document.getElementById('standard-basic');
        subscribe.value="";
        alert("successfully subscribed");
      }
 


  const classes = useStyles();

  return (
    <div>
        {isLogin==true?
        <>
      <ThemeProvider theme={theme}>
      <div className={classes.rot}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
            <Link to="/" className={classes.links} color="inherit">Medium</Link>
            </Typography>
            <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
            <Link to="/Write" className={classes.links} color="inherit">Write</Link>
            <Link to="/Blogs" className={classes.links} color="inherit">Blogs</Link>
            <Link to="/About" className={classes.links} color="inherit">About</Link>
            <Button onClick={logout} variant="contained" color="inherit" className={classes.btn}>logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      </ThemeProvider>
    
      
      <div style={{ marginLeft:30}}>
      <h1 style={{fontWeight:"bold" ,fontSize:30,marginLeft:10}}>
           PROFILE
        </h1>
        <img src={photo} style={{width:100,borderRadius:100,marginLeft:20}}></img>
        <h3 style={{fontSize:20,marginLeft:15}}>{Username}</h3>
        <h5 style={{color:grey[800],marginLeft:-5}}>{email}</h5>
       
        </div>
      
        <div style={{marginLeft:400,marginTop:-210,position:"relative"}}>
        <ol id="listOfBlogs" style={{listStyleType:"none",marginLeft:-40}} > 

         </ol>
         </div>
        
      
       

<div className={classes.subs} >


<a id="anchor"></a>
<h1>SUBSCRIBE</h1>

<TextField id="standard-basic" label="Gmail" style={{marginLeft:-55}}  onChange={(e)=>{setSub({sub:e.target.value})}} />
<Button variant="contained" className={classes.btn1} onClick={subscribe}>Subscribe</Button>
</div>

  
<>
    <MDBFooter style={{position:"relative", bottom:-9,marginLeft:-8, color:grey[50], backgroundColor:"#000000",marginRight:-8}}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow style={{marginLeft:80}}>
          <MDBCol md="6">
            <h5 style={{fontSize:25,marginBottom:50}}>Medium</h5>
            <p>
            
            </p>
          </MDBCol>
          <MDBCol md="10">
           
            <ul style={{listStyleType:"none",display:"block"}}>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link} to="About">About Medium</Link>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link} to="/User">Profile</Link>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link}to="/Blogs">Blogs</Link>
              </li>
              <li  >
                <Link className={classes.link} to="/Write">Write</Link>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="6">
            
          <ul style={{listStyleType:"none",display:"block"}}>
              <li >
                <a style={{color:"black"}}  href="About">About Medium</a>
              </li>
              <li >
                <a style={{color:"black"}} href="#!">Link 2</a>
              </li>
              <li  >
                <a style={{color:"black"}}  href="#!">Link 3</a>
              </li>
              <li  >
                <a style={{color:"black"}}  href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div style={{textAlign:"center"}}>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a  className={classes.link}href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    
   
</>
     

</>
:
<Main />

}


    </div>
  );
}





