import './SearchBar.css'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import SelectedMenu from './SelectedMenu'
import axios from 'axios'
import OrderList from './OrderList'
import { setWithExpiry, getWithExpiry, allStorage } from "./storage";
import { Button } from 'react-bootstrap'
import { navigate, useNavigate, useLocation, Outlet } from 'react-router-dom'
import jwt from 'jsonwebtoken' 
// import useToken from "./controllers/useToken"
import AuthConsumer from './controllers/auth'
import {updateGooglesheet} from './UpdateGS'




let url = '/api'

let tot = allStorage()

const SearchBar = ({ placeHolder }) => {
    let navigate = useNavigate()
        const authed = AuthConsumer()
    let authrole= authed.user.role
 
 
    const [searchWords, setSearchWords] = useState('');

    // const history = useHistory()
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')

    
    const populateRole= async()=> {
        const req = await axios.get('/login', {
            
            headers: {
                'x-access-token': getWithExpiry('auth'),
			},
		}).then(res=>{
        if (res.statusText === 'OK') {
            // Edit(me, ge, he)
            
            setQuote(res)
        } else {
            alert('error')
        }
        return res.data})

		
	}







    useEffect(async() => {
        const token = await getWithExpiry('auth')
		if (!token==[]) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('auth')
				// navigate('/login')
			} else if(user){
				populateRole()
			}
		}
        // else{
        //     // navigate('/login')
        // }
        Edit(me, ge, he, a, b, c, d, e, f, g)
    }, [])


    

    let location = useLocation()


    const [Menu, setMenu] = useState([])


    let [temp, setTemp] = useState({
        searchWords: '',
        menu: [],
        guest: 4,
        order: '',
        filteredData: [],
        flag: false
    })

    const [num, setNum] = useState(tot.length !== 0 ? tot.length + 1 : 1);


    useEffect(() => {
        const sendValue = async (url) => {
            // axios.get(`http://127.0.0.1:3030/api?${searchWords}` 
            var res = await axios.get(url,
                {
                    params: { input: searchWords }
                }
            )
                .then((res) => {
                    setTemp(prev => {
                        return {
                            ...prev,
                            filteredData: res.data,
                            flag: true
                        }
                    });
                })

        }

        if (searchWords.length >= 3) {
            sendValue(url)



        }

        else {
            setTemp((prev) => {
                return {
                    ...prev,
                    filteredData: '',
                    flag: false
                }
            }
            )

        }
    }, [searchWords])



    const addItems = (e) => {
        let itemName = e.target.innerText.trim()
        if (!Menu.includes(itemName)) {
            setMenu([...Menu, itemName])
            setTemp(prev => { return { ...prev, menu: [...prev.menu, itemName], searchWords: '', flag: false } })
            // localStorage.setItem('OrderDetails', JSON.stringify(temp))
            setSearchWords('')
        }
        else {
            alert('already selected')
            // return false
        }
        e.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling.focus()
    }


    const Cross = (e) => {

        let itemName = e.target.parentNode.firstChild.innerText.toString()
        let foodName = itemName.replace(/^[0-9]+/g, '').trim()
        let indexofItem = temp.menu.indexOf(foodName)

        if (temp.menu.includes(foodName)) {
            Menu.splice(indexofItem, 1)
            setTemp(prev => { 
                temp.menu.splice(indexofItem, 1)
                
                return { ...prev, menu: temp.menu } })
            setMenu([...Menu])
            
        }
        else {
        }
    }


    const memoCross = useCallback(Cross, [temp])

    const guestCount = (e) => {
        setTemp((prev) => {
            return { ...prev, guest: parseInt(e.target.value) }
        })
    }


    const Reset = (val) => {
        setTemp((prev) => {
            return {
                ...prev, menu: [],
                guest: 4,
                order: "",
                date: "",
                chef: "",
                location: "",
                serve: '',
                pickup: '',
                name: '',
                spec: '',
            }
        })
        setMenu([])
    }

    let me = location.state ? location.state.menu : []
    let ge = location.state ? location.state.guestCount : 0
    let he = location.state ? location.state.order : ''
    let a = location.state ? location.state.date : ''
    let b = location.state ? location.state.chef : ''
    let c = location.state ? location.state.location : ''
    let d = location.state ? location.state.serve : ''
    let e = location.state ? location.state.pickup : ''
    let f = location.state ? location.state.name : ''
    let g = location.state ? location.state.spec : ''

   const Edit = (me, ge, he, a, b, c, d, e, f, g) => {
        setTemp((prev) => {
            return {
                ...prev,
                menu: me ? me : prev.menu,
                guest: ge ? ge : prev.guest,
                order: he ? he : prev.order,
                date: a ? a : prev.date,
                chef: b ? b : prev.chef,
                location: c ? c : prev.location,
                serve: d ? d : prev.serve,
                pickup: e ? e : prev.pickup,
                name: f ? f : prev.name,
                spec: g ? g : prev.spec,
            }
        })
        setMenu(me)
    }
 

    const confirm = (idx) => {
        authrole=='basic' && updateGooglesheet(temp.order, temp.chef)
        navigate('/pdfgenerator/orders', {state:{ temp:temp, idx:idx}})
    }

    const updateItem = (e, idx)=>{
        let itemName = e.target.innerText.trim()
      temp.menu[idx]= itemName
      if(!temp.menu.includes(itemName)){
     setTemp(prev => { return { ...prev, menu: temp.menu } })
     let key;
            key = `OrderNumber-${temp.order}`;

            json[key] = {
                menu: temp.menu,
            guestCount: temp.guest,
            order: temp.order,
        
                date:temp.date,
                chef:temp.chef,
                location:temp.location,
                serve:temp.serve,
                pickup:temp.pickup,
                name:temp.name,
                spec:temp.spec,
            };
            // orderNumber.push(json[key]);
            // setOrders(json)
            localStorage.setItem(key, JSON.stringify(json[key]))}
  }


    let json = {}
    const handlerAdd = (e, idx) => {
        // e.preventDefault()

        if (temp.menu.length !== 0 && temp.guest !== 0) {



            let key;
            key = `OrderNumber-${temp.order}`;

            json[key] = {
                menu: temp.menu,
            guestCount: temp.guest,
            order: temp.order,
        
                date:temp.date,
                chef:temp.chef,
                location:temp.location,
                serve:temp.serve,
                pickup:temp.pickup,
                name:temp.name,
                spec:temp.spec,
            };
            // orderNumber.push(json[key]);
            // setOrders(json)
            localStorage.setItem(key, JSON.stringify(json[key]))
            // setTemp((prev)=>{return {...prev , menu:allStorage()}})
            Reset()
            setNum((prev) => (prev += 1));
        }
        else {
            alert("please fill all the fields ")
        }
    };

    return (
        <>
            <div className='Main' id='id5'>
             
                {authrole}

                {authrole == 'basic' &&
                    (<div className='counterInputs'>
                        <label><b>{temp.order}</b></label>
                        <br />
                 
                        <label><b>{temp.name}</b></label>
                        <br />
                    </div>)
                }
                {authrole=='admin' && <div className='search'>



                    <div className='counterInputs'>
                        <label>Guest Count</label>
                        <br />
                        <span>

                            <input type="number" name='guest' onChange={e => guestCount(e)} value={temp.guest} className="input" id='count'></input>

                        </span>
                    </div>
                    <div className='counterInputs'>
                        <label>Order Number</label>
                        <br />
                        <span>
                            <input type="text" name='order' onChange={(e) => {
                                setTemp(prev => { return { ...prev, order: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.order} className="input" id='count'></input>
                        </span>
                    </div>

                    <div className='counterInputs'>
                        <label>Order Date</label>
                        <br />
                        <span>
                            <input type="text" name='date' onChange={(e) => {
                                setTemp(prev => { return { ...prev, date: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.date} className="input" id='count'></input>
                        </span>
                    </div>
                    <div className='counterInputs'>
                        <label>Guest Name</label>
                        <br />
                        <span>
                            <input type="text" name='name' onChange={(e) => {
                                setTemp(prev => { return { ...prev, name: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.name} className="input" id='count'></input>
                        </span>
                    </div>
                    <div className='counterInputs'>
                        <label>Serving location</label>
                        <br />
                        <span>
                            <input type="text" name='location' onChange={(e) => {
                                setTemp(prev => { return { ...prev, location: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.location} className="input" id='count'></input>
                        </span>
                    </div>
                    <div className='counterInputs'>
                        <label>Specification</label>
                        <br />
                        <span>
                            <input type="text" name='spec' onChange={(e) => {
                                setTemp(prev => { return { ...prev, spec: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.spec} className="input" id='count'></input>
                        </span>
                    </div>
                    {/* <div className='counterInputs'>
                        <label>Serving Time</label>
                        <br />
                        <span>
                            <input type="text" name='Counter' onChange={(e) => {
                                setTemp(prev => { return { ...prev, serve: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.serve} className="input" id='count'></input>
                        </span>
                    </div> */}
                    <div className='counterInputs'>
                        <label>PickUp time</label>
                        <br />
                        <span>
                            <input type="text" name='pickup' onChange={(e) => {
                                setTemp(prev => { return { ...prev, pickup: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.pickup} className="input" id='count'></input>
                        </span>
                    </div>
                    <div className='counterInputs'>
                        <label>Chef Assinged</label>
                        <br />
                        <span>
                            <input type="text" name='chef' onChange={(e) => {
                                setTemp(prev => { return { ...prev, chef: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.chef} className="input" id='count'></input>
                        </span>
                    </div>

                    <div className='searchInputs'>
                        <label>Search Dish</label>
                        <input type='text' className='InputField' placeholder={placeHolder} value={searchWords}
                            onChange={(e) => {
                                // setTemp(prev=>{return {...prev, searchWords: e.target.value.toLowerCase() }})
                                setSearchWords(e.target.value.toLowerCase())
                            }} />


                        {temp.flag && temp.filteredData && (


                            <div className='dataResults'>
                                {
                                    temp.filteredData.map((item, idx) =>

                                    (<div className="list-group" id={idx}
                                        key={`data${idx}`} >
                                        <Button type="button" className="list-group-item list-group-item-action" aria-current="true" onClick={addItems}>
                                            {item.dishName}
                                        </Button>
                                    </div>)
                                    )}
                            </div>
                        )}
                    </div>

                </div>}
                    {authrole=='basic' && <div className='counterInputs'>
                        <label>Chef Assinged</label>
                        <br />
                        <span>
                            <textarea type="text" rows='4' cols='100' width='300'name='chef' onChange={(e) => {
                                setTemp(prev => { return { ...prev, chef: e.target.value } })
                                // setSearchWords(e.target.value.toLowerCase())
                            }} value={temp.chef} className="input" id='count'></textarea>
                        </span>
                    </div>}
                {/* <Button onClick={handlerAdd}>Add Order</Button> */}
               {authrole=='admin'&& <Button onClick={()=>location.state ?  confirm(location.state.idx) : handlerAdd()}>{location.state ? 'Confirm Order' : 'Add Order'}</Button>}
                {authrole=='basic'&& location.state ?  <Button onClick={()=>confirm(location.state.idx)}>Submit</Button>:false}
               {authrole=='admin' && <SelectedMenu Menu={temp} Cross={memoCross} url={url} GuestCount={temp.guest} Reset={Reset} Edit={Edit} updateItem={updateItem}/>}
            </div> 
            <Outlet/>
        </>
    )
}



export default SearchBar
