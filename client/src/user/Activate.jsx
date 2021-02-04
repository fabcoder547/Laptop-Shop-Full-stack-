import axios from 'axios'
import React,{useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { API } from "../backend";
import swal from "sweetalert"
import Base from '../core/Base';

 const Activate=()=> {


   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
    

    const {token}=useParams()


    const onSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${API}/activate/user`,{token})
        .then(res=>{
          
            
                swal({
                title: "Registerd Successfully!",
                text: `Now You Can ${<Link to="/signin">Login</Link>}`,
                icon: "success",
                buttons: true,
                dangerMode: false,
                })
            
        })
        .catch((err) => {
            // console.log(err.response)
            swal({
            title: "Pleaser try again!",
            text: `${err.response.data.err}!`,
            icon: "error",
            buttons: true,
            dangerMode: true,
            })  
          
        })

    }


    return (
     <Base title="Activate Your Account" description="Click on a button to verify email address!">
            <div>
          
            {success}
            {error}
            <button style={{width:'80%'}} type="submit" onClick={onSubmit} className=" w-60 btn btn-success ">Verify Email </button>
        </div>
     </Base>
    )
}
export default Activate