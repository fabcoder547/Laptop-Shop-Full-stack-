import React,{useEffect,useState} from 'react'
import Base from '../core/Base'
import axios from 'axios'
import { isAuthenticated } from '../auth/helper'
import { API } from '../backend'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat"
const  UserOrders=()=> {

const [orders,setOrders]=useState([])
const {user,token}=isAuthenticated()

const getbackgroundColor=(status)=>{
        if(status==="recieved")return "info";
        if(status==="cancelled")return "danger";
        if(status==="proocessing")return "warning";
        if(status==="shipped")return "secondary";
        if(status==="delivered")return "success";
    }

    const preload=()=>{
        axios.get(`${API}/order/user/orders/${user._id}`,{
            headers:{
                  Authorization: `bearer ${token}`
            }
        })
        .then(res=>{
            setOrders(res.data)
            
        })
        .catch((err) => {
                console.log(err)
        })  
        
      
        
    }


    useEffect(()=>{
        preload()
    },[])



    
    const OrdersPage=()=>(
        <div className="row">
        <div className="col-md-12 bg-dark py-1">
          <h3 className="mb-4 text-white">Your past Orders</h3>
         
        </div>
        <div className="row  " style={{ width: "100%" }}>
          <div className="col-md-12 ">
            <h2 className="text-center text-dark my-3">
              Total {orders.length} Orders
            </h2>

            {orders&&orders.map((order, index) => {
              return (
                <div className="row text-center mb-2 py-1 px-2 bg-dark ">
                  <div className="row">
                <div className="  col-md-4 col-xs-12">
                    <ul className="list-unstyled">
                    
                        {order.orders&&order.orders.map((product,index)=>{
                            return <li className="text-white mt-1" key={index}>{product.name} <span className="ml-1 text-danger">Price:</span>{product.price}</li>
                        })}
                    </ul>
                  </div>

                  <div className="col-md-4 col-xs-12">
                      <p aria-disabled={true} className="text-white">
                        {dateFormat(order.updatedAt,"mmmm d, yyyy")}
                      </p>
                  </div>
                  <div className="col-md-4 col-xs-12">
                      <p aria-disabled={true} className={`text-white btn  bg-${getbackgroundColor(order.status)}`}>
                        {order.status}
                      </p>
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
        <Base title="Your orders">
            {OrdersPage()}
        </Base>
    )
}
export default UserOrders