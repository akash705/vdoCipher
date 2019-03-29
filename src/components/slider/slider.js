import React,{Component} from 'react';

import './slider.css';
import img1 from './../../assets/images/img.jpeg';
import img2 from './../../assets/images/image2.jpg';

import Hoc from './../hoc/hoc';

export class slider extends Component{
    state={
        activeSlide:0,
        slider:[{
                data:1,
                img:img1,
            },{
                data:2,
                img:img2
            }]
    }
    nextSlide=()=>{
        this.setState((state)=>{
            var activeSlide=((state.activeSlide+1) <= state.slider.length-1)?state.activeSlide+1:0
            console.log(activeSlide);
                return {
                    ...state,
                    activeSlide
                }
            })
    }
    prevSlide=()=>{
        this.setState((state)=>{
            var activeSlide=(~(state.activeSlide-1))?state.activeSlide-1:state.slider.length-1
            console.log(activeSlide);
            return {
                ...state,
                activeSlide
            }
        })
    }
    render(){
        return (
            <Hoc>
                            <div className="slideshow-container">
                                {
                                    this.state.slider.map((data,index)=>{
                                        return (
                                            <div key={index} className={(this.state.activeSlide==index)?"mySlides fade active":"mySlides fade"}>
                                                <img src={data.img} alt="no text" className="slider-img"/>
                                            </div>
                                        )
                                    })
                                }
                            <a className="prev" href="#" onClick={ this.prevSlide } >&#10094;</a>
                            <a className="next" href="#" onClick={ this.nextSlide }>&#10095;</a>
                            {/*  onclick="plusSlides(1)" */}
                            </div>

            </Hoc>
        )
    }
}
export default slider