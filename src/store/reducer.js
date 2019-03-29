var initialState={
    httpRequest:false,
    error:"",
    payload:[]
};

var reducer=(state=initialState,action)=>{
    if(action.type=="requestComplete"){
        console.log('reducer',action);
        var a={
            ...state,
            error:action.payload.error,
            httpRequest:true,
            imagesId:action.payload.dataPayload.map(data=>{
                return {id:data,url:'',tryLoading:false}
            })
        }
        console.log(a);
        return a;
    }
    return state;
}
export default reducer;