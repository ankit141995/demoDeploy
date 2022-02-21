import axios from "axios"
import React , {useState} from 'react'
import {allStorage} from './storage.js'

let sheetUrl = 'http://127.0.0.1:3030/result'
export const ReadGoogleSheet = async( timeStamp, setOrderArr,setIsLoading )=>{
    // const [sheetData, setSheetData] = useState({})
console.log(timeStamp)
if(timeStamp){

    setOrderArr && setOrderArr([])
    setIsLoading(true)
    const res = await axios.post(sheetUrl, { body:timeStamp}).then((res)=>{
        let keys = Object.keys(localStorage)
        if(keys.includes('Order')){
        }
        
        let i = keys.length;
        
        while ( i-- ) {
            if(keys[i].includes('Order')){
            localStorage.removeItem(keys[i])
        }
        console.log(res.data.values)
    }

        
       //map order from google sheet
        const orderlist = res.data.values
        orderlist.map((order, idx)=>{
            
             if(order[4]&&order[4].includes(timeStamp)){console.log('order from google sheet' , order)
            let json=  {}
            let orderno = order[2].replace(/[ ]+/g, "").replace(/\s/g, '$').trim()
           let key = `OrderNumber-${orderno}`;
           // let split = order[7].replace(/[0-9].\t/g , "").replace(/[0-9]./g , "").replace(/^\d+\. \s+/, '').trim().split('\n')
           let split = order[7].split('\n')
           
           //trim strings
           let  menu= split.map((item)=>{
               // let dishitem = item.replace(/[0-9].\t/g , "").replace(/^\d+\. \s+/, '').trim()
               let dishitem = item.replace(/^\d+\.\s*/, '').trim()
               console.log(dishitem)
               return dishitem
            })
            //order object
            json[key]={
                menu: menu,
                guestCount: order[6],
                order: orderno,
                date: order[4],
                chef:"",
                name: order[5],
                location:order[12],
                pickup: order[11],
                spec: order[8]
            }
                localStorage.setItem(key, JSON.stringify(json[key]))
                return order
            }
        })
        
    })
    setOrderArr && setOrderArr(allStorage())
setIsLoading(false)}
    else{
        alert('Please select a date')
    }

    
    
}


//"Dishes:\n1.        Enchiladas\n2.        Bruschetta\n3.        Hummus with Pita\n4.        Margarita pizza \n5.        Tex Mex Mexican Pizza – Non Veg\n6.        Spaghetti Bolognese – Chicken/Mutton\n7.        Pasta Creamy Sauce\n8.        Risotto Rice\n9.        Tiramisu Pudding"