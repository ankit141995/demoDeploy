import React from 'react'
import {useState}  from 'react'
import {Button} from 'react-bootstrap'
import {Outlet} from 'react-router-dom'
import {allStorage} from './storage'
import {ReadGoogleSheet} from './GoogleSheet'

const ChefAssign = () => {
    let allorders = allStorage()
    const [chefDetails, setChefDetails] = useState('')
    const [timeStamp, setTimeStamp] = useState('')
    const setVal=(e)=>{
        setChefDetails(e.target.value)
    }
    let a = 'saurav' || 'chauhan'
    console.log(a)
    
    const setTime =(e)=>{
        //2021-12-17
        const inputDate =  e.target.value
        const d = inputDate.slice(8)
        const m = inputDate.slice(5,7)
        const y = inputDate.slice(0,4)
        const outputdate = `${m.replace(/^0+/, '')}/${d.replace(/^0+/, '')}/${y}`

        setTimeStamp(outputdate)
    }
    
    return (<div>
<div>
        <input type='date'  onChange={(e)=>{setTime(e)}}/>
        <Button onClick={()=>{ReadGoogleSheet( timeStamp, null) }}>Get orders from Googlesheet</Button>
</div>
      {Object.values(allorders).map((item, idx)=>{
          console.log(item)
          return (<div>{JSON.stringify(item.order)}
      
        <textarea rows='4' cols='100' width='300' className='' onChange={e => setVal(e, idx)} name='address' placeholder='Your Anwer' value={chefDetails} ></textarea>
        <Button>ASSING CHEF TEAM</Button>
        <Outlet/>
        </div>)
    })
    }
    </div>
        )
}

export default ChefAssign