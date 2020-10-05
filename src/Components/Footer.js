import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { grey, green } from "@material-ui/core/colors";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';


//Styling
const useStyles = makeStyles((theme) => ({


  link:
{
    zIndex:1,
    margin:20,
    color:grey[50],
    textDecoration:'none',
     display:"inlineBlock",
     fontSize:16
     
    

},
}));

export default function Footer (){
   var classes=useStyles(); 

  return (
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
                <a className={classes.link} href="About">About Medium</a>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <a className={classes.link}href="#!">Profile</a>
              </li>
              <li  style={{display:"inline",float:"left"}}>
                <a className={classes.link} href="#!">Blogs</a>
              </li>
              <li  >
                <a className={classes.link} href="#!">Write</a>
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
          &copy; {new Date().getFullYear()} Copyright: <a  className={classes.links}href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    
   
</>
  );
}
