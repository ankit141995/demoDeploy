import React from 'react'
import axios from 'axios'

let url = 'http://127.0.0.1:3030/textarea'
const TextArea = ({UpdateState}) => {
   
    
const SubmitText= async (e)=>{
        e.preventDefault();
    // console.log('Hi submit clicked')
    // console.log(e.target.parentNode.firstElementChild)
    let val =e.target.parentNode.firstElementChild.value
    let res= await axios.post(url, {body:val}).then((res)=>{
        console.log(res.data)
        UpdateState(res.data)
        return res})
      
}
return (
        <div>
            <textarea rows="10" cols="50" name="comment"></textarea>
            <button type='button' onClick={e=>SubmitText(e)}>Get Dishes</button>
        </div>
    )
}

export default TextArea
