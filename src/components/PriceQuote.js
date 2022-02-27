import React , {useState} from 'react'
import './pricequote2css.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const PriceQuote = () => {

    const [isVisible, setIsVisible] = useState(false)
const getValueInput=()=>{

    
    
    // document.getElementById("form").style.float="left";
    // document.getElementById("priceBox").style.display="block";
    fetch("https://u2nj22891e.execute-api.us-east-2.amazonaws.com/default/newfunction", {
         
        // Adding method type
        method: "POST",
        //mode:"no-cors",
         
        // Adding body or contents to send
        body: JSON.stringify({
           "indianStarter":parseInt(document.getElementById("indianstarter").value),
           "indianMainCourse":parseInt(document.getElementById("indianmaincourse").value),
           "indianMainDesert":parseInt(document.getElementById("indianmaindesert").value),
           "indianRice":parseInt(document.getElementById("indianrice").value),
           "indianSalad":parseInt(document.getElementById("Indiansalad").value),
            "bread":parseInt(document.getElementById("bread").value),
            "curd":parseInt(document.getElementById("curd").value),
            "papad":parseInt(document.getElementById("Papad").value),
            "continentalStarter":parseInt(document.getElementById("continentalstarter").value),
            "continentalMainCourse":parseInt(document.getElementById("continentalmaincourse").value),
            "continentalDesert":parseInt(document.getElementById("continentaldesert").value),
            "continentalRice":parseInt(document.getElementById("continentalrice").value),
            "continentalSalad":parseInt(document.getElementById("continentalsalad").value),
            "welcomeDrink":parseInt(document.getElementById("welcomedrink").value)
            }),
            
        // Adding headers to the request
       
    })

     
    // Converting to JSON
    .then(response => 
        response.clone().json()
    )
     
    // Displaying results to console
    .then(json => {
        console.log(json.body)
        if(json.body!=undefined){
        document.getElementById("addOn").innerHTML = json.body.AddOn;
        document.getElementById("description").innerHTML = json.body.Description;
        document.getElementById("basepackage").innerHTML = json.body.BasePackage;
        document.getElementById("netPrice").innerHTML = json.body.NetPrice;
        }
        else {
            setIsVisible(false)
            alert('No package found')
        }
        //console.log(json.body);
    })
    setIsVisible(true);
}
    const ClearFields=()=>{

        document.getElementById("indianstarter").value = "";
        document.getElementById("indianmaincourse").value = "";
        document.getElementById("indianmaindesert").value = "";
        document.getElementById("indianrice").value = "";
        document.getElementById("Indiansalad").value ="";
        document.getElementById("bread").value = "";
        document.getElementById("curd").value = "";
        document.getElementById("Papad").value = "";
        document.getElementById("pickle").value = "";
        document.getElementById("continentalstarter").value = "";
        document.getElementById("continentalmaincourse").value = "";
        document.getElementById("continentaldesert").value = "";
        document.getElementById("continentalrice").value = "";
        document.getElementById("continentalsalad").value = "";
        document.getElementById("welcomedrink").value = "";
        // document.getElementById("priceBox").style.display="none";
        // document.getElementById("form").style.float="none";
        setIsVisible(false)
    }






  return (
    <div><main className="mainprice">
  
    <table id="form" className='priceForm' cellspacing="15" cellpadding="3">
       <th>Price Quote</th>
        <tr>
            <td><label>Indian Starter</label></td>
            <td><input type="text" placeholder="indian starter" classname="form-control" id="indianstarter"/></td>
        </tr>
        <tr>
            <td><label>Indian Main Course</label></td>
            <td><input type="text" placeholder="indian main course" classname="form-control"
                id="indianmaincourse"/></td>
        </tr>
        <tr>
            <td> <label>Indian Main Desert</label></td>
            <td><input type="text" placeholder="indian main desert" classname="form-control"
                id="indianmaindesert"/></td>
        </tr>
        <tr>
            <td><label>Indian Rice</label></td>
            <td><input type="text" placeholder="Indian Rice" classname="form-control" id="indianrice"/></td>
        </tr>
        <tr>
            <td> <label>Indian Salad</label></td>
            <td><input type="text" placeholder="Indian Salad" classname="form-control" id="Indiansalad"/></td>
        </tr>
        <tr>
            <td><label>Bread</label></td>
            <td> <input type="text" placeholder="Bread" classname="form-control" id="bread"/></td>
        </tr>
        <tr>
            <td><label>Curd</label></td>
            <td><input type="text" placeholder="curd" classname="form-control" id="curd"/></td>
        </tr>
        <tr>
            <td><label>Papad</label></td>
            <td> <input type="text" placeholder="Papad" classname="form-control" id="Papad"/></td>
        </tr>
        <tr>
            <td><label>Pickle</label></td>
            <td> <input type="text" placeholder="Pickle" classname="form-control" id="pickle"/></td>
        </tr>
        <tr>
            <td> <label>Continental Starter</label></td>
            <td><input type="text" placeholder="continental starter" classname="form-control"
                id="continentalstarter"/></td>
        </tr>
        <tr>
            <td><label>Continental Main Course</label></td>
            <td><input type="text" placeholder="continental main course" classname="form-control"
                id="continentalmaincourse"/></td>
        </tr>
        <tr>
            <td> <label>Continental Desert</label></td>
            <td><input type="text" placeholder="continental desert" classname="form-control"
                id="continentaldesert"/></td>
        </tr>
        <tr>
            <td> <label>Continental Rice</label></td>
            <td> <input type="text" placeholder="continental rice" classname="form-control" id="continentalrice"/></td>
        </tr>
        <tr>
            <td> <label>Continental Salad</label></td>
            <td> <input type="text" placeholder="Continental Salad" classname="form-control"
                id="continentalsalad"/></td>
        </tr>
        <tr>
            <td><label>Welcome Drink</label></td>
            <td>  <input type="text" placeholder="Welcome Drink" classname="form-control" id="welcomedrink"/></td>
        </tr>
        <tr classname="button">
            <td>
                <button type="submit" classname="btn btn-danger" id="submit" onClick={()=>getValueInput()}>Price Quote</button>
            </td>
            <td> 
                <button type="reset" classname="btn btn-primary" value="clear" onClick={()=>ClearFields()}>Clear</button>
            </td>
        </tr>
    </table>

    
   {isVisible&& <table className="netprice" id="priceBox"  cellspacing="15" cellpadding="10">
        <tr>
            <td> <label>Add On :</label></td>
            <td> <p id="addOn"></p></td>
        </tr>
        <tr>
            <td> <label>Description :</label></td>
            <td><p id="description"></p></td>
        </tr>
        <tr>
            <td> <label>Base Package :</label></td>
            <td><p id="basepackage"></p></td>
        </tr>
        <tr>
            <td><label>Net Price :</label></td>
            <td><p id="netPrice"></p></td>
        </tr>
    </table>}
</main></div>
  )
}

export default PriceQuote