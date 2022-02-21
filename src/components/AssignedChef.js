import react ,{useState}from 'react'
import axios from "axios"


const AssignedChef =({orderNumber, setChef})=>{
    // console.log(typeof(setChef()))
    const [isAssigned,setIsAssigned] = useState(false)
    
    let result
    const ReadGS = async(orderNumber, setChef)=>{
        const res = await axios.post('http://127.0.0.1:3030/assignchef',{orderNumber} ).then((res)=>{
        if(res.data[2]){
            setIsAssigned(true)
            setChef(res.data[1], res.data[2])
        }else{
            setChef(res.data[1], '')
            setIsAssigned(false)  
        }  
        result = res
        return res})
        console.log(result.data[1])
        return result
    }
    let i = 0
    setInterval(()=>{
        console.log('-------------------Time out For assignchef' , i++)
        ReadGS(orderNumber, setChef)
            }, 6000000)

    return (
        <div>
            <div>{isAssigned?'Cheff Assigned': 'Not Assigned'}</div>
            <button onClick={()=>ReadGS(orderNumber, setChef)}>Check Chef Assigned</button>
        </div>
    )
}

export default AssignedChef
