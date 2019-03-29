import axios from 'axios';

var requestGet = ({url,config})=>{
    return axios.get(url,config);
}
var requestPost=({url,config})=>{
    return axios.post(url,null,config);
}


export {requestGet,requestPost};