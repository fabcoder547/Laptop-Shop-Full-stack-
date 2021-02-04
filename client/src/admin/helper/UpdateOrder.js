import React,{useState,useEffect} from 'react'
import Base from '../../core/Base'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated } from '../../auth/helper'
import { API } from '../../backend'
import swal from 'sweetalert';

import dateFormat from "dateformat"

 const UpdateOrder=()=> {
    const {user,token}=isAuthenticated();
    const {orderId} =useParams()
   
    const [order,setOrder]=useState('');
    const [status,setStatus]=useState('');
    const preload=()=>{
        axios.get(`${API}/order/${orderId}/user/${user._id}`,{
             headers:{
            Authorization: `bearer ${token}`
          }
        })
        .then(res=>{
            setOrder(res.data)
            setStatus(res.data.status)
            
        })
        .catch(err=>{

            console.log(err)    
            swal({
            title: err.message,
            text: "Server Error",
            icon: "error",
             buttons: true,
               dangerMode: true,
          });
        })
    }

    


    useEffect(()=>{
        preload()
    },[])



    const handleChange=(e)=>{
        setStatus(e.target.value)
    }

    const handelSubmit=(e)=>{
       e.preventDefault();
       axios.put(`${API}/order/${orderId}/status/${user._id}`,{
           order:{
               orderId:orderId,
           },
           status:status,
       },{
          headers:{
            Authorization: `bearer ${token}`
          },
           
       })
       .then(res=>{
          
           swal({
            title: "Successfully updated!",
            text: "status is updated",
            icon: "success",
             buttons: true,
          });
       })
       .catch(err=>{
          
            swal({
            title: "Something went wrong",
            text: "status is updated",
            icon: "error",
             buttons: true,
               dangerMode: true,
          });
       })
    }
    const updateOrderPage=()=>{

        return (
            <div className="row">
                <div className="col-md-12 bg-dark py-1">
                <h2 className="mb-4 text-white">All products:</h2>
                <Link className="btn btn-info" to={`/admin/dashboard`}>
                   <span className="">Admin Home</span>
                </Link>
                 <div className="card text-white bg-dark border border-info ">
                 <div className="card-body">
                     <p className="bg-secondary font-weight-normal "><span className="text-white">Address Of Recipient:</span> {order.address}</p>
                     <p className="bg-secondary font-weight-normal"><span className="text-white">Ordered Date: </span> {dateFormat(order.updatedAt,"mmmm d, yyyy")}</p>
                     <h6 className="bg-dark font-weight-normal text-wrap">List of ordered laptops :Total {order.orders?order.orders.length:""} products</h6>
                     
                     
                     {order.orders?order.orders.map((product,index)=>{
                        return <div key={ index} className="card text-white bg-dark border border-danger">
                           <p className="font-weight-normaltext-wrap bg-success">Product Name: {product.name}</p>
                         <p  className="font-weight-normaltext-wrap bg-success">Product price: {product.price}</p>
                         </div>
                     }):"No Products"}
                     
                        <p className="text-white bg-dark">Status of Order</p>
                        <select className="form-control bg-dark text-white" value={status} onChange={handleChange}>
                        <option value="recieved">
                            Recieved
                        </option>
                        <option value="delivered">
                            delivered
                        </option>
                        <option value="shipped">
                            shipped
                        </option>
                        <option value="proocessing">
                            proocessing
                        </option>
                        <option value="cancelled">
                            cancelled
                        </option>
                    </select>
                    <button type="submit" onClick={handelSubmit} className="mt-2 btn btn-success">update status</button>
                  
                 </div>
                    
                 </div>   
                </div>
            </div>
        )

    }

    return (
        <Base title="Update Order status">
           {updateOrderPage()}
        </Base>
    )
}
export default UpdateOrder