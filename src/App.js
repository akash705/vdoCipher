import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Loading from './components/loading/loading';
import Slider from './components/slider/slider';
import './App.css';

class App extends Component {
  componentDidMount(){
    console.log(this.props.httpRequest);
    axios.get('https://www.google.com/').then(data=>{
      console.log('request completed');
    },err=>{
      this.props.dispatchEvent({error:"Error While Loading Page."});
      console.log('request Error');
    })
  }
  render() {
    return ( 
      <div className = { (!this.props.error && this.props.httpRequest )?"App":"App customBackground"  } >
          {
            (!this.props.error && this.props.httpRequest )?
            <Loading></Loading>:<Slider></Slider>
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
