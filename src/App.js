import React, { Component } from 'react';
import { connect } from 'react-redux';


import { requestGet } from './components/request';
import {requestUrl ,token} from './components/urls';
import Loading from './components/loading/loading';
import Slider from './components/slider/slider';
import Hoc from './components/hoc/hoc';
import './App.css';
import actionCreator from './store/action-creator';

class App extends Component {
  x = true;
  componentDidMount(){
    this.fetchImages();      
  }
  fetchImages=()=>{
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
      }else{
        this.props.dispatchEvent({error:true});
      }
    })
    .catch(data=>{
      console.log(data);
      this.props.dispatchEvent({error:"Network Error Couldn't reach Server"});
    })
  }
  render() {
    return ( 
      <div className = { (!this.props.error && this.props.httpRequest )?"App":"App loader"  } >
          {
            (!this.props.error && this.props.httpRequest )?
            <Hoc>
              <Slider></Slider>
            </Hoc>
            :<Loading></Loading>
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
    dispatchEvent:({error=false,httpRequest=true,dataPayload=[]})=>dispatcher(actionCreator.RequestComplete(error,dataPayload))
  }
}

export default connect(mapProperty,dispatchEvents)(App);
