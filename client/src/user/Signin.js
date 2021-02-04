import React, { useState } from "react";
import Base from "../core/Base";
import {GoogleLogin} from "react-google-login"
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import { API } from "../backend";

const Signin = ({ history, location }) => {
  // console.log(nest);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    isRedirected: false,
    loading: false,
  });

  const { email, password, isRedirected, loading, error, success } = values;

  const handelChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const { user } = isAuthenticated();
  const onsubmit = (e) => {
    e.preventDefault();
    // TODO:set state here as well
    setValues({ ...values, isRedirected: false, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          alert("signin failed!try again");
          setValues({
            ...values,
            error: data.err,
            loading: false,
            success: false,
          });
        } else if (data.errors) {
          alert("signin failed!try again");
          setValues({
            ...values,
            error: data.errors.errors[0].msg,
            success: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            alert("Signedin successfully!");
            setValues({
              ...values,
              email: "",
              password: "",
              success: true,
              error: "",
              loading: false,
              isRedirected: true,
            });
          });
        }
      })
      .catch();
  };

  const Redirectuser = () => {
    if (isRedirected) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }

    if (isAuthenticated()) {
      
      return <Redirect to="/" />;
    }
  };
  const loadingMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-success"
            style={{
              display: loading ? "" : "none",
              width: "100%",
            }}
          >
            <p>Loading.....</p>
          </div>
        </div>
      </div>
    );
  };
  const errorMessege = () => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-md-12" style={{ width: "100%" }}>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none", width: "100%" }}
          >
            <p>{error} here</p>
          </div>
        </div>
      </div>
    );
  };











  const responseGoogle=(response)=>{
    console.log(response)
   axios.post(`${API}/googlelogin`,{idToken:response.tokenId})
   .then(res=>{


    // console.log(response)
      if(res.status==200&&res.data)
      {
        
       if(res.data.token)
       {
          authenticate(res.data, () => {
          
            setValues({...values,isRedirected:true})
          });
       }else{
         setValues({...values,error:"Signied Failed"})
       }

      }else{
         setValues({...values,error:"Signied Failed"})
      }


   })
   .catch(err=>{
    //  console.log(err.response.data)

      setValues({...values,error:err.response.data.error})
   })
  }


  const responseErrorGoogle=(err)=>{
    console.log(err)
  }





  const signinForm = () => {
    return (
      <div className="row">
        <form>
          <div className="row text-center">
            <div className="col-md-6 text-center" style={{ margin: "0 auto" }}>
            <GoogleLogin
            style={{width:"90%"}}
              render={renderProps => (
                  <button onClick={renderProps.onClick} className="form-control btn btn-danger mb-3" ><i className="fa text-white fa-google"></i> Signin With Google</button>
                )}
                clientId="973567937994-u306n61sqv26l9dvakftoq480senggqa.apps.googleusercontent.com"
                 buttonText="Signin with Google"
                 onSuccess={responseGoogle}
                  onFailure={responseErrorGoogle}
               cookiePolicy={'single_host_origin'}
              />
              <div className="form-group">
                <input
                  type="email"
                  onChange={handelChange("email")}
                  value={email}
                  placeholder="Enter an email"
                />
              </div>
              <div className="form-group mb-0">
                <input
                  onChange={handelChange("password")}
                  value={password}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <p><Link to="/users/forget/password" className="text-white">Forget Password?</Link></p>
              <button
                onClick={onsubmit}
                className="btn btn-outline-info form-control rounded btn-md signupbtn"
              >
                Signin
              </button>
              
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Base title="signin page" description="Welcome again!">
      {loadingMessege()}
      {errorMessege()}
      {signinForm()}
      {Redirectuser()}
    </Base>
  );
};

export default Signin;
