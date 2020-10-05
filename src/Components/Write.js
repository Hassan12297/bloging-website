import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {TextField } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import zIndex from '@material-ui/core/styles/zIndex';
import { recomposeColor } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import firebase from 'firebase';
import parse from 'react-html-parser';
import Main from './Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import pic2 from './pic2.jpg';
import { useHistory } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import emailjs from 'emailjs-com';





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

  root: 
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

btn:
{
  backgroundColor:grey[500],
  margin:15,

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
links:
{
    zIndex:1,
    margin:20,
    color:'#000000',
    textDecoration:'none',

},

subs:
    {
      textAlign: "center",
      
    },

    btn1:{
      backgroundColor:grey[500],
      margin:15
    
    },
}));
 
let Username='';
let photo='';

  

export default function Write() 

{
   const initalValue={
    
  picture:"",
  Name:"",
  Email:"",
  Blog:""
}

   var [values,setValues]=useState(initalValue);
  const [Username,setUsername]=useState("");
  const [photo,setPhoto]=useState("");
  const [email,setEmail]=useState("");
  const [IsLogin,setIsLogin]=useState(true);
  const [sub,setSub]=useState("");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  
  var email2=[];

  useEffect(()=>
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
  
   })


  var data2=[];
  var seconddata="";
 
  const [text, setText] = useState ("");
  const [posts,setPost]=useState(false);

 
  const classes = useStyles();
const post=e=>
{

  setValues({
    Name:Username,
    picture:photo,
    Email:email
  });
  e.preventDefault();
  firebase.database().ref("Blogs").push({
    ...values,  
    Name:Username,
    Email:email,
    picture:photo,
   
  });

setOpen(true);
history.push("/Write");
sendEmail();
}


function sendEmail() {


   var ref=firebase.database().ref("Subscriber");
   ref.on('value',(data)=>{
  var sub=data.val();
  var keys=Object.keys(sub);
  var templateParams = {
    name: 'Medium',
    mail: ''
}
    for(var i=0;i<keys.length;i++)
    {
       var k=keys[i];
       var subscriber=sub[k].sub;
     templateParams.mail=subscriber;
     console.log(templateParams.mail);
     
     
       emailjs.send('gmail', 'template_tgq4x9d', templateParams,"user_83xcmxqZn9yaZQrNHwfFX")
       .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
       }, function(error) {
          console.log('FAILED...', error);
       });



   }
   
  
   }
    
   );
}
 

//getting error
const errData=(err)=>{

    console.log(err);
}

const subscribe=(e)=>{
  e.preventDefault();
  firebase.database().ref("Subscriber").push(sub)
    var subscribe=document.getElementById('standard-basic');
   // subscribe.value="";
    alert("successfully subscribed");
  }


const logout=()=>
{
  
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    setIsLogin(false);
    history.push("/");
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'], 
    ['clean'],
   
  ],
 
}


const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]



  return (
    <div>
    {
      IsLogin == true?
    
    <div>
      <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
            <Link to="/" className={classes.links} color="inherit">Medium</Link>
            </Typography>
                <a href="#" className={classes.links} color="inherit" onClick={e => {window.scroll({ top: 3300, left: 0, behavior: 'smooth' })}}>Subscribe</a>
                <Link to="/Blogs" className={classes.links} color="inherit">Blogs</Link>
                <Link to="/User" className={classes.links} color="inherit">Profile</Link>
                <Link to="/About" className={classes.links} color="inherit">About</Link>
                <Button className={classes.btn} color="inherit" onClick={logout}>LogOut</Button>
                <p style={{color:grey[900]}}>{Username}</p>
                <img style={{width:35,marginLeft:15,borderRadius:"100%" }} src={photo}></img>
          </Toolbar>
        </AppBar>
      </div>
      <h1 style={{textAlign:"center", fontFamily:"Times New Roman", fontSize:60}}>Write a Blog...</h1>
      <img src={pic2} style={{width:"60%",marginLeft:40}}></img>
      </ThemeProvider>
      <React.Fragment>
      <CssBaseline />
      <Container  style={{width:400,marginRight:50,marginTop:-160}}>
        <Typography component="div" style={{ backgroundColor: grey[300], height: '50vh',paddingTop:10 }} >
        <div style={{textAlign:"center",marginTop:30}}>
       
         <h3  style={{textAlign:"justify", fontFamily:"Times New Roman", fontSize:30,marginLeft:25 , height: '50vh',width:400}}>"The Secret of <br/> Becoming a Writer is to <br/> Write, <br/> Write <br/> Keep on Writing."</h3>     
        </div>
        </Typography>
      </Container>
    </React.Fragment>
      

<div style={{marginTop:100,width:900,marginLeft:215}}>
<ReactQuill
modules={modules}
formats={formats}
onChange={e=>{

  setValues({Blog:e});
  if(e!=""){
    setPost(true);
   console.log(e)
  }
  else
  {
    console.log("null");
    setPost(false);
  }

 
}}

/>
</ div>
<Button id="postButton" disabled={posts===false} onClick={post}  style={{ marginLeft:580,width:200}} variant="contained" color="inherit" className={classes.btn} >
  
Post</Button>


<div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                window.location.reload(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
         Blog Posted!
        </Alert>
      </Collapse>

      </div>

<div id="retriveData"></div> 


<hr style={{marginLeft:450, marginRight:450, marginTop:80, marginBottom:80}}></hr>
<div className={classes.subs}>


<a id="anchor"></a>
<h1>SUBSCRIBE</h1>

<TextField id="standard-basic" label="Gmail"  onChange={(e)=>{setSub({sub:e.target.value})}}/>
<Button  variant="contained" className={classes.btn1} onClick={subscribe}>Subscribe</Button>


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
     : <Main/>
}
</div>
  );
}
