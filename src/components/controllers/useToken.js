import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    // console.log('get token started -------------------------------------------------')
    const tokenString = localStorage.getItem('auth');
    // console.log('token string ', tokenString)
    const userToken = JSON.parse(tokenString);
    // console.log('token stirng parse ', userToken)
    return userToken?true:false
    // return userToken
  };
// console.log('get token function is here ', getToken())
  const [token, setToken] = useState(getToken());


  

  const saveToken = async userToken => {
    // console.log('token set', userToken)
     localStorage.setItem('auth', JSON.stringify(userToken));
     setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
    getToken
  }
}