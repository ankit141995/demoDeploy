import * as React from "react";
import useToken from './useToken'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'



const authContext = React.createContext();

function useProvideAuth() {
    const { state } = useLocation();
     let navigate = useNavigate();

  const {token ,getToken, setToken} = useToken()
  const [user, setUser]= React.useState({})
  const [authed, setAuthed] = React.useState();
  const [isAuth, setIsAuth] = React.useState()
  // setAuthed(token)


const timer=(token)=>{
  
  return setTimeout(()=>{
    console.log('auth time out running')
    setAuthed(token)
  }, 10000)}

var jwttoken
const login=async(url, user)=>{
  
  const res = await axios.post(url, user).then((res) => {
  jwttoken = jwt.sign(res.data.auth, 'secret', {
  // expiresIn:'1h'
  })
        console.log(jwttoken)
        
        // setWithExpiry('auth', res.data.token, 10000)
        setToken(res.data.token)
        setAuthed(jwttoken)
        
        // timer(jwttoken)
        setUser(res.data)
        navigate(state?.path || "/")
        return res
      })}


  return {
    authed,
    setAuthed, login, user, timer
    // login() {
    //   return new Promise((res) => {
    //     setAuthed(true);
    //     res();
    //   });
    // },
    // logout() {
    //   return new Promise((res) => {
    //     setAuthed(false);
    //     res();
    //   });
    // }
  };
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
