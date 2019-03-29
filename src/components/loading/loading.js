import React,{Component} from 'react';
import {connect} from 'react-redux';

import './loading.css';

export class Loading extends Component{
    componentDidMount(){
        console.log(this.props.error);
        console.log(this.props.httpRequest);
    }
    render(){
        return (
            <div className="loading-container">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    <p className="p-0 m-0">
                        { (this.props.httpRequest && this.props.error)? this.props.error:"Loading" }
                    </p>
            </div>
        )
    }
}
var mapProperty=(state)=>{
    return {
    httpRequest:state.httpRequest,
    error:state.error
    }
  }
export default connect(mapProperty,null)(Loading)