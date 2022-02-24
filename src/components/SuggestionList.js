
import './SearchBar.css'

 const SuggestionList =(filteredData, addItems)=>{
    // const list = filteredData.map((item, idx) => {

    //                             return (<div className="list-group" id={idx}
    //                                 key={idx} >
    //                                 <button type="button" className="list-group-item list-group-item-action" aria-current="true" onClick={e=>addItems(e)}>
    //                                     {item.dishName}
    //                                 </button>
    //                             </div>)
    //                         }).slice(0, 6)
  
    return (
    // {searchWords.length >= 3 && (

                    <div className='dataResults'>
                        {/* {list} */}
                        {filteredData.map((item, idx) => {

                                return (<div className="list-group" id={idx}
                                 >
                                    <button type="button" className="list-group-item list-group-item-action" aria-current="true" onClick={e=>addItems(e)}>
                                        {item.dishName}
                                    </button>
                                </div>)
                            }).slice(0, 6)
                        }
                     </div>
                    )
                // )}

}

export default SuggestionList;