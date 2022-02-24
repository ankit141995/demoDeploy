import react, {useState} from 'react'
import Logo from './GarnicheLOGO.png'
import {Button} from "react-bootstrap"
import './createForm.css'


export const CreateUser = () => {
    const [formData, setFormData] = useState({})
    const setVal = (e) => {
        // console.log(e.target.name , e.target.checked)
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const HandleSubmit =()=>{
        localStorage.setItem(`${formData.employid}`, JSON.stringify(formData))
        setFormData(prev=>{return {}})
    }

    
    // console.log(formData)
    return <>
    <div>
        <div className='logo'>
        <img src={Logo} width='800px' height='200px' alt=''/>
        </div>
         <div >
                <form className='createuserform' onSubmit={e => HandleSubmit(e)}>
                    <div className='detail1'>
                    <div className='form-field'>
                        <label>Name</label>
                        <input type='email' className='' onChange={e => setVal(e)} name='name' placeholder='Your Anwer' value={formData.name} ></input>
                    </div>
                    <div className='form-field'>
                        <label>Email</label>
                        <input type='text' className='' onChange={e => setVal(e)} name='email' placeholder='Your Anwer' value={formData.email} ></input>
                    </div>
                    <div className='form-field'>
                        <label>Address</label>
                        <textarea rows='4' cols='100' width='300' className='' onChange={e => setVal(e)} name='address' placeholder='Your Anwer' value={formData.address} ></textarea>
                    </div>
                    <div className='form-field'>
                        <label>Employee Id</label>
                        <input type='number' className='' onChange={e => setVal(e)} name='employid' value={formData.employid} placeholder='Your Anwer' ></input>
                    </div>
                    <div className='form-field'>
                        <label>PassWord</label>
                        <input type='number' className='' onChange={e => setVal(e)} name='password' placeholder='Your Anwer' value={formData.password} ></input>
                    </div>
                     </div>
                    
                    <div className='detail1'>
                    <div className='form-field'>
                        <label>PassWord</label>
                        <input type='number' className='' onChange={e => setVal(e)} name='cpassword' placeholder='Your Anwer' value={formData.cpassword} ></input>
                </div>
                        <div className='form-field'>
                            <label htmlFor="role">Choose a Role</label>
                            <select name="role" id="authorid" onChange={e=>setVal(e)} value={formData.role}>
                                <option value="---">---</option>
                                <option value="admin">Administrator</option>
                                <option value="sales">Sales</option>
                                <option value="developer">Developer</option>
                                {/* <option value="audi">Audi</option> */}
                            </select>
                        </div>
                    <Button onClick={e=>HandleSubmit(e)}>Create User</Button>
                    </div>
                    

                   </form>
    </div>
    </div>
    
    </>
}