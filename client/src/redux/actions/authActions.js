import {GET_AUTH, SET_AUTH} from '../const/authConst'


export const getAuth=()=> (dispatch)=>{
    fetch('http://localhost:4000/api',{
      method:'GET',
      headers:{"Content-type": "application/json; charset=UTF-8"},
      credentials: 'include'
  })
  .then(res=> res.json())
  .then(data=>{
    dispatch({
        type: GET_AUTH,
        payload: data.auth
    });
  })
  .catch(err => console.log(err));
}

export const setAuth=(authStatus)=>(dispatch)=>{
    dispatch({
        type: SET_AUTH,
        payload: authStatus,
    })
}