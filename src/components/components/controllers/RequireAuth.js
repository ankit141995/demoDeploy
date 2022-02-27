import { useLocation, Navigate } from 'react-router-dom'
import AuthConsumer from './auth';
import jwt from 'jsonwebtoken'




export function RequireAuth({ children }) {
    const authed = AuthConsumer();
    // console.log('here is useAuth in requireAuth', AuthConsumer(), authed.authed)
    const location = useLocation();
    
    
    
    let timerVal = 5000;

// let ID = authed.timer()
const change=(id, newVal, token)=>{
    clearTimeout(id); //clearing the previous timer using the id
    // console.log('previous timeout cleared', id)
    setTimeout(()=>{
    // console.log('-------------------Time out Extended')
    authed.setAuthed(token)
  }, newVal);
}

// console.log(ID)
// myFunction()
const isVerified = jwt.verify(authed.authed, 'secret', (error, verified)=>{
    // console.log('verification')
    // console.log(verified)
    // change(ID, 10000, authed.authed);
    return verified
} )




    // console.log(isVerified)
    return !isVerified
    // (authed.authed == false || authed.authed == undefined || authed.authed == null)
        ? <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />
        : children
}