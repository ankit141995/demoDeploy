import React from 'react';
import {Button, Table} from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const Ing = (res) => {
    let location = useLocation()
    console.log(location.state)
    
    const downloadPdf = () => {
        const doc = new jsPDF('p', 'px', 'a4')
        doc.text("All Ingredeints", 20, 10)
        doc.autoTable({ theme: 'grid', html: '.ingredients' })
        doc.save('Ingredeints.pdf')
        // console.log(orange)
    }
  
  return <div>

      <Button onClick={()=>{downloadPdf()}} style={{marginLeft:'500px', marginTop:'100px'}}>Get PDF</Button>
  <div style={{display: 'flex', justifyContent: 'center',margin:"100px"}}>
      <h1>All ingredients are here</h1>
      <Table striped bordered hover className='ingredients'>
         <thead>

          <tr>
              {/* <th></th> */}
              <th>
                  <td>Ingredients</td>
              </th>
              <th>
                  <td>Amount</td>
              </th>

          </tr>

         </thead>
          <tbody>

          {
              
              location.state && Object.keys(location.state.total).map((item, idx) => {
                  return (<tr>
                      {/* <th>{idx +1}</th> */}
                      <th>{idx +1+'  ' + item}</th>
                      <td>{location.state.total[item]}</td>
                  </tr>)
              })
              
            }
            </tbody>
      </Table>
  </div>;
            </div>
};

export default Ing;
