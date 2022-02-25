import axios from 'axios'
import React, {memo, useEffect, useState} from 'react'
import './SearchBar.css'
// import OrderList from './OrderList'
// import { BrowserRouter as Router , Routes, Route, Link, Navigate } from 'react-router-dom'
import { useNavigate , useLocation } from 'react-router-dom';
import { allStorage } from "./storage";
import { Button } from 'react-bootstrap'
import HoverSuggestions from './controllers/HoverSuggestions';
import AuthConsumer from './controllers/auth'


const SelectedMenu = ({ Menu, Cross, url, GuestCount, Reset, Edit, updateItem, suggestions }) => {
    // console.log('SelectedMenu component start',    suggestions)
     const authed = AuthConsumer()
    let role= authed.user.role
    
    let guestGount = 0
    const [cName, setCName] = useState('')
    const [showHover, setShowHover] = useState(false)
    // const [textData, setTextData]= useState({})
    useEffect(() => {
    //    console.log('selected menu mounted')
       
    }, [])
    useEffect(() => {
    //    console.log('selected menu updated')
       
    })

    const locations = useLocation()
 

    const Getquantity = async () => {
    
        let res = await axios.post('/api', { menu: Menu.menu, guestCount: GuestCount })
            .then((res) => {
            
            })
        // console.log(res)
    }

    let totalOrders
    const TotalOrders = (val) => {
        totalOrders = val
        // console.log(totalOrders, val)
        localStorage.setItem('totalOrder', JSON.stringify(totalOrders))
        return totalOrders
    }
    // console.log(orderArr)
    let navigate = useNavigate();
    // console.log('navigate ' , navigate)
    const getList = () => {
//    <Navigate to='/orderlist' component={ <OrderList OrderDetails={Menu} Reset={Reset} Edit={Edit} TO={TotalOrders} />}
    // />
    navigate('/pdfgenerator/orders',{ OrderDetails:{Menu}, Reset:{Reset}, Edit:{Edit}, TO:{TotalOrders}})

}
let tot = allStorage()
    // console.log('Menu is here ' , Menu)
//     const suggestions = ["Hara Bhara kebab", "Chicken Tangari"
// , "Chicken Tikka"
// , "Chicken Malai Tikka"
// , "Chicken Tikka Bhuna masala", "Chilli Chicken"
// , "Chicken Wings"
// , "Paneer sandwich"
// , "Paneer Tikka"
// , "Achari Paneer Tikka"
// , "Chilli Paneer"]


  const  handleHover=(e, idx)=>{
    //   console.log('hovered', e.target)
      e.preventDefault()
      setShowHover(!showHover)
    //   setCName({display:'block', 'background-color':'yellow'})
      if(document.getElementById(`div_hover${idx}`)) {document.getElementById(`div_hover${idx}`).style.display ='flex'}
    }
    const  handleLeave=(e, idx)=>{
        // console.log('hovered', e)
        e.preventDefault()
        setShowHover(!showHover)
        // setCName({display:'none'})
     if(document.getElementById(`div_hover${idx}`)) {document.getElementById(`div_hover${idx}`).style.display = 'none';}
  }

//   console.log('suggestions in selected menu ', suggestions )
    return (
        <>
        {/* <BrowserRouter> */}
         {/* <Router> */}
                    <div className='id4'>
                {(role=="admin" || role=="basic") && <div className='order-tot'>

                    <div className='tot'>
                        {tot.length}
                    </div>
                    <Button className="cart-btn" onClick={getList}>
                        <div><p>Orders</p>
                        </div>
                    </Button>
                </div>}
                        <div className='selected-items-list'>
                            
                            {Menu && Menu.menu.map((item, idx) => {
                                // console.log('item is here ', `|${item}|`)
                                // console.log(suggestions, item)
                                return <div className='selected-item' onMouseOver={(e)=>handleHover(e, idx)} onMouseLeave={(e)=>{handleLeave(e, idx)}} >
                                    <p key={`p_${idx}`}>
                                        {idx + 1 + ' '}
                                        {item}
                                    </p>
                                {suggestions && <HoverSuggestions cName={cName} idx={idx} handleLeave={handleLeave} suggestions={suggestions[idx]} updateItem={updateItem}/>}
                                    <button type='button' className='trash-btn' onClick={e => Cross(e)}>X</button>
                                 {/* <div id={idx} style={showHover?{display:'flex'}:{display:'none'}}> */}
                                 {/* <h1>div{idx}</h1> */}

                                 {/* </div> */}
                                </div>
                            })}
                        </div>
                
                
                {/* <OrderList OrderDetails={Menu} Reset={Reset} Edit={Edit} TO={TotalOrders} /> */}
            </div>
                   {(role=="admin" || role=="basic") && <div className='button-get'>
                        {/* <Button className='btn btn-default' onClick={Getquantity}>Get Ingredients</Button> */}
                    </div>}
            {/* </BrowserRouter> */}
            {/* </Router> */}
        </>
    )
}

export default memo(SelectedMenu)
