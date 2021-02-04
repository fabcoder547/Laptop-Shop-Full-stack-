import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import swal from "sweetalert"
import {
  getAllBrands,
  updateProduct,
  getProduct,
  getPhoto,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";

const UpdateProduct = ({ match }) => {
  const [myphoto, setMyphoto] = useState("");
  const [mybrand, setMyBrand] = useState("");
  const [reload, setRealod] = useState(false);
  const [values, setValues] = useState({
    name: "",

    processor: "",
    ram: "",
    rom: "",
    display: "",
    price: "",
    stock: "",
    photo: undefined,
    allbrands: [],
    brand: "",
    error: false,
    updatedProduct: false,

    formData: "",
  });

  const {
    name,
    error,
    price,
    stock,
    display,
    ram,
    rom,
    processor,
    photo,
    brand,
    updatedProduct,
    allbrands,
    formData,
  } = values;

  const { user, token } = isAuthenticated();


 const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };









  const preloadBrands = () => {
    getAllBrands()
      .then((data) => {
        if (data.error) {
          setValues({ error: data.error });
        } else {
          setValues({
            allbrands: data.brands,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const preload = (productId) => {
    getProduct(productId)
      .then((data) => {
        // console.log('product ',data)
        if (data == undefined) {
          setValues({
            ...values,
            error: "product is not Created",
            updateProduct: false,
          });
        } else if (data.error) {
          alert("error plese retry");
          setValues({ ...values, error: data.error });
        } else {
          preloadBrands();

          // console.log(data.product.description.brand);
          setMyBrand(data.product.description.brand);
          setValues({
            ...values,

            brandName: data.product.description.brand,
            name: data.product.name,
            stock: data.product.stock,
            price: data.product.price,
            ram: data.product.description.memory.ram,
            rom: data.product.description.memory.rom,
            processor: data.product.description.processor,

            display: data.product.description.display,
            updatedProduct: false,
            error: false,
            formData: new FormData(),
          });
          var base64Flag = `data:${data.product.photo.ContentType};base64,`;
          var imageStr = arrayBufferToBase64(data.product.photo.data.data);
          setMyphoto(base64Flag + imageStr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload(match.params.productId);

    // console.log(values);
  }, [reload]);

  const onSubmit = (e) => {
    e.preventDefault();
    // setValues({ ...values, loading: true, error: false });
    // console.log(formData);
    updateProduct(match.params.productId, token, user._id, formData)
      .then((data) => {
        if (data == undefined) {
          setValues({ ...values, error: "not able to create product" });
          swal({
         title: "Server Error",
      
        icon: "error",
        buttons: true,
       dangerMode: true,
          })
        } else if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            updatedProduct: false,
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
  title: "Successfully Updated!",
  text: "Your Product is uptodate",
  icon: "success",
    buttons:true,        
});
          setMyBrand("");
          setValues({
            ...values,
            brand: "",
            name: "",
            price: "",
            ram: "",
            rom: "",
            display: "",
            processor: "",
            error: false,
            updatedProduct: true,
            stock: "",
            loading: false,
            description: "",
            photo: undefined,
          });
         
          setRealod(!reload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    return (
      <div className="badge badge-success" style={{ width: "100%" }}>
        <p className="text-white">product added successfully</p>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="badge badge-danger" style={{ width: "100%" }}>
        <p className="text-white">{}</p>
      </div>
    );
  };

  const handleChange = (name) => (e) => {
    let value;
    if (name === "photo") {
      setMyphoto((URL||window.webkitURL).createObjectURL(e.target.files[0]));
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    formData.set(name, value);
    if (name === "brand") {
      setMyBrand(e.target.value);
    }
    
    setValues({ ...values, [name]: value });
  }


  const createProductForm = () => (
    <form>
      <div className="row">
      <div className="col-md-12">
        <img
            value={reload}
            className="img-fluid rounded"
            src={
             myphoto
            }
            height="220px"
            width="250px"
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
      <div className="row mb-5">
        <div className="col-md-6">
          
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              value={name}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("display")}
              className="form-control"
              placeholder="display"
              value={display}
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
              value={mybrand}
              onChange={handleChange("brand")}
              className="form-control"
              placeholder="Brand"
            >
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
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
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

          

          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-success mb-3"
          >
            update Product
          </button>
          </div>
        </div>
      </div>
    </form>
  );
  return (
    <Base title="Update Product" description="Add a product for sell!">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded" style={{ width: "100%" }}>
        {updatedProduct ? successMessage() : ""}
        {error ? errorMessage() : ""}
        {createProductForm()}

        {/* <p>{rom}</p> */}
        {/* <p>{JSON.stringify(values.name)}</p>
        <p>{JSON.stringify(values.ram)}</p>
        <p>{JSON.stringify(values.rom)}</p>
        <p>{JSON.stringify(values.display)}</p>
        <p>{JSON.stringify(values.processor)}</p> */}
      </div>
    </Base>
  );
};

export default UpdateProduct;
