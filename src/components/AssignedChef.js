import react ,{useState, useCallback, useMemo, useEffect}from 'react'
import axios from "axios"
import {Spinner} from 'react-bootstrap'
import './Assignchef.css'

const AssignedChef =({orderNumber, setChef})=>{
    // console.log(typeof(setChef()))
    const [isAssigned,setIsAssigned] = useState(false)
    const [isLoading, setIsLoading]=useState(false)
    
    const cancelTokenSource = axios.CancelToken.source();
    
    
    let interval 

// Cancel request
let result
let i = 0
const ReadGS = async(orderNumber, setChef)=>{
    // for(let i =0 ; i=99; i++){
    // clearInterval(i)}
    // console.log('-------------------Time out For assignchef' , interval)
        setIsLoading(true)
        const res = await axios.post('/assignchef',{orderNumber, cancelToken: cancelTokenSource.token} ).then((res)=>{
        if(res.data[2]){
            setIsAssigned(true)
            setChef(res.data[1], res.data[2])
        }else{
            setChef(res.data[1], '')
            setIsAssigned(false)  
        }  
        result = res
        return res})
        // console.log(result.data[1])
        setIsLoading(false)
        return result
    }
    
    const memoRead = useCallback(ReadGS, [])
    // const interval = useMemo(()=>setInterval(()=>{
    //     cancelTokenSource.cancel();
    //     // console.log('hi this set interval', i++)
    //     ReadGS(orderNumber, setChef)
    // }, 30000000),[])
    useEffect(()=>{
       interval = setInterval(()=>{
        cancelTokenSource.cancel();
        // console.log('hi this set interval', i++)
        ReadGS(orderNumber, setChef)
    }, 60000)

    return ()=> clearInterval(interval)
    }, [])
    
    
    return (
        <div className='assignchef'>
           { isLoading?<Spinner animation="border" role="status"></Spinner>:<div>{isAssigned?'Cheff Assigned': 'Not Assigned'}</div>}
            <button className='checkchef' onClick={()=>ReadGS(orderNumber, setChef)}>Check Chef Assigned</button>
        </div>
    )
}

export default AssignedChef
