import react, { useState, useEffect } from 'react'
import axios from 'axios'
import './Sales.css'
import SelectedMenu from './SelectedMenu'
import TextArea from './TextArea'
// import {addItems} from './controllers/commonFuntion'
import { Button } from 'react-bootstrap'
import Logo from './GarnicheLOGO.png'



const SalesForm = () => {
    let url = '/api'
   const initialFormData = {
        advancePaid: "",
        agent: "",
        costumerName: "",
        date: "",
        dishes: "",
        addONs: {"Cooking utensils": false, "Serving platters": false, "Eating cutlery": false, "OVEN/OTG": false, "Others": false},
        email: "",
        guest: 0,
        location: "",
        order: "",
        orderslot:"",
        other: "",
        pickupTime: "",
        servingTime: "",
        totalBill: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    const [dishes, setDishes] = useState({
        menu: [],
        flag: false,
        filteredData: ''
    })
    const [searchWords, setSearchWords] = useState('')
    const [textData, setTextData] = useState({suggestions:[]})
    const [split, setSplit] =useState([])


    useEffect(() => {
        const sendValue = async (url) => {
            var res = await axios.get(url, { params: { input: searchWords } })
                .then((res) => {
                    setDishes(prev => {
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
            // console.log('temp inside the if part of useEffect', temp.menu)



        }

        else {
            setDishes((prev) => {
                return {
                    ...prev,
                    filteredData: '',
                    flag: false
                }
            }
            )

        }
        console.log(dishes)
    }, [searchWords])


    const setVal = (e) => {
        // console.log(e.target.name , e.target.checked)
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }



    const setAddONs = (e) => {
        if (e.target.checked) {
            console.log(e.target.checked)
            setFormData(prev => ({ ...prev, addONs: { ...prev.addONs, [e.target.name]: e.target.checked } }))
            
        }
        else if (!e.target.checked) {
            console.log(e.target.checked)
            setFormData(prev => ({ ...prev, addONs: {...prev.addONs, [e.target.name]: e.target.checked } }))

        }
    }
console.log(formData)
    const HandleSubmit = async (e) => {
        e.preventDefault()
        alert(
            'are you sure'
        )
        formData.dishes= dishes.menu
        //  setFormData((prev) => { return { ...prev, dishes: dishes.menu } })
        console.log('dishes.menu inside handle submint ' , dishes.menu)
        console.log(formData.dishes)
        console.log('Handlesubmit')
        const res = await axios.post('/form', { body: formData }).then(res => {
            console.log(res.data)
            // setDishes(prev => { return { ...prev, menu: res.data.data } })

            return res
        })
        // console.log('res is here ', res)
        setFormData(initialFormData)
    }
    // Cross(e,dishes.menu, dishes.menu, setDishes, setDishes )


    const Cross = (e) => {

        let itemName = e.target.parentNode.firstChild.innerText;
        let foodName = itemName.replace(/^[0-9]+/g, '').trim()
        let indexofItem = dishes.menu.indexOf(foodName)

        // console.log(Menu, Menu.includes(`${foodName}`))
        // console.log(temp.menu.includes(foodName))
        if (dishes.menu.includes(foodName)) {
            // Menu.splice(indexofItem, 1)
            dishes.menu.splice(indexofItem, 1)
            textData.suggestions && textData.suggestions.splice(indexofItem, 1)
            // console.log('temp.menu is here ', temp.menu)
            setDishes(prev => { return { ...prev, menu: dishes.menu } })
            // setMenu([...Menu])
            setTextData((prev)=>{return {...prev, suggestions:textData.suggestions}})

            setSearchWords('')
            setFormData((prev) => { return { ...prev, dishes: dishes.menu } })

        }
        else {
            console.log('value is not present', typeof (dishes.menu[0]), `${foodName}`)
        }
    }
    const updateItem = (e, idx) => {
        console.log('updateItem',)
        let itemName = e.target.innerText.trim()
        dishes.menu[idx] = itemName
        // if (!dishes.menu.includes(itemName)) {
            setDishes(prev => { return { ...prev, menu: dishes.menu } })
            setFormData((prev) => { return { ...prev, dishes: dishes.menu } })
        // }
    }


    const addItems = (e) => {
        let itemName = e.target.innerText
        if (!dishes.menu.includes(itemName)) {
            setDishes(prev => { return { ...prev, menu: [...prev.menu, itemName], searchWords: '', flag: false } })
            setTextData((prev)=>prev.suggestions && {...prev, suggestions:[...prev.suggestions, []]})
            // localStorage.setItem('OrderDetails', JSON.stringify(temp))
            setSearchWords('')
        }
        else {
            alert('already selected')
            // return false
        }
        console.log('dishes inside add items ', dishes.menu)
        setFormData((prev) => { return { ...prev, dishes: dishes.menu } })
        // console.log(e.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling)
        e.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling.focus()
    }
   
    const updateState = (data) => {
        // setTextData(data)
        setSplit(data.split)
        console.log('data suggestion in update state ' ,data.suggestions)
        setTextData((prev)=>{if(prev.suggestions){console.log(prev.suggestions, 'prev textData.suggestions is here')
            return {...prev, suggestions:[...prev.suggestions].concat(data.suggestions)}}
            else {console.log('data suggestions is here',data.suggestions)
                return {suggestions:data.suggestions}}
            
        })
        setDishes(prev => { return { ...prev, menu: [...prev.menu].concat(data.split) } })
   setFormData((prev) => { return { ...prev, dishes: dishes.menu } })
    }
// console.log('textData is here ' , textData)
    return (
        <div>
            <div className='logo'>
                <img src={Logo} width='800px' height='200px' />
            </div>
            <div className='form-div'>
                <form onSubmit={e => HandleSubmit(e)}>
                    <div className='form-card'>
                        <label>Email Address</label>
                        <input type='email' className='form-input' onChange={e => setVal(e)} name='email' placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-card'>
                        <label>Order Number</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='order' placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-card'>
                        <label>Sales Agent</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='agent' placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-card'>
                        <label>Order Date</label>
                        <input type='Date' className='form-input' onChange={e => setVal(e)} name='date' placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-card'>
                        <label>Costumer Name</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='costumerName' placeholder='Your Anwer'></input>
                    </div>

                    <div className='form-card'>
                        <label>Guest Count</label>
                        <input type='number' className='form-input' onChange={e => setVal(e)} name='guest' placeholder='Your Anwer'></input>
                    </div>
                    <div className='form-card'>
                        <label>Choices Of Dishes</label>
                        <input type='text' className='form-input' value={searchWords} onChange={e => setSearchWords(e.target.value)} name='dishes' placeholder='Your Anwer' ></input>
                        {dishes.flag && dishes.filteredData && (


                            // console.log('this is the flag', temp.flag, 'guest count is here ', temp.guest),
                            <div className='dataResults2'>
                                {
                                    dishes.filteredData.map((item, idx) =>

                                    (<div key={`list${idx}`}className="list-group" id={idx}
                                        key={idx} >
                                        <Button type="button" className="list-group-item list-group-item-action" aria-current="true"
                                            onClick={e => addItems(e, false, dishes.menu, setDishes, false, 'searchWords', setSearchWords)}>
                                            {item.dishName}
                                        </Button>
                                    </div>)
                                    )}
                            </div>)}
                        <SelectedMenu Menu={dishes}
                            Cross={Cross} updateItem={updateItem} suggestions={textData.suggestions}/>
                        <TextArea UpdateState={updateState} />
                    </div>
                    <div className='form-card'>
                        <label>Add Ons </label>
                        <div>
                            <input type="checkbox" id="addOn1" onChange={e => setAddONs(e)} name="Cooking utensils" />
                            <label hmtlFor="addOn1">Cooking utensils(in which team cooks)</label>
                        </div>

                        <div>
                            <input type="checkbox" id="addOn2" onChange={e => setAddONs(e)} name="Serving platters" />
                            <label htmlFor="addOn2">Serving platters(in which food is served)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="addOn3" onChange={e => setAddONs(e)} name="Eating cutlery" />
                            <label htmlFor="addOn3">Eating cutlery (in which guest eat)</label>
                        </div>
                        <div>
                            <input type="checkbox" id="addOn4" onChange={e => setAddONs(e)} name="OVEN/OTG" />
                            <label htmlFor="addOn4">OVEN/OTG</label>
                        </div>
                        <div>
                            <input type="checkbox" id="addOn5" onChange={e => setAddONs(e)} name="Others" />
                            <label htmlFor="addOn5">Others</label>
                            <input type='text' disabled={formData.addONs['Others']==true?false:true} className='form-input' onChange={e => setVal(e)} name='other' placeholder={formData.addONs['Others']==true?'Type here...':''} ></input>
                        </div>
                    </div>
                    <div className='form-card'>
                        <label>Order Slot</label>
                        <div>
                            <input type="radio" id="morning" onChange={e => setVal(e)} name="orderslot" value="Morning" />
                            <label htmlfor="Morning">Morning</label>
                        </div>

                        <div>
                            <input type="radio" id="afternoon" onChange={e => setVal(e)} name="orderslot" value="Afternoon" />
                            <label htmlfor="Afternoon">Afternoon</label>
                        </div>

                        <div>
                            <input type="radio" id="evening" onChange={e => setVal(e)} name="orderslot" value="Evening" />
                            <label htmlfor="Evening">Evenning</label>
                        </div>


                        {/* <input type='radion' placeholder='Your Anwer'></input> */}
                    </div>
                    <div className='form-card'>
                        <label>Serving Time</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='servingTime' placeholder='Your Anwer'></input>
                    </div>
                    <div className='form-card'>
                        <label>Pickup Time</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='pickupTime' placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-card'>
                        <label>Costumer Location</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='location' placeholder='Your Anwer'></input>
                    </div>
                    <div className='form-card'>
                        <label>Total Billing Amount</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='totalBill' placeholder='Your Anwer'></input>
                    </div>
                    <div className='form-card'>
                        <label>Advance Amount Received</label>
                        <input type='text' className='form-input' onChange={e => setVal(e)} name='advancePaid' placeholder='Your Anwer'></input>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SalesForm