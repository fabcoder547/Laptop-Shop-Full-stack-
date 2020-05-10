import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    error: false,
    success: false,
  });
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          alert("error");
        } else {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (pid) => {
    deleteProduct(pid, token, user._id)
      .then((data) => {
        if (data == undefined) {
          return alert("data undefined");
        }
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          preload();
          setValues({ ...values, error: false, success: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ManageProductpage = () => {
    return (
      <div className="row">
        <div className="col-md-12 bg-dark py-1">
          <h2 className="mb-4 text-white">All products:</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
        </div>
        <div className="row  " style={{ width: "100%" }}>
          <div className="col-md-12 ">
            <h2 className="text-center text-dark my-3">
              Total {products.length} products
            </h2>

            {products.map((product, index) => {
              return (
                <div className="row text-center mb-2 py-1 px-2 bg-dark ">
                  <div className="col-4">
                    <h4 className="text-white text-left">{product.name}</h4>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onSubmit(product._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return <Base title="mange your products">{ManageProductpage()}</Base>;
};
export default ManageProducts;
