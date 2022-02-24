import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import './PDF.css'
import {Outlet, useNavigate} from 'react-router-dom'




export const PDF = ({ disharr, orderlist, totalAmountArr }) => {
    let cell
 let navigate = useNavigate()
const [showTable, setShowTable] = useState(true)
 useEffect(() => {
       
    }, [])
    useEffect(() => {
       
    })

    //Generate Pdf
   

    const exportPdf2 = () => {
        html2canvas(document.querySelector("#pdf")).then(canvas => {
            let imgData = canvas.toDataURL('image/png');
            let imgWidth = 200;
            let pageHeight = 400;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let doc = new jsPDF('p', 'mm');
            let position = 10 // give some top padding to first page
            let imgheight = imgHeight 
            doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
     
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight - 40; // top padding for other pages
               
                doc.addPage();
                doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save('file.pdf');
            // window.open()
        })
    }


    
    let classTable
  
    const toggleTable = () => {
           setShowTable((prev)=>{return !prev})
    }
let options = {
    orientation: "landscape",
  unit: "px",
  format: [4, 2]
}


let res

const Getquantity = async () => {
        
         res = await axios.post('/api2', { menu: disharr, guestCount: totalAmountArr })
            .then((res) => {
                
                return res.data
            })
        
            navigate('ing', {state:res})
            return res
        }
    // console.log(res)

    return (<div className="main">
        <div className='pdf-btn'>
        <Button className='orderlistbtn' onClick={Getquantity}>Get Ingredients</Button>
        {/* <Button onClick={exportPdf2}>Show Master pdf</Button> */}
        <Button className='orderlistbtn'onClick={toggleTable}>Show Table</Button>
        {/* <Button onClick={exportPdf2}>Print</Button> */}
          </div>
        <div className='pdf' id='pdf' style={showTable?{display:'none'}:{display:'flex'}}>
            {/* <h1> All Order List</h1> */}
            <Table striped bordered hover className='Table' id="Table">
                <thead>
                    <tr>
                        <th></th>
                        {orderlist && orderlist.map((val, idx) =>
                            <th key={`tr${idx}`}>Order {val['order']}</th>)}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>

                    {disharr && disharr.map((val, idx) => {
                        // console.log(val)
                        return (
                            <tr >
                                <th>{idx + 1} {val.title}</th>
                                {orderlist && orderlist.map((item) => {
                                    // if (item[val.title])
                                    // console.log(item[val.title])
                                    cell = val.title;
                                    return <td >{item[val.title]}</td>;
                                })}
                                <td>{totalAmountArr[cell]}</td>
                            </tr>
                        );
                    })}




                    {/* ))} */}
                </tbody>
            </Table>

            {/* <Outlet/>         */}

        </div >
        
        {/* <Button onClick={exportPdf2}>Download PDF</Button> */}
        {/* <Pdf targetRef={ref1} filename='target.pdf'>
            {({toPdf})=>{return <button onClick={toPdf}>print with toPdf</button>}}
            </Pdf> */}
    </div>
    )
}

export default PDF
