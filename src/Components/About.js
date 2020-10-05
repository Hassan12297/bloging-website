import React,{useState,useEffect} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Main from "./Main";
import pic3 from './pic3.jpg';
import pic4 from './pic4.png';
import pic5 from './pic5.png';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
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
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
//Styling
const useStyles = makeStyles((theme) => ({

 //Navbar 
root: 
{
    flexGrow: 1,
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
//Second (Second half)
    btn1:{
        backgroundColor:grey[500],
        margin:15
      
      },

      //Slider
      container:
      {
          marginLeft:362,
          marginRight:100,
          marginTop:-350,
          marginBottom:30,
          width:"66%",
         
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
//vertical line
VLine:
{
width:1,
height:130,
backgroundColor:grey[900],
marginLeft:250,
marginTop:-70,
position:"relative"



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

export default function About() {
var classes=useStyles();
const [open, setOpen] = React.useState(false);
const [isLogin, setIsLogin]=useState(false);
const history = useHistory();
const [Username,setUsername]=useState("");
const [photo,setPhoto]=useState("");

const handleClickOpen = (e) => 
{
  
  setOpen(true); 
};

const handleClose = (e) => 
  {
  
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



})
return (

<>
{isLogin==false?

<div>
<div>      
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.titleOne}>
                         <Link to="/" className={classes.links} color="inherit">Medium</Link>
                    </Typography>
                 
                  <Link to='/Blogs'  className={classes.links} color="inherit" >Blogs</Link>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen}>Write</Link>
                  <Link className={classes.links} color="inherit" onClick={handleClickOpen} >Profile</Link>
                  <Button className={classes.btn1} color="inherit" onClick={handleClickOpen} >Sign in</Button>
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      
    </div>



<img src ={pic5} style={{marginTop:200}}></img>
   <React.Fragment>
      <CssBaseline />
      <Container  style={{marginRight:40,width:1000,marginBottom:50,marginTop:-700}}>
        <Typography component="div" style={{ backgroundColor: grey[300], height: '100vh', marginTop:50  }} >
        <div style={{textAlign:"center",width:800,padding:130,marginLeft:130}}>
            <h5 style={{color:grey[700],fontSize:20}}>SMART STORIES, NO ADS</h5>
            <div style={{fontSize:60,fontWeight:'bold',lineHeight:"100%"}}>For readers, writers, and the insatiablycurious. Like you.</div>
        </div>
        </Typography>
      </Container>
    </React.Fragment>
 

   <div style={{marginTop:200}}>
   
    <img src={pic3} style={{width:"40%",marginLeft:40}}></img>

   
    <div style={{width:'40%',marginTop:50,marginLeft:700 ,marginTop:-370}}>
    <h5 style={{color:grey[700],}}>MORE OF WHAT MATTERS TO YOU</h5>
    <h1 style={{fontSize:50,fontWeight:1500,fontFamily:"Times New Roman"}}>World-class publications. Undiscovered voices. Topics you love.</h1>
    <h5 style={{marginTop:-20}}>From technology to business, true crime to climate change. Dive deeper on all the things you love, all in one place on Medium.</h5>
    <Button style={{marginTop:-5,backgroundColor:grey[500]}}  color="inherit" href="/" >Start Exploring</Button>
    </div>
   </div>


<div  style={{marginBottom:130,marginTop:130}}>
<div style={{marginTop:150}}>
   <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginRight:500, marginLeft:70, marginBottom:-80}}>120 million<br></br> curious readers<br></br> and growing.</h1>

   
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
  
</div>


</div>


<div>
<div style={{marginTop:200,marginBottom:150}}>
   
    <img src={pic4} style={{width:"40%",marginLeft:40,height:600}}></img>


    <div style={{width:'40%',marginLeft:700 ,marginTop:-500,height:500}}>
    <h5 style={{color:grey[700],}}>WHERE YOUR WRITING THRIVES</h5>
    <h1 style={{fontSize:65,fontWeight:1500,fontFamily:"Times New Roman"}}>Publish for free. Grow your audience. Earn for your work.</h1>
    <h5 style={{marginTop:-20}}>Post stories, create publications, and write what you care about. Join the Medium Partner Program to earn money when Medium members read your stories.</h5>
    <Button style={{marginTop:-5,backgroundColor:grey[500]}}  color="inherit" href="/">Start Exploring</Button>
    </div>
   </div>

</div>


<div style={{width:"60%",marginLeft:100}}>

<h5 style={{color:grey[700]}}>UPDATES AND OPENINGS</h5>
<p style={{fontFamily:"Times New Roman",fontWeight:"bold",fontSize:70,lineHeight:"90%",marginTop:-1}}> Learn more about our team, or be a part of it.</p>


</div>

<div style={{marginTop:100}}>
  <div className={classes.VLine}></div>
  <div style={{backgroundColor:grey[300],width:"100%",height:300,marginTop:-90,}}></div>



  <div style={{marginTop:-200,marginBottom:200}}>
       
        <div style={{width:"25%",position:"relative",marginLeft:200}}>
          <h3>Our official blog</h3>
          <p>Visit our company blog for the latest news, product updates, and tips and tricks.</p>
        </div>
        
        <div style={{width:"25%",position:"relative",marginLeft:700,marginTop:-100}}>
            <h3>Work at Medium</h3>
            <p>Our Medium team is home to coders and journalists, misfits and visionaries. The only thing missing is you.</p>
        </div>


  </div>
</div>


<div style={{textAlign:"center"}}>
<p style={{fontFamily:"Times New Roman",fontWeight:"bold",fontSize:70,lineHeight:"90%",width:"40%",marginLeft:400}}>Arrive curious.
Return inspired.</p>
<Button style={{marginTop:-15,backgroundColor:grey[500]}}  color="inherit" href="/">Start Exploring</Button>
<hr style={{marginTop:100,marginBottom:100,marginLeft:100,marginRight:100}}></hr>
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

      </div>:

//after signin

<div>

  
<div>
<div>      
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" className={classes.titleOne}>
                         <Link to="/" className={classes.links} color="inherit">Medium</Link>
                    </Typography>
                 
                  <Link to='/Blogs' className={classes.links} color="inherit">Blogs</Link>
                  <Link to='/Write' className={classes.links} color="inherit">Write</Link>
                  <Link to='/User' className={classes.links} color="inherit"  >Profile</Link>
                  <Button className={classes.btn1} color="inherit" onClick={logout} >Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
      </ThemeProvider>
      
    </div>



<img src ={pic5} style={{marginTop:200}}></img>
   <React.Fragment>
      <CssBaseline />
      <Container  style={{marginRight:40,width:1000,marginBottom:50,marginTop:-700}}>
        <Typography component="div" style={{ backgroundColor: grey[300], height: '100vh', marginTop:50  }} >
        <div style={{textAlign:"center",width:800,padding:130,marginLeft:130}}>
            <h5 style={{color:grey[700],fontSize:20}}>SMART STORIES, NO ADS</h5>
            <div style={{fontSize:60,fontWeight:'bold',lineHeight:"100%"}}>For readers, writers, and the insatiablycurious. Like you.</div>
        </div>
        </Typography>
      </Container>
    </React.Fragment>
 

   <div style={{marginTop:200}}>
   
    <img src={pic3} style={{width:"40%",marginLeft:40}}></img>

   
    <div style={{width:'40%',marginTop:50,marginLeft:700 ,marginTop:-370}}>
    <h5 style={{color:grey[700],}}>MORE OF WHAT MATTERS TO YOU</h5>
    <h1 style={{fontSize:50,fontWeight:1500,fontFamily:"Times New Roman"}}>World-class publications. Undiscovered voices. Topics you love.</h1>
    <h5 style={{marginTop:-20}}>From technology to business, true crime to climate change. Dive deeper on all the things you love, all in one place on Medium.</h5>
    <Button style={{marginTop:-5,backgroundColor:grey[500]}}  color="inherit" href="/" >Start Exploring</Button>
    </div>
   </div>


<div  style={{marginBottom:130,marginTop:130}}>
<div style={{marginTop:150}}>
   <h1 style={{fontFamily:"Times New Roman", fontWeight:"bold", fontSize:70, marginRight:500, marginLeft:70, marginBottom:-80}}>120 million<br></br> curious readers<br></br> and growing.</h1>

   
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
  
</div>


</div>


<div>
<div style={{marginTop:200,marginBottom:150}}>
   
    <img src={pic4} style={{width:"40%",marginLeft:40,height:600}}></img>


    <div style={{width:'40%',marginLeft:700 ,marginTop:-500,height:500}}>
    <h5 style={{color:grey[700],}}>WHERE YOUR WRITING THRIVES</h5>
    <h1 style={{fontSize:65,fontWeight:1500,fontFamily:"Times New Roman"}}>Publish for free. Grow your audience. Earn for your work.</h1>
    <h5 style={{marginTop:-20}}>Post stories, create publications, and write what you care about. Join the Medium Partner Program to earn money when Medium members read your stories.</h5>
    <Button style={{marginTop:-5,backgroundColor:grey[500]}}  color="inherit" href="/">Start Exploring</Button>
    </div>
   </div>

</div>


<div style={{width:"60%",marginLeft:100}}>

<h5 style={{color:grey[700]}}>UPDATES AND OPENINGS</h5>
<p style={{fontFamily:"Times New Roman",fontWeight:"bold",fontSize:70,lineHeight:"90%",marginTop:-1}}> Learn more about our team, or be a part of it.</p>


</div>

<div style={{marginTop:100}}>
  <div className={classes.VLine}></div>
  <div style={{backgroundColor:grey[300],width:"100%",height:300,marginTop:-90,}}></div>



  <div style={{marginTop:-200,marginBottom:200}}>
       
        <div style={{width:"25%",position:"relative",marginLeft:200}}>
          <h3>Our official blog</h3>
          <p>Visit our company blog for the latest news, product updates, and tips and tricks.</p>
        </div>
        
        <div style={{width:"25%",position:"relative",marginLeft:700,marginTop:-100}}>
            <h3>Work at Medium</h3>
            <p>Our Medium team is home to coders and journalists, misfits and visionaries. The only thing missing is you.</p>
        </div>


  </div>
</div>


<div style={{textAlign:"center"}}>
<p style={{fontFamily:"Times New Roman",fontWeight:"bold",fontSize:70,lineHeight:"90%",width:"40%",marginLeft:400}}>Arrive curious.
Return inspired.</p>
<Button style={{marginTop:-15,backgroundColor:grey[500]}}  color="inherit" href="/">Start Exploring</Button>
<hr style={{marginTop:100,marginBottom:100,marginLeft:100,marginRight:100}}></hr>
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

      </div>
</div>


}

</>
  );
}
