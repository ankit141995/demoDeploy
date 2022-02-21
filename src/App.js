// import logo from './logo.svg';
import React, { useState } from 'react'
// import './App.css';
import SearchBar from './components/SearchBar';
// import {ReadExcel} from  './components/ReadExcel'
// import axios from 'axios'
import OrderList from './components/OrderList'
import  Login  from './components/Login'
import { Routes, Route } from 'react-router-dom'
// import { getWithExpiry } from "./components/storage";
import HomePage from "./components/HomePage"
import SalesForm from "./components/Sales"
import { AuthProvider } from "./components/controllers/auth"
import { RequireAuth } from "./components/controllers/RequireAuth"
import useToken from "./components/controllers/useToken"
import { CreateUser } from './components/CreateUserForm'
import AuthConsumer from './components/controllers/auth'
import Ing from './components/Ing';
import ChefAssign from './components/ChefAssign'



const App = () => {
    const authed = AuthConsumer();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //   console.log('App component start')
  // let token 
  // let orderlist = getWithExpiry('OrderDetails')
  // console.log('App component ended')


  // console.log(getWithExpiry('OrderDetails'))

  // console.log(orderlist)

  // if(!localStorage.getItem('auth')){
  //   // token = JSON.parse(localStorage.getItem('auth'))
  //   // console.log(token.value)
  //   // setIsLoggedIn(true)
  //   // setInterval(localStorage.removeItem('auth'), 100000)
  //   return <Routes>
  //     <Route path='/login' element={<Login/>}/>
  //     </Routes>
  // }
  // useEffect(() => {console.log('hi')})

  const { token, setToken } = useToken()
  // console.log('token in app', token)
  //   if(!token) {
  //     return <Login setToken={setToken} />
  //   }
setTimeout(()=>{
    console.log('auth time out running', authed)
    // authed.setAuthed()
  }, 2000)

  return (
    <AuthProvider>
      <Routes>
      <>

          <Route path='/login' element={<Login setToken={setToken} />}></Route>


        <Route path='/' element={<RequireAuth><HomePage />
          </RequireAuth>}>
          {/* {token != false ? <Route path='form' element={<SalesForm />} /> : <Login setToken={setToken} />} */}
          <Route path='form' element={<SalesForm />} />

          <Route path='/pdfgenerator'>
            
            <Route path='' element={<RequireAuth> <SearchBar />
            </RequireAuth>}  ></Route>
           
           
            <Route path='orders' element={
          <RequireAuth>
             <OrderList />
            </RequireAuth>
          
          } />
            <Route path='orders/ing' element={<Ing />} />
            <Route path='orders/edit/:orders' element={<SearchBar />} />
          </Route>
            <Route path='/assign' element={<ChefAssign />} />

          <Route path='/createuser' element={<CreateUser />} />




          <Route path="*" >
          </Route>
        </Route>
        </>
      </Routes>
    </AuthProvider>
    // <SearchBar /> 
  )
}

export default App;
