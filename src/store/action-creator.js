import actionTypes from './actionTypes';

var ImagesLoaded=(data)=>{
    return {
        type:actionTypes.IMAGESLOADED,
        dataPayload:data
    }
}
var RequestComplete=(error,dataPayload)=>{
    return {
        type:actionTypes.REQUESTCOMPLETE,
        payload:{
            error,
            dataPayload
        }
    }
}


export default {
    ImagesLoaded,
    RequestComplete
}
