import React,{Component} from 'react';
import {connect} from 'react-redux';

import './slider.css';
import img2 from './../../assets/images/image2.jpg';
import imageLoader from './../singleImageLoader';

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
            return {
                activeSlide
            }
        })
    }
    loaded=()=>{
    }
    errorLoading=(index)=>{
    }
    componentDidMount(){
       this.checkForImage();
    }
    checkForImage=()=>{
        const waitingToLoad=this.props.imagesId.map((data,index)=>{
            if(!data.tryLoading){
                return {id:data.id,index};
            }
        }).filter(data=>{
            return data
        })
        if(waitingToLoad.length){
            imageLoader(waitingToLoad)
            .then(data=>{
                this.props.dispatchedEvent(data);
            })
            .catch(data=>{
                console.log('exception',data);
                // this.props.dispatchEvent([]);s
            })
        }
    }
    render(){
        return (
            <Hoc>
                    <p className="m-0 p-0 title">Avengers Avenue</p>
                            <div className="`slideshow-container">
                                {
                                    this.props.imagesId && this.props.imagesId.map((data,index)=>{
                                        return (
                                            <div key={data.id} className={(this.state.activeSlide===index)?"mySlides fade active":"mySlides fade"}>
                                                <img src={data.url} alt="" className={(!data.tryLoading && !data.url) ? "slider-img failed":"slider-img"}
                                                    onLoad={this.loaded} 
                                                />
                                                {
                                                    (!data.url)?(
                                                        <div className="slide-img-text">
                                                        Loading Image.......
                                                    </div>
                                                    ):null
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div  className="prev" onClick={ this.prevSlide } >
                                        <a href="#" >
                                            
                                        </a>
                                </div>
                                <div  className="next"  onClick={ this.nextSlide } >
                                    <a href="#"></a>        
                                </div>
                            
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
        dispatchedEvent:(data)=>dispatcher({type:'imagesLoaded',dataPayload:data})
    }
}
export default connect(mapProp,dispatchEvent)(slider);