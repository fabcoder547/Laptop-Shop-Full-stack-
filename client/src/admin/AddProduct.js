import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllBrands, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import swal from "sweetalert"
const AddProduct = () => {

  const [productPic,setProductPic]=useState("https://www.sackettwaconia.com/wp-content/uploads/default-profile.png")
  const [values, setValues] = useState({
    name: "",
    processor: "",
    ram: "",
    rom: "",
    display: "",
    price: "",
    stock: "",
    photo: "",
    allbrands: [],
    brand: "",
    error: false,
    createdProduct: "",
    loading: false,
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    display,
    price,
    stock,
    processor,
    ram,
    rom,
    brand,
    allbrands,
    photo,
    createdProduct,
    getRedirect,
    loading,
    formData,
    error,
  } = values;

  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllBrands()
      .then((data) => {
        if (data == undefined) {
          setValues({ ...values, error: "product is not Created" });
        } else if (data.error) {
          alert("error plese retry");
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            allbrands: data.brands,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    createProduct(formData, token, user._id)
      .then((data) => {
        if (data == undefined) {
          setValues({ ...values, error: "Not able to create product" });
          swal({
  title: "Something went wrong",
  text: "Not able to create product",
  icon: "error",
  buttons: true,
  dangerMode: true,
})
        } else if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            createdProduct: false,
          });

           swal({
           title: "Something went wrong",
           text: data.error,
           icon: "error",
           buttons: true,
            dangerMode: true,
})
        } else {
          
          swal({
            title: "Successfully Added",
             text: "You will have one more product",
            icon: "success",
            buttons:true,
});
          setValues({
            ...values,
            name: "",
            price: "",
            ram: "",
            rom: "",
            brand: "",
            processor: "",
            error: false,
            createdProduct: true,
            stock: "",
            display: "",
            loading: false,

            photo: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const successMessage = () => {
  //   return (
  //     <div className="badge badge-success" style={{ width: "100%" }}>
  //       <p className="text-white">product added successfully</p>
  //     </div>
  //   );
  // };

  // const errorMessage = () => {
  //   return (
  //     <div className="badge badge-danger" style={{ width: "100%" }}>
  //       <p className="text-white">{error}</p>
  //     </div>
  //   );
  // };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value;
    // const value = name === "photo" ? e.target.files[0] : e.target.value;
    if(name==="photo")
    {
      setProductPic(URL.createObjectURL(e.target.files[0]));
      value=e.target.files[0];
    }
    else{
      value=e.target.value
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const createProductForm = () => (
    <form>
      <div className="row">
            <div className="col-md-12">
        <img
            className="img-fluid rounded"
            src={productPic}
            width="250px"
            height="220px"
          />
          <div className="form-group">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </div>
          
      </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("display")}
              name="photo"
              className="form-control"
              placeholder="display"
              value={display}
            />
          </div>
            <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <select
              onChange={handleChange("brand")}
              className="form-control"
              placeholder="Brand"
            >
              <option>Select</option>
              {allbrands &&
                allbrands.map((sbrand, index) => (
                  <option value={sbrand._id} key={index}>
                    {sbrand.name}
                  </option>
                ))}
            </select>
          </div>
        
          <div className="form-group">
            <input
              onChange={handleChange("processor")}
              className="form-control"
              placeholder="Enter processor (intel I5)"
              value={processor}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("ram")}
              type="number"
              className="form-control"
              placeholder="Enter ram (e.g:4 (gb))"
              value={ram}
            />
          </div>

          <div className="form-group">
            <input
              onChange={handleChange("rom")}
              type="number"
              className="form-control"
              placeholder="Enter rom  (e.g:16 (gb))"
              value={rom}
            />
          </div>

          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-success mb-3"
          >
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
  return (
    <Base title="Add Product" description="Add a product for sell!">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded" style={{ width: "100%" }}>
        {/* {createdProduct ? successMessage() : ""} */}
        {/* {error ? errorMessage() : ""} */}
        {createProductForm()}
      </div>
    </Base>
  );
};

export default AddProduct;
