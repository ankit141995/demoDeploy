import react, { useState, useEffect, useRef, useCallback } from "react";
import { Accordion, Button, Table, Spinner } from 'react-bootstrap'
import { getWithExpiry, allStorage } from "./storage";
import './orderlist.css'
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import axios from "axios";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { PDF } from './PDF'
import html2canvas from 'html2canvas';
// import ReactToPrint, { useReactToPrint } from 'react-to-print';
// import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import { ReadGoogleSheet } from './GoogleSheet.js'
import jwt from 'jsonwebtoken'
import AuthConsumer from './controllers/auth'
import AssignedChef from './AssignedChef'



let arr = []
let json = {};
// let order
let url = 'http://127.0.0.1:3030/gen'



let OrderDetails = JSON.parse(localStorage.getItem('OrderDetails'))
let orderNumber
const OrderList = ({ Reset, Edit, TO }) => {
    const authed = AuthConsumer()
    let authrole = authed.user.result.role
    const [timeStamp, setTimeStamp] = useState('')
    const [isLoading, setIsLoading]=useState(false)
    let location = useLocation()
    // console.log('location in orderlist ', location)
    const [orderArr, setOrderArr] = useState(allStorage())

    const [role, setRole] = useState('')
    const [tempRole, setTempRole] = useState('')


    const populateRole = async () => {
        const req = await axios.get('http://127.0.0.1:3030/login', {

            headers: {
                'x-access-token': getWithExpiry('auth'),
            },
        }).then(res => {
            console.log('response of x-access-token', res)
            if (res.statusText === 'OK') {
                setRole(res)
            } else {
                alert('error')
            }
        })


        // console.log('populate', req)
    }
    // console.log(role)
    useEffect(() => {
        orderNumber = allStorage();
        // console.log('orderlist mounted')

        if (location.state == null) {

            // console.log('seachBar mounted')
            // console.log('hello from orderlist when you clicked order if')

            const token = getWithExpiry('auth')
            console.log(token)
            if (!token == []) {
                const user = jwt.decode(token)
                console.log('user in search bar       l  l   l ', user)
                if (!user) {
                    console.log('user is false')
                    // localStorage.removeItem('auth')
                    // navigate('/login')
                } else if (user) {
                    populateRole()
                }
            }
            return false
        } else {
            console.log('seachBar mounted')
            console.log('hello from orderlist when you clicked order else ')
            const token = getWithExpiry('auth')
            console.log(token)
            if (!token == []) {
                const user = jwt.decode(token)
                console.log('user in search bar       l  l   l ', user)
                if (!user) {
                    console.log('user is false')
                    // localStorage.removeItem('auth')
                    // navigate('/login')
                } else if (user) {
                    populateRole()
                }
            }
            return confirm(location.state.temp, location.state.idx)
        }
        //  setOrderArr(orderNumber)
    }, [])
    useEffect(() => {
        orderNumber = allStorage();
        //  setOrderArr(orderNumber)
        // console.log('hi updated orderlist')
        // console.log('hello from orderlist when you clicked order if')

    }, [timeStamp])





    // console.log('orderNumber is here ', orderNumber)
    // console.log(OrderDetails)

    let navigate = useNavigate();
    // console.log('order list component started ')
    const [orders, setOrders] = useState([]);
    // const [num, setNum] = useState(orderNumber.length !== 0 ? orderNumber.length + 1 : 1);
    const [isToggle, setIsToggle] = useState({
        edit: false,
        onum: null,
        selected: false
    })

   const [AssingedChef, setAssignedChef]=useState(false)


    useEffect(() => {
        // setWithExpiry(order, orderArr, orderNumber, 86400000)
        // console.log('orderArr inside useEffect', orderArr)
        setOrders(json)
    }, [])
    // console.log(orderArr.length)
    // TO(orderArr.length);

    const handlerAdd = (e, idx) => {
        e.preventDefault()

        // if (OrderDetails.menu.length !== 0 && OrderDetails.guest !== 0 && OrderDetails.order!=='') {

        // setNum((prev) => (prev += 1));


        let key;
        key = `OrderNumber-${OrderDetails.order}`;

        json[key] = {
            menu: OrderDetails.menu,
            guestCount: OrderDetails.guest,
            order: OrderDetails.order
        };
        orderNumber.push(json[key]);
        setOrders(json)
        localStorage.setItem(key, JSON.stringify(json[key]))
        setOrderArr(orderNumber)
        Reset()
        console.log("json is here ", json[key], idx);
        // }
        // else {
        //     alert("please fill all the fields ")
        // }
    };

    // console.log('order arr is here ', orderArr)
    let i
    const handlerDel = (e, idx, onum) => {
        e.preventDefault()

        if (isToggle.edit == false) {
            let key;
            key = `OrderNumber-${onum}`;


            delete json[key]

            orderNumber.splice(idx, 1)

            setOrderArr(orderNumber)
            console.log(e.target.className.includes(idx))
            setIsToggle((prev) => { return { ...prev, edit: false } })
            localStorage.removeItem(key)

            console.log("json is here ", json);

        } else {

            if (e.target.className.includes(idx)) {

                let key;
                key = `OrderNumber-${onum}`;
                console.log(e.target.className, idx)
                delete json[key]

                orderNumber.splice(idx, 1)

                setOrderArr(orderNumber)
                setIsToggle((prev) => { return { ...prev, edit: false } }
                )
                localStorage.removeItem(key)
                console.log("json is here ", json);
            } else {
                alert('wrong delete')
            }
            return false
        }

    }
    let order = useParams()

    const handlerEdit = (e, idx, o) => {
        orderNumber = allStorage()
        // e.target.parentNode.parentNode.firstChild.firstElementChild.className = `btn btn-danger ${idx}`
        let orderNO = e.target.parentNode.parentNode.parentNode.firstChild.innerText
        console.log('handle edit  ', idx, orderNumber)
        navigate(`edit/${o}`, {
            state: {

                menu: orderNumber[idx].menu,
                guestCount: orderNumber[idx].guestCount,
                order: orderNumber[idx].order,
                date: orderNumber[idx].date,
                chef: orderNumber[idx].chef,
                location: orderNumber[idx].location,
                serve: orderNumber[idx].serve,
                pickup: orderNumber[idx].pickup,
                name: orderNumber[idx].name,
                spec: orderNumber[idx].spec,



                idx: idx
            }
        })
        e.target.className = `btn btn-success ${idx}`
        e.target.innerText = 'Confirm Order'
        console.log(e.target.parentNode.parentNode.parentNode.firstChild.innerText)
        if (e.target.className.includes(idx)) {

            // Edit(orderNumber[idx].menu, orderNumber[idx].guestCount, orderNumber[idx].order)
            setIsToggle((prev) => { return { edit: true, onum: idx } })
        }


    }
    const confirm = (temp, idx) => {
        console.log('confirm working fine')

        console.log(temp, idx)
        let key;
        key = `OrderNumber-${temp.order}`;
        json[key] = {
            menu: temp.menu,
            guestCount: temp.guest,
            order: temp.order,

            date: temp.date,
            chef: temp.chef,
            location: temp.location,
            serve: temp.serve,
            pickup: temp.pickup,
            name: temp.name,
            spec: temp.spec,
        };
        orderNumber[idx] = json[key]
        setIsToggle((prev) => { return { edit: false, onum: null } })

        setOrderArr(orderNumber)
        localStorage.setItem(key, JSON.stringify(json[key]))

    }
    // console.log('location in ordelist', location.state)
    // console.log(orderNumber)
    const AddAnother = () => {
        // localStorage.getItem('auth') ? navigate('/') : navigate('/login')
        navigate('/pdfgenerator')
    }

    const GenPDF = async () => {
        const response = await axios.post(url, {
            orders: orderArr
        }).then(res => console.log(res.data))
    }


    let dishes = []
    console.log('orderARR is here ', orderArr)





    let rin = []
    let dishh
    let totalRow = []
    let TotalAmount = {}

    let amount

    let res1 = orderArr.map((order) => {
       let oNum
        // if(order)return oNum = order.order
        oNum = order.order
        amount = {}

        order.menu && order.menu.forEach((dish) => {
            let key = dish
            amount[key] = order.guestCount
        })
        amount['order'] = oNum
        dishes.push(amount)
        totalRow.push(amount)
    })


    let totalAmountArr
    let res3 = orderArr.map((order) => {
        totalAmountArr = []
        order.menu && order.menu.forEach((dish) => {
            let key = dish
            if (TotalAmount[key]) {
                TotalAmount[key] += parseInt(order.guestCount); //(5)
            } else {
                TotalAmount[key] = parseInt(order.guestCount);
            }
        });
        totalAmountArr.push(TotalAmount);
    });




    let disharr
    let temp = []
    let title = 'title'
    let key
    disharr = []
    let wine = []
    totalRow.forEach((num, idx) => {


        wine.push(num)

        return wine
    })


    let res2 = orderArr.map((order, idx) => {
        order.menu && order.menu.forEach((dish) => {
            dishh = {}
            key = dish
            dishh[title] = key
            if (!temp.includes(key)) {
                temp.push(key)
                disharr.push(dishh)
            }
        })
    })

    totalRow.push(TotalAmount)




    const downloadPdf = () => {
        const doc = new jsPDF('l', 'px', [900, 500])
        doc.text("All Orders Details", 20, 10)
        doc.autoTable({ theme: 'grid', html: '#Table' })
        doc.save('table.pdf')
        // console.log(orange)
    }


    const setTime = (e) => {
        //2021-12-17
        const inputDate = e.target.value
        const d = inputDate.slice(8)
        const m = inputDate.slice(5, 7)
        const y = inputDate.slice(0, 4)
        const outputdate = `${m.replace(/^0+/, '')}/${d.replace(/^0+/, '')}/${y}`

        setTimeStamp(outputdate)
    }
    let imgData1
    let pdf1
    const sepPDF = (o, idx) => {
        var str = o;
        // var replaced = str.split(' ').join('');      
        var replaced = str.replace(/\s/g, "-").toString().trim();
        let onew = o.replace(/ /g, '').trim().toString()
        console.log(`hello${replaced}whatsup`)
        html2canvas(document.querySelector(`#can${o}`)).then((canvas) => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            imgData1 = canvas.toDataURL('image/png');
            pdf1 = new jsPDF();
            pdf1.addImage(imgData1, 'PNG', 20, 20, 190, 0)

            // pdf.print()


            pdf1.save(`${replaced}.pdf`)
        })


        //  const doc = new jsPDF('p', 'px', 'a4')
        //         doc.text("All Orders Details", 20, 10)
        //         doc.autoTable({ theme: 'grid', html: `.table${idx}` })
        //         doc.save(`${replaced}.pdf`)


    }

    const setChef = (order, chef)=>{
       let newOrderArr = orderArr.map((basket)=>{
            if(basket.order==order){
                console.log(basket.order)
                basket.chef=chef
                return basket
            }
            else return basket
        })
        console.log(newOrderArr)
        setOrderArr(newOrderArr)
    }

    return <div className='mainOrderlist'>

        {/* <Button variant='success' className='Add-btn' onClick={handlerAdd}>Add Order</Button> */}
        <div class="Orderlist" id="accordionExample">
            <h1>Order list</h1>
                <div className='orderdatebtn'>
                    <input type='date' onChange={(e) => { setTime(e) }} className='dateinput'/>
                    <Button onClick={() => { ReadGoogleSheet(timeStamp, setOrderArr, setIsLoading) }}>Get orders from Googlesheet</Button>
                </div>
            <div className='orderlistcomponent'>
                {orderArr && isLoading ? <div className='spinner'><Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner><h1>Loading...</h1></div> : orderArr.map((order, idx) => {


                    // console.log('idx ', orderArr.map(item => item))

                    return <div key={idx}>

                        <Accordion defaultActiveKey="0" >
                            <Accordion.Item eventKey="1">
                                {idx + 1}
                                <Accordion.Header >
                                    <div className='accHeader' style={!order.chef?{"background-color":"white"}:{"background-color":"rgb(64, 219, 142)"}}>
                                        <p className='Porder'> Order No. :<b>{JSON.stringify(order.order)}</b>   </p> <p>   Guest Name : {order.name}</p>
                                        <div className='btn-div'>
                                            <div>
                                                {(authrole == 'admin') && <Button variant='danger' onClick={(e) => { handlerDel(e, idx, order.order) }}>Delete order</Button>}
                                            </div>
                                            <div>
                                                {(authrole == 'admin') && <Button onClick={(e) => { isToggle.edit == false ? handlerEdit(e, idx, order.order) : confirm(e, idx) }}>{true ? "Edit order" : "Confirm"}</Button>}
                                                {(authrole == 'basic') && ((!order.chef) ? <Button onClick={(e) => { handlerEdit(e, idx, order.order) }}>Assing Chef</Button> : <Button variant='success' onClick={(e) => { handlerEdit(e, idx, order.order) }}>Edit Assigned Chef</Button>)}
                                            </div>
                                        </div>

                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className='accbody'>
                                    {authrole == 'admin' && <Button onClick={() => { sepPDF(order.order, idx) }}>Gen pdf</Button>}
                                    {/* <Button onClick={()=>{sepPDF(order.order.toString(), idx)}}>Gen pdf</Button> */}
                                    {(authrole == 'admin') &&
                                        <div id={'can' + order.order}>
                                            <table className='table1'>
                                                <tr>
                                                    <th>Order Date</th>
                                                    <td>{order.date}</td>
                                                </tr>
                                                <tr>
                                                    <th>Order Number</th>
                                                    <td>{order.order}</td>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{order.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Guest Count</th>
                                                    <td>{order.guestCount}</td>
                                                </tr>
                                                <tr>
                                                    <th>Serving Location</th>
                                                    <td>{order.location}</td>
                                                </tr>

                                            </table>
                                            <h5 className="dish">Selected Dishes</h5>
                                            <div className='menulist' key={idx}>
                                                {order.menu && order.menu.map((item, idx) => {
                                                    return (
                                                        <p1 className='dishNamee' key={idx}>{idx + 1 + ' ' + item}</p1>
                                                    )
                                                })}

                                            </div>
                                            {/* <tr>
                                                <th>Add Ons</th>
                                                <td>{order.spec}</td>
                                            </tr> */}
                                            <tr>
                                                <th>Specifications</th>
                                                <td>{order.spec}</td>
                                            </tr>
                                            <tr>
                                                <th>Pick Up Time</th>
                                                <td>{order.pickup}</td>
                                            </tr>
                                            <tr>
                                                <th>Chef Assinged</th>
                                                <td>{order.chef}</td>
                                            </tr>
                                            {/* <tr>
                                                <th>Chef Assinged</th>
                                                <td>{order.chef}</td>
                                            </tr> */}

                                        </div>
                                    }
                                    {authrole == 'basic' &&
                                        <h4>{order.chef}</h4>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <AssignedChef orderNumber={order.order} setChef={setChef}/>


                    </div>
                })}
            </div>
            <div className='add-order'>
                {authrole == 'admin' && <Button className='orderlistbtn'onClick={AddAnother}>Add Another Order</Button>}
                {authrole == 'admin' && <Button className='orderlistbtn'onClick={downloadPdf}>Generate Master Pdf</Button>}
            </div>

            {/* {orderArr.length} */}
        </div>

        {/* <div> */}
        {/* </div> */}
        <Outlet />
        <div>


            {authrole == 'admin' && <PDF disharr={disharr} orderlist={dishes} totalAmountArr={TotalAmount} />}
        </div>

        {/* <Button onClick={() => { ReadGoogleSheet(urlforGoogleSheet) }}>Get google sheet</Button> */}

    </div >

};

export default OrderList;
