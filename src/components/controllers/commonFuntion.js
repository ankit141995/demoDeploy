import react ,{useState} from 'react'

// const [Menu, setMenu] = useState([])

export const addItems = (e,state1, state2, setState1, setState2, inputValue, setState3) => {
    let itemName = e.target.innerText
    // console.log('inner HTML is here' , e.target.innerText)
    if (!state2.includes(itemName)) {
        setState2 && setState2([...state2, itemName])
       setState1 && setState1(prev => { return { ...prev, menu: [...prev.menu, itemName], [inputValue]: '', flag: false } })
        // localStorage.setItem('OrderDetails', JSON.stringify(temp))
        setState3('')
    }
    else {
        alert('already selected')
        // return false
    }
    // console.log(e.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling)
    e.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling.focus()
}



export const Cross = (e, state1, state2, setState1, setState2) => {

        let itemName = e.target.parentNode.firstChild.innerText;
        let foodName = itemName.replace(/[0-9]/g, '').slice(1, itemName.length - 0)
        let indexofItem = state1.indexOf(foodName)

        // console.log(Menu, Menu.includes(`${foodName}`))
        // console.log(temp.menu.includes(foodName))
        if (state2.includes(foodName)) {
            state2.splice(indexofItem, 1)
           state1 && state1.splice(indexofItem, 1)
            // console.log('temp.menu is here ', temp.menu)
            // setState2 && setState2([...state1])
           setState1 && setState1(prev => { return { ...prev, menu: state1.menu } })
            // console.log(Menu)
            // console.log(`  ||  ${foodName} is present  ||`, 'at index ', indexofItem)

        }
        else {
            // console.log('value is not present', typeof (Menu[0]), `${foodName}`)
        }
    }

