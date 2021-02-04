import React ,{useState,useEffect}from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import axios from 'axios'
import { API } from '../backend'
import dateFormat  from "dateformat"
import {Link} from "react-router-dom"

const  Orders=()=> {

    const [orders,setOrders]=useState([]);    
   const {user,token}=isAuthenticated();

    const getbackgroundColor=(status)=>{
        if(status==="recieved")return "info";
        if(status==="cancelled")return "danger";
        if(status==="proocessing")return "warning";
        if(status==="shipped")return "secondary";
        if(status==="delivered")return "success";
    }



   const preload=()=>{
    axios.get(`${API}/order/all/${user._id}`,{
        headers:{
            Authorization: `bearer ${token}`
        }
    })
    .then(res=>{
        setOrders(res.data)
        
    })
    .catch((err)=>{
        console.log(err.response)
    })

   }



   useEffect(()=>{

        preload();
   },[])
 


    const OrdersPage=()=>(
        <div className="row">
        <div className="col-md-12 bg-dark py-1">
          <h2 className="mb-4 text-white">All Orders:</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </div>
        <div className="row  " style={{ width: "100%" }}>
          <div className="col-md-12 ">
            <h2 className="text-center text-dark my-3">
              Total {orders.length} Orders
            </h2>

            {orders.map((order, index) => {
              return (
                <div className="row text-center mb-2 py-1 px-2 bg-dark ">
                  <div className="row">
                      <div className="  col-md-4 col-xs-12">
                    <h6 className="text-white ">{order.user?order.user.email:"No Email"}</h6>
                  </div>
                  <div className="col-md-4 col-xs-12">
                      <p aria-disabled={true} className={`text-white btn  bg-${getbackgroundColor(order.status)}`}>
                        {order.status}
                      </p>
                  </div>
                  <div className=" col-md-4 col-xs-12">
                    <Link
                      className="btn btn-success text-decoration-none"
                      to={`/admin/order/update/${order._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  </div>
                 
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
    return (
        <Base title="Manage Your Orders ">{OrdersPage()}</Base>
    )
}
export default Orders