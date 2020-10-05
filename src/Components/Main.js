import React, { Component, useState } from 'react';
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
  
    closeButton: 
    {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },

  
  
  });

const useStyles = makeStyles((theme) => ({
 
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
     fontSize:16
     
},



btn1:{
  backgroundColor:grey[500],
  margin:15

},

//main heading
titleTwo: 
{
    flexGrow: 1,
    fontFamily:"Times New Roman",
    fontWeight:"bold",
    textAlign:"center",
    marginTop:100,

},

btn2:
{
    backgroundColor:grey[500],
    width: 339,
    height:62,
    fontSize:18, 
    fontWeight: "Bold",
    marginTop: 40,
    
},

heading:
{
    display:"inline"
},


para:
{
    display:"inlineBlock",
    marginLeft:650,
    marginRight:100,
    fontSize:22,
},

container:
{
    marginLeft:362,
    marginRight:100,
    marginTop:-350,
    marginBottom:30,
    width:"66%"
},

slidertxt:
{
    width: "66%",
    height: 300,
    objectfit: "cover",
    fontWeight: 600,
    fontSize: 22,
    fontFamily: "Open Sans",
    marginLeft: 250,
    marginTop: 110,

},

last1:
{
    display:"inlineBlock",
    textAlign: "center",
    fontSize:22,
    marginTop:130,
},

last2:
{
    color:grey[600],
    textAlign: "center",

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

  var firebaseConfig = {
    apiKey: "AIzaSyBA9FMDOkwVPswvnAfDjbpHfbF_sMF7ryw",
    authDomain: "task-one-289713.firebaseapp.com",
    databaseURL: "https://task-one-289713.firebaseio.com",
    projectId: "task-one-289713",
    storageBucket: "task-one-289713.appspot.com",
    messagingSenderId: "294234544380",
    appId: "1:294234544380:web:b2d8e5ed26b30639609f79"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  function googlelogin()
  {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
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
  
var Username='';
var photo='';
export default function Main (){
  const [sub,setSub]=useState("");
  const [isLogin, setIsLogin]=useState(false);
  const [open, setOpen] = React.useState(false);

    //checking if signin or not
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        Username=user.displayName;
        photo=user.photoURL;
        // User is signed in.
        setIsLogin(true);
      } else {
        // No user is signed in.
      }
    });

     const logout=()=>
     {
       setOpen(false);
       firebase.auth().signOut().then(function() {
           // Sign-out successful.
         }).catch(function(error) {
           // An error happened.
         });
         setIsLogin(false);
     }
   
     const handleClickOpen = () => {
       setOpen(true);
     };
     const handleClose = () => {
       setOpen(false);
     };
     const classes = useStyles();

     const subscribe=(e)=>{
     e.preventDefault();
     firebase.database().ref("Subscriber").push(sub)
       var subscribe=document.getElementById('standard-basic');
       subscribe.value="";
       alert("successfully subscribed");
     }




  return (
    <div>
      {
        isLogin===false?


        //Before Signin

<div>      
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.titleOne}>
                         <Link to="/" className={classes.links} color="inherit">Medium</Link>
                    </Typography>
                  <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
                  <Link to="/Blogs" className={classes.links} color="inherit">Blogs</Link>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen}>Write</Link>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen}>Profile</Link>
                  <Link to="/About" className={classes.links} color="inherit">About</Link>
                  <Button className={classes.btn1} color="inherit"  onClick={handleClickOpen}  >Sign in</Button>
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      
        <div>
            <Typography variant="h2" className={classes.titleTwo}>
            
              Dive deeper on topics that<br></br> matter to you.
          
            </Typography>

            <div align="center">
                 <h2>Select what you're into. We'll help you find great things to read.</h2>
            </div>
        
            <div>
                 <img src={pic1} width='100%'/>
            </div>

            <div align="center">
                <Button variant="contained" className={classes.btn2}  onClick={handleClickOpen}>
                 Get Started
                </Button>
            </div>

            <div>
                 <h3 align="center">Already have an account? <Link style={{color:grey[600], textDecoration:"none"}} onClick={handleClickOpen} >Sign in.</Link></h3>
            </div>

            <div align="center" style={{marginTop:90, marginBottom:120}}>

                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>World-class publications.</h3>
                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>Undiscovered voices.</h3>
                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>Topics you love.</h3>
                 <h2 className={classes.heading} style={{marginLeft:100}}>All on Medium, all for you.</h2>

            </div>

            <div style={{marginLeft:70}}>
                <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginTop:100}}>No ads. No problems.</h1>
                <h2 style={{marginTop:-35, color:grey[600]}}>Your privacy stays yours. We don’t sell your data or target you with ads. Ever.</h2>
            </div>

            <div>
                <Button variant="contained" className={classes.btn2} style={{marginBottom:-480, marginLeft:70}}  onClick={handleClickOpen}>
                      Get Started
                </Button>
            </div>

            <div className={classes.para}>
                 <h4>We do things differently.</h4>
            </div>

            <div className={classes.para} style={{marginBottom:150}}>
                  Medium is not like any other platform on the internet.<mark style={{backgroundColor:'#b3ffe6'}}> Our sole purpose is to help you find compelling ideas, knowledge, and 
                  perspectives.</mark>We don’t serve ads—we serve you, the curious reader who loves to learn new things. Medium is home to thousands of 
                  independent voices, and we combine humans and technolog to find the best reading for you—and filter out the rest.
            </div>

            <hr style={{marginLeft:450, marginRight:450, marginTop:-50}}></hr>

            <div style={{marginTop:120, marginBottom:120}}>
                <div>
                      <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginRight:500, marginLeft:70, marginBottom:-80}}>120 million<br></br> curious readers<br></br> and growing.</h1>
                </div>


                <div>
                    <React.Fragment>
                      <CssBaseline/>
                        <Container className={classes.container}>
                             <Typography component="div" style={{ backgroundColor: grey[300], height: '78vh' }}>
                                <AliceCarousel autoPlay autoPlayInterval="3000">
                                    <div className={classes.slidertxt}>Medium is truly where ideas are born, shared, and spread.</div>
                                    <div className={classes.slidertxt}>Medium is a great place to read and learn from a wide range of authors. It’s not muddied up by ads. It’s not fake news. It feels like one of the few pure places to go online.</div>
                                    <div className={classes.slidertxt}>Do yourself a favor and start browsing Medium for high quality articles on just about ANY topic. Get those mental gears turning!</div>
                                    <div className={classes.slidertxt}>I love Medium’s new publications: OneZero, GEN, Heated. And, I’m especially excited about Tenderly.</div>
                                    <div className={classes.slidertxt}>In a web full of pseudo thought-leaders, Medium is the one place that I can reliably come to and be better informed in the easiest way possible of the things that matter to me.</div>
                                    <div className={classes.slidertxt}>Medium is trying to shift the paradigm. They’re catering to those looking for fresh, new, authentic voices. I believe wholeheartedly in their mission.</div>
                                </AliceCarousel>
                             </Typography>
                        </Container>
                    </React.Fragment>
                </div>

                <div className={classes.last1}>
                     <h4>One Subscription. Unlimited Ideas.</h4>
                </div>

                <div className={classes.last2}>
                     <h2>Read unlimited stories with an optional subscription of $5/month.<br></br>If it's not for you, cancel anytime.</h2>
                </div>

                <div>
                     <hr style={{marginLeft:450, marginRight:450, marginTop:80}}></hr>
                </div>

                <div>
                    <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, textAlign:"center", marginBottom:-80}}>Expand your reading.<br></br>Expand your mind.</h1>
                </div>

                <div  align="center">
                    <Button variant="contained" className={classes.btn2} style={{marginTop: 140}}  onClick={handleClickOpen}>
                       Get Started
                    </Button>
                </div>
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
          <Button className={classes.popupButton} variant="outlined" color="default" href="#outlined-buttons" onClick={facebooklogin}>
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

<TextField id="standard-basic" onChange={(e)=>{setSub({sub:e.target.value})}} label="Gmail"/>
<Button variant="contained" className={classes.btn1}  onClick={subscribe}>Subscribe</Button>


</div>


<>
    <MDBFooter style={{position:"relative", bottom:-9, width:1345.4,marginLeft:0, color:grey[50], backgroundColor:"#000000",marginRight:0}}>
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
                <Link className={classes.link} to="About">About Medium</Link>
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



</div>



: 


// After Signin




<div>
{/* //popover */}

<ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.titleOne}>
                         <Link to="/" className={classes.links} color="inherit">Medium</Link>
                    </Typography>
                  <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
                  <Link to="/Write" className={classes.links} color="inherit">Write</Link>
                  <Link to="/Blogs" className={classes.links} color="inherit">Blogs</Link>
                  <Link to="/User" className={classes.links} color="inherit">Profile</Link>
                  <Link to="/About" className={classes.links} color="inherit">About</Link>
                  <Button  className={classes.btn1} color="inherit" onClick={logout} >LogOut</Button>
                <p>{Username}</p>
                <img style={{width:35,marginLeft:15,borderRadius:"100%" }} src={photo} ></img>
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      
        <div>
            <Typography variant="h2" className={classes.titleTwo}>
            
              Dive deeper on topics that<br></br> matter to you.
          
            </Typography>

            <div align="center">
                 <h2>Select what you're into. We'll help you find great things to read.</h2>
            </div>
        
            <div>
                 <img src={pic1} width='100%'/>
            </div>

            <div align="center" style={{marginTop:90, marginBottom:120}}>

                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>World-class publications.</h3>
                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>Undiscovered voices.</h3>
                 <img src={icon1} style={{marginBottom:-10, marginLeft:10, marginRight:10}}/>
                 <h3 className={classes.heading}>Topics you love.</h3>
                 <h2 className={classes.heading} style={{marginLeft:100}}>All on Medium, all for you.</h2>

            </div>

            <div style={{marginLeft:70}}>
                <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginTop:100}}>No ads. No problems.</h1>
                <h2 style={{marginTop:-35, color:grey[600]}}>Your privacy stays yours. We don’t sell your data or target you with ads. Ever.</h2>
            </div>

            <div className={classes.para}>
                 <h4>We do things differently.</h4>
            </div>

            <div className={classes.para} style={{marginBottom:150}}>
                  Medium is not like any other platform on the internet.<mark style={{backgroundColor:'#b3ffe6'}}> Our sole purpose is to help you find compelling ideas, knowledge, and 
                  perspectives.</mark>We don’t serve ads—we serve you, the curious reader who loves to learn new things. Medium is home to thousands of 
                  independent voices, and we combine humans and technolog to find the best reading for you—and filter out the rest.
            </div>

            <hr style={{marginLeft:450, marginRight:450, marginTop:-50}}></hr>

            <div style={{marginTop:120, marginBottom:120}}>
                <div>
                      <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginRight:500, marginLeft:70, marginBottom:-80}}>120 million<br></br> curious readers<br></br> and growing.</h1>
                </div>


                <div>
                    <React.Fragment>
                      <CssBaseline/>
                        <Container className={classes.container}>
                             <Typography component="div" style={{ backgroundColor: grey[300], height: '78vh' }}>
                                <AliceCarousel autoPlay autoPlayInterval="3000">
                                    <div className={classes.slidertxt}>Medium is truly where ideas are born, shared, and spread.</div>
                                    <div className={classes.slidertxt}>Medium is a great place to read and learn from a wide range of authors. It’s not muddied up by ads. It’s not fake news. It feels like one of the few pure places to go online.</div>
                                    <div className={classes.slidertxt}>Do yourself a favor and start browsing Medium for high quality articles on just about ANY topic. Get those mental gears turning!</div>
                                    <div className={classes.slidertxt}>I love Medium’s new publications: OneZero, GEN, Heated. And, I’m especially excited about Tenderly.</div>
                                    <div className={classes.slidertxt}>In a web full of pseudo thought-leaders, Medium is the one place that I can reliably come to and be better informed in the easiest way possible of the things that matter to me.</div>
                                    <div className={classes.slidertxt}>Medium is trying to shift the paradigm. They’re catering to those looking for fresh, new, authentic voices. I believe wholeheartedly in their mission.</div>
                                </AliceCarousel>
                             </Typography>
                        </Container>
                    </React.Fragment>
                </div>

                <div className={classes.last1}>
                     <h4>One Subscription. Unlimited Ideas.</h4>
                </div>

                <div className={classes.last2}>
                     <h2>Read unlimited stories with an optional subscription of $5/month.<br></br>If it's not for you, cancel anytime.</h2>
                </div>

                <div>
                     <hr style={{marginLeft:450, marginRight:450, marginTop:80}}></hr>
                </div>

                <div>
                    <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, textAlign:"center", marginBottom:-80}}>Expand your reading.<br></br>Expand your mind.</h1>
                </div>

            </div> 

        </div>

        



      <hr style={{marginLeft:450, marginRight:450, marginTop:80, marginBottom:80}}></hr>
<div className={classes.subs}>


<a id="anchor"></a>
<h1>SUBSCRIBE</h1>

<TextField id="standard-basic" label="Gmail"  onChange={(e)=>{setSub({sub:e.target.value})}}/>
<Button variant="contained" className={classes.btn1} onClick={subscribe}>Subscribe</Button>
</div>


<>
    <MDBFooter style={{position:"relative", bottom:-9, width:1345.4,marginLeft:0, color:grey[50], backgroundColor:"#000000",marginRight:0}}>
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


  </div>
}
    </div>
  
  );
}

