import React, { Component } from 'react';
import { connect } from 'react-redux';


import { requestGet,requestPost } from './components/request';
import {requestUrl, imageUrl ,token} from './components/urls';
import Loading from './components/loading/loading';
import Slider from './components/slider/slider';
import './App.css';

class App extends Component {
  x = false;
  componentDidMount(){
      requestGet({
        url:requestUrl,config:{
        headers:{
          Authorization:`Bearer ${token}`
          }
        } 
      })
      .then(data=>{
        if(data && data.data){
          this.props.dispatchEvent({dataPayload:data.data});
          this.loadingSingleImage();
        }else{
          this.props.dispatchEvent({error:true});
        }
      })
      .catch(data=>{
        this.props.dispatchEvent({error:"Network Error Couldn't reach Server"});
      })
      
  }
  loadingSingleImage=()=>{
    requestPost({url:`${imageUrl}vision`,config:{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }}).then(data=>{
      console.log('image Post completed',data);
    }).catch(data=>{
      console.log('error',data);
    })
  }
  render() {
    return ( 
      <div className = { (!this.props.error && this.props.httpRequest )?"App":"App loader"  } >
          {
            (!this.props.error && this.props.httpRequest )?
            <Slider></Slider>:<Loading></Loading>
          }
      </div>
    );
  }
}

var mapProperty=(state)=>{
  return {
    httpRequest:state.httpRequest,
    error:state.error
  }
}
var dispatchEvents=(dispatcher)=>{
  return {
    dispatchEvent:({error=false,httpRequest=true,dataPayload=[]})=>dispatcher({type:'requestComplete',payload:{
        error,
        dataPayload
    }})
  }
}

export default connect(mapProperty,dispatchEvents)(App);
