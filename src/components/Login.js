import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'
import './Login.css'
// import axios from 'axios'
import { setWithExpiry, getWithExpiry } from './storage.js'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import AuthConsumer from '../components/controllers/auth';


const Login = ({setToken}) => {
  let url = 'http://127.0.0.1:3030/login'
  let navigate 
  const [user, setUser] = useState({
    user: '',
    password: ''
  })
  const { state } = useLocation();
  const authed = AuthConsumer();
  // console.log(state)
  const [isAuth, setIsAuth] =  useState(false)
  
  const setloginCred = (e) => {
    if (e.target.name == 'user') { setUser((prev => { return { ...prev, user: e.target.value } })) }
    if (e.target.name == 'pass') { setUser((prev => { return { ...prev, password: e.target.value } })) }
  }
  // console.log(authed)
  navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    
    // e.preventDefault()
    if(user.user&& user.password){
      console.log('submit clicked')
      
      // const res = await axios.post(url, user).then((res) => {
        
      //   // setWithExpiry('auth', res.data.token, 10000)
      //   setIsAuth(res.data.auth)
      //   setToken(res.data.auth)
      //   authed.setAuthed(res.data.auth)
        
      //   return res
      // })
      authed.login(url, user)
      // navigate(state?.path || "/")
      // console.log(res.data.auth)
      
      // if(res.data.auth){
            // navigate('/' ,{replace:true})
            console.log('navigated')
          // }
          // else alert('Wrong Email and Password')
      // return (<Navigate to='/'/> )
    }else{
      alert('Please Enter UserName and Password')
    }

  }
  
  return (
    <div className='login-main'>
      <div className='Login'>



        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control name='user' onChange={setloginCred} type="text" placeholder="Enter Username.." />
            <Form.Text className="text-muted">
              {/* We'll never share your email with anyone else. */}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name='pass' onChange={setloginCred} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            {/* <Form.Check type="checkbox" label="Check me out" /> */}
          </Form.Group>
          {/* <Button onSubmit={(e)=>{handleSubmit(e)}} variant="primary" type="submit"> */}
          {/* Submit */}
          {/* </Button> */}
        </Form>

























        {/* <form className='login_form'>

            <label>Username</label>
            <input type='text' placeholder='Enter Username...'/>
            <label>Password</label>
            <input type='password' placeholder='Enter Password...'/>
            </form> */}
        <button onClick={e => handleSubmit(e)}>Login</button>
      </div>
    </div>
  )
}

export default Login
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }