import { requestPost } from './request.js';
import { token , imageUrl } from './urls';

var fn = (images)=>{

    var p = images.map(postData=>{
      return requestPost({url:`${imageUrl}${postData.id}`,config:{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }})
      .then(data=>{
        return {data:data.data,index:postData.index};
      })
      .catch(data=>{
        return {data:data,index:postData.index}
      });
    })
    return Promise.all(p);

}
export default fn;