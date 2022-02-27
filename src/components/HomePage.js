import React from 'react'
import {Outlet, Link, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './HomePage.css'
import AuthConsumer from './controllers/auth'

const HomePage = () => {
  const navigate =  useNavigate()
  const authed = AuthConsumer()
    const HandleLogOut = () => {
        localStorage.removeItem('auth')
        navigate('/login', {replace:true})
    }
    
    let role= authed.user.role
    const str = authed.user.name;
const ProfileName = str.charAt(0).toUpperCase() + str.slice(1);
    // console.log(authed.user)
    return (
        <div>

            <div className='nav-bar' >
                <h1 className='p_name'>{ProfileName}</h1>
                <div className='left-side'>
                <Link className="nav-link" to='/' >Home Page</Link>
               {role=='admin'&&  <Link className="nav-link" to='/createuser'>Create User</Link>}
               {(role=='admin' ||role=='basic') && <Link className="nav-link" to='/pdfgenerator/orders'>{role!='basic'?"Pdf Generator":"Assing chef"}</Link>}
               {(role=='sales'|| role=='admin')&& <Link className="nav-link" to='/form'>Sales Form</Link>}
               {(role=='sales'|| role=='admin')&& <Link className="nav-link" to='/pricequote'>Price Quote</Link>}
               {/* {(role=='basic'|| role=='admin')&& <Link className="nav-link" to='/assign'>Assign Chef</Link>} */}
                </div>
                <div className='right-side'>

                <Button onClick={()=>HandleLogOut()}>Log out</Button>
                </div>
            </div>
            <Outlet></Outlet> 
        </div>
    )
}

export default HomePage
