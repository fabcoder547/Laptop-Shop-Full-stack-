import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllBrands, updateProduct, getProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const UpdateProduct = ({ match }) => {
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
    createdProduct: false,

    formData: "",
  });

  const {
    name,
    price,
    stock,
    display,
    ram,
    rom,
    processor,
    photo,
    brand,
    allbrands,
    formData,
  } = values;

  const { user, token } = isAuthenticated();
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
        if (data == undefined) {
          setValues({ ...values, error: "product is not Created" });
        } else if (data.error) {
          alert("error plese retry");
          setValues({ ...values, error: data.error });
        } else {
          preloadBrands();
          console.log(data.product);
          setValues({
            ...values,
            name: data.product.name,
            stock: data.product.stock,
            price: data.product.price,
            ram: data.product.description.memory.ram,
            rom: data.product.description.memory.rom,
            processor: data.product.description.processor,

            display: data.product.description.display,
            createdProduct: true,
            error: false,
            formData: new FormData(),
          });

          formData.set("name", name);
          formData.set("ram", ram);
          formData.set("rom", rom);
          formData.set("stock", stock);
          formData.set("display", display);
          formData.set("processor", processor);
          formData.set("price", price);
          console.log("form data", formData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload(match.params.productId);
    console.log(values);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // setValues({ ...values, loading: true, error: false });
    console.log(formData);
    updateProduct(match.params.productId, token, user._id, formData)
      .then((data) => {
        if (data == undefined) {
          setValues({ ...values, error: "not able to create product" });
        } else if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            createdProduct: false,
          });
        } else {
          alert("done");
          console.log("form data", formData);
          setValues({
            ...values,
            name: "",
            price: "",
            ram: "",
            rom: "",
            processor: "",
            error: false,
            createdProduct: true,
            stock: "",
            loading: false,
            description: "",
            photo: "",
          });
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
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    formData.set(name, value);
    console.log("form data", formData);
    setValues({ ...values, [name]: value });
  };
  const createProductForm = () => (
    <form>
      <div className="row">
        <div className="col-md-6">
          <span className="text-danger">Post photo</span>
          <div className="form-group">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </div>
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
            <textarea
              onChange={handleChange("display")}
              name="display"
              className="form-control"
              placeholder="display"
              value={display}
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
              <option>select</option>
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
            update Product
          </button>
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
        {/* {createdProduct ? successMessage() : ""}
        {error ? errorMessage() : ""} */}
        {createProductForm()}

        {/* <p>{rom}</p> */}
        <p>{JSON.stringify(values.name)}</p>
        <p>{JSON.stringify(values.ram)}</p>
        <p>{JSON.stringify(values.rom)}</p>
        <p>{JSON.stringify(values.display)}</p>
        <p>{JSON.stringify(values.processor)}</p>
      </div>
    </Base>
  );
};

export default UpdateProduct;
