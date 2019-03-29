var initialState={
    httpRequest:false,
    error:"",
    imagesId:[]
};

var reducer=(state=initialState,action)=>{
    switch(action.type){
        case("requestComplete"):{
                var a={
                    ...state,
                    error:action.payload.error,
                    httpRequest:true,
                    imagesId:action.payload.dataPayload.map(data=>{
                        return {id:data.id,url:'',tryLoading:false}
                    })
                }
                return a;
        }
        case("singleImageLoaded"):{
            var a={
                ...state,
                error:action.payload.error,
                httpRequest:true,
                imagesId:action.payload.dataPayload.map(data=>{
                    return {id:data.id,url:'',tryLoading:false}
                })
            }
            return a;
        }
        case("imagesLoaded"):{
            let img= [...state.imagesId];
            for(let i of action.dataPayload){
                img[i.index]={
                    id:i.data.id,
                    tryLoading:true,
                    url:i.data.url
                }
            }
            console.log(img);
            return {
                ...state,
                imagesId:img
            }   
        }
        default:{
            return state;
        }
    }
        
}
    
export default reducer;