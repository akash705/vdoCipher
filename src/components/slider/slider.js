import React,{Component} from 'react';
import {connect} from 'react-redux';

import './slider.css';
import img1 from './../../assets/images/img.jpeg';
import img2 from './../../assets/images/image2.jpg';

import Hoc from './../hoc/hoc';

export class slider extends Component{
    state={
        activeSlide:0,
    }
    nextSlide=()=>{
        this.setState((state)=>{
            var activeSlide=((state.activeSlide+1) <=this.props.imagesId.length-1)?state.activeSlide+1:0;
                return {
                    activeSlide
                }
            })
    }
    prevSlide=()=>{
        this.setState((state)=>{
            var activeSlide=(~(state.activeSlide-1))?state.activeSlide-1:this.props.imagesId.length-1;
            console.log(activeSlide);
            return {
                activeSlide
            }
        })
    }
    render(){
        return (
            <Hoc>
                            <div className="slideshow-container">
                                {
                                    this.props.imagesId && this.props.imagesId.map((data,index)=>{
                                        return (
                                            <div key={index} className={(this.state.activeSlide==index)?"mySlides fade active":"mySlides fade"}>
                                                <img src={data.img || img2} alt="no text" className="slider-img"/>
                                            </div>
                                        )
                                    })
                                }
                            <a className="prev" href="#" onClick={ this.prevSlide } >&#10094;</a>
                            <a className="next" href="#" onClick={ this.nextSlide }>&#10095;</a>
                            </div>

            </Hoc>
        )
    }
}
var mapProp=(state)=>{
    return {
        imagesId:state.imagesId
    }
}
var dispatchEvent=(dispatcher)=>{
    return {
        dispatchedEvend:()=>dispatcher()
    }
}
export default connect(mapProp,null)(slider);