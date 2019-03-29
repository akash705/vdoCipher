import React,{Component} from 'react';
import {connect} from 'react-redux';

import './slider.css';
import imageLoader from './../singleImageLoader';
import Hoc from './../hoc/hoc';
import actionCreator from './../../store/action-creator';

export class slider extends Component{
    state={
        activeSlide:0,
    }
    handler=null;
    nextSlide=()=>{
        if( !this.props.imagesId ||  !this.props.imagesId.length){
            return 0;
        }
        this.setState((state)=>{
            var activeSlide=((state.activeSlide+1) <=this.props.imagesId.length-1)?state.activeSlide+1:0;
                return {
                    activeSlide
                }
            })
        this.settingTimeInterval(); 
    }
    settingTimeInterval=()=>{
        clearInterval(this.handler);
        this.handler=setInterval(data=>{
            if( this.props.imagesId &&  this.props.imagesId.length){
                this.nextSlide();
            }
        },2000);
    }
    prevSlide=()=>{
        if( !this.props.imagesId ||  !this.props.imagesId.length){
            console.log(this.props.imagesId)
            return 0;
        }
        this.setState((state)=>{
            var activeSlide=(~(state.activeSlide-1))?state.activeSlide-1:this.props.imagesId.length-1;
            return {
                activeSlide
            }
        })
        this.settingTimeInterval();
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
    componentWillMount(){
        // clearing up the interval
        clearInterval(this.handler);
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
        dispatchedEvent:(data)=>dispatcher(actionCreator.ImagesLoaded(data))
    }
}
export default connect(mapProp,dispatchEvent)(slider);