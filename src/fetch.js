// import React, { createContext, useContext } from 'react'
// import { useEffect, useState } from 'react'
// import SearchBar from './components/SearchBar'
// import Data from './components/List.js'






// const DataContext = createContext()
// export const data=()=>{
//     return useContext(DataContext)
// }
 
let Url = "https://jsonplaceholder.typicode.com/users"
const Fetch = () => {
    // const Getapi = (Url) => {
    //     const Data = fetch(Url)
    //     .then((res) => res.json())
    //     .then((json) => {console.log(json)
    //         let Data = json
    //         setData(json)
    //         return Data
    //     })
    //     .catch(err => console.log(err))
    //     return Data;
    // }
    // const[data, setData]= useState([]);


    // useEffect(() => {
    //     Getapi(Url)
    //     setData([])
    // }, [])

    console.log(Data)

    return (
        <div>
            {/* <DataContext.Provider>  */}
                <SearchBar placeholder='Search Food items...' data={Data} />
                {/* {children}
            </DataContext.Provider> */}
        </div>
    )
}
export default Fetch
