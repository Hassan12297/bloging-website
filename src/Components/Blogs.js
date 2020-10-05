import React, { Component, useState,useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import zIndex from '@material-ui/core/styles/zIndex';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import {TextField } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import pic1 from './pic1.jpg';
import icon1 from './icon1.png';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import envelope from './envelope.svg';
import facebook from './facebook.svg';
import google from './google.svg';
import firebase from 'firebase';
import Main from "./Main";
import { useHistory } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const styles = (theme) => ({

    root: 
    {
      margin: 0,
      padding: theme.spacing(2),
    },
  
    closeButton: 
    {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },

  
  
  });


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
  

const useStyles = makeStyles((theme) => ({

    list:{

       marginTop:-30,
      marginLeft:400,
        listStyleType: "none",
    },
  
    root: 
    {
        flexGrow: 1,
    },
    
    titleOne: 
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
       fontSize:16,
       
       
      
  
  },
    
    btn1:{
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
      textAlign: "center",
      
    },


    
  
  
  }));
  
//popup
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
export default function Blogs() 

{
    const [open, setOpen] = React.useState(false);
    const [isLogin, setIsLogin]=useState(false);
    const [Username,setUsername]=useState("");
    const [photo,setPhoto]=useState("");
    const [sub,setSub]=useState("");
    const history = useHistory();
  var AllData={
    picture:[],
    name:[],
    Blog:[]
  }
   

    const handleClickOpen = (e) => 
    {
      var listOfBlogs=document.getElementById("listOfBlogs");
      listOfBlogs.innerHTML="";
      setOpen(true); 
    };

    const handleClose = (e) => 
      {
        var listOfBlogs=document.getElementById("listOfBlogs");
        listOfBlogs.innerHTML="";
        setOpen(false);
      };
      

  function googlelogin()
  {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      setIsLogin(true);
      // ...
    }).catch(function(error) 
    {
      console.log(error);
    });
  }

  function facebooklogin()
  {
   
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      console.log(error);
    });
  }
  
    useEffect(()=>{
   
 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setIsLogin(true);
     setUsername(user.displayName);
     setPhoto(user.photoURL);
      
    } else {
      setIsLogin(false);
      // No user is signed in.
    }
  });

 
    //checking if signin or not
    var ref=firebase.database().ref("Blogs");
    ref.on('value',gotData,errData);

    
})


const gotData=(data)=>
{

  // var listOfBlogs=document.getElementById("listOfBlogs");
  // listOfBlogs.innerHTML="";
    var Blog=data.val();
    var keys=Object.keys(Blog);
    for(var i=0;i<keys.length;i++)
    {
        var k=keys[i];
      //fetching data from database 
        var blogs=Blog[k].Blog;
         AllData.name[i]=Blog[k].Name;
         AllData.picture[i]=Blog[k].picture;
        AllData.Blog[i]=blogs;
 //console.log(AllData.picture[0])
      

      //   var li=document.createElement('li');
      //   var div=document.createElement('div');
      //   var h2=document.createElement('h4');
      //   var img=document.createElement("img");
      //   var hr=document.createElement("hr");
      //   h2.innerText=name;
      //   div.innerHTML=blogs;
      //   img.src=picture;
      //   img.style.width="4%";
      //   img.style.borderRadius="100%";
      //   div.style.align="center";
       
      //   h2.width="3%";
      //  img.marginTop="20%";
       
        
      //   li.appendChild(img);
      //   li.appendChild(h2);
      //   li.appendChild(div);
      //   li.appendChild(hr);

      // document.getElementById('listOfBlogs').appendChild(li);   

    }
 method();
}
const method=()=>{
  var listOfBlogs=document.getElementById("listOfBlogs");
  listOfBlogs.innerHTML="";

for(var i=0;i<AllData.name.length;i++){

        var li=document.createElement('li');
        var div=document.createElement('div');
        var h2=document.createElement('h4');
        var img=document.createElement("img");
        var hr=document.createElement("hr");
       h2.innerText=AllData.name[i];
       div.innerHTML=AllData.Blog[i];
        img.src=AllData.picture[i];
        img.style.width="4%";
        img.style.borderRadius="100%";
        div.style.align="center";
       
        h2.width="3%";
       img.marginTop="20%";
       
        
        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(div);
        li.appendChild(hr);

      document.getElementById('listOfBlogs').appendChild(li);   
}

}
const errData=(err)=>{

    console.log(err);
}

const logout=()=>
{
   
  
 // console.log(listOfBlogs);
  setOpen(false);
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      
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

// Before Signin
const classes=useStyles();
    return (
        <>
    {isLogin==false?
    <>


        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">

                <Toolbar>

                  <Typography variant="h5" className={classes.titleOne}>
                      <Link to="/" className={classes.links} color="inherit">Medium</Link>
                  </Typography>
                  <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen}>Write</Link>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen}>Profile</Link>
                  <Button className={classes.btn1} color="inherit"  onClick={handleClickOpen}>Sign in</Button>
                {/* {
                  AllData.map(item => {
                    return (
                      <div>
                        <div>
                          {item.name}
                        </div>
                        <div>
                          {item.age}
                        </div>
                      </div>
                    )
                  }) */}
                {/* } */}
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      <div style={{marginLeft:100}}>
        <h1 >Blogs</h1>
        </div>
       <div >
        <div>
        
            <ol id="listOfBlogs" className={classes.list}>

            </ol>
          
        </div>
        </div>
         <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} align="center">
          <b>SIGN IN</b>  
        </DialogTitle>
        <DialogContent>
          <Button  className={classes.popupButton} variant="outlined" color="default" onClick={googlelogin} >
            <img className={classes.img} src={google}></img>
            Sign in with Google
          </Button>
          <br></br>
          <Button className={classes.popupButton} variant="outlined" color="default" href="#outlined-buttons" onClick={facebooklogin} >
          <img style={{marginRight:7,width:25}} src={facebook}></img>
            Sign in with Facebook
          </Button>
          <br></br>
          <Button className={classes.popupButton} variant="outlined" color="default" href="#outlined-buttons">
          <img className={classes.img} src={envelope}></img>
            Sign in with Email
          </Button>
          
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>

      
      <hr style={{marginLeft:450, marginRight:450, marginTop:80, marginBottom:80}}></hr>


<div className={classes.subs}>


<a id="anchor"></a>
<h1>SUBSCRIBE</h1>

<TextField id="standard-basic" label="Gmail"  onChange={(e)=>{setSub({sub:e.target.value})}}/>
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
          <Button variant="contained" className={classes.btn1}  style={{backgroundColor:grey[700],color:grey[50],marginLeft:50}} onClick={handleClickOpen}>Get Started</Button>
          </MDBCol>
          <MDBCol md="10">
           
            <ul style={{listStyleType:"none",display:"block"}}>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link} href="About">About Medium</Link>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link}  onClick={handleClickOpen}>Profile</Link>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <Link className={classes.link} onClick={handleClickOpen}>Blogs</Link>
              </li>
              <li  >
                <Link className={classes.link} onClick={handleClickOpen}>Write</Link>
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

    <>
    {/* After signin */}
     
     <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.titleOne}>
                         <Link to="/" className={classes.links} color="inherit">Medium</Link>
                    </Typography>
                  <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
                  <Link to="/Write" className={classes.links} color="inherit" >Write</Link>
                  <Link to="/User" className={classes.links} color="inherit" onClick={handleClickOpen}>Profile</Link>
                  <Link to="/About" className={classes.links} color="inherit">About</Link>
                  <Button className={classes.btn1} color="inherit"  onClick={logout}>Logout</Button>
                  <p style={{color:grey[900]}}>{Username}</p>
                  <img src={photo} style={{width:35,marginLeft:15 ,borderRadius:"100%"}} ></img>
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      
        <h1 style={{fontSize:60}}>Blogs</h1>
       
        <p>
        
            <ol id="listOfBlogs" className={classes.list}>

            </ol>

        </p>
       
      

        <hr style={{marginLeft:450, marginRight:450, marginTop:80, marginBottom:80}}></hr>


<div className={classes.subs}>


<a id="anchor"></a>
<h1>SUBSCRIBE</h1>

<TextField id="standard-basic" label="Gmail"  onChange={(e)=>{setSub({sub:e.target.value})}}/>
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
}</>
    );
}









