import React from 'react'
import './hoverCss.css'
import {Button} from 'react-bootstrap'



const HoverSuggestions = ({cName, idx, handleLeave, suggestions, updateItem}) => {
// console.log('here is suggestions for hover component' ,suggestions, idx)
// let flag = false

    return (<>{suggestions[0] &&
            <div id={`div_hover${idx}`} className='s_box' style={{display:'none'}} onMouseLeave={(e)=>{handleLeave(e, idx)}}>
            <h5>Did you mean?</h5>
            {suggestions.map((suggest)=>{
            //    console.log(suggest, 'suggest is here')
                return <p1 onClick={(e)=>{updateItem(e,idx)}}>{suggest}</p1>
            }).splice(0,2)}
        </div>}
    </>
    )

}

export default HoverSuggestions
