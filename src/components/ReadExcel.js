// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'


// export const ReadExcel = () => {
//     const [result, setResult]=useState([])


//     const getData = async () => {

//         const results = await axios.get('http://127.0.0.1:3030/api')
//             .then((res) => {
//                     const data = [] 
//                     data.push(res.data)
//                 console.log(data)
//                 setResult(res.data)
//             })
//         // .catch(err => console.log(err))
//         console.log('result is here ', result )
//         return result
//     }

//     getData()

//     // console.log(result)
//     return (
//         <div>
         
//              {result
//           .map((item)=> {
//              return item.dishName
//         })}
         

//         </div>
//     )
// }


